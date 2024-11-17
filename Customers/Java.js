const customerForm = document.getElementById('customerForm');
const customerList = document.getElementById('customerList');

let customers = JSON.parse(localStorage.getItem('customers')) || [];

// Function to render the customer list
function renderCustomers() {
    customerList.innerHTML = '';
    customers.forEach((customer, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${customer.name}</td>
            <td>${customer.email}</td>
            <td>${customer.phone}</td>
            <td><button onclick="deleteCustomer(${index})">Delete</button></td>
        `;
        customerList.appendChild(row);
    });
}

// Function to add a new customer
customerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    customers.push({ name, email, phone });
    localStorage.setItem('customers', JSON.stringify(customers));
    renderCustomers();
    customerForm.reset();
});

// Function to delete a customer
function deleteCustomer(index) {
    customers.splice(index, 1);
    localStorage.setItem('customers', JSON.stringify(customers));
    renderCustomers();
}

// Initial render
renderCustomers();
