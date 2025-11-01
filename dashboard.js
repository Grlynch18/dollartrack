// script/dashboard.js
// This file wires up all the events to their lazy-loaded handlers.

// --- HEADER EVENT LISTENERS ---
document.getElementById('profilePic').addEventListener('click', async () => {
    const { toggleProfileNav } = await import('./modules/ui.js');
    toggleProfileNav();
});

document.getElementById('closeNavBtn').addEventListener('click', async () => {
    const { toggleProfileNav } = await import('./modules/ui.js');
    toggleProfileNav();
});

document.getElementById('addpaymentL').addEventListener('click', async () => {
    const { showAddDataView } = await import('./modules/ui.js');
    showAddDataView('income'); // Default to income
});

// --- MAIN CONTENT EVENT LISTENERS ---

// Show 'Add Data' View for addPaymentMobile
document.getElementById('addPaymentMobile').addEventListener('click', async () => {
    const { showAddDataView } = await import('./modules/ui.js');
    showAddDataView();
});

// Show "Add Data" View for Income
document.getElementById('incomeTrans').addEventListener('click', async () => {
    const { showAddDataView } = await import('./modules/ui.js');
    showAddDataView('income');
});

// Show "Add Data" View for Expense
document.getElementById('expenTrans').addEventListener('click', async () => {
    const { showAddDataView } = await import('./modules/ui.js');
    showAddDataView('expenses');
});

// Show Dashboard/Transaction Views
document.getElementById('addToDash').addEventListener('click', async () => {
    const { showDashboardView } = await import('./modules/ui.js');
    showDashboardView();
});
document.getElementById('dashboardMobileD').addEventListener('click', async () => {
    const { showDashboardView } = await import('./modules/ui.js');
    showDashboardView();
});
document.getElementById('viewTrans').addEventListener('click', async () => {
    const { elements } = await import('./modules/state.js');
    const { showTransactionsView, renderTransactions } = await import('./modules/ui.js');
    renderTransactions(elements.fullDisplayTrans); // No limit = show all
    showTransactionsView();
});

// Set Transaction Type in the Add Form
document.getElementById('incomeBtn').addEventListener('click', async () => {
    const { state } = await import('./modules/state.js');
    state.selectedType = 'income';
    document.getElementById('incomeBtn').classList.add('active');
    document.getElementById('expensesBtn').classList.remove('active');
});
document.getElementById('expensesBtn').addEventListener('click', async () => {
    const { state } = await import('./modules/state.js');
    state.selectedType = 'expenses';
    document.getElementById('expensesBtn').classList.add('active');
    document.getElementById('incomeBtn').classList.remove('active');
});

// Save Button
document.getElementById('saveBtn').addEventListener('click', async () => {
  const { saveTransactionHandler } = await import('./modules/handlers.js');
  saveTransactionHandler();
});

// Logout Button
document.getElementById('logoutBtn').addEventListener('click', async () => {
  const { logoutUser } = await import('./modules/auth.js');
  logoutUser();
  alert('Logged out successfully!');
  window.location.href = './login.html';
});

// Initial UI setup on page load
document.addEventListener('DOMContentLoaded', async () => {
    // Check authentication
    const { isAuthenticated } = await import('./modules/auth.js');
    if (!isAuthenticated()) {
        alert('Please login to access the dashboard');
        window.location.href = './login.html';
        return;
    }

    const { elements } = await import('./modules/state.js');
    const { updateBalances, renderTransactions } = await import('./modules/ui.js');
    updateBalances();
    renderTransactions(elements.displayTrans, 5);
});

