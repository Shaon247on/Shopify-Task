// script.js

const increaseBtns = document.querySelectorAll(".increase");
const decreaseBtns = document.querySelectorAll(".decrease");
const qtyDisplays = document.querySelectorAll(".quantity");
const addToCartBtn = document.getElementById("add-to-cart");
const cartDrawer = document.getElementById("cartDrawer");
const overlay = document.getElementById("overlay");
const closeCartBtn = document.getElementById("closeCart");
const cartItemsContainer = document.getElementById("cartItems");
const cartTotalElem = document.getElementById("cartTotal");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateQuantity(btn, change) {
  const qtyDisplay = btn.parentElement.querySelector(".quantity");
  let currentQty = parseInt(qtyDisplay.dataset.value);
  let newQty = currentQty + change;
  if (newQty >= 1 && newQty <= 10) {
    qtyDisplay.dataset.value = newQty;
    qtyDisplay.textContent = newQty;
    updatePriceDisplay(newQty);
  }
}

function updatePriceDisplay(qty) {
  const baseUnitPrice = 349;
  const baseComparePrice = 399;
  const unit = baseUnitPrice;
  const compare = baseComparePrice;

  document.querySelector(".selling-price").textContent = `$${(
    unit * qty
  ).toFixed(2)}`;
  document.querySelector(".selling-mobile").textContent = `$${(
    unit * qty
  ).toFixed(2)}`;
  document.querySelector(".compare-price").textContent = `$${(
    compare * qty
  ).toFixed(2)}`;
}

document.getElementById("openCartBtn").addEventListener("click", openCart);

function openCart() {
  cartDrawer.classList.add("open");
  overlay.style.display = "block";
}

function closeCart() {
  cartDrawer.classList.remove("open");
  overlay.style.display = "none";
}

const hamburgerBtn = document.getElementById("hamburgerBtn");
const navMenu = document.getElementById("navMenu");

hamburgerBtn.addEventListener("click", () => {
  navMenu.classList.toggle("show");
});

function renderCart() {
  cartItemsContainer.innerHTML = "";

  const cartTotalWrapper = document.getElementById("cartTotalWrapper");
  let total = 0;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="empty-cart">
        <p>No item selected</p>
        <button id="continueShoppingBtn">Continue Shopping</button>
      </div>
    `;
    document
      .getElementById("continueShoppingBtn")
      .addEventListener("click", closeCart);
    cartTotalWrapper.style.display = "none"; // Hide total section
    localStorage.setItem("cart", JSON.stringify(cart));
    return;
  }

  cart.forEach((item, index) => {
    total += item.price * item.qty;

    const div = document.createElement("div");
    div.className = "cart-item-ui";
    div.innerHTML = `
      <div class="cart-item-left">
        <img src="https://via.placeholder.com/80" alt="${
          item.name
        }" class="cart-thumb" />
      </div>
      <div class="cart-item-details">
        <h4>${item.name}</h4>
        <p>$${item.price.toFixed(2)}</p>
        <div class="qty-control">
          <button class="decrease-btn" data-index="${index}">−</button>
          <span class="qty-display">${item.qty}</span>
          <button class="increase-btn" data-index="${index}">+</button>
          <button class="delete-btn" data-index="${index}">🗑</button>
        </div>
      </div>
      <div class="cart-item-total">
        <strong>$${(item.price * item.qty).toFixed(2)}</strong>
      </div>
    `;

    cartItemsContainer.appendChild(div);
  });

  cartTotalElem.textContent = total.toFixed(2);
  cartTotalWrapper.style.display = "block"; // Show total section if cart has items
  localStorage.setItem("cart", JSON.stringify(cart));

  document.querySelectorAll(".increase-btn").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      const index = parseInt(e.target.dataset.index);
      cart[index].qty += 1;
      renderCart();
    })
  );

  document.querySelectorAll(".decrease-btn").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      const index = parseInt(e.target.dataset.index);
      if (cart[index].qty > 1) {
        cart[index].qty -= 1;
        renderCart();
      }
    })
  );

  document.querySelectorAll(".delete-btn").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      const index = parseInt(e.target.dataset.index);
      removeItem(index);
    })
  );
}

function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
}

increaseBtns.forEach((btn) => {
  btn.addEventListener("click", () => updateQuantity(btn, 1));
});

decreaseBtns.forEach((btn) => {
  btn.addEventListener("click", () => updateQuantity(btn, -1));
});

addToCartBtn.addEventListener("click", () => {
  const qty = parseInt(document.querySelector(".quantity").dataset.value);
  const price = parseFloat(
    document.querySelector(".selling-price").dataset.price
  );
  const name = document.querySelector("h1").textContent;
  cart.push({ name, qty, price });
  renderCart();
  openCart();
});

closeCartBtn.addEventListener("click", closeCart);
overlay.addEventListener("click", closeCart);

document.addEventListener("DOMContentLoaded", () => {
  const initialQty =
    parseInt(document.querySelector(".quantity").dataset.value) || 1;
  updatePriceDisplay(initialQty);
  renderCart();
});

function changeImage(element) {
  const display = document.getElementById("displayImage");
  display.src = element.src;
}
