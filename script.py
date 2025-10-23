
# เธชเธฃเนเธฒเธเนเธเธฅเน CSS เนเธซเธกเนเธ—เธตเนเธญเธญเธเนเธเธ Modal เนเธซเนเธชเธงเธขเธเธถเนเธ
css_new_design = """/* Reset เนเธฅเธฐ Base Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Prompt', sans-serif;
    color: #333;
    background-color: #f5f5f5;
    line-height: 1.6;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

a {
    text-decoration: none;
    color: inherit;
}

/* Header Styles */
.header {
    background-color: #fff;
    padding: 20px 0;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    position: sticky;
    top: 0;
    z-index: 100;
}

.header .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 30px;
}

.logo h1 {
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 5px;
}

.tagline {
    font-size: 12px;
    color: #666;
    font-weight: 300;
}

.nav ul {
    display: flex;
    gap: 30px;
    list-style: none;
}

.nav a {
    font-size: 16px;
    font-weight: 400;
    transition: color 0.3s;
}

.nav a:hover {
    color: #4a90ff;
}

.header-actions {
    display: flex;
    gap: 15px;
    align-items: center;
}

.search-box {
    display: flex;
    border: 1px solid #ddd;
    border-radius: 4px;
    overflow: hidden;
}

.search-box input {
    padding: 8px 12px;
    border: none;
    outline: none;
    width: 200px;
    font-family: 'Prompt', sans-serif;
}

.search-box button {
    padding: 8px 15px;
    border: none;
    background-color: #fff;
    cursor: pointer;
    transition: background-color 0.3s;
}

.search-box button:hover {
    background-color: #f5f5f5;
}

.btn-login, .btn-cart {
    padding: 8px 20px;
    border: 1px solid #333;
    background-color: #fff;
    cursor: pointer;
    border-radius: 4px;
    font-family: 'Prompt', sans-serif;
    font-weight: 400;
    transition: all 0.3s;
}

.btn-login:hover, .btn-cart:hover {
    background-color: #333;
    color: #fff;
}

/* Hero Section */
.hero {
    background-color: #e8e8e8;
    padding: 80px 0;
    text-align: center;
}

.hero h2 {
    font-size: 36px;
    font-weight: 600;
    margin-bottom: 30px;
}

.hero-text {
    max-width: 800px;
    margin: 0 auto;
    font-size: 16px;
    line-height: 1.8;
    color: #555;
}

/* Products Section */
.products {
    padding: 80px 0;
    background-color: #fff;
}

.section-title {
    text-align: center;
    font-size: 32px;
    font-weight: 600;
    margin-bottom: 50px;
}

.product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 30px;
}

.product-card {
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    transition: transform 0.3s, box-shadow 0.3s;
    position: relative;
    cursor: pointer;
}

.product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 20px rgba(0,0,0,0.15);
}

.product-badge {
    position: absolute;
    top: 15px;
    left: 15px;
    background-color: #000;
    color: #fff;
    padding: 5px 15px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    z-index: 10;
}

/* ๐–ผ๏ธ Product Image - เธเธเธฒเธ” 800x800px */
.product-image {
    height: 300px;
    position: relative;
    overflow: hidden;
}

.product-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.pattern-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image:
        radial-gradient(circle at 20% 30%, rgba(255,255,255,0.3) 5%, transparent 5%),
        radial-gradient(circle at 60% 70%, rgba(255,255,255,0.2) 8%, transparent 8%),
        radial-gradient(circle at 80% 20%, rgba(255,255,255,0.25) 6%, transparent 6%);
}

.product-name {
    padding: 15px 20px 5px;
    font-size: 16px;
    font-weight: 400;
}

.product-price {
    padding: 0 20px 20px;
    font-size: 18px;
    font-weight: 600;
}

/* ========================================
   Modal Styles - เธญเธญเธเนเธเธเนเธซเธกเนเนเธซเนเธชเธงเธขเธเธถเนเธ
   ======================================== */
.modal {
    display: none;
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    background-color: rgba(0,0,0,0.4);
    animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
    from { 
        opacity: 0;
        backdrop-filter: blur(0px);
    }
    to { 
        opacity: 1;
        backdrop-filter: blur(12px);
    }
}

.modal-content {
    background-color: #fff;
    margin: 2% auto;
    width: 92%;
    max-width: 1100px;
    border-radius: 16px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    animation: slideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    overflow: hidden;
}

@keyframes slideIn {
    from {
        transform: translateY(-30px) scale(0.95);
        opacity: 0;
    }
    to {
        transform: translateY(0) scale(1);
        opacity: 1;
    }
}

.close {
    position: absolute;
    right: 20px;
    top: 20px;
    color: #666;
    font-size: 32px;
    font-weight: 300;
    cursor: pointer;
    transition: all 0.3s;
    z-index: 10;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: rgba(255,255,255,0.9);
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.close:hover {
    color: #000;
    transform: rotate(90deg);
    background-color: #f5f5f5;
}

.modal-body {
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: 0;
    padding: 0;
}

.modal-image-section {
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    padding: 60px 40px;
}

/* ๐–ผ๏ธ Modal Product Image - เธเธเธฒเธ” 1000x1000px */
.modal-product-image {
    width: 100%;
    max-width: 500px;
    height: 500px;
    border-radius: 12px;
    position: relative;
    overflow: hidden;
    box-shadow: 0 10px 40px rgba(0,0,0,0.15);
    transition: transform 0.3s;
}

.modal-product-image:hover {
    transform: scale(1.02);
}

.modal-product-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.modal-info-section {
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 60px 50px 50px;
    background-color: #fff;
}

.modal-product-name {
    font-size: 32px;
    font-weight: 700;
    color: #1a1a1a;
    margin-top: 0;
    letter-spacing: -0.5px;
    line-height: 1.2;
}

.modal-product-price {
    font-size: 28px;
    font-weight: 700;
    color: #000;
}

.modal-badge {
    display: inline-block;
    font-size: 12px;
    color: #666;
    font-style: italic;
    font-weight: 400;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    padding: 4px 0;
}

.color-selection {
    margin-top: 10px;
    padding: 20px 0;
    border-top: 1px solid #e5e5e5;
}

.selection-label {
    font-size: 13px;
    font-weight: 700;
    margin-bottom: 16px;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #1a1a1a;
}

#selectedColorName {
    font-weight: 400;
    color: #666;
}

.color-options {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
}

.color-option {
    width: 50px;
    height: 50px;
    border-radius: 8px;
    cursor: pointer;
    border: 3px solid transparent;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    position: relative;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.color-option:hover {
    transform: translateY(-4px) scale(1.05);
    box-shadow: 0 6px 16px rgba(0,0,0,0.2);
}

.color-option.selected {
    border: 3px solid #000;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    transform: scale(1.1);
}

.color-option.selected::after {
    content: 'โ“';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    font-size: 20px;
    font-weight: bold;
    text-shadow: 0 1px 3px rgba(0,0,0,0.3);
}

.btn-add-to-bag {
    width: 100%;
    padding: 18px;
    background-color: #000;
    color: #fff;
    border: none;
    border-radius: 8px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    font-family: 'Prompt', sans-serif;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: all 0.3s;
    margin-top: 20px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

.btn-add-to-bag:hover {
    background-color: #333;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0,0,0,0.3);
}

.btn-add-to-bag:active {
    transform: translateY(0);
}

/* Footer */
.footer {
    background-color: #1a1a1a;
    color: #fff;
    padding: 60px 0 20px;
}

.footer-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 40px;
    margin-bottom: 40px;
}

.footer-col h4 {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 15px;
}

.footer-col p {
    margin-bottom: 10px;
    font-size: 14px;
}

.footer-col a {
    color: #aaa;
    transition: color 0.3s;
}

.footer-col a:hover {
    color: #fff;
}

.newsletter {
    margin-bottom: 40px;
    text-align: center;
}

.newsletter-title {
    font-size: 18px;
    margin-bottom: 20px;
}

.newsletter-form {
    display: flex;
    justify-content: center;
    gap: 10px;
    max-width: 500px;
    margin: 0 auto;
}

.newsletter-form input {
    flex: 1;
    padding: 12px 20px;
    border: 1px solid #444;
    background-color: #2a2a2a;
    color: #fff;
    border-radius: 4px;
    font-family: 'Prompt', sans-serif;
    outline: none;
}

.btn-subscribe {
    padding: 12px 30px;
    background-color: #87ceeb;
    color: #000;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-family: 'Prompt', sans-serif;
    font-weight: 600;
    transition: background-color 0.3s;
}

.btn-subscribe:hover {
    background-color: #6fb8d8;
}

.footer-bottom {
    text-align: center;
    padding-top: 20px;
    border-top: 1px solid #333;
    font-size: 13px;
    color: #aaa;
}

.footer-bottom a {
    color: #87ceeb;
}

/* Responsive Design */
@media (max-width: 768px) {
    .header .container {
        flex-direction: column;
        gap: 15px;
    }

    .nav ul {
        gap: 15px;
    }

    .header-actions {
        flex-direction: column;
        width: 100%;
    }

    .search-box input {
        width: 100%;
    }

    .product-grid {
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 20px;
    }

    .hero h2 {
        font-size: 28px;
    }

    .hero-text {
        font-size: 14px;
    }

    .modal-body {
        grid-template-columns: 1fr;
        gap: 0;
    }

    .modal-image-section {
        padding: 40px 20px;
    }

    .modal-product-image {
        height: 400px;
    }

    .modal-info-section {
        padding: 30px 25px;
    }

    .modal-content {
        width: 95%;
        margin: 5% auto;
    }

    .close {
        right: 15px;
        top: 15px;
    }
    
}"""

with open('style.css', 'w', encoding='utf-8') as f:
    f.write(css_new_design)

print("โ… เธชเธฃเนเธฒเธเนเธเธฅเน style.css (เธ”เธตเนเธเธเนเนเธซเธกเนเธชเธงเธขเธเธถเนเธ)")