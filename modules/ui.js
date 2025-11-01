// script/modules/ui.js
import { state } from './state.js';

// Toggles the visibility of the profile settings dropdown
export function toggleProfileNav() {
  const nav = document.querySelector('.set-in'); // Direct selection for simplicity
  nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
}

// Shows the form to add a new transaction
export function showAddDataView(type) {
  state.selectedType = type;
  document.getElementById('mobileDevice').style.display = 'none';
  document.querySelector('.trans').style.display = 'none';
  document.querySelector('.add-data').style.display = 'block';

  if (type === 'income') {
    document.getElementById('incomeBtn').classList.add('active');
    document.getElementById('expensesBtn').classList.remove('active');
  } else if(type === 'expenses') {
    document.getElementById('expensesBtn').classList.add('active');
    document.getElementById('incomeBtn').classList.remove('active');
  }else{
    document.getElementById('expensesBtn').classList.remove('active');
    document.getElementById('incomeBtn').classList.remove('active');
  }
}

// Shows the main dashboard view
export function showDashboardView() {
    document.querySelector('.add-data').style.display = 'none';
    document.querySelector('.trans').style.display = 'none';
    document.getElementById('mobileDevice').style.display = 'block';
}

// Shows the transaction list view
export function showTransactionsView() {
    document.getElementById('mobileDevice').style.display = 'none';
    document.querySelector('.add-data').style.display = 'none';
    document.querySelector('.trans').style.display = 'block';
}

// Updates all balance elements on the page
export function updateBalances() {
  state.currentBalance = state.totalIncome - state.totalExpense;
  document.getElementById('blanT').textContent = `$${state.currentBalance.toFixed(2)}`;
  document.getElementById('amoutIncome').textContent = `$${state.totalIncome.toFixed(2)}`;
  document.getElementById('amoutExpenses').textContent = `$${state.totalExpense.toFixed(2)}`;
}

// Renders the list of transactions into a specified target element
export function renderTransactions(targetElement, limit = null) {
  targetElement.innerHTML = '';
  
  const transactionsToDisplay = (
    limit ? state.transData.slice(-limit) : state.transData.slice()
  ).reverse();

  if (transactionsToDisplay.length === 0) {
    targetElement.innerHTML = `<div class="tran-list" style="justify-content: center;"><span>No transactions yet.</span></div>`;
    return;
  }

  transactionsToDisplay.forEach((item) => {
    const transColor = item.tranType === 'income' ? 'amout-g' : 'amout-r';
    const transactionHTML = `
        <div class="tran-list">
            <div>${item.img}</div>
            <div><span>${item.category}</span></div>
            <div>
                <div><span class="t-time">${item.time}</span></div>
                <div><span class="t-time">${item.date}</span></div>
            </div>
            <div><span class="${transColor}">${item.amount}</span></div>
        </div>`;
    targetElement.insertAdjacentHTML('beforeend', transactionHTML);
  });
}