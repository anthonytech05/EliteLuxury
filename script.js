// ═══════════════════════════════════════════
//  NAVBAR — Scroll effect
// ═══════════════════════════════════════════
const navbar = document.querySelector('nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.style.background = 'rgba(10,10,10,0.98)';
    navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.5)';
  } else {
    navbar.style.background = 'rgba(10,10,10,0.95)';
    navbar.style.boxShadow = 'none';
  }
});


// ═══════════════════════════════════════════
//  HAMBURGER MENU
// ═══════════════════════════════════════════

// Inject hamburger button and mobile menu into the DOM
const hamburgerHTML = `
  <button class="hamburger" id="hamburger" aria-label="Open menu">
    <span></span>
    <span></span>
    <span></span>
  </button>

  <div class="mobile-menu" id="mobileMenu">
    <button class="mobile-close" id="mobileClose" aria-label="Close menu">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <line x1="18" y1="6" x2="6" y2="18"/>
        <line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    </button>
    <nav class="mobile-nav">
      <a href="#collections" class="mobile-link">Collections</a>
      <a href="#products"    class="mobile-link">Products</a>
      <a href="#inspiration" class="mobile-link">Inspiration</a>
      <a href="#about"       class="mobile-link">About</a>
      <a href="#contact"     class="mobile-link">Contact</a>
    </nav>
    <a href="https://wa.me/2348027626795" target="_blank" class="mobile-whatsapp">
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
      Chat on WhatsApp
    </a>
  </div>
`;

// Inject hamburger styles
const hamburgerStyles = `
  <style>
    .hamburger {
      display: none;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 5px;
      width: 40px;
      height: 40px;
      background: transparent;
      border: 1px solid rgba(201,168,76,0.35);
      border-radius: 50%;
      cursor: pointer;
      transition: border-color 0.3s ease;
      flex-shrink: 0;
    }
    .hamburger:hover {
      border-color: #c9a84c;
    }
    .hamburger span {
      display: block;
      width: 16px;
      height: 1px;
      background: #c9a84c;
      transition: all 0.35s ease;
      transform-origin: center;
    }
    .hamburger.open span:nth-child(1) {
      transform: translateY(6px) rotate(45deg);
    }
    .hamburger.open span:nth-child(2) {
      opacity: 0;
      transform: scaleX(0);
    }
    .hamburger.open span:nth-child(3) {
      transform: translateY(-6px) rotate(-45deg);
    }

    .mobile-menu {
      position: fixed;
      inset: 0;
      background: #0a0a0a;
      z-index: 9998;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0;
      opacity: 0;
      pointer-events: none;
      transform: translateX(100%);
      transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.4,0,0.2,1);
    }
    .mobile-menu.open {
      opacity: 1;
      pointer-events: all;
      transform: translateX(0);
    }
    .mobile-close {
      position: absolute;
      top: 24px;
      right: 24px;
      width: 44px;
      height: 44px;
      background: transparent;
      border: 1px solid rgba(201,168,76,0.3);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background 0.3s, border-color 0.3s;
    }
    .mobile-close:hover {
      background: rgba(201,168,76,0.1);
      border-color: #c9a84c;
    }
    .mobile-close svg {
      width: 16px;
      height: 16px;
      stroke: #c9a84c;
    }
    .mobile-nav {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }
    .mobile-link {
      font-family: 'Cormorant Garamond', serif;
      font-size: 36px;
      font-weight: 300;
      color: rgba(248,245,240,0.7);
      text-decoration: none;
      letter-spacing: 2px;
      padding: 10px 24px;
      transition: color 0.3s ease;
      position: relative;
    }
    .mobile-link::after {
      content: '';
      position: absolute;
      bottom: 6px;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 1px;
      background: #c9a84c;
      transition: width 0.3s ease;
    }
    .mobile-link:hover {
      color: #c9a84c;
    }
    .mobile-link:hover::after {
      width: 60%;
    }
    .mobile-whatsapp {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-top: 40px;
      font-family: 'Montserrat', sans-serif;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: #25D366;
      text-decoration: none;
      border: 1px solid rgba(37,211,102,0.3);
      padding: 14px 28px;
      transition: background 0.3s, border-color 0.3s;
    }
    .mobile-whatsapp:hover {
      background: rgba(37,211,102,0.08);
      border-color: #25D366;
    }
    .mobile-whatsapp svg {
      width: 18px;
      height: 18px;
      fill: #25D366;
    }

    @media (max-width: 768px) {
      .hamburger { display: flex; }
    }
  </style>
`;

document.head.insertAdjacentHTML('beforeend', hamburgerStyles);
document.body.insertAdjacentHTML('beforeend', hamburgerHTML);

// Hamburger open / close
const hamburger   = document.getElementById('hamburger');
const mobileMenu  = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');

function openMenu() {
  mobileMenu.classList.add('open');
  hamburger.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeMenu() {
  mobileMenu.classList.remove('open');
  hamburger.classList.remove('open');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', openMenu);
mobileClose.addEventListener('click', closeMenu);

// Close when a mobile link is clicked
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', closeMenu);
});


// ═══════════════════════════════════════════
//  CART STATE
// ═══════════════════════════════════════════
let cart = [];


// ═══════════════════════════════════════════
//  TOGGLE CART PANEL
// ═══════════════════════════════════════════
function toggleCart() {
  const panel   = document.getElementById('cartPanel');
  const overlay = document.getElementById('cartOverlay');
  const isOpen  = panel.classList.contains('open');

  panel.classList.toggle('open');
  overlay.classList.toggle('open');
  document.body.style.overflow = isOpen ? '' : 'hidden';
}


// ═══════════════════════════════════════════
//  ADD TO CART
// ═══════════════════════════════════════════
function addToCart(name, price, category, imgSrc) {
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ name, price, category, imgSrc, qty: 1 });
  }
  renderCart();
  updateCartCount();

  // Show cart after adding
  const panel   = document.getElementById('cartPanel');
  const overlay = document.getElementById('cartOverlay');
  if (!panel.classList.contains('open')) {
    panel.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  // Flash button feedback
  showAddedFeedback(name);
}


// ═══════════════════════════════════════════
//  BUTTON FEEDBACK — "Added!" flash
// ═══════════════════════════════════════════
function showAddedFeedback(productName) {
  document.querySelectorAll('.holder').forEach(holder => {
    const nameEl = holder.querySelector('.font');
    if (nameEl && nameEl.textContent.trim() === productName) {
      const btn = holder.querySelector('.btn2');
      const original = btn.textContent;
      btn.textContent = 'Added';
      btn.style.background    = '#c9a84c';
      btn.style.color         = '#0a0a0a';
      btn.style.borderColor   = '#c9a84c';
      setTimeout(() => {
        btn.textContent         = original;
        btn.style.background    = '';
        btn.style.color         = '';
        btn.style.borderColor   = '';
      }, 1500);
    }
  });
}


// ═══════════════════════════════════════════
//  CHANGE QUANTITY
// ═══════════════════════════════════════════
function changeQty(name, delta) {
  const item = cart.find(i => i.name === name);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(i => i.name !== name);
  }
  renderCart();
  updateCartCount();
}


// ═══════════════════════════════════════════
//  REMOVE ITEM
// ═══════════════════════════════════════════
function removeItem(name) {
  cart = cart.filter(i => i.name !== name);
  renderCart();
  updateCartCount();
}


// ═══════════════════════════════════════════
//  CLEAR CART
// ═══════════════════════════════════════════
function clearCart() {
  cart = [];
  renderCart();
  updateCartCount();
}


// ═══════════════════════════════════════════
//  UPDATE BADGE COUNT
// ═══════════════════════════════════════════
function updateCartCount() {
  const total = cart.reduce((sum, i) => sum + i.qty, 0);
  const badge = document.getElementById('cartCount');
  badge.textContent = total;
  badge.classList.toggle('visible', total > 0);
}


// ═══════════════════════════════════════════
//  FORMAT PRICE
// ═══════════════════════════════════════════
function formatPrice(raw) {
  const num = parseInt(raw.replace(/[^\d]/g, ''), 10);
  return '₦' + num.toLocaleString('en-NG');
}

function parsePrice(raw) {
  return parseInt(String(raw).replace(/[^\d]/g, ''), 10) || 0;
}


// ═══════════════════════════════════════════
//  BUILD WHATSAPP ORDER MESSAGE
// ═══════════════════════════════════════════
function buildWhatsAppMessage() {
  if (cart.length === 0) return '';

  let message = 'Hello EliteBath & Kitchen,%0A%0A';
  message += 'I would like to enquire about the following items:%0A%0A';

  cart.forEach((item, index) => {
    const lineTotal = parsePrice(item.price) * item.qty;
    message += `${index + 1}. ${item.name}%0A`;
    message += `   Category: ${item.category}%0A`;
    message += `   Price: ${formatPrice(item.price)}%0A`;
    message += `   Quantity: ${item.qty}%0A`;
    message += `   Subtotal: ₦${lineTotal.toLocaleString('en-NG')}%0A%0A`;
  });

  const grandTotal = cart.reduce((sum, i) => sum + parsePrice(i.price) * i.qty, 0);
  message += `─────────────────%0A`;
  message += `Total: ₦${grandTotal.toLocaleString('en-NG')}%0A%0A`;
  message += 'Please advise on availability, delivery, and installation options. Thank you.';

  return message;
}


// ═══════════════════════════════════════════
//  RENDER CART
// ═══════════════════════════════════════════
function renderCart() {
  const empty      = document.getElementById('cartEmpty');
  const list       = document.getElementById('cartItems');
  const footer     = document.getElementById('cartFooter');
  const totalEl    = document.getElementById('cartTotal');

  list.innerHTML = '';

  if (cart.length === 0) {
    empty.style.display  = 'flex';
    footer.style.display = 'none';
    return;
  }

  empty.style.display  = 'none';
  footer.style.display = 'flex';

  let grandTotal = 0;

  cart.forEach(item => {
    const itemTotal = parsePrice(item.price) * item.qty;
    grandTotal += itemTotal;

    // Escape single quotes in name for inline onclick
    const safeName = item.name.replace(/'/g, "\\'");

    const el = document.createElement('div');
    el.className = 'cart-item';
    el.innerHTML = `
      <img class="cart-item-img"
           src="${item.imgSrc || ''}"
           alt="${item.name}"
           onerror="this.style.background='#1a1a1a';this.src=''">
      <div class="cart-item-info">
        <span class="cart-item-category">${item.category}</span>
        <span class="cart-item-name">${item.name}</span>
        <span class="cart-item-price">${formatPrice(item.price)}</span>
      </div>
      <div class="cart-item-controls">
        <div class="cart-qty">
          <button onclick="changeQty('${safeName}', -1)">−</button>
          <span>${item.qty}</span>
          <button onclick="changeQty('${safeName}', 1)">+</button>
        </div>
        <button class="cart-remove" onclick="removeItem('${safeName}')">Remove</button>
      </div>
    `;
    list.appendChild(el);
  });

  totalEl.textContent = '₦' + grandTotal.toLocaleString('en-NG');

  // Update WhatsApp button in cart footer
  updateCartWhatsApp();
}


// ═══════════════════════════════════════════
//  WHATSAPP BUTTON INSIDE CART FOOTER
// ═══════════════════════════════════════════
function updateCartWhatsApp() {
  // Check if WhatsApp button already exists in footer
  let waBtn = document.getElementById('cartWhatsApp');
  const footer = document.getElementById('cartFooter');

  if (!waBtn) {
    waBtn = document.createElement('a');
    waBtn.id        = 'cartWhatsApp';
    waBtn.target    = '_blank';
    waBtn.className = 'cart-whatsapp-btn';
    waBtn.innerHTML = `
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
      Order via WhatsApp
    `;

    // Insert before the clear button
    const clearBtn = footer.querySelector('.cart-clear');
    footer.insertBefore(waBtn, clearBtn);

    // Style it
    const style = document.createElement('style');
    style.textContent = `
      .cart-whatsapp-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        width: 100%;
        padding: 14px;
        background: #25D366;
        color: #ffffff;
        font-family: 'Montserrat', sans-serif;
        font-size: 10px;
        font-weight: 600;
        letter-spacing: 2px;
        text-transform: uppercase;
        text-decoration: none;
        border: none;
        transition: background 0.3s ease;
      }
      .cart-whatsapp-btn:hover {
        background: #20c35a;
      }
      .cart-whatsapp-btn svg {
        width: 18px;
        height: 18px;
        fill: #ffffff;
        flex-shrink: 0;
      }
    `;
    document.head.appendChild(style);
  }

  // Always update the href with fresh cart contents
  const msg = buildWhatsAppMessage();
  waBtn.href = `https://wa.me/2348027626795?text=${msg}`;
}


// ═══════════════════════════════════════════
//  WIRE UP "ADD TO CART" BUTTONS
// ═══════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {

  document.querySelectorAll('.btn2').forEach(btn => {
    btn.addEventListener('click', () => {
      const holder   = btn.closest('.holder');
      const name     = holder.querySelector('.font')?.textContent?.trim()                    || 'Product';
      const category = holder.querySelector('.name')?.textContent?.trim()                    || '';
      const priceEl  = holder.querySelector('.price');
      const rawPrice = priceEl?.childNodes[0]?.textContent?.trim()                           || '₦0';
      const imgSrc   = holder.querySelector('img')?.getAttribute('src')                      || '';

      addToCart(name, rawPrice, category, imgSrc);
    });
  });


// ═══════════════════════════════════════════
//  CONTACT FORM — Send via EmailJS
//  (free service, no backend needed)
// ═══════════════════════════════════════════

/*
  HOW TO SET UP (free, takes 5 minutes):
  1. Go to https://www.emailjs.com and create a free account
  2. Add an Email Service (Gmail recommended) — click "Add New Service"
  3. Create an Email Template with these variables:
       {{from_name}}
       {{from_email}}
       {{phone}}
       {{interest}}
       {{message}}
       {{cart_items}}
       {{cart_total}}
  4. Copy your:
       - Public Key  (Account > General)
       - Service ID  (Email Services)
       - Template ID (Email Templates)
  5. Replace the three placeholder values below
*/

    const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';
    const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';
    const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';

  // Load EmailJS SDK
  const emailScript = document.createElement('script');
  emailScript.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
  emailScript.onload = () => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  };
  document.head.appendChild(emailScript);


  // Form submit handler
  const submitBtn = document.querySelector('.submit-btn');
  if (submitBtn) {
    submitBtn.addEventListener('click', handleFormSubmit);
  }


  function handleFormSubmit(e) {
    e.preventDefault();

    // Gather form values
    const form      = document.querySelector('.contact-form');
    const firstName = form.querySelector('input[placeholder="First Name"]')?.value.trim()   || '';
    const lastName  = form.querySelector('input[placeholder="Last Name"]')?.value.trim()    || '';
    const email     = form.querySelector('input[type="email"]')?.value.trim()               || '';
    const phone     = form.querySelector('input[type="tel"]')?.value.trim()                 || '';
    const interest  = form.querySelector('select')?.value                                   || '';
    const message   = form.querySelector('textarea')?.value.trim()                          || '';

    // Basic validation
    if (!firstName || !email || !message) {
      showFormFeedback('Please fill in your name, email and message.', 'error');
      return;
    }
    if (!isValidEmail(email)) {
      showFormFeedback('Please enter a valid email address.', 'error');
      return;
    }

    // Build cart summary for email
    let cartSummary = 'No items in cart.';
    let cartTotal   = '₦0';
    if (cart.length > 0) {
      cartSummary = cart.map(item =>
        `${item.name} (${item.category}) x${item.qty} — ${formatPrice(item.price)}`
      ).join('\n');
      const total = cart.reduce((sum, i) => sum + parsePrice(i.price) * i.qty, 0);
      cartTotal   = '₦' + total.toLocaleString('en-NG');
    }

    // Show loading state
    const btn = document.querySelector('.submit-btn');
    const originalText = btn.textContent;
    btn.textContent       = 'Sending...';
    btn.style.opacity     = '0.7';
    btn.style.cursor      = 'not-allowed';

    // Send via EmailJS
    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      from_name:  `${firstName} ${lastName}`,
      from_email: email,
      phone:      phone    || 'Not provided',
      interest:   interest || 'Not specified',
      message:    message,
      cart_items: cartSummary,
      cart_total: cartTotal,
    })
    .then(() => {
      showFormFeedback('Thank you! We will contact you within 24 hours.', 'success');
      resetForm(form);
      btn.textContent   = originalText;
      btn.style.opacity = '1';
      btn.style.cursor  = 'pointer';

      // Also open WhatsApp if they had items in cart
      if (cart.length > 0) {
        const msg = buildWhatsAppMessage();
        setTimeout(() => {
          window.open(`https://wa.me/2348027626795?text=${msg}`, '_blank');
        }, 800);
      }
    })
    .catch(err => {
      console.error('EmailJS error:', err);
      // Fallback: open WhatsApp with form details
      const fallbackMsg = buildFallbackMessage(firstName, lastName, email, phone, interest, message);
      window.open(`https://wa.me/2348027626795?text=${fallbackMsg}`, '_blank');
      showFormFeedback('Email failed. We opened WhatsApp instead — please send the message.', 'error');
      btn.textContent   = originalText;
      btn.style.opacity = '1';
      btn.style.cursor  = 'pointer';
    });
  }


  // ── Build fallback WhatsApp message from form ──
  function buildFallbackMessage(fn, ln, email, phone, interest, message) {
    let msg = `Hello EliteBath %26 Kitchen,%0A%0A`;
    msg += `New Enquiry from Website:%0A%0A`;
    msg += `Name: ${fn} ${ln}%0A`;
    msg += `Email: ${email}%0A`;
    msg += `Phone: ${phone || 'Not provided'}%0A`;
    msg += `Interest: ${interest || 'Not specified'}%0A%0A`;
    msg += `Message:%0A${encodeURIComponent(message)}%0A%0A`;

    if (cart.length > 0) {
      msg += `Cart Items:%0A`;
      cart.forEach(item => {
        msg += `- ${item.name} x${item.qty} (${formatPrice(item.price)})%0A`;
      });
      const total = cart.reduce((sum, i) => sum + parsePrice(i.price) * i.qty, 0);
      msg += `Total: ₦${total.toLocaleString('en-NG')}`;
    }
    return msg;
  }


  // ── Show success / error feedback below form ──
  function showFormFeedback(msg, type) {
    let feedback = document.getElementById('formFeedback');
    if (!feedback) {
      feedback = document.createElement('div');
      feedback.id = 'formFeedback';
      document.querySelector('.contact-form').appendChild(feedback);

      const style = document.createElement('style');
      style.textContent = `
        #formFeedback {
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 1px;
          padding: 14px 20px;
          text-align: center;
          border: 1px solid;
          margin-top: 4px;
          transition: opacity 0.3s ease;
        }
        #formFeedback.success {
          color: #4caf8a;
          border-color: rgba(76,175,138,0.3);
          background: rgba(76,175,138,0.06);
        }
        #formFeedback.error {
          color: #e07070;
          border-color: rgba(224,112,112,0.3);
          background: rgba(224,112,112,0.06);
        }
      `;
      document.head.appendChild(style);
    }
    feedback.textContent = msg;
    feedback.className   = type;
    feedback.style.opacity = '1';

    setTimeout(() => {
      feedback.style.opacity = '0';
    }, 5000);
  }


  // ── Reset form fields ──
  function resetForm(form) {
    form.querySelectorAll('input').forEach(i  => i.value = '');
    form.querySelectorAll('textarea').forEach(t => t.value = '');
    const sel = form.querySelector('select');
    if (sel) sel.selectedIndex = 0;
  }


  // ── Email validation ──
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

});


// ═══════════════════════════════════════════
//  SMOOTH SCROLL for anchor links
// ═══════════════════════════════════════════
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const navHeight = document.querySelector('nav').offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});