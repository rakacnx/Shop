let selectedColor = '';
let currentProductImages = {};

function openProductModal(productName, productPrice, colors, defaultBackground, colorImages = {}) {
    const modal = document.getElementById('productModal');
    const modalProductName = document.getElementById('modalProductName');
    const modalProductPrice = document.getElementById('modalProductPrice');
    const modalProductImage = document.getElementById('modalProductImage');
    const colorOptions = document.getElementById('colorOptions');

    currentProductImages = colorImages;
    modalProductName.textContent = productName;
    modalProductPrice.textContent = productPrice;
    setModalImage(modalProductImage, defaultBackground);
    colorOptions.innerHTML = '';

    // สร้างตัวเลือกสีใหม่
    colors.forEach((color, index) => {
        const colorDiv = document.createElement('div');
        colorDiv.className = 'color-option';

        // เก็บข้อมูลสีไว้ใน data attribute
        colorDiv.setAttribute('data-color', JSON.stringify(color));

        // ✅ รองรับหลายสี
        if (Array.isArray(color)) {
            // ถ้าเป็น array ของสีหลายสี
            if (color.length === 2) {
                colorDiv.classList.add('split-2');
                colorDiv.style.setProperty('--color1', color[0]);
                colorDiv.style.setProperty('--color2', color[1]);
            } else if (color.length === 3) {
                colorDiv.classList.add('split-3');
                colorDiv.style.setProperty('--color1', color[0]);
                colorDiv.style.setProperty('--color2', color[1]);
                colorDiv.style.setProperty('--color3', color[2]);
            } else if (color.length >= 4) {
                colorDiv.classList.add('split-4');
                colorDiv.style.setProperty('--color1', color[0]);
                colorDiv.style.setProperty('--color2', color[1]);
                colorDiv.style.setProperty('--color3', color[2]);
                colorDiv.style.setProperty('--color4', color[3]);
            }
        } else {
            // ถ้าเป็นสีเดียว
            colorDiv.style.backgroundColor = color;
        }

        colorDiv.onclick = function() {
            selectColor(this);
        };

        if (index === 0) {
            colorDiv.classList.add('selected');
            selectedColor = color;
            updateSelectedColorName(color);
        }

        colorOptions.appendChild(colorDiv);
    });

    modal.style.display = 'block';
}

function closeProductModal() {
    const modal = document.getElementById('productModal');
    modal.style.display = 'none';
    currentProductImages = {};
}

function selectColor(clickedOption) {
    // ลบ selected จากทุกตัว
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.classList.remove('selected');
    });

    // เพิ่ม selected ให้ตัวที่คลิก
    clickedOption.classList.add('selected');

    // ดึงข้อมูลสีจาก data attribute
    const colorData = JSON.parse(clickedOption.getAttribute('data-color'));
    selectedColor = colorData;

    updateSelectedColorName(colorData);

    // เปลี่ยนรูปภาพถ้ามี
    const modalProductImage = document.getElementById('modalProductImage');
    const colorKey = Array.isArray(colorData) ? colorData[0] : colorData;

    if (currentProductImages[colorKey]) {
        setModalImage(modalProductImage, currentProductImages[colorKey]);
    }
}

function setModalImage(element, imageOrBackground) {
    if (imageOrBackground.includes('.jpg') || imageOrBackground.includes('.png') ||
        imageOrBackground.includes('.jpeg') || imageOrBackground.includes('.webp')) {
        element.style.background = '';
        element.style.backgroundImage = `url('${imageOrBackground}')`;
        element.style.backgroundSize = 'cover';
        element.style.backgroundPosition = 'center';
    } else {
        element.style.backgroundImage = '';
        element.style.background = imageOrBackground;
    }
}

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
        '#876061': 'นํ้าตาลอ่อน',
    };

    // ถ้าเป็น array ของสีหลายสี ให้แสดงสีแรก
    const displayColor = Array.isArray(color) ? color[0] : color;
    selectedColorName.textContent = colorNames[displayColor.toLowerCase()] || 'สีที่เลือก';
}

function rgbToHex(rgb) {
    if (rgb.startsWith('#')) return rgb;
    const result = rgb.match(/\d+/g);
    if (!result) return rgb;
    const r = parseInt(result[0]);
    const g = parseInt(result[1]);
    const b = parseInt(result[2]);
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

window.onclick = function(event) {
    const modal = document.getElementById('productModal');
    if (event.target === modal) {
        closeProductModal();
    }
};

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeProductModal();
    }
});