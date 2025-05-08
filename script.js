// script.js

const qtyInput = document.getElementById('quantity');
const increaseBtn = document.getElementById('increase');
const decreaseBtn = document.getElementById('decrease');
const addToCartBtn = document.getElementById('add-to-cart');
const cartDrawer = document.getElementById('cartDrawer');
const overlay = document.getElementById('overlay');
const closeCartBtn = document.getElementById('closeCart');
const cartItemsContainer = document.getElementById('cartItems');
const cartTotalElem = document.getElementById('cartTotal');

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateQuantity(change) {
  let qty = parseInt(qtyInput.value) + change;
  if (qty >= 1 && qty <= 10) {
    qtyInput.value = qty;
    updatePriceDisplay();
  }
}

function updatePriceDisplay() {
  const unit = parseFloat(document.querySelector('.selling-price').dataset.price);
  const compare = parseFloat(document.querySelector('.compare-price').dataset.compare);
  const qty = parseInt(qtyInput.value);
  document.querySelector('.selling-price').textContent = `$${(unit * qty).toFixed(2)}`;
  document.querySelector('.compare-price').textContent = `$${(compare * qty).toFixed(2)}`;
}

document.getElementById('openCartBtn').addEventListener('click', openCart);

function openCart() {
  cartDrawer.classList.add('open');
  overlay.style.display = 'block';
}

function closeCart() {
  cartDrawer.classList.remove('open');
  overlay.style.display = 'none';
}

const hamburgerBtn = document.getElementById('hamburgerBtn');
const navMenu = document.getElementById('navMenu');

hamburgerBtn.addEventListener('click', () => {
  navMenu.classList.toggle('show');
});

function renderCart() {
  cartItemsContainer.innerHTML = '';
  let total = 0;
  cart.forEach((item, index) => {
    total += item.price * item.qty;
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <span>${item.name} x${item.qty}</span>
      <span>$${(item.price * item.qty).toFixed(2)}</span>
      <button onclick="removeItem(${index})">X</button>
    `;
    cartItemsContainer.appendChild(div);
  });
  cartTotalElem.textContent = total.toFixed(2);
  localStorage.setItem('cart', JSON.stringify(cart));
}

function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
}

increaseBtn.addEventListener('click', () => updateQuantity(1));
decreaseBtn.addEventListener('click', () => updateQuantity(-1));

addToCartBtn.addEventListener('click', () => {
  const qty = parseInt(qtyInput.value);
  const price = parseFloat(document.querySelector('.selling-price').dataset.price);
  const name = document.querySelector('h1').textContent;
  cart.push({ name, qty, price });
  renderCart();
  openCart();
});

closeCartBtn.addEventListener('click', closeCart);
overlay.addEventListener('click', closeCart);

document.addEventListener('DOMContentLoaded', () => {
  updatePriceDisplay();
  renderCart();
});

function changeImage(element) {
  const display = document.getElementById('displayImage');
  display.src = element.src;
}
