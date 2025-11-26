/* --- RAKA Script (แก้ไขให้ลดราคาเฉพาะสินค้าที่กำหนด) --- */

function updateSelectedColorName(color) {
  const selectedColorName = document.getElementById('selectedColorName');
  const colorNames = {
    '#ff6b4a': 'สีส้ม',
    '#ff8a5b': 'สีส้มอ่อน',
    '#e8c4ff': 'สีม่วงอ่อน',
    '#d4a5f5': 'สีม่วง',
    '#2d6b5f': 'สีเขียวเข้ม',
    '#3a8573': 'สีเขียว',
    '#4a90ff': 'สีน้ำเงิน',
    '#6ba3ff': 'สีน้ำเงินอ่อน',
    '#111113': 'สีดำ',
    '#2a2e35': 'สีเทาเข้ม',
    '#6b7c3f': 'สีเขียวมะกอก',
    '#8b5a5a': 'สีน้ำตาลแดง',
    '#4a5a2f': 'สีเขียวเข้ม',
    '#754c4a': 'สีน้ำตาล',
    '#876061': 'น้ำตาลอ่อน',
    '#ff0000': 'สีแดง',
    '#8a2be2': 'สีม่วงสด'
  };
  const displayColor = Array.isArray(color) ? color[0] : color;
  if (!selectedColorName) return;
  selectedColorName.textContent = colorNames[(displayColor || '').toLowerCase()] || 'สีที่เลือก';
}

function openProductModal(productName, productPriceStr, productColors, productImageSrc) {
  const modal = document.getElementById('productModal');
  const modalProductName = document.getElementById('modalProductName');
  const modalProductPrice = document.getElementById('modalProductPrice');
  const modalProductImage = document.getElementById('modalProductImage');
  const countdownEl = document.getElementById('modalCountdown');
  const colorContainer = document.getElementById('modalColorOptions');

  modalProductName.textContent = productName;
  modalProductImage.innerHTML = `<img src="${productImageSrc}" alt="${productName}" style="width:100%;height:100%;object-fit:contain;">`;

  const productEl = document.querySelector(`[data-name="${productName}"]`);
  let discount = 0;
  let priceNum = 0;

  if (productEl) {
    if (productEl.dataset.discount) discount = parseInt(productEl.dataset.discount);
    if (productEl.dataset.price) priceNum = parseFloat(productEl.dataset.price);
  }

  priceNum = Math.floor(priceNum);
  const newPrice = Math.floor(priceNum * (100 - discount) / 100);

  // แสดงราคาตามส่วนลด
  if (discount > 0) {
    modalProductPrice.innerHTML = `
      <span class="modal-old-price">฿${priceNum}</span>
      <span class="modal-new-price">฿${newPrice}</span>
      <span class="modal-discount">-${discount}%</span>
    `;
    countdownEl.style.display = 'block';
    startModalCountdown(productName);
  } else {
    modalProductPrice.innerHTML = `<span class="modal-new-price">฿${priceNum}</span>`;
    countdownEl.style.display = 'none';
  }

  // แสดงตัวเลือกสี
  if (colorContainer) {
    colorContainer.innerHTML = '';
    const colors = Array.isArray(productColors) ? productColors : (productColors ? [productColors] : []);
    if (colors.length) {
      colors.forEach((c, idx) => {
        const btn = document.createElement('button');
        btn.className = 'color-option';
        btn.style.background = c;
        btn.type = 'button';
        btn.setAttribute('data-color', c);
        btn.addEventListener('click', function () {
          document.querySelectorAll('.color-option').forEach(x => x.classList.remove('active'));
          btn.classList.add('active');
          updateSelectedColorName(c);
        });
        colorContainer.appendChild(btn);
        if (idx === 0) {
          btn.classList.add('active');
          updateSelectedColorName(c);
        }
      });
    } else {
      colorContainer.textContent = 'ไม่มีข้อมูลสี';
    }
  }

  modal.style.display = 'block';
}

document.addEventListener('DOMContentLoaded', function () {
  const modal = document.getElementById('productModal');
  const closeBtn = document.querySelector('.close');
  if (closeBtn) closeBtn.addEventListener('click', () => modal.style.display = 'none');
  window.addEventListener('click', e => { if (e.target === modal) modal.style.display = 'none'; });

  // คลิกเปิดสินค้า
  document.querySelectorAll('.product-card').forEach(card => {
    const productName = card.dataset.name || 'สินค้า';
    const productPrice = card.dataset.price || '0';
    const imageEl = card.querySelector('img');
    const imageSrc = imageEl ? imageEl.src : '';
    let colors = [];
    if (card.dataset.colors) {
      try { colors = JSON.parse(card.dataset.colors); } catch (e) { colors = []; }
    }
    card.addEventListener('click', () => openProductModal(productName, productPrice, colors, imageSrc));
  });

  // ✅ แสดงส่วนลดเฉพาะสินค้าที่มี data-discount เท่านั้น
  document.querySelectorAll('.product-card').forEach(card => {
    const discount = parseInt(card.dataset.discount || 0);
    const priceEl = card.querySelector('.product-price');
    if (!priceEl) return;

    const raw = card.dataset.price || '0';
    let priceNum = parseFloat(raw) || 0;
    priceNum = Math.floor(priceNum);

    if (discount > 0) {
      const newPrice = Math.floor(priceNum * (100 - discount) / 100);
      priceEl.innerHTML = `
        <span class="old-price">฿${priceNum}</span>
        <span class="new-price">฿${newPrice}</span>
      `;
      let badge = card.querySelector('.product-badge.flash-sale');
      if (!badge) {
        badge = document.createElement('div');
        badge.className = 'product-badge flash-sale';
        card.prepend(badge);
      }
      badge.textContent = 'ลด ' + discount + '%';
    } else {
      priceEl.innerHTML = `<span class="new-price">฿${priceNum}</span>`;
    }
  });

  // ✅ เพิ่มฟังก์ชันปุ่ม ADD TO BAG (อัปเดตเป็นระบบตะกร้าจริง)
  const addToBagBtn = document.querySelector('.btn-add-to-bag');
  if (addToBagBtn) {
    addToBagBtn.addEventListener('click', () => {
      const name = document.getElementById('modalProductName').textContent;
      const priceText = document.getElementById('modalProductPrice').querySelector('.modal-new-price')
        ? document.getElementById('modalProductPrice').querySelector('.modal-new-price').textContent
        : document.getElementById('modalProductPrice').textContent;
      const price = parseInt(priceText.replace(/[^\d]/g, ''));
      const color = document.getElementById('selectedColorName').textContent;
      const img = document.getElementById('modalProductImage').querySelector('img').src;

      if (color === 'เลือกสี') {
        alert('กรุณาเลือกสีก่อน');
        return;
      }

      addToCart({ name, price, color, img });
      modal.style.display = 'none';
      alert('เพิ่มสินค้าลงตะกร้าเรียบร้อยแล้ว!');
    });
  }

  // ✅ เปิดตะกร้าสินค้า
  const cartBtn = document.querySelector('.btn-cart');
  const cartModal = document.getElementById('cartModal');
  const cartClose = document.querySelector('.cart-close');

  if (cartBtn) {
    cartBtn.addEventListener('click', () => {
      renderCart();
      cartModal.style.display = 'block';
    });
  }

  if (cartClose) {
    cartClose.addEventListener('click', () => {
      cartModal.style.display = 'none';
    });
  }

  // ปิด Modal เมื่อคลิกข้างนอก
  window.addEventListener('click', (e) => {
    if (e.target === cartModal) {
      cartModal.style.display = 'none';
    }
  });

  // โหลดข้อมูลตะกร้าครั้งแรก
  updateCartCount();
});

/* --- ระบบตะกร้าสินค้า --- */
let cart = JSON.parse(localStorage.getItem('rakaCart')) || [];

function addToCart(product) {
  cart.push(product);
  saveCart();
  updateCartCount();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  renderCart();
  updateCartCount();
}

function saveCart() {
  localStorage.setItem('rakaCart', JSON.stringify(cart));
}

function updateCartCount() {
  const countEl = document.querySelector('.cart-count');
  if (countEl) {
    countEl.textContent = cart.length;
    countEl.style.display = cart.length > 0 ? 'flex' : 'none';
  }
}

function renderCart() {
  const cartItemsEl = document.getElementById('cartItems');
  const cartTotalEl = document.getElementById('cartTotal');

  if (!cartItemsEl) return;

  cartItemsEl.innerHTML = '';
  let total = 0;

  if (cart.length === 0) {
    cartItemsEl.innerHTML = '<p class="empty-cart-msg">ไม่มีสินค้าในตะกร้า</p>';
  } else {
    cart.forEach((item, index) => {
      total += item.price;
      const itemEl = document.createElement('div');
      itemEl.className = 'cart-item';
      itemEl.innerHTML = `
        <img src="${item.img}" alt="${item.name}" class="cart-item-img">
        <div class="cart-item-details">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-meta">สี: ${item.color}</div>
          <div class="cart-item-price">฿${item.price.toLocaleString()}</div>
        </div>
        <button class="btn-remove-item" onclick="removeFromCart(${index})">
          <i class="fa-solid fa-trash"></i>
        </button>
      `;
      cartItemsEl.appendChild(itemEl);
    });
  }

  if (cartTotalEl) {
    cartTotalEl.textContent = '฿' + total.toLocaleString();
  }
}

function startModalCountdown(productName) {
  const productEl = document.querySelector(`[data-name="${productName}"]`);
  const countdownEl = document.getElementById('modalCountdown');
  if (!productEl || !productEl.dataset.saleEnd || !countdownEl) return;

  const end = new Date(productEl.dataset.saleEnd).getTime();

  const update = () => {
    const now = Date.now();
    const diff = end - now;
    if (diff <= 0) {
      countdownEl.textContent = 'หมดโปรโมชั่นแล้ว';
      countdownEl.style.background = '#999';
      return;
    }
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    countdownEl.textContent = `เหลือเวลา ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  update();
  const interval = setInterval(update, 1000);
  const modal = document.getElementById('productModal');
  modal.addEventListener('click', () => clearInterval(interval), { once: true });
}
