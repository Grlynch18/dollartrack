// Application state and DOM element references

export const state = {
  transData: [],
  totalIncome: 0,
  totalExpense: 0,
  currentBalance: 0,
  selectedType: null
};

// Reference to DOM elements for form and display (gets elements when accessed)
export const elements = {
  get amountInput() { return document.getElementById('amount'); },
  get titleInput() { return document.getElementById('title'); },
  get categoryInput() { return document.getElementById('category'); },
  get dateInput() { return document.getElementById('date'); },
  get displayTrans() { return document.getElementById('displayTrans'); },
  get fullDisplayTrans() { return document.getElementById('fullDisplayTrans'); }
};
