// Shared model specification data — used by the configurator (car-detail.html),
// the "Add to Compare" buttons (models.html) and the dynamic compare table (compare.html).
const NOIR_MODELS = {
  porsche: { name: 'Porsche 911', type: 'SPORTS ICON', description: 'A precision-built sports car that turns every input into an immediate response.', stats: [['3.2s','0–100 km/h'],['443 HP','Power'],['293 km/h','Top speed']], images: ['Images/download_(1).jpg_2K_202607301024.jpeg','Images/download_(2).jpg_2K_202607301024.jpeg','Images/download_(3).jpg_2K_202607301024.jpeg','Images/download_(4).jpg_2K_202607301024.jpeg'], drivetrain: ['RWD','AWD'], fuel: ['Petrol'], colors: ['Obsidian','Silver','Arctic White'] },
  rolls: { name: 'Rolls Royce', type: 'GRAND LUXURY', description: 'Handcrafted serenity with effortless power, designed around the art of arriving.', stats: [['4.6s','0–100 km/h'],['563 HP','Power'],['250 km/h','Top speed']], images: ['Images/rr5.jpeg','Images/rr4.jpeg','Images/rr8.jpg','Images/rr7.jpeg'], drivetrain: ['RWD','AWD'], fuel: ['Petrol'], colors: ['Obsidian','Silver','Pearl White'] },
  ferrari: { name: 'LaFerrari', type: 'HYPER PERFORMANCE', description: 'Hybrid performance and sculptural aerodynamics distilled into one unforgettable Ferrari.', stats: [['2.6s','0–100 km/h'],['950 HP','Power'],['350 km/h','Top speed']], images: ['Images/LaFerrari.jpg_2K_202607301134.jpeg','Images/f1.jpeg','Images/f2.jpeg','Images/f3.jpeg'], drivetrain: ['RWD'], fuel: ['Hybrid'], colors: ['Rosso','Obsidian','Silver'] },
  bugatti: { name: 'Bugatti Tourbillon', type: 'HYPERCAR', description: 'Mechanical artistry, extraordinary speed and a new interpretation of automotive luxury.', stats: [['2.0s','0–100 km/h'],['1800 HP','Power'],['380 km/h','Top speed']], images: ['Images/Bugatti_Tourbillion.jpg_2K_202607301154.jpeg','Images/b1.jpeg','Images/b2.jpeg','Images/b3.jpeg'], drivetrain: ['AWD'], fuel: ['Hybrid'], colors: ['Obsidian','Blue','Silver'] },
  aston: { name: 'Aston Martin', type: 'GRAND TOURER', description: 'British grand touring with sculpted proportions, composed dynamics and effortless authority.', stats: [['3.6s','0–100 km/h'],['671 HP','Power'],['310 km/h','Top speed']], images: ['Images/am1.jpeg','Images/am2.jpeg','Images/am3.jpeg','Images/am4.jpeg'], drivetrain: ['RWD','AWD'], fuel: ['Petrol'], colors: ['Obsidian','British Green','Silver'] },
  bentley: { name: 'Bentley', type: 'ULTRA LUXURY', description: 'Immense craftsmanship, quiet power and a cabin designed around long-distance comfort.', stats: [['3.5s','0–100 km/h'],['650 HP','Power'],['335 km/h','Top speed']], images: ['Images/be1.jpeg','Images/be2.jpeg','Images/be3.jpeg','Images/be4.jpeg'], drivetrain: ['AWD'], fuel: ['Petrol','Hybrid'], colors: ['Obsidian','Ivory','Silver'] },
  lamborghini: { name: 'Lamborghini', type: 'V12 PERFORMANCE', description: 'Low, dramatic and unapologetically theatrical, with a naturally aspirated character that demands attention.', stats: [['2.9s','0–100 km/h'],['759 HP','Power'],['355 km/h','Top speed']], images: ['Images/l1.jpeg','Images/l2.jpeg','Images/l3.jpeg','Images/l4.jpeg'], drivetrain: ['AWD'], fuel: ['Petrol'], colors: ['Nero','Verde','Silver'] },
  jaguar: { name: 'Jaguar', type: 'BRITISH PERFORMANCE', description: 'Elegant proportions meet a sharper, more athletic character built for fast grand touring.', stats: [['3.7s','0–100 km/h'],['575 HP','Power'],['300 km/h','Top speed']], images: ['Images/j1.jpeg','Images/j2.jpeg','Images/j3.jpeg','Images/j4.jpeg'], drivetrain: ['RWD','AWD'], fuel: ['Petrol','Hybrid'], colors: ['Obsidian','Silver','British Green'] },
  mclaren: { name: 'McLaren', type: 'TRACK FOCUSED', description: 'Lightweight engineering and aerodynamic obsession translated into a road-legal performance machine.', stats: [['2.8s','0–100 km/h'],['750 HP','Power'],['332 km/h','Top speed']], images: ['Images/s1.jpeg','Images/s2.jpeg','Images/s3.jpeg','Images/s4.jpeg'], drivetrain: ['RWD'], fuel: ['Petrol','Hybrid'], colors: ['Papaya','Obsidian','Silver'] }
};

const NOIR_COMPARE_KEY = 'noirCompareList';
const NOIR_COMPARE_MAX = 4;

(function () {
  const loader = document.getElementById('site-loader');
  const loaderPercent = document.getElementById('loader-percent');
  const loaderDuration = 1500;

  if (loader) {
    // Show the cinematic intro only on the first page of a browsing session.
    const alreadyShown = sessionStorage.getItem('noirLoaderShown') === 'true';

    if (alreadyShown) {
      loader.classList.add('skip-loader');
      loader.setAttribute('aria-hidden', 'true');
    } else {
      sessionStorage.setItem('noirLoaderShown', 'true');

      const loaderStart = performance.now();
      let loaderFinished = false;

      const updateLoaderPercent = now => {
        const elapsed = now - loaderStart;
        const progress = Math.min(1, elapsed / loaderDuration);
        const eased = 1 - Math.pow(1 - progress, 2.2);
        if (loaderPercent) loaderPercent.textContent = `${Math.round(eased * 100)}%`;
        if (progress < 1 && !loaderFinished) requestAnimationFrame(updateLoaderPercent);
      };

      requestAnimationFrame(updateLoaderPercent);

      const finishLoader = () => {
        if (loaderFinished) return;
        const elapsed = performance.now() - loaderStart;
        const remaining = Math.max(0, loaderDuration - elapsed);
        window.setTimeout(() => {
          loaderFinished = true;
          if (loaderPercent) loaderPercent.textContent = '100%';
          loader.classList.add('loaded');
        }, remaining);
      };

      if (document.readyState === 'complete') {
        finishLoader();
      } else {
        window.addEventListener('load', finishLoader, { once: true });
      }
    }
  }

  const navbar = document.querySelector('.navbar');
  const updateNav = () => navbar && navbar.classList.toggle('scrolled', window.scrollY > 30);
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  // Compact menu instead of a long navbar.
  const menuBtn = document.querySelector('.menu-btn');
  const menuOverlay = document.getElementById('menu-overlay');
  const menuClose = document.querySelector('.menu-close');
  const setMenu = open => {
    menuOverlay?.classList.toggle('open', open);
    menuBtn?.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('menu-open', open);
  };
  menuBtn?.addEventListener('click', () => setMenu(true));
  menuClose?.addEventListener('click', () => setMenu(false));
  menuOverlay?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

  // Gallery/model cards use two stacked images: default + hover. No image click listeners.
  document.querySelectorAll('.hover-swap .hover-image').forEach(img => {
    if (img.dataset.preloaded) return;
    const preload = new Image();
    preload.src = img.src;
    img.dataset.preloaded = 'true';
  });

  // Home page cinematic frame animation remains only on the home page.
  const canvas = document.getElementById('hero-lightpass');
  if (canvas && window.gsap) {
    const context = canvas.getContext('2d');
    const frameCount = 217;
    const images = [];
    const animation = { frame: 1 };
    const currentFrame = index => `frames/ezgif-frame-${String(index).padStart(3, '0')}.jpg`;
    for (let i = 1; i <= frameCount; i++) {
      const img = new Image(); img.src = currentFrame(i); images.push(img);
    }
    function resizeCanvas() {
      canvas.width = window.innerWidth * devicePixelRatio;
      canvas.height = window.innerHeight * devicePixelRatio;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
      render();
    }
    function render() {
      let index = Math.max(0, Math.min(frameCount - 1, Math.round(animation.frame - 1)));
      while (index > 0 && !images[index].complete) index--;
      const image = images[index];
      if (!image?.complete || !image.naturalWidth) return;
      const w = window.innerWidth, h = window.innerHeight;
      const ratio = Math.max(w / image.naturalWidth, h / image.naturalHeight);
      const dw = image.naturalWidth * ratio, dh = image.naturalHeight * ratio;
      context.clearRect(0, 0, w, h);
      context.drawImage(image, (w - dw) / 2, (h - dh) / 2, dw, dh);
    }
    images[0].onload = resizeCanvas;
    window.addEventListener('resize', resizeCanvas);
    if (window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
      gsap.to(animation, { frame: frameCount, snap: 'frame', ease: 'none', scrollTrigger: { trigger: '.hero-home', start: 'top top', end: '+=2500', pin: true, scrub: 0.5 }, onUpdate: render });
    }
    gsap.from('.hero-content > *', { y: 45, opacity: 0, duration: 1, stagger: 0.12, ease: 'power3.out', delay: 0.35 });
  }

  document.querySelectorAll('.model-card, .tech-card, .gallery-item, .feature-card').forEach((el, i) => {
    if (!window.gsap) return;
    gsap.from(el, { y: 35, opacity: 0, duration: .7, delay: Math.min(i * .05, .3), ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
  });

  // Gallery lightbox: click a gallery card to open a centered viewer.
  const galleryModal = document.getElementById('gallery-modal');
  if (galleryModal) {
    const modalImage = document.getElementById('gallery-modal-image');
    const modalCount = document.getElementById('gallery-modal-count');
    const modalTitle = document.getElementById('gallery-modal-title');
    const cards = Array.from(document.querySelectorAll('.gallery-item[data-gallery]'));
    const galleryImages = cards.map(card => ({
      src: card.querySelector('.hover-image')?.src || card.querySelector('img')?.src,
      title: card.querySelector('img')?.alt || 'NOIR VISUAL ARCHIVE'
    })).filter(item => item.src);
    let galleryIndex = 0;
    const showGalleryImage = index => {
      galleryIndex = (index + galleryImages.length) % galleryImages.length;
      const item = galleryImages[galleryIndex];
      modalImage.classList.remove('visible');
      const next = new Image();
      next.onload = () => { modalImage.src = item.src; modalImage.alt = item.title; requestAnimationFrame(() => modalImage.classList.add('visible')); };
      next.src = item.src;
      modalCount.textContent = `${String(galleryIndex + 1).padStart(2,'0')} / ${String(galleryImages.length).padStart(2,'0')}`;
      modalTitle.textContent = item.title.replace(' alternate view','').replace(' gallery','').toUpperCase();
    };
    const closeGallery = () => { galleryModal.classList.remove('open'); galleryModal.setAttribute('aria-hidden','true'); document.body.classList.remove('gallery-open'); };
    cards.forEach(card => card.addEventListener('click', () => { showGalleryImage(Number(card.dataset.gallery)); galleryModal.classList.add('open'); galleryModal.setAttribute('aria-hidden','false'); document.body.classList.add('gallery-open'); }));
    document.querySelector('.gallery-prev')?.addEventListener('click', () => showGalleryImage(galleryIndex - 1));
    document.querySelector('.gallery-next')?.addEventListener('click', () => showGalleryImage(galleryIndex + 1));
    document.querySelector('.gallery-close')?.addEventListener('click', closeGallery);
    galleryModal.addEventListener('click', e => { if (e.target === galleryModal) closeGallery(); });
    document.addEventListener('keydown', e => { if (!galleryModal.classList.contains('open')) return; if (e.key === 'Escape') closeGallery(); if (e.key === 'ArrowLeft') showGalleryImage(galleryIndex - 1); if (e.key === 'ArrowRight') showGalleryImage(galleryIndex + 1); });
  }

  // Model detail configuration.
  const detailName = document.getElementById('detail-name');
  if (detailName) initConfigurator();

  // Compare feature: buttons on the Models page, dynamic table on Compare page.
  if (document.querySelector('.model-card[data-car]')) initCompareButtons();
  if (document.getElementById('compare-mount')) initComparePage();

  // Simple front-end auth demo. Real authentication requires a backend/database.
  // A successful login or account creation immediately starts a local session
  // and sends the user to the NOIR home page.
  const currentUser = JSON.parse(localStorage.getItem('noirCurrentUser') || 'null');
  const currentPageName = (location.pathname.split('/').pop() || 'index.html').toLowerCase();

  // Hide the Login button once the user has an active session.
  // The session is shared across pages through localStorage.
  if (currentUser) {
    document.querySelectorAll('.login-link').forEach(link => link.remove());
  }

  // If the user is already signed in, don't make them stare at the login page again.
  if (currentUser && (currentPageName === 'login.html' || currentPageName === 'signup.html')) {
    location.replace('index.html');
    return;
  }

  const loginForm = document.getElementById('login-form');
  loginForm?.addEventListener('submit', e => {
    e.preventDefault();

    const email = loginForm.querySelector('input[type=email]').value.trim().toLowerCase();
    const password = loginForm.querySelector('input[type=password]').value;
    const message = document.getElementById('login-message');
    const users = JSON.parse(localStorage.getItem('noirUsers') || '[]');
    const user = users.find(u => u.email.toLowerCase() === email && u.password === password);

    if (!user) {
      message.textContent = 'Invalid email or password.';
      message.className = 'auth-message error';
      return;
    }

    localStorage.setItem('noirCurrentUser', JSON.stringify({
      name: user.name,
      email: user.email
    }));

    message.textContent = 'Login successful. Redirecting...';
    message.className = 'auth-message success';

    // Give the success state a moment to appear, then go home.
    window.setTimeout(() => location.replace('index.html'), 250);
  });

  const signupForm = document.getElementById('signup-form');
  signupForm?.addEventListener('submit', e => {
    e.preventDefault();

    const inputs = signupForm.querySelectorAll('input');
    const name = inputs[0].value.trim();
    const email = inputs[1].value.trim().toLowerCase();
    const password = inputs[2].value;
    const users = JSON.parse(localStorage.getItem('noirUsers') || '[]');
    const message = document.getElementById('signup-message');

    if (users.some(u => u.email.toLowerCase() === email)) {
      message.textContent = 'An account with this email already exists.';
      message.className = 'auth-message error';
      return;
    }

    const user = { name, email, password };
    users.push(user);
    localStorage.setItem('noirUsers', JSON.stringify(users));

    // Creating an account also signs the user in. No pointless second login.
    localStorage.setItem('noirCurrentUser', JSON.stringify({
      name: user.name,
      email: user.email
    }));

    message.textContent = 'Account created. Welcome to NOIR...';
    message.className = 'auth-message success';

    window.setTimeout(() => location.replace('index.html'), 250);
  });

  const contactForm = document.getElementById('contact-form');
  contactForm?.addEventListener('submit', e => {
    e.preventDefault();
    const success = document.getElementById('form-success');
    if (success) success.classList.add('visible');
    contactForm.reset();
  });

  const date = document.getElementById('preferred-date');
  if (date) date.min = new Date().toISOString().split('T')[0];

  // Previous / Next navigation at the end of every page.
  const pageFlow = [
    ['index.html', 'Home'],
    ['models.html', 'Models'],
    ['about.html', 'About'],
    ['compare.html', 'Compare'],
    ['gallery.html', 'Gallery'],
    ['news.html', 'News'],
    ['faq.html', 'FAQ'],
    ['contact.html', 'Test Drive'],
    ['login.html', 'Login'],
    ['signup.html', 'Sign Up'],
    ['car-detail.html', 'Model Configuration']
  ];
  const currentPage = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  const currentIndex = pageFlow.findIndex(([file]) => file === currentPage);
  if (currentIndex !== -1 && !document.querySelector('.page-flow')) {
    const prev = pageFlow[(currentIndex - 1 + pageFlow.length) % pageFlow.length];
    const next = pageFlow[(currentIndex + 1) % pageFlow.length];
    const nav = document.createElement('nav');
    nav.className = 'page-flow section-shell';
    nav.setAttribute('aria-label', 'Page navigation');
    nav.innerHTML = `
      <a class="page-flow-link prev" href="${prev[0]}">
        <span class="page-flow-kicker">PREVIOUS PAGE</span>
        <strong><i class="ri-arrow-left-line"></i>${prev[1]}</strong>
      </a>
      <span class="page-flow-index">${String(currentIndex + 1).padStart(2,'0')} / ${String(pageFlow.length).padStart(2,'0')}</span>
      <a class="page-flow-link next" href="${next[0]}">
        <span class="page-flow-kicker">NEXT PAGE</span>
        <strong>${next[1]}<i class="ri-arrow-right-line"></i></strong>
      </a>`;
    const footer = document.querySelector('footer');
    (footer?.parentNode || document.body).insertBefore(nav, footer || null);
  }

  // ==========================================
// NOIR AUTOMOTIVE CONCIERGE
// ==========================================

if (!document.querySelector('.noir-chatbot')) {

    const chat = document.createElement('aside');

    chat.className = 'noir-chatbot';

    chat.innerHTML = `
        <button class="chat-toggle" type="button">
            <i class="ri-message-3-line"></i>
            <span>NOIR CONCIERGE</span>
        </button>

        <div class="chat-panel" aria-hidden="true">

            <div class="chat-head">

                <div>
                    <span>NOIR / CONCIERGE</span>
                    <strong>How may we assist?</strong>
                </div>

                <button class="chat-close" type="button">
                    <i class="ri-close-line"></i>
                </button>

            </div>

            <div class="chat-messages">

                <div class="chat-bubble bot">
                    Welcome to NOIR. I can help you explore our cars,
                    compare models, understand specifications,
                    and find the right car for you.
                </div>

            </div>

            <div class="chat-quick">

                <button type="button" data-chat="models">
                    Explore Cars
                </button>

                <button type="button" data-chat="recommend">
                    Recommend a Car
                </button>

                <button type="button" data-chat="testdrive">
                    Book Test Drive
                </button>

            </div>

            <form class="chat-form">

                <input
                    type="text"
                    placeholder="Ask about a car..."
                    autocomplete="off"
                >

                <button type="submit">
                    <i class="ri-arrow-up-line"></i>
                </button>

            </form>

        </div>
    `;

    document.body.appendChild(chat);


    const toggle =
        chat.querySelector('.chat-toggle');

    const panel =
        chat.querySelector('.chat-panel');

    const close =
        chat.querySelector('.chat-close');

    const messages =
        chat.querySelector('.chat-messages');

    const form =
        chat.querySelector('.chat-form');

    const input =
        chat.querySelector('input');


    // ==========================================
    // CAR DATABASE
    // ==========================================

   const cars = {

    porsche: {
        name: "Porsche 911",
        type: "Sports Car",

        price: "Varies by variant",

        engine: "Twin-turbocharged flat-six",
        power: "Varies by variant",
        acceleration: "Varies by variant",
        topSpeed: "Varies by variant",

        description:
            "The Porsche 911 is an iconic sports car combining everyday usability with exceptional performance and precise handling.",

        performance:
            "The 911 is designed around responsive handling, strong acceleration and an engaging driving experience.",

        design:
            "Its unmistakable silhouette combines Porsche's classic design language with modern aerodynamic details.",

        interior:
            "The interior focuses on a driver-oriented layout, premium materials and modern technology.",

        bestFor:
            "Drivers who want a sports car that can be enjoyed both on the road and during spirited driving.",

        keywords:
            ["sports", "performance", "daily", "driving", "handling"]
    },


    rollsroyce: {

        name: "Rolls-Royce Phantom",
        type: "Luxury Sedan",

        price: "Varies by specification",

        engine: "6.75L twin-turbocharged V12",
        power: "563 hp",
        acceleration: "Approximately 5.3 seconds 0-100 km/h",
        topSpeed: "250 km/h",

        description:
            "The Rolls-Royce Phantom represents ultimate luxury, comfort and craftsmanship.",

        performance:
            "The Phantom focuses on effortless power and refinement rather than aggressive sports-car performance.",

        design:
            "Its imposing proportions, signature grille and handcrafted details create an unmistakable presence.",

        interior:
            "The cabin is built around exceptional comfort, handcrafted materials and a highly refined passenger experience.",

        bestFor:
            "Drivers who prioritize luxury, comfort, craftsmanship and presence.",

        keywords:
            ["luxury", "comfort", "premium", "chauffeur", "elegant"]
    },


    laferrari: {

        name: "LaFerrari",
        type: "Hybrid Hypercar",

        price: "Highly exclusive / collector car",

        engine: "6.3L naturally aspirated V12 with hybrid system",
        power: "Approximately 950 hp combined",
        acceleration: "Under 3 seconds 0-100 km/h",
        topSpeed: "Over 350 km/h",

        description:
            "LaFerrari combines Ferrari's performance philosophy with advanced hybrid technology.",

        performance:
            "It is engineered for extreme performance, rapid acceleration and high-speed capability.",

        design:
            "Its aerodynamic bodywork is shaped around performance while maintaining Ferrari's dramatic styling.",

        interior:
            "The cockpit is focused heavily on the driver, with a minimalist performance-oriented environment.",

        bestFor:
            "Drivers looking for extreme Ferrari performance and exclusivity.",

        keywords:
            ["ferrari", "performance", "hybrid", "hypercar", "exclusive"]
    },


    bugatti: {

        name: "Bugatti Tourbillon",
        type: "Hypercar",

        price: "Ultra-exclusive",

        engine: "8.3L naturally aspirated V16 with hybrid system",
        power: "Approximately 1,800 hp combined",
        acceleration: "Approximately 2 seconds 0-100 km/h",
        topSpeed: "Up to approximately 445 km/h with Speed Key",

        description:
            "The Bugatti Tourbillon is an ultra-exclusive hypercar focused on extreme performance, engineering and craftsmanship.",

        performance:
            "The Tourbillon is designed around extraordinary power, acceleration and high-speed performance.",

        design:
            "Its design combines Bugatti's distinctive horseshoe grille and flowing bodywork with advanced aerodynamic engineering.",

        interior:
            "The interior blends luxury craftsmanship with a driver-focused cockpit and intricate mechanical details.",

        bestFor:
            "Drivers who want an exceptionally exclusive hypercar combining extreme performance and luxury.",

        keywords:
            ["bugatti", "hypercar", "fast", "performance", "exclusive", "luxury"]
    }

};


    // ==========================================
    // ADD MESSAGE
    // ==========================================

    function addMessage(text, sender) {

        const bubble =
            document.createElement('div');

        bubble.className =
            `chat-bubble ${sender}`;

        bubble.textContent = text;

        messages.appendChild(bubble);

        messages.scrollTop =
            messages.scrollHeight;
    }


    // ==========================================
    // BOT RESPONSE
    // ==========================================

    function bot(text) {

        setTimeout(() => {

            addMessage(text, 'bot');

        }, 250);

    }


    // ==========================================
    // FIND CAR
    // ==========================================

    function findCar(text) {

        text = text.toLowerCase();

        if (
            text.includes("porsche") ||
            text.includes("911")
        ) {
            return cars.porsche;
        }

        if (
            text.includes("rolls") ||
            text.includes("royce") ||
            text.includes("phantom")
        ) {
            return cars.rollsroyce;
        }

        if (
            text.includes("ferrari") ||
            text.includes("laferrari") ||
            text.includes("la ferrari")
        ) {
            return cars.laferrari;
        }

        if (
            text.includes("bugatti") ||
            text.includes("tourbillon")
        ) {
            return cars.bugatti;
        }

        return null;
    }


    // ==========================================
    // SHOW ALL CARS
    // ==========================================

    function showCars() {

        bot(
            "Our featured collection includes:\n\n" +
            "• Porsche 911 - Sports Car\n" +
            "• Rolls-Royce Phantom - Luxury Sedan\n" +
            "• LaFerrari - Hybrid Hypercar\n" +
            "• Bugatti Tourbillon - Hypercar\n\n" +
            "Ask me about any of these models."
        );
    }


    // ==========================================
    // CAR INFORMATION
    // ==========================================

    function explainCar(car, text) {

        if (
            text.includes("spec") ||
            text.includes("specification") ||
            text.includes("horsepower") ||
            text.includes("hp") ||
            text.includes("engine") ||
            text.includes("top speed") ||
            text.includes("0-100") ||
            text.includes("acceleration")
        ){

      showSpecifications(car);

      return;
    }

        if (
            text.includes("performance") ||
            text.includes("power") ||
            text.includes("fast") ||
            text.includes("speed")
        ) {

            bot(
                `${car.name}\n\n${car.performance}`
            );

            return;
        }


        if (
            text.includes("design") ||
            text.includes("look") ||
            text.includes("exterior")
        ) {

            bot(
                `${car.name}\n\n${car.design}`
            );

            return;
        }


        if (
            text.includes("interior") ||
            text.includes("inside") ||
            text.includes("cabin")
        ) {

            bot(
                `${car.name}\n\n${car.interior}`
            );

            return;
        }


        if (
            text.includes("best") ||
            text.includes("suitable") ||
            text.includes("who")
        ) {

            bot(
                `${car.name}\n\n${car.bestFor}`
            );

            return;
        }


        bot(
            `${car.name}\n\n${car.description}\n\n` +
            `Type: ${car.type}\n\n` +
            `You can also ask me about its performance, design or interior.`
        );
    }


    // ==========================================
    // COMPARE CARS
    // ==========================================

    function compareCars(text) {

        const found = [];

        if (
            text.includes("porsche") ||
            text.includes("911")
        ) {
            found.push(cars.porsche);
        }

        if (
            text.includes("rolls") ||
            text.includes("royce") ||
            text.includes("phantom")
        ) {
            found.push(cars.rollsroyce);
        }

        if (
            text.includes("ferrari") ||
            text.includes("laferrari")
        ) {
            found.push(cars.laferrari);
        }

        if (
            text.includes("bugatti") ||
            text.includes("tourbillon")
        ) {
            found.push(cars.bugatti);
        }


        if (found.length < 2) {

            bot(
                "Tell me the two cars you'd like to compare. For example:\n\n" +
                "Porsche 911 vs Bugatti\n\n" +
                "or\n\n" +
                "Ferrari vs Rolls-Royce"
            );

            return;
        }


        const a = found[0];
        const b = found[1];


        bot(
            `${a.name} vs ${b.name}\n\n` +

            `${a.name}:\n` +
            `${a.type}\n` +
            `${a.description}\n\n` +

            `${b.name}:\n` +
            `${b.type}\n` +
            `${b.description}\n\n` +

            `${a.name} is more focused on ${a.bestFor.toLowerCase()}\n\n` +

            `${b.name} is more focused on ${b.bestFor.toLowerCase()}`
        );
    }


    // ==========================================
    // RECOMMENDATION
    // ==========================================

    function recommendCar(text) {

    const lower = text.toLowerCase();

    // LUXURY
    if (
        lower.includes("luxury") ||
        lower.includes("comfortable") ||
        lower.includes("comfort") ||
        lower.includes("premium") ||
        lower.includes("elegant") ||
        lower.includes("chauffeur")
    ) {

        bot(
            "I'd recommend the Rolls-Royce Phantom.\n\n" +
            "Why: It is focused on exceptional luxury, comfort, craftsmanship and refinement.\n\n" +
            "If you want luxury with extreme performance, the Bugatti Tourbillon is another option."
        );

        return;
    }


    // EXTREME PERFORMANCE
    if (
        lower.includes("fast") ||
        lower.includes("fastest") ||
        lower.includes("speed") ||
        lower.includes("performance") ||
        lower.includes("powerful") ||
        lower.includes("power")
    ) {

        bot(
            "For extreme performance, I'd recommend the Bugatti Tourbillon.\n\n" +
            "Power: " + cars.bugatti.power + "\n" +
            "Top Speed: " + cars.bugatti.topSpeed + "\n" +
            "Type: " + cars.bugatti.type
        );

        return;
    }


    // DAILY DRIVING
    if (
        lower.includes("daily") ||
        lower.includes("everyday") ||
        lower.includes("road") ||
        lower.includes("usable")
    ) {

        bot(
            "I'd recommend the Porsche 911.\n\n" +
            "Why: It combines sports-car performance with much greater everyday usability than the hypercars in the NOIR collection."
        );

        return;
    }


    // EXCLUSIVITY
    if (
        lower.includes("exclusive") ||
        lower.includes("exclusivity") ||
        lower.includes("rare") ||
        lower.includes("special") ||
        lower.includes("unique")
    ) {

        bot(
            "For extreme exclusivity, I'd recommend LaFerrari or the Bugatti Tourbillon.\n\n" +
            "LaFerrari offers Ferrari's hybrid performance philosophy, while the Tourbillon pushes further into extreme hypercar territory."
        );

        return;
    }


    // FERRARI
    if (
        lower.includes("ferrari") ||
        lower.includes("italian")
    ) {

        bot(
            "LaFerrari would be the natural choice.\n\n" +
            "It combines Ferrari's V12 performance philosophy with hybrid technology and extreme exclusivity."
        );

        return;
    }


    // NO CLEAR PREFERENCE
    bot(
        "I'd be happy to recommend one. Tell me what matters most to you:\n\n" +
        "• Luxury\n" +
        "• Performance\n" +
        "• Everyday driving\n" +
        "• Exclusivity\n" +
        "• Ferrari heritage\n\n" +
        "For example: \"I want a fast but comfortable car.\""
    );
}

function showSpecifications(car) {

    bot(
        `${car.name}\n\n` +

        `Type: ${car.type}\n` +
        `Engine: ${car.engine}\n` +
        `Power: ${car.power}\n` +
        `0-100 km/h: ${car.acceleration}\n` +
        `Top Speed: ${car.topSpeed}\n\n` +

        `${car.description}`
    );
}


    // ==========================================
    // MAIN RESPONSE ENGINE
    // ==========================================

    function respond(text) {

        const lower =
            text.toLowerCase();

        const car =
            findCar(lower);


        // CAR QUESTION

        if (car) {

            explainCar(car, lower);

            return;
        }


        // COMPARE

        if (
            lower.includes("compare") ||
            lower.includes(" vs ") ||
            lower.includes("versus")
        ) {

            compareCars(lower);

            return;
        }


        // RECOMMENDATION

        if (
    lower.includes("recommend") ||
    lower.includes("which car") ||
    lower.includes("best car") ||
    lower.includes("what should i") ||
    lower.includes("luxury") ||
    lower.includes("performance") ||
    lower.includes("fast") ||
    lower.includes("speed") ||
    lower.includes("powerful") ||
    lower.includes("daily") ||
    lower.includes("everyday") ||
    lower.includes("exclusivity") ||
    lower.includes("exclusive") ||
    lower.includes("rare") ||
    lower.includes("special") ||
    lower.includes("ferrari heritage") ||
    lower.includes("italian")
) {

    recommendCar(lower);

    return;
}


        // ALL CARS

        if (
            lower.includes("models") ||
            lower.includes("cars") ||
            lower.includes("collection")
        ) {

            showCars();

            return;
        }


        // FASTEST

        if (
            lower.includes("fastest")
        ) {

            bot(
                "For extreme high-performance driving, the Bugatti Tourbillon is the standout choice in the NOIR collection."
            );

            return;
        }


        // LUXURY

        if (
            lower.includes("luxury")
        ) {

            bot(
                "For the ultimate luxury experience, I would recommend the Rolls-Royce Phantom."
            );

            return;
        }


        // TEST DRIVE

        if (
            lower.includes("test drive") ||
            lower.includes("testdrive")
        ) {

            bot(
                "I'd be happy to help you experience a NOIR model. Use the Test Drive option on the website to book your appointment."
            );

            return;
        }


        // GREETING

        if (
            lower.includes("hello") ||
            lower.includes("hi") ||
            lower.includes("hey")
        ) {

            bot(
                "Welcome to NOIR. I can help you explore our cars, compare models, understand their features, or choose the right one for you."
            );

            return;
        }


        // DEFAULT

        bot(
            "I can help you with:\n\n" +
            "• Car specifications\n" +
            "• Performance\n" +
            "• Design\n" +
            "• Interior\n" +
            "• Model comparisons\n" +
            "• Car recommendations\n" +
            "• Test-drive information\n\n" +
            "Try asking: \"Tell me about the Bugatti Tourbillon.\""
        );
    }


    // ==========================================
    // OPEN / CLOSE
    // ==========================================

    toggle.addEventListener('click', () => {

        if (
            panel.classList.contains('open')
        ) {

            panel.classList.remove('open');

            panel.setAttribute(
                'aria-hidden',
                'true'
            );

        } else {

            panel.classList.add('open');

            panel.setAttribute(
                'aria-hidden',
                'false'
            );

            input.focus();
        }

    });


    close.addEventListener('click', () => {

        panel.classList.remove('open');

        panel.setAttribute(
            'aria-hidden',
            'true'
        );

    });


    // ==========================================
    // QUICK BUTTONS
    // ==========================================

    chat.querySelectorAll('[data-chat]')
        .forEach(button => {

            button.addEventListener(
                'click',
                () => {

                    const type =
                        button.dataset.chat;

                    addMessage(
                        button.textContent.trim(),
                        'user'
                    );


                    if (type === "models") {

                        showCars();

                    }

                    else if (type === "compare") {

                        bot(
                            "Which two models would you like to compare?\n\nFor example: Porsche 911 vs Bugatti Tourbillon."
                        );

                    }

                    else if (type === "recommend") {

                        bot(
                            "What matters most to you?\n\nLuxury, performance, everyday driving, exclusivity, or Ferrari heritage?"
                        );

                    }

                    else if (type === "testdrive") {

                        panel.classList.remove('open');

                        window.location.href = "contact.html";

                    }

                }
            );

        });


    // ==========================================
    // TEXT INPUT
    // ==========================================

    form.addEventListener(
        'submit',
        event => {

            event.preventDefault();

            const text =
                input.value.trim();

            if (!text) return;


            addMessage(
                text,
                'user'
            );

            input.value = "";


            respond(text);

        }
    );

}
  
})();

function initConfigurator() {
  const models = NOIR_MODELS;
  const key = new URLSearchParams(location.search).get('car') || 'porsche';
  const model = models[key] || models.porsche;
  document.getElementById('detail-name').textContent = model.name;
  document.getElementById('detail-type').textContent = model.type;
  document.getElementById('detail-description').textContent = model.description;
  document.getElementById('detail-stats').innerHTML = model.stats.map(s => `<div><strong>${s[0]}</strong><span>${s[1]}</span></div>`).join('');
  const main = document.getElementById('detail-image');
  main.src = model.images[0];
  const thumbs = document.getElementById('detail-thumbs');
  model.images.forEach((src, i) => {
    const img = document.createElement('img'); img.src = src; img.alt = `${model.name} view ${i + 1}`;
    const wrap = document.createElement('div'); wrap.className = 'detail-thumb'; wrap.appendChild(img); thumbs.appendChild(wrap);
    wrap.addEventListener('mouseenter', () => main.src = src);
  });
  const state = { drivetrain: model.drivetrain[0], fuel: model.fuel[0], color: model.colors[0] };
  const makeOptions = (id, values, type) => {
    const box = document.getElementById(id);
    values.forEach(value => {
      const b = document.createElement('button'); b.type = 'button'; b.textContent = value; b.className = value === state[type] ? 'selected' : '';
      b.addEventListener('click', () => { state[type] = value; box.querySelectorAll('button').forEach(x => x.classList.remove('selected')); b.classList.add('selected'); update(); });
      box.appendChild(b);
    });
  };
  const update = () => document.getElementById('config-summary').textContent = `${state.drivetrain} · ${state.fuel} · ${state.color}`;
  makeOptions('drivetrain-options', model.drivetrain, 'drivetrain'); makeOptions('fuel-options', model.fuel, 'fuel'); makeOptions('color-options', model.colors, 'color'); update();
}

// ---------------------------------------------------------------------------
// Compare feature: "Add to Compare" buttons on the Models page, persisted to
// localStorage, and read back into a dynamic comparison table on Compare page.
// (NOIR_COMPARE_KEY / NOIR_COMPARE_MAX are declared near the top of this file,
// before the IIFE above, so they're available the moment it runs.)
// ---------------------------------------------------------------------------
function noirGetCompareList() {
  try {
    const raw = JSON.parse(localStorage.getItem(NOIR_COMPARE_KEY));
    return Array.isArray(raw) ? raw.filter(slug => NOIR_MODELS[slug]) : [];
  } catch (e) {
    return [];
  }
}

function noirSetCompareList(list) {
  localStorage.setItem(NOIR_COMPARE_KEY, JSON.stringify(list));
}

function initCompareButtons() {
  const cards = document.querySelectorAll('.model-card[data-car]');
  if (!cards.length) return;

  const refresh = (btn, slug) => {
    const active = noirGetCompareList().includes(slug);
    btn.classList.toggle('added', active);
    btn.textContent = active ? '✓ Added · Go to Compare' : '+ Add to Compare';
    btn.setAttribute('aria-label', active ? 'Go to Compare' : 'Add to Compare');
  };

  cards.forEach(card => {
    const slug = card.dataset.car;
    const btn = card.querySelector('.compare-btn');
    if (!btn || !NOIR_MODELS[slug]) return;
    refresh(btn, slug);
    btn.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      let list = noirGetCompareList();

      // Once a model is added, the same control becomes a direct
      // shortcut to the comparison page.
      if (list.includes(slug)) {
        window.location.href = 'compare.html';
        return;
      }
      if (list.length >= NOIR_COMPARE_MAX) {
        const original = btn.textContent;
        btn.textContent = `Max ${NOIR_COMPARE_MAX} reached`;
        window.setTimeout(() => refresh(btn, slug), 1400);
        return;
      }
      list.push(slug);
      noirSetCompareList(list);
      refresh(btn, slug);
    });
  });
}

function initComparePage() {
  const mount = document.getElementById('compare-mount');
  if (!mount) return;

  const FIELD_ROWS = [
    ['Type', m => m.type],
    ['Character', m => m.description],
    ['0–100 km/h', m => (m.stats[0] || [])[0] || '—'],
    ['Power', m => (m.stats[1] || [])[0] || '—'],
    ['Top Speed', m => (m.stats[2] || [])[0] || '—'],
    ['Drivetrain', m => m.drivetrain.join(' / ')],
    ['Fuel Type', m => m.fuel.join(' / ')],
    ['Colours', m => m.colors.join(', ')],
  ];

  const render = () => {
    const list = noirGetCompareList();

    if (list.length < 2) {
      mount.innerHTML = `<div class="compare-empty">
        <p>${list.length === 0
          ? "You haven't added any models to compare yet."
          : "Add at least one more model from the Models page to see a comparison."}</p>
        <a class="btn btn-primary" href="models.html">Browse Models <i class="ri-arrow-right-line"></i></a>
      </div>`;
      return;
    }

    const cols = list.map(slug => ({ slug, ...NOIR_MODELS[slug] }));

    const headCells = cols.map(m => `<th>${m.name}
        <a href="car-detail.html?car=${m.slug}">Configure <i class="ri-arrow-right-up-line"></i></a>
        <button type="button" class="compare-remove" data-car="${m.slug}" aria-label="Remove ${m.name} from comparison"><i class="ri-close-line"></i> Remove</button>
      </th>`).join('');

    const bodyRows = FIELD_ROWS.map(([label, getVal]) =>
      `<tr><td>${label}</td>${cols.map(m => `<td>${getVal(m)}</td>`).join('')}</tr>`
    ).join('');

    mount.innerHTML = `
      <div class="compare-table-wrap">
        <table class="compare-table">
          <thead><tr><th></th>${headCells}</tr></thead>
          <tbody>${bodyRows}</tbody>
        </table>
      </div>
      <div class="compare-actions"><button type="button" id="compare-clear-btn" class="btn btn-primary">Clear Compare List</button></div>
    `;

    mount.querySelectorAll('.compare-remove').forEach(btn => {
      btn.addEventListener('click', () => {
        noirSetCompareList(noirGetCompareList().filter(s => s !== btn.dataset.car));
        render();
      });
    });

    const clearBtn = document.getElementById('compare-clear-btn');
    if (clearBtn) clearBtn.addEventListener('click', () => { noirSetCompareList([]); render(); });
  };

  render();
}
