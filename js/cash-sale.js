/**
 * cash-sale.js - Cash sale form calculations
 */

function initializeCashSale() {
  const cashQty = document.getElementById('cashQty');
  const cashPrice = document.getElementById('cashPrice');
  const cashPaid = document.getElementById('cashPaid');

  if (!cashQty || !cashPrice || !cashPaid) return;

  function calculateSales() {
    const qty = parseFloat(cashQty.value) || 0;
    const price = parseFloat(cashPrice.value) || 0;
    const total = qty * price;

    const lineTotalEl = document.getElementById('cashLineTotal');
    const totalDueEl = document.getElementById('cashTotalDue');
    const changeEl = document.getElementById('cashChange');

    if (lineTotalEl) lineTotalEl.textContent = total.toLocaleString();
    if (totalDueEl) totalDueEl.textContent = `UgX ${total.toLocaleString()}`;

    const paid = parseFloat(cashPaid.value) || 0;
    const change = paid - total;

    if (changeEl) {
      if (paid > 0) {
        changeEl.textContent = `${change > 0 ? change.toLocaleString() : 0} UgX`;
        changeEl.className = change >= 0 ? 'text-success' : 'text-danger';
      } else {
        changeEl.textContent = '0 UgX';
        changeEl.className = 'text-danger';
      }
    }
  }

  // Attach listeners
  [cashQty, cashPrice, cashPaid].forEach((input) => {
    input.addEventListener('input', calculateSales);
  });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initializeCashSale);
