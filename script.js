let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price) {
    let item = cart.find(p => p.name === name);

    if (item) {
        item.qty++;
    } else {
        cart.push({ name, price, qty: 1 });
    }

    saveCart();
    displayCart();
}

function increaseQty(index) {
    cart[index].qty++;
    saveCart();
    displayCart();
}

function decreaseQty(index) {
    if (cart[index].qty > 1) {
        cart[index].qty--;
    } else {
        cart.splice(index, 1);
    }
    saveCart();
    displayCart();
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function displayCart() {
    let cartDiv = document.getElementById("cartItems");
    let total = 0;
    cartDiv.innerHTML = "";

    cart.forEach((item, index) => {
        total += item.price * item.qty;

        cartDiv.innerHTML += `
            <div class="cart-item">
                <strong>${item.name}</strong><br>
                ₹${item.price} × ${item.qty}
                <br>
                <button onclick="increaseQty(${index})">+</button>
                <button onclick="decreaseQty(${index})">-</button>
            </div>
        `;
    });

    document.getElementById("total").innerText = total;
}

displayCart();

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");

    // Save mode in localStorage
    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
}

function filterProduct(category) {
    let products = document.querySelectorAll(".product");

    products.forEach(product => {
        let productCategory = product.getAttribute("data-category");

        if (category === "all" || productCategory === category) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });
}

let selectedCategory = "all";

function setCategory(category) {
    selectedCategory = category;
    applyFilters();
}

function applyFilters() {
    let searchValue = document
        .getElementById("searchInput")
        .value
        .toLowerCase();

    let products = document.querySelectorAll(".product");

    products.forEach(product => {
        let productName = product.innerText.toLowerCase();
        let productCategory = product.getAttribute("data-category");

        let matchCategory =
            selectedCategory === "all" ||
            productCategory === selectedCategory;

        let matchSearch =
            productName.includes(searchValue);

        if (matchCategory && matchSearch) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });
}

function sortProducts() {
    let sortValue = document.getElementById("priceSort").value;
    let productContainer = document.getElementById("productList");

    // saare products ko array bana lo
    let products = Array.from(productContainer.getElementsByClassName("product"));

    products.sort((a, b) => {
        let priceA = parseInt(a.querySelector("p").innerText.replace("₹", ""));
        let priceB = parseInt(b.querySelector("p").innerText.replace("₹", ""));

        if (sortValue === "low") {
            return priceA - priceB;   // Low → High
        } else if (sortValue === "high") {
            return priceB - priceA;   // High → Low
        }
    });

    // sorted products wapas page par lagao
    products.forEach(product => productContainer.appendChild(product));
}
