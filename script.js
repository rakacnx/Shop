/* Final script: modal, countdown, color options, and selected color name */
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
  modalProductImage.innerHTML = '<img src="'+productImageSrc+'" alt="'+productName+'" style="width:100%;height:100%;object-fit:contain;">';

  const productEl = document.querySelector('[data-name="'+productName+'"]');
  let discount = 0;
  let priceNum = 0;
  if (productEl) {
    if (productEl.dataset.discount) discount = parseInt(productEl.dataset.discount);
    if (productEl.dataset.price) priceNum = parseFloat(productEl.dataset.price);
  }
  priceNum = Math.floor(priceNum);
  const newPrice = Math.floor(priceNum * (100 - discount) / 100);

  if (discount > 0) {
    modalProductPrice.innerHTML = '\n      <span class="modal-old-price">฿'+priceNum+'</span>\n      <span class="modal-new-price">฿'+newPrice+'</span>\n      <span class="modal-discount">-'+discount+'%</span>\n    ';
  } else {
    modalProductPrice.innerHTML = '<span class="modal-new-price">฿'+priceNum+'</span>';
  }

  // render colors
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
        btn.addEventListener('click', function() {
          document.querySelectorAll('.color-option').forEach(x=>x.classList.remove('active'));
          btn.classList.add('active');
          updateSelectedColorName(c);
        });
        colorContainer.appendChild(btn);
        // select first by default
        if (idx === 0) {
          btn.classList.add('active');
          updateSelectedColorName(c);
        }
      });
    } else {
      colorContainer.textContent = 'ไม่มีข้อมูลสี';
    }
  }

  // countdown
  if (countdownEl) {
    countdownEl.style.background = 'linear-gradient(90deg, #ff3d00 0%, #ff8a00 100%)';
    countdownEl.style.color = '#fff';
    startModalCountdown(productName);
  }

  modal.style.display = 'block';
}

document.addEventListener('DOMContentLoaded', function() {
  // close modal
  const modal = document.getElementById('productModal');
  const closeBtn = document.querySelector('.close');
  if (closeBtn) closeBtn.addEventListener('click', ()=> modal.style.display='none');
  window.addEventListener('click', (e)=>{ if(e.target===modal) modal.style.display='none'; });

  // attach listeners to product cards
  document.querySelectorAll('.product-card').forEach(card => {
    const productName = card.dataset.name || 'สินค้า';
    const productPrice = card.dataset.price || '0';
    const imageEl = card.querySelector('img');
    const imageSrc = imageEl ? imageEl.src : '';
    let colors = [];
    if (card.dataset.colors) {
      try { colors = JSON.parse(card.dataset.colors); } catch(e){ colors = []; }
    }
    card.addEventListener('click', ()=> openProductModal(productName, productPrice, colors, imageSrc) );
  });

  // render grid prices and badges
  document.querySelectorAll('.product-card').forEach(card => {
    const discount = parseInt(card.dataset.discount || 0);
    const priceEl = card.querySelector('.product-price');
    if (!priceEl) return;
    const raw = card.dataset.price || '0';
    let priceNum = parseFloat(raw) || 0;
    priceNum = Math.floor(priceNum);
    const newPrice = Math.floor(priceNum * (100 - discount) / 100);
    priceEl.innerHTML = '\n      <span class="old-price">฿'+priceNum+'</span>\n      <span class="new-price">฿'+newPrice+'</span>\n    ';
    if (!card.querySelector('.product-badge.flash-sale')) {
      const badge = document.createElement('div');
      badge.className = 'product-badge flash-sale';
      badge.textContent = 'ลด '+discount+'%';
      card.prepend(badge);
    } else {
      const b = card.querySelector('.product-badge.flash-sale');
      if (b) b.textContent = 'ลด '+discount+'%';
    }
  });
});

function startModalCountdown(productName) {
  const productEl = document.querySelector('[data-name="'+productName+'"]');
  const countdownEl = document.getElementById('modalCountdown');
  if (!productEl || !productEl.dataset.saleEnd || !countdownEl) return;
  const end = new Date(productEl.dataset.saleEnd).getTime();
  const update = ()=>{
    const now = Date.now();
    const diff = end - now;
    if (diff <= 0) { countdownEl.textContent = 'หมดโปรโมชั่นแล้ว'; countdownEl.style.background = '#999'; return; }
    const hours = Math.floor(diff / (1000*60*60));
    const minutes = Math.floor((diff % (1000*60*60)) / (1000*60));
    const seconds = Math.floor((diff % (1000*60)) / 1000);
    countdownEl.textContent = 'เหลือเวลา '+String(hours).padStart(2,'0')+':'+String(minutes).padStart(2,'0')+':'+String(seconds).padStart(2,'0');
  };
  update();
  const interval = setInterval(update,1000);
  const modal = document.getElementById('productModal');
  modal.addEventListener('click', ()=> clearInterval(interval), { once: true });
}