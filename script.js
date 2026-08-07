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
    const file = invoiceInput.files[0];

    if (!file) {
        alert("Please select an invoice image to process.");
        return;
    }

    const consoleBox = document.getElementById('output-console');
    document.getElementById('results-section').classList.remove('hidden');
    consoleBox.textContent = "Processing image with Gemini API...\nPlease wait...";

    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch('http://localhost:8000/api/ocr-invoice', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            consoleBox.textContent = JSON.stringify(data, null, 2);
            document.getElementById('metric-invoices').textContent = "1";
            document.getElementById('metric-loss').textContent = "₹" + (data.extracted_data.gst_amount || "0.00");
        } else {
            consoleBox.textContent = "Error: " + (data.detail || "Upload failed");
        }
    } catch (error) {
        consoleBox.textContent = "Failed to reach backend API. Check if 'python main.py' is running on your computer.";
    }
}
