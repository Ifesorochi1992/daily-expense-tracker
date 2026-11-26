
// Get HTML elements
const expenseForm = document.getElementById("expenseForm");
const expenseName = document.getElementById("expenseName");
const expenseAmount = document.getElementById("expenseAmount");
const expenseList = document.getElementById("expenseList");
const totalAmount = document.getElementById("totalAmount");

// Create an empty array to store expenses
let expenses = [];

// Function to display expenses
function displayExpenses() {

    // Clear the expense list
    expenseList.innerHTML = "";

    // Check if there are no expenses
    if (expenses.length === 0) {
        expenseList.innerHTML =
            '<li class="empty-message">No expenses added yet.</li>';
    }

    // Display each expense
    expenses.forEach(function(expense) {

        const listItem = document.createElement("li");

        listItem.innerHTML = `
            <span>
                ${expense.name} - ₦${expense.amount.toLocaleString("en-NG")}
            </span>

            <button class="delete-btn" data-id="${expense.id}">
                Delete
            </button>
        `;

        expenseList.appendChild(listItem);
    });

    // Calculate total expenses
    calculateTotal();
}

// Function to calculate total
function calculateTotal() {

    let total = 0;

    expenses.forEach(function(expense) {
        total += expense.amount;
    });

    totalAmount.textContent =
        "₦" + total.toLocaleString("en-NG", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
}

// Add a new expense
expenseForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = expenseName.value.trim();
    const amount = Number(expenseAmount.value);

    // Validate inputs
    if (name === "" || !Number.isFinite(amount) || amount <= 0) {
        alert("Please enter a valid expense name and amount.");
        return;
    }

    // Create an expense object
    const expense = {
        id: Date.now(),
        name: name,
        amount: amount
    };

    // Add expense to array
    expenses.push(expense);

    // Update the page
    displayExpenses();

    // Clear input fields
    expenseForm.reset();
});

// Delete an expense
expenseList.addEventListener("click", function(event) {

    if (event.target.classList.contains("delete-btn")) {

        const expenseId = Number(event.target.dataset.id);

        expenses = expenses.filter(function(expense) {
            return expense.id !== expenseId;
        });

        // Update the page
        displayExpenses();
    }
});

// Display initial page
displayExpenses();
