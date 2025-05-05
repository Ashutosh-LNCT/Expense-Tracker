document.getElementById("expense-form").addEventListener("submit", addExpense);
document.getElementById("income-form").addEventListener("submit", addIncome);

let expenses = [];
let totalAmount = 0;
let income = 0;

function addExpense(event) {
    event.preventDefault();
    
    const expenseName = document.getElementById("expense-name").value;
    const expenseAmount = parseFloat(document.getElementById("expense-amount").value);

    if (!expenseName || isNaN(expenseAmount) || expenseAmount <= 0) {
        alert("Please enter a valid expense name and amount.");
        return;
    }

    const expense = {
        id: new Date().getTime(),
        name: expenseName,
        amount: expenseAmount
    };

    expenses.push(expense);
    totalAmount += expenseAmount;

    updateUI();
    document.getElementById("expense-form").reset();
}

function removeExpense(id, amount) {
    expenses = expenses.filter(expense => expense.id !== id);
    totalAmount -= amount;

    updateUI();
}

function addIncome(event) {
    event.preventDefault();
    
    const incomeAmount = parseFloat(document.getElementById("income-amount").value);

    if (isNaN(incomeAmount) || incomeAmount <= 0) {
        alert("Please enter a valid income amount.");
        return;
    }

    income += incomeAmount;

    updateUI();
    document.getElementById("income-form").reset();
}

function updateUI() {
    document.getElementById("total-amount").textContent = totalAmount.toFixed(2);
    document.getElementById("income-amount-display").textContent = income.toFixed(2);
    
    const remainingBalance = income - totalAmount;
    document.getElementById("remaining-balance").textContent = remainingBalance.toFixed(2);

    const expenseList = document.getElementById("expenses");
    expenseList.innerHTML = "";
    
    expenses.forEach(expense => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${expense.name} - ₹${expense.amount.toFixed(2)} 
            <button onclick="removeExpense(${expense.id}, ${expense.amount})">Remove</button>
        `;
        expenseList.appendChild(li);
    });
}
