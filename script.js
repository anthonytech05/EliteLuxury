// ═══════════════════════════════════════════
//  HAMBURGER — global so HTML onclick works
// ═══════════════════════════════════════════
function toggleMenu() {
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

}


// ═══════════════════════════════════════════
//  NAVBAR — Scroll effect
// ═══════════════════════════════════════════
const navbar = document.querySelector('nav');

window.addEventListener('scroll', function() {
  if (window.scrollY > 60) {
    navbar.style.background = 'rgba(10,10,10,0.98)';
    navbar.style.boxShadow  = '0 2px 20px rgba(0,0,0,0.5)';
  } else {
    navbar.style.background = 'rgba(10,10,10,0.95)';
    navbar.style.boxShadow  = 'none';
  }
});


// ═══════════════════════════════════════════
//  CART STATE
// ═══════════════════════════════════════════
var cart = [];


// ═══════════════════════════════════════════
//  TOGGLE CART PANEL
// ═══════════════════════════════════════════
function toggleCart() {
  var panel   = document.getElementById('cartPanel');
  var overlay = document.getElementById('cartOverlay');
  var isOpen  = panel.classList.contains('open');

  panel.classList.toggle('open');
  overlay.classList.toggle('open');
  document.body.style.overflow = isOpen ? '' : 'hidden';
}


// ═══════════════════════════════════════════
//  ADD TO CART
// ═══════════════════════════════════════════
function addToCart(name, price, category, imgSrc) {
  var existing = cart.find(function(item) { return item.name === name; });
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ name: name, price: price, category: category, imgSrc: imgSrc, qty: 1 });
  }

  renderCart();
  updateCartCount();
  showAddedFeedback(name);

  var panel   = document.getElementById('cartPanel');
  var overlay = document.getElementById('cartOverlay');
  if (!panel.classList.contains('open')) {
    panel.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}


// ═══════════════════════════════════════════
//  BUTTON FEEDBACK
// ═══════════════════════════════════════════
function showAddedFeedback(productName) {
  document.querySelectorAll('.holder').forEach(function(holder) {
    var nameEl = holder.querySelector('.font');
    if (nameEl && nameEl.textContent.trim() === productName) {
      var btn      = holder.querySelector('.btn2');
      var original = btn.textContent;
      btn.textContent       = 'Added';
      btn.style.background  = '#c9a84c';
      btn.style.color       = '#0a0a0a';
      btn.style.borderColor = '#c9a84c';
      setTimeout(function() {
        btn.textContent       = original;
        btn.style.background  = '';
        btn.style.color       = '';
        btn.style.borderColor = '';
      }, 1500);
    }
  });
}


// ═══════════════════════════════════════════
//  CHANGE QUANTITY
// ═══════════════════════════════════════════
function changeQty(name, delta) {
  var item = cart.find(function(i) { return i.name === name; });
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(function(i) { return i.name !== name; });
  }
  renderCart();
  updateCartCount();
}


// ═══════════════════════════════════════════
//  REMOVE ITEM
// ═══════════════════════════════════════════
function removeItem(name) {
  cart = cart.filter(function(i) { return i.name !== name; });
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
//  UPDATE BADGE
// ═══════════════════════════════════════════
function updateCartCount() {
  var total = cart.reduce(function(sum, i) { return sum + i.qty; }, 0);
  var badge = document.getElementById('cartCount');
  badge.textContent = total;
  if (total > 0) {
    badge.classList.add('visible');
  } else {
    badge.classList.remove('visible');
  }
}


// ═══════════════════════════════════════════
//  PRICE HELPERS
// ═══════════════════════════════════════════
function formatPrice(raw) {
  var num = parseInt(String(raw).replace(/[^\d]/g, ''), 10);
  return '₦' + num.toLocaleString('en-NG');
}

function parsePrice(raw) {
  return parseInt(String(raw).replace(/[^\d]/g, ''), 10) || 0;
}


// ═══════════════════════════════════════════
//  BUILD WHATSAPP MESSAGE
// ═══════════════════════════════════════════
function buildWhatsAppMessage() {
  if (cart.length === 0) return '';

  var msg = 'Hello EliteBath %26 Kitchen,%0A%0A';
  msg    += 'I would like to enquire about the following items:%0A%0A';

  cart.forEach(function(item, i) {
    var lineTotal = parsePrice(item.price) * item.qty;
    msg += (i + 1) + '. ' + item.name + '%0A';
    msg += '   Category: ' + item.category + '%0A';
    msg += '   Price: ' + formatPrice(item.price) + '%0A';
    msg += '   Quantity: ' + item.qty + '%0A';
    msg += '   Subtotal: \u20A6' + lineTotal.toLocaleString('en-NG') + '%0A%0A';
  });

  var grand = cart.reduce(function(s, i) { return s + parsePrice(i.price) * i.qty; }, 0);
  msg += 'Total: \u20A6' + grand.toLocaleString('en-NG') + '%0A%0A';
  msg += 'Please advise on availability, delivery and installation. Thank you.';
  return msg;
}


// ═══════════════════════════════════════════
//  RENDER CART
// ═══════════════════════════════════════════
function renderCart() {
  var empty   = document.getElementById('cartEmpty');
  var list    = document.getElementById('cartItems');
  var footer  = document.getElementById('cartFooter');
  var totalEl = document.getElementById('cartTotal');

  list.innerHTML = '';

  if (cart.length === 0) {
    empty.style.display  = 'flex';
    footer.style.display = 'none';
    return;
  }

  empty.style.display  = 'none';
  footer.style.display = 'flex';

  var grand = 0;

  cart.forEach(function(item) {
    grand += parsePrice(item.price) * item.qty;
    var safe = item.name.replace(/'/g, "\\'");

    var el = document.createElement('div');
    el.className = 'cart-item';
    el.innerHTML =
      '<img class="cart-item-img" src="' + item.imgSrc + '" alt="' + item.name + '" onerror="this.style.background=\'#1a1a1a\';this.removeAttribute(\'src\')">' +
      '<div class="cart-item-info">' +
        '<span class="cart-item-category">' + item.category + '</span>' +
        '<span class="cart-item-name">' + item.name + '</span>' +
        '<span class="cart-item-price">' + formatPrice(item.price) + '</span>' +
      '</div>' +
      '<div class="cart-item-controls">' +
        '<div class="cart-qty">' +
          '<button onclick="changeQty(\'' + safe + '\', -1)">&#8722;</button>' +
          '<span>' + item.qty + '</span>' +
          '<button onclick="changeQty(\'' + safe + '\', 1)">+</button>' +
        '</div>' +
        '<button class="cart-remove" onclick="removeItem(\'' + safe + '\')">Remove</button>' +
      '</div>';
    list.appendChild(el);
  });

  totalEl.textContent = '₦' + grand.toLocaleString('en-NG');
  updateCartWhatsApp();
}


// ═══════════════════════════════════════════
//  WHATSAPP BUTTON IN CART FOOTER
// ═══════════════════════════════════════════
function updateCartWhatsApp() {
  var waBtn  = document.getElementById('cartWhatsApp');
  var footer = document.getElementById('cartFooter');

  if (!waBtn) {
    waBtn           = document.createElement('a');
    waBtn.id        = 'cartWhatsApp';
    waBtn.target    = '_blank';
    waBtn.className = 'cart-whatsapp-btn';
    waBtn.innerHTML =
      '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">' +
        '<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>' +
      '</svg>' +
      'Order via WhatsApp';

    var clearBtn = footer.querySelector('.cart-clear');
    footer.insertBefore(waBtn, clearBtn);

    var s = document.createElement('style');
    s.textContent =
      '.cart-whatsapp-btn {' +
        'display:flex;align-items:center;justify-content:center;' +
        'gap:10px;width:100%;padding:14px;' +
        'background:#25D366;color:#fff;' +
        'font-family:"Montserrat",sans-serif;' +
        'font-size:10px;font-weight:600;' +
        'letter-spacing:2px;text-transform:uppercase;' +
        'text-decoration:none;border:none;' +
        'transition:background 0.3s ease;' +
      '}' +
      '.cart-whatsapp-btn:hover{background:#20c35a;}' +
      '.cart-whatsapp-btn svg{width:18px;height:18px;fill:#fff;flex-shrink:0;}';
    document.head.appendChild(s);
  }

  waBtn.href = 'https://wa.me/2348027626795?text=' + buildWhatsAppMessage();
}


// ═══════════════════════════════════════════
//  DOM READY
// ═══════════════════════════════════════════
document.addEventListener('DOMContentLoaded', function() {

  // ── Close mobile menu when links clicked ──
  document.querySelectorAll('.mobile-link').forEach(function(link) {
    link.addEventListener('click', function() {
      var menu = document.getElementById('mobileMenu');
      if (menu && menu.classList.contains('open')) toggleMenu();
    });
  });

  // ── Add to cart buttons ──
  document.querySelectorAll('.btn2').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var holder   = btn.closest('.holder');
      var name     = (holder.querySelector('.font') || {}).textContent.trim()      || 'Product';
      var category = (holder.querySelector('.name') || {}).textContent.trim()      || '';
      var priceEl  = holder.querySelector('.price');
      var rawPrice = priceEl && priceEl.childNodes[0] ? priceEl.childNodes[0].textContent.trim() : '₦0';
      var imgSrc   = (holder.querySelector('img') || {}).getAttribute('src')       || '';
      addToCart(name, rawPrice, category, imgSrc);
    });
  });


  // ═══════════════════════════════════════════
  //  EMAILJS — sends form to richard980anthony@gmail.com
  //
  //  Setup (free, 5 mins):
  //  1. Go to https://www.emailjs.com — create account
  //  2. Add Gmail service — connect richard980anthony@gmail.com
  //  3. Create template with these variables:
  //       {{from_name}} {{from_email}} {{phone}}
  //       {{interest}}  {{message}}
  //       {{cart_items}} {{cart_total}}
  //     Set "To Email" to: richard980anthony@gmail.com
  //  4. Paste your 3 keys below
  // ═══════════════════════════════════════════

  var EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';
  var EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';
  var EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
  var OWNER_EMAIL         = 'richard980anthony@gmail.com';

  // Load EmailJS
  var sdk    = document.createElement('script');
  sdk.src    = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
  sdk.onload = function() { emailjs.init(EMAILJS_PUBLIC_KEY); };
  document.head.appendChild(sdk);

  // Remove inline onclick and attach proper listener
  var submitBtn = document.querySelector('.submit-btn');
  if (submitBtn) {
    submitBtn.removeAttribute('onclick');
    submitBtn.addEventListener('click', handleFormSubmit);
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    var form      = document.querySelector('.contact-form');
    var firstName = (form.querySelector('input[placeholder="First Name"]') || {}).value.trim()  || '';
    var lastName  = (form.querySelector('input[placeholder="Last Name"]')  || {}).value.trim()  || '';
    var email     = (form.querySelector('input[type="email"]')             || {}).value.trim()  || '';
    var phone     = (form.querySelector('input[type="tel"]')               || {}).value.trim()  || '';
    var interest  = (form.querySelector('select')                          || {}).value         || '';
    var message   = (form.querySelector('textarea')                        || {}).value.trim()  || '';

    if (!firstName) { showFormFeedback('Please enter your first name.', 'error'); return; }
    if (!email || !isValidEmail(email)) { showFormFeedback('Please enter a valid email address.', 'error'); return; }
    if (!message) { showFormFeedback('Please tell us about your project or enquiry.', 'error'); return; }

    var cartSummary = 'No items selected.';
    var cartTotal   = '₦0';
    if (cart.length > 0) {
      cartSummary = cart.map(function(i) {
        return i.name + ' (' + i.category + ') x' + i.qty + ' — ' + formatPrice(i.price);
      }).join('\n');
      var total = cart.reduce(function(s, i) { return s + parsePrice(i.price) * i.qty; }, 0);
      cartTotal = '₦' + total.toLocaleString('en-NG');
    }

    var btn          = document.querySelector('.submit-btn');
    var originalText = btn.textContent;
    btn.textContent  = 'Sending...';
    btn.style.opacity = '0.7';
    btn.disabled     = true;

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      to_email:   OWNER_EMAIL,
      from_name:  (firstName + ' ' + lastName).trim(),
      from_email: email,
      phone:      phone    || 'Not provided',
      interest:   interest || 'Not specified',
      message:    message,
      cart_items: cartSummary,
      cart_total: cartTotal
    })
    .then(function() {
      showFormFeedback('Your message has been sent! We will contact you within 24 hours.', 'success');
      resetForm(form);
      btn.textContent   = originalText;
      btn.style.opacity = '1';
      btn.disabled      = false;
      if (cart.length > 0) {
        setTimeout(function() {
          window.open('https://wa.me/2348027626795?text=' + buildWhatsAppMessage(), '_blank');
        }, 1000);
      }
    })
    .catch(function(err) {
      console.error('EmailJS error:', err);
      var fallback = buildFallbackMessage(firstName, lastName, email, phone, interest, message);
      window.open('https://wa.me/2348027626795?text=' + fallback, '_blank');
      showFormFeedback('Could not send email. WhatsApp has been opened — please send the message there.', 'error');
      btn.textContent   = originalText;
      btn.style.opacity = '1';
      btn.disabled      = false;
    });
  }

  function buildFallbackMessage(fn, ln, email, phone, interest, message) {
    var msg  = 'Hello EliteBath %26 Kitchen,%0A%0A';
    msg     += 'New Website Enquiry:%0A%0A';
    msg     += 'Name: ' + fn + ' ' + ln + '%0A';
    msg     += 'Email: ' + email + '%0A';
    msg     += 'Phone: ' + (phone || 'Not provided') + '%0A';
    msg     += 'Interest: ' + (interest || 'Not specified') + '%0A%0A';
    msg     += 'Message:%0A' + encodeURIComponent(message);
    if (cart.length > 0) {
      var total = cart.reduce(function(s, i) { return s + parsePrice(i.price) * i.qty; }, 0);
      msg += '%0A%0ACart Items:%0A';
      cart.forEach(function(i) {
        msg += '- ' + i.name + ' x' + i.qty + ' (' + formatPrice(i.price) + ')%0A';
      });
      msg += 'Total: \u20A6' + total.toLocaleString('en-NG');
    }
    return msg;
  }

  function showFormFeedback(text, type) {
    var fb = document.getElementById('formFeedback');
    if (!fb) {
      fb    = document.createElement('div');
      fb.id = 'formFeedback';
      document.querySelector('.contact-form').appendChild(fb);
      var s = document.createElement('style');
      s.textContent =
        '#formFeedback{font-family:"Montserrat",sans-serif;font-size:12px;font-weight:500;' +
        'letter-spacing:0.5px;line-height:1.6;padding:14px 20px;text-align:center;' +
        'border:1px solid;margin-top:4px;transition:opacity 0.4s ease;}' +
        '#formFeedback.success{color:#4caf8a;border-color:rgba(76,175,138,0.3);background:rgba(76,175,138,0.06);}' +
        '#formFeedback.error{color:#e07070;border-color:rgba(224,112,112,0.3);background:rgba(224,112,112,0.06);}';
      document.head.appendChild(s);
    }
    fb.textContent   = text;
    fb.className     = type;
    fb.style.opacity = '1';
    setTimeout(function() { fb.style.opacity = '0'; }, 6000);
  }

  function resetForm(form) {
    form.querySelectorAll('input').forEach(function(i) { i.value = ''; });
    form.querySelectorAll('textarea').forEach(function(t) { t.value = ''; });
    var sel = form.querySelector('select');
    if (sel) sel.selectedIndex = 0;
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

});


// ═══════════════════════════════════════════
//  SMOOTH SCROLL
// ═══════════════════════════════════════════
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
  anchor.addEventListener('click', function(e) {
    var target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      var offset = document.querySelector('nav').offsetHeight;
      var top    = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
    }
  });
});