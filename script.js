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
function handleProcess() {
    const invoiceFile = document.getElementById('invoice-input').files[0];
    const gstrFile = document.getElementById('gstr-input').files[0];

    if (!invoiceFile && !gstrFile) {
        alert("Please select at least an invoice image or a GSTR-2B file to process.");
        return;
    }

    const resultsSection = document.getElementById('results-section');
    const consoleBox = document.getElementById('output-console');

    resultsSection.classList.remove('hidden');
    consoleBox.textContent = "Processing files...\nSending data to backend processing service...";

    // Mock UI update simulating backend response
    setTimeout(() => {
        document.getElementById('metric-invoices').textContent = "1";
        document.getElementById('metric-mismatches').textContent = "1";
        document.getElementById('metric-loss').textContent = "₹1,800.00";

        consoleBox.textContent = JSON.stringify({
            status: "Success",
            extracted_invoice: {
                invoice_num: "INV-2026-001",
                gstin: "27AAAAA0000A1Z5",
                tax_amount: 1800.00
            },
            reconciliation_status: "Mismatch Detected",
            recommendation: "Supplier has not uploaded invoice to GSTR-1 yet. Reach out to prevent ITC claim rejection."
        }, null, 2);
    }, 1500);
}