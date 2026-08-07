// File Input Event Handling
document.getElementById('invoice-input').addEventListener('change', function(e) {
    if(e.target.files.length > 0) {
        document.getElementById('invoice-filename').textContent = "Loaded: " + e.target.files[0].name;
    }
});

document.getElementById('gstr-input').addEventListener('change', function(e) {
    if(e.target.files.length > 0) {
        document.getElementById('gstr-filename').textContent = "Loaded: " + e.target.files[0].name;
    }
});

// UI Mock Processing Handler
async function handleProcess() {
    const invoiceInput = document.getElementById('invoice-input');
    const gstrInput = document.getElementById('gstr-input');

    const invoiceFile = invoiceInput.files[0];
    const gstrFile = gstrInput.files[0];

    if (!invoiceFile) {
        alert("Please select an invoice image first.");
        return;
    }

    const resultsSection = document.getElementById('results-section');
    const consoleBox = document.getElementById('output-console');

    resultsSection.classList.remove('hidden');
    consoleBox.textContent = "Connecting to Python Backend & Gemini API...\nExtracting invoice details...";

    const formData = new FormData();
    formData.append('file', invoiceFile);

    try {
        // Send request to your local running main.py backend
        const response = await fetch('http://localhost:8000/api/ocr-invoice', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            // Display real JSON response from Gemini
            consoleBox.textContent = JSON.stringify(data, null, 2);

            const extracted = data.extracted_data;
            document.getElementById('metric-invoices').textContent = "1";
            document.getElementById('metric-mismatches').textContent = "0";
            document.getElementById('metric-loss').textContent = "₹" + (extracted.gst_amount || 0).toFixed(2);
        } else {
            consoleBox.textContent = "Backend Error: " + (data.detail || "Failed to process image.");
        }
    } catch (error) {
        consoleBox.textContent = "Error: Could not connect to http://localhost:8000.\nMake sure 'python main.py' is running in VS Code terminal!";
    }
}