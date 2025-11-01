// script/modules/handlers.js
import { state, elements } from './state.js';
import { updateBalances, renderTransactions, showDashboardView } from './ui.js';

// The main logic for saving a transaction
export function saveTransactionHandler() {
  const amount = elements.amountInput.value;
  const title = elements.titleInput.value;
  const category = elements.categoryInput.value;
  const date = elements.dateInput.value;

  if (!state.selectedType) return alert('Please Select Income or Expenses');
  if (!amount) return alert('Please Enter an Amount');
  if (!title) return alert('Please Enter a Title');
  if (!date) return alert('Please Select a Date');

  const amountNum = Number(amount);
  let tranAmount = '';
  
  if (state.selectedType === 'income') {
    tranAmount = `+$${amountNum.toFixed(2)}`;
    state.totalIncome += amountNum;
  } else {
    tranAmount = `-$${amountNum.toFixed(2)}`;
    state.totalExpense += amountNum;
  }
  
  // Create transaction object
  const newTransaction = {
    tranType: state.selectedType,
    amount: tranAmount,
    amountNum: amountNum,
    title: title,
    category: category,
    date: date,
    time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
    img: getCategoryIcon(category),
  };

  state.transData.push(newTransaction);
  
  // Update UI
  updateBalances();
  renderTransactions(elements.displayTrans, 5); 
  renderTransactions(elements.fullDisplayTrans); 

  alert('Transaction Added!');
  
  // Clear form and go back to dashboard
  elements.amountInput.value = '';
  elements.titleInput.value = '';
  elements.categoryInput.value = '';
  elements.dateInput.value = '';
  showDashboardView();
}


function getCategoryIcon(category) {
    const icons = {
        food: '<i class="bi bi-fork-knife"></i>',
        other: '<i class="bi bi-motherboard"></i>',
        salary: '<i class="bi bi-bank"></i>',
        transport: '<i class="bi bi-fuel-pump"></i>',
        travel: '<i class="bi bi-luggage"></i>',
        Bills: '<i class="bi bi-cash-stack"></i>'
    };
    return icons[category] || '<i class="bi bi-question-circle"></i>';
}