// <!-- SCRIPTS -->


// <!------------------ MOBILE MENU + SCROLL TO TOP -------------------------->
document.addEventListener("DOMContentLoaded", function () {
  const hamburgerBtn = document.querySelector('.hamburger-button');
  const menuContainer = document.querySelector('.mobile-menu-container');
  const wrapper = document.querySelector('.content-block-wrapper');
  const toTopBtn = document.querySelector('.scroll-to-top-button');

  let scrollY = 0;

  function closeMenu() {
    menuContainer.style.display = 'none';
    hamburgerBtn.classList.remove('active');
    wrapper.classList.remove('disable-scroll');
    wrapper.style.top = '';
  }

  // --- MENU TOGGLE ---
  hamburgerBtn.addEventListener('click', () => {
    const isOpen = menuContainer.style.display === 'flex';

    if (isOpen) {
      closeMenu();
      window.scrollTo(0, scrollY);
    } else {
      menuContainer.style.display = 'flex';
      hamburgerBtn.classList.add('active');

      scrollY = window.scrollY;
      wrapper.classList.add('disable-scroll');
      wrapper.style.top = `-${scrollY}px`;
    }
  });

  // --- SCROLL TO TOP BTN ---
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      toTopBtn.classList.add('shown');
    } else {
      toTopBtn.classList.remove('shown');
    }
  });

  toTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // --- AUTOCLOSE MENU ON RESIZE > 749px ---
  function checkWidth() {
    if (window.innerWidth > 749) {
      closeMenu();
    }
  }

  window.addEventListener('resize', checkWidth);
  checkWidth(); // run once on load
});






// <!------------------ FEATURED PROJECTS -------------------------->
document.addEventListener("DOMContentLoaded", function () {
  const featuredTab = document.querySelector('#Featured');
  const project1 = featuredTab.querySelector('.project1');
  const project2 = featuredTab.querySelector('.project2');
  const project3 = featuredTab.querySelector('.project3');

  const project1Highlight = document.querySelector('.project1-highlight');
  const project2Highlight = document.querySelector('.project2-highlight');
  const project3Highlight = document.querySelector('.project3-highlight');

  // Hover highlight + balloon trigger
  function setupHover(projectEl, highlightEl) {
    projectEl.addEventListener('mouseover', () => {
      highlightEl.classList.add('highlight');
      highlightEl.dispatchEvent(new Event('mouseover', { bubbles: true }));
    });

    projectEl.addEventListener('mouseout', () => {
      highlightEl.classList.remove('highlight');
      highlightEl.dispatchEvent(new Event('mouseout', { bubbles: true }));
    });
  }

  setupHover(project1, project1Highlight);
  setupHover(project2, project2Highlight);
  setupHover(project3, project3Highlight);
});


// <!------------------ HOVER BALLOON -------------------------->
document.addEventListener("DOMContentLoaded", function () {

  const buttons = document.querySelectorAll('.balloon-button');
  const menu = document.querySelector('.menu-container');

  buttons.forEach(button => {
    const balloonText = button.getAttribute('balloon');

    const balloon = document.createElement('span');
    balloon.classList.add('balloon');
    balloon.style.position = 'absolute';
    balloon.style.display = 'none';
    balloon.textContent = balloonText;

    const parentMenu = button.closest('.menu-container');
    parentMenu.appendChild(balloon);

    button.addEventListener('mouseover', () => {
      if (window.innerWidth > 1600) {
        balloon.style.display = 'inline-flex';
        const buttonRect = button.getBoundingClientRect();
        const menuRect = menu.getBoundingClientRect();

        balloon.style.top = `${buttonRect.top - menuRect.top - 3}px`;
        balloon.style.left = `${buttonRect.left - menuRect.left - balloon.offsetWidth - 10}px`;
      }
      else {
        balloon.style.display = 'none';
      }
    });

    button.addEventListener('mouseout', () => {
      balloon.style.display = 'none';
    });
  });
  // Also hide balloons if window shrinks while one is visible
    window.addEventListener('resize', () => {
      if (window.innerWidth < 1650) {
        hideBalloon();
      }
    });
});






// <!------------------ COLLAPSIBLE ABOUT SECTIONS -------------------------->
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".collapsible").forEach(section => {
    section.addEventListener("click", () => {
      section.classList.toggle("active");
      let content = section.nextElementSibling;
      content.classList.toggle("show");

      const arrow = section.querySelector(".arrow");

      // Animate rotation first
      arrow.style.transition = "transform 0.2s ease";
      arrow.style.transform = "rotate(90deg)";

      // After rotation completes, change text
      setTimeout(() => {
        if (section.classList.contains("active")) {
          arrow.textContent = "-";
          arrow.style.marginRight = "2px"; // add margin for "-"
        } else {
          arrow.textContent = "+";
          arrow.style.marginRight = "0"; // reset for "+"
        }

        // Reset rotation
        arrow.style.transition = "none";
        arrow.style.transform = "rotate(0deg)";
      }, 100);
    });
  });
});




// Preview script to be more robust. Main improvements:

// - uses pointer events (with mouse fallbacks) so it works across browsers,
// - supports both data-preview-p (image) and data-preview-v (webm video),
// - pre-warms the preview position so it doesn't flash at 0,0,
// - attempts to play() the video and handles the promise (autoplay can be blocked on some browsers),
// - cleans up / pauses the video when the preview is hidden,
// - uses a delegated-per-.menu-link listener approach (attaches to each .menu-link) but more tolerant of events.
document.addEventListener("DOMContentLoaded", () => {
  const previewBox = document.createElement("div");
  previewBox.className = "link-preview";
  previewBox.style.display = "none";
  document.body.appendChild(previewBox);

  const toggleHint = document.querySelector(".preview-toggle-hint");
  if (toggleHint) toggleHint.style.display = "none"; // hidden by default

  const offsetX = 150;
  let offsetY = -50;

  let isVisible = false;
  let currentMedia = null;
  let previewsEnabled = true;

  let lastMouseX = 0;
  let lastMouseY = 0;
  let previewX = 0;
  let previewY = 0;

  // For lerping
  let renderX = 0;
  let renderY = 0;
  let animating = false;

  const links = document.querySelectorAll(".menu-link");
  if (!links.length) return;

  function makeImage(src) {
    const img = document.createElement("img");
    img.src = src;
    img.alt = "preview";
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.objectFit = "contain";
    img.style.objectPosition = "top left";
    return img;
  }

  function makeVideo(src) {
    const video = document.createElement("video");
    video.src = src;
    video.loop = true;
    video.muted = true;
    video.autoplay = true;
    video.playsInline = true;
    video.setAttribute("playsinline", "");
    video.style.width = "100%";
    video.style.height = "100%";
    video.style.objectFit = "contain";
    video.style.objectPosition = "top left";
    return video;
  }

  function showPreview(e, el) {
    if (!previewsEnabled) return;

    const imgSrc = el.dataset.previewP;
    const videoSrc = el.dataset.previewV;

    if (!imgSrc && !videoSrc) {
      previewBox.style.display = "none";
      if (toggleHint) toggleHint.style.display = "none";
      return;
    }

    // clear previous
    previewBox.innerHTML = "";
    currentMedia = null;

    if (videoSrc) {
      const v = makeVideo(videoSrc);
      previewBox.appendChild(v);
      currentMedia = v;
      v.play().catch(() => {});
    } else if (imgSrc) {
      const i = makeImage(imgSrc);
      previewBox.appendChild(i);
      currentMedia = i;
    }

    previewX = e.clientX + offsetX;
    previewY = e.clientY + offsetY;

    renderX = previewX;
    renderY = previewY;

    previewBox.style.left = `${renderX}px`;
    previewBox.style.top = `${renderY}px`;
    previewBox.style.display = "block";
    isVisible = true;

    if (toggleHint && previewsEnabled) toggleHint.style.display = "inline-flex";

    lastMouseX = e.clientX;
    lastMouseY = e.clientY;

    if (!animating) {
      animating = true;
      requestAnimationFrame(animate);
    }
  }

  function movePreview(e) {
    if (!previewsEnabled || !isVisible) return;

    // delta movement of the mouse
    const dx = e.clientX - lastMouseX;
    const dy = e.clientY - lastMouseY;

    // move preview by half the distance
    previewX += dx * 0.5;
    previewY += dy * 0.8;

    // clamp vertically
    const boxHeight = previewBox.offsetHeight;
    if (previewY + boxHeight > window.innerHeight) previewY = window.innerHeight - boxHeight - 10;
    if (previewY < 0) previewY = 0;

    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
  }

  function hidePreview() {
    previewBox.style.display = "none";
    isVisible = false;
    if (toggleHint) toggleHint.style.display = "none";

    if (currentMedia && currentMedia.tagName === "VIDEO") {
      try {
        currentMedia.pause();
        currentMedia.removeAttribute("src");
        currentMedia.load();
      } catch {}
    }
    previewBox.innerHTML = "";
    currentMedia = null;
  }

  // Animation loop for lerping
  function animate() {
    if (!isVisible) {
      animating = false;
      return;
    }

    // ---- LERPING (comment out if you don’t want smooth motion) ----
    const ease = 0.12; // lower = smoother/slower
    renderX += (previewX - renderX) * ease;
    renderY += (previewY - renderY) * ease;
    // -------------------------------------------------------------

    previewBox.style.left = `${renderX}px`;
    previewBox.style.top = `${renderY}px`;

    requestAnimationFrame(animate);
  }

  // Key toggle for previews
  document.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === "h") {
      previewsEnabled = !previewsEnabled;
      if (!previewsEnabled) {
        previewBox.style.display = "none";
        if (toggleHint) toggleHint.style.display = "none";
      }
    }
  });

  // attach listeners
  links.forEach(link => {
    if (window.PointerEvent) {
      link.addEventListener("pointerenter", (e) => {
        if (e.pointerType === "touch") return;
        showPreview(e, link);
      });
      link.addEventListener("pointermove", (e) => {
        if (e.pointerType === "touch") return;
        movePreview(e);
      });
      link.addEventListener("pointerleave", hidePreview);
    } else {
      link.addEventListener("mouseenter", (e) => showPreview(e, link));
      link.addEventListener("mousemove", movePreview);
      link.addEventListener("mouseleave", hidePreview);
    }
  });
});



