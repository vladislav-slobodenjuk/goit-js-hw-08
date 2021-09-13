const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const refs = {
  gallery: document.querySelector('.js-gallery'),
  modal: document.querySelector('.js-lightbox'),
  modalOverlay: document.querySelector('.lightbox__overlay'),
  modalPic: document.querySelector('.lightbox__image'),
  modalCloseBtn: document.querySelector('.lightbox__button'),
};

const { gallery, modal, modalOverlay, modalPic, modalCloseBtn } = refs;
// console.log(modalCloseBtn);

// Creating gallery markup

const ItemMarkup = `<li class="gallery__item">
  <a
    class="gallery__link"
    href="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
  >
    <img
      class="gallery__image"
      src="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546__340.jpg"
      data-source="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
      alt="Tulips"
    />
  </a>
</li>`;

function createItems(arr) {
  return arr
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
  <a
    class="gallery__link"
    href=${original}
  >
    <img
      class="gallery__image"
      src=${preview}
      data-source=${original}
      alt=${description}
    />
  </a>
</li>`;
    })
    .join('');
}

const markup = createItems(galleryItems);
gallery.insertAdjacentHTML('afterbegin', markup);

// Opening modal by click on Img

function showElement(elem) {
  elem.classList.add('is-open');
}

gallery.addEventListener('click', onImgClick);

function onImgClick(evt) {
  if (evt.target.nodeName !== 'IMG') {
    return;
  }
  evt.preventDefault();

  // console.log(evt);
  showElement(modal);

  modalPic.src = evt.target.dataset.source;
  // modalPic.setAttribute('src', evt.target.dataset.source);
  modalPic.alt = evt.target.dataset.alt;
  // modalPic.setAttribute('alt', evt.target.alt);

  window.addEventListener('keydown', closeByKey);
  window.addEventListener('keydown', swipeBykeys);
}

// Closing modal by click (on modalCloseBtn and modalOverlay)

function hideElement(elem) {
  elem.classList.remove('is-open');
}

modal.addEventListener('click', closeByClick);

function closeByClick(evt) {
  // console.log(evt.target);
  // console.log(Boolean(modalCloseBtn === evt.target));

  if (evt.target === modalCloseBtn || evt.target === modalOverlay) {
    hideElement(modal);
    modalPic.src = '';
    // modalPic.setAttribute('src', '');
    modalPic.alt = '';
    // modalPic.setAttribute('alt', '');

    window.removeEventListener('keydown', closeByKey);
    window.removeEventListener('keydown', swipeBykeys);
  }
}

// Closing modal by key ESC

function closeByKey(evt) {
  // console.log(evt);
  if (evt.code === 'Escape') {
    hideElement(modal);
    modalPic.src = '';
    // modalPic.setAttribute('src', '');
    modalPic.alt = '';
    // modalPic.setAttribute('alt', '');

    window.removeEventListener('keydown', closeByKey);
    window.removeEventListener('keydown', swipeBykeys);
  }
}

// Changing img by keys

const galleryItemsLength = galleryItems.length - 1;
function swipeBykeys(evt) {
  let index = galleryItems.findIndex(
    ({ original }) => modalPic.src === original,
  );
  // console.log('index of element before swipe' ,index);
  if (evt.code === 'ArrowRight') {
    index += 1;
    if (index > galleryItemsLength) index = 0;
  } else if (evt.code === 'ArrowLeft') {
    index -= 1;
    if (index < 0) index = galleryItemsLength;
  }
  const { original, description } = galleryItems[index];
  modalPic.src = original;
  modalPic.alt = description;
}
