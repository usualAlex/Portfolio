class LightboxGallery {
  constructor(options) {
    this.options = options;
    this.galleries = [];
    this.currentGallery = null;
    this.currentImage = null;
    this.lightbox = null;
    this.background = null;
  }

  init() {
    const galleries = document.querySelectorAll('.lightboxGallery');
    galleries.forEach((gallery, index) => {
      this.galleries.push(new LightboxGallery.Gallery(gallery, index, this));
    });
  }

  open(galleryIndex, imageIndex) {
    this.currentGallery = this.galleries[galleryIndex];
    this.currentImage = this.currentGallery.images[imageIndex];
    this.showLightbox();
  }

  showLightbox() {
    if (!this.lightbox) {
      this.createLightbox();
    }

    // Check if image container exists, otherwise create it
    let imgContainer = this.lightbox.querySelector('.lightbox-image');
    if (!imgContainer) {
      imgContainer = document.createElement('div');
      imgContainer.classList.add('lightbox-image');
      this.lightbox.appendChild(imgContainer);
    }

    // Disable page scroll
    document.body.classList.add('no-scroll');

    // Get description (from alt or data-desc)
    const descText = this.currentImage.getAttribute('data-desc') || this.currentImage.alt || "";

    imgContainer.innerHTML = `
      <img src="${this.currentImage.src}">
      ${descText ? `<div class="lightbox-desc">${descText}</div>` : ""}
    `;

    // Allow pinch zoom on mobile
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    if (viewportMeta) {
      viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes');
    }

    this.lightbox.classList.add('open');
    this.background.classList.add('open');
  }

  closeLightbox() {
    this.lightbox.classList.remove('open');
    this.background.classList.remove('open');

    // Re-enable page scroll
    document.body.classList.remove('no-scroll');

    // Disable pinch zoom again
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    if (viewportMeta) {
      viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no');
    }
  }

  createLightbox() {
    this.lightbox = document.createElement('div');
    this.lightbox.classList.add('lightbox');

    // Close button
    const closeBtn = document.createElement('button');
    closeBtn.classList.add('lightbox-close');
    closeBtn.innerHTML = '&times;';
    closeBtn.addEventListener('click', () => {
      this.closeLightbox();
    });
    this.lightbox.appendChild(closeBtn);

    this.background = document.createElement('div');
    this.background.classList.add('lightbox-background');

    document.body.appendChild(this.lightbox);
    document.body.appendChild(this.background);

    this.background.addEventListener('click', () => {
      this.closeLightbox();
    });

    this.lightbox.addEventListener('click', (e) => {
      if (e.target.classList.contains('lightbox')) {
        this.closeLightbox();
      }
    });
  }

  static Gallery = class Gallery {
    constructor(gallery, index, lightboxGallery) {
      this.gallery = gallery;
      this.index = index;
      this.lightboxGallery = lightboxGallery;
      this.images = [];
      this.findImages(gallery);
      gallery.querySelectorAll('img').forEach((image) => {
        if (!image.classList.contains('no-lightbox')) {
          image.addEventListener('click', (e) => {
            e.preventDefault();
            const imageIndex = this.images.indexOf(image);
            this.lightboxGallery.open(this.index, imageIndex);
          });
        }
      });
    }

    findImages(element) {
      const images = element.querySelectorAll('img');
      images.forEach((image) => {
        if (!image.classList.contains('no-lightbox')) {
          this.images.push(image);
          image.classList.add('is-lightbox');
        }
      });
      for (const child of element.children) {
        if (child.children.length > 0) {
          this.findImages(child);
        }
      }
    }
  };
}

document.addEventListener('DOMContentLoaded', () => {
  const lightboxGallery = new LightboxGallery();
  lightboxGallery.init();
});
