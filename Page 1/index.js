//  // Function to handle adding items to the cart
//  function addToCart(button) {
//     const card = button.closest(".card");

//     // Get product details from data attributes
//     const product = {
//         id: card.dataset.id,
//         title: card.dataset.title,
//         price: parseFloat(card.dataset.price),
//         quantity: 1,
//     };

//     // Retrieve cart from localStorage or initialize an empty array
//     let cart = JSON.parse(localStorage.getItem("cart")) || [];

//     // Check if the product already exists in the cart
//     const existingItem = cart.find(item => item.id === product.id);

//     if (existingItem) {
//         existingItem.quantity += 1; // Increment quantity
//     } else {
//         cart.push(product); // Add new item
//     }

//     // Save updated cart to localStorage
//     localStorage.setItem("cart", JSON.stringify(cart));

//     // alert(`${product.title} has been added to your cart!`);
// }


// Function to handle adding items to the cart
function addToCart(button) {
    const card = button.closest(".card");

    // Get product details from data attributes
    const product = {
        id: card.dataset.id,
        title: card.dataset.title,
        price: parseFloat(card.dataset.price),
        quantity: 1,
    };

    // Retrieve cart from localStorage or initialize an empty array
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if the product already exists in the cart
    const existingItemIndex = cart.findIndex(item => item.id === product.id);

    if (existingItemIndex !== -1) {
        // If the product exists, increment its quantity
        cart[existingItemIndex].quantity += 1;
    } else {
        // Add the new product to the cart
        cart.push(product);
    }

    // Save the updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Update the button to show quantity controls
    updateCartButton(card, cart.find(item => item.id === product.id).quantity);
}

// Function to update the "Add to Cart" button to show quantity controls
function updateCartButton(card, quantity) {
    const footer = card.querySelector(".card-footer");

    footer.innerHTML = `
        <div class="qty-control">
            <button onclick="decreaseQty('${card.dataset.id}', this)">-</button>
            <span class="qty">${quantity}</span>
            <button onclick="increaseQty('${card.dataset.id}', this)">+</button>
        </div>
    `;
}

// Function to decrease item quantity
function decreaseQty(productId, button) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const productIndex = cart.findIndex(item => item.id === productId);

    if (productIndex !== -1) {
        cart[productIndex].quantity -= 1;

        if (cart[productIndex].quantity <= 0) {
            // Remove product if quantity becomes 0
            cart.splice(productIndex, 1);
        }
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    refreshCartButton(productId, button.closest(".card"));
}

// Function to increase item quantity
function increaseQty(productId, button) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const product = cart.find(item => item.id === productId);

    if (product) {
        product.quantity += 1;
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    refreshCartButton(productId, button.closest(".card"));
}

// Function to refresh the cart button based on the cart state
function refreshCartButton(productId, card) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const product = cart.find(item => item.id === productId);

    if (product) {
        // Update the button with the current quantity
        updateCartButton(card, product.quantity);
    } else {
        // Revert back to the "Add to Cart" button
        const footer = card.querySelector(".card-footer");
        footer.innerHTML = `
            <button class="order-btn" onclick="addToCart(this)">Add to Cart</button>
        `;
    }
}


function searchProducts() {
    // Get the search input
    const searchInput = document.getElementById('search-bar').value.toLowerCase();
    
    // Get all product cards
    const productCards = document.querySelectorAll('.card');
    
    // Loop through the product cards
    productCards.forEach(card => {
        // Get the product title from the data-title attribute
        const title = card.getAttribute('data-title') ? card.getAttribute('data-title').toLowerCase() : '';
        
        // Check if the title matches the search input
        if (title.includes(searchInput)) {
            card.style.display = 'block'; // Show the card if it matches
        } else {
            card.style.display = 'none'; // Hide the card if it doesn't match
        }
    });
}

// Select all buttons with the 'category-btn' class
const buttons = document.querySelectorAll('.category-btn');

// Add a click event listener to each button
buttons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove the 'active' class from all buttons
        buttons.forEach(btn => btn.classList.remove('active'));

        // Add the 'active' class to the clicked button
        button.classList.add('active');
    });
});
