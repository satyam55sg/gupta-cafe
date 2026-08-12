 const themeBtn = document.getElementById("themeBtn");

themeBtn.onclick = function() {
    document.body.classList.toggle("dark");
};
const images = [
    "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
    "https://images.unsplash.com/photo-1528735602780-2552fd46c7af",
    "https://images.unsplash.com/photo-1578985545062-69928b1d9587"
];

let currentImage = 0;

const slideImage = document.getElementById("slideImage");

setInterval(function() {
    currentImage++;

    if (currentImage >= images.length) {
        currentImage = 0;
    }

    slideImage.src = images[currentImage];
}, 3000);

const cards = document.querySelectorAll(".card");

let cart = [];

cards.forEach(card => {
    const button = document.createElement("button");
    button.textContent = "Add to Cart";
    button.classList.add("cart-btn");

    card.appendChild(button);

    button.addEventListener("click", function(event) {
        event.stopPropagation();

        const itemName = card.querySelector("h3").textContent;
        const priceText = card.querySelector("p").textContent;
        const price = parseInt(priceText.replace("₹", ""));

        const existingItem = cart.find(item => item.name === itemName);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({
                name: itemName,
                price: price,
                quantity: 1
            });
        }

        updateCart();
    });
});

function updateCart() {
    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        const itemDiv = document.createElement("div");

        itemDiv.innerHTML = `
            <p>
                ${item.name} - ₹${item.price}
                <br>
                <button onclick="changeQuantity(${index}, -1)">−</button>
                ${item.quantity}
                <button onclick="changeQuantity(${index}, 1)">+</button>
                <button onclick="removeItem(${index})">🗑️</button>
            </p>
        `;

        cartItems.appendChild(itemDiv);
    });

    cartTotal.textContent = "Total: ₹" + total;
    document.getElementById("orderBtn").onclick = function() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    let message = "Hello Gupta Cafe! I would like to order:%0A%0A";

    cart.forEach(item => {
        message += item.name + " x " + item.quantity;
        message += " = ₹" + (item.price * item.quantity) + "%0A";
    });

    message += "%0ATotal: ₹" + total;

    const phoneNumber = "919325388371";

    window.open(
        "https://wa.me/" + phoneNumber + "?text=" + message,
        "_blank"
    );
};
}

function changeQuantity(index, amount) {
    cart[index].quantity += amount;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    updateCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}