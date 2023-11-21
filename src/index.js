import Notiflix, { Notify } from 'notiflix';
import fetchPics from './pics-api';

import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';
import simpleLightbox from 'simplelightbox';
let page;
let pagesPerRequest;
const refs = {
  searchBtn: document.querySelector('.btn-search'),
  inputEl: document.querySelector('.input-search'),
  bodyEl: document.querySelector('body'),
  formEl: document.querySelector('.search-form'),
  galleryDiv: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

const endOfResultsElement = document.createElement('span');
endOfResultsElement.classList.add('end-of-results');
endOfResultsElement.textContent = "Sorry, you've reached the end of results.";

refs.formEl.addEventListener('submit', onSearch);

refs.loadMoreBtn.addEventListener('click', loadMore);

async function onSearch(event) {
  event.preventDefault();
  page = 1;
  const request = refs.inputEl.value;

  const response = await fetchPics(request, page);
  if (response.data.hits[0] == undefined) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }
  refs.galleryDiv.innerHTML = '';
  console.log(response.data.totalHits);
  renderGallery(response.data.hits);
  const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });

  checkForEndOfResults(response.data.totalHits);
}

async function loadMore(event) {
  event.preventDefault();

  page++;

  const request = refs.inputEl.value;

  const response = await fetchPics(request, page);
  if (response.data.hits[0] == undefined) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }
  console.log(response.data.hits);
  renderGallery(response.data.hits);
  checkForEndOfResults(response.data.totalHits);
}

function renderGallery(arrayOfData) {
  arrayOfData.map(image => {
    const {
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    } = image;

    refs.galleryDiv.insertAdjacentHTML(
      'beforeend',

      `<li class="gallery__item">
      <a class="gallery__link" href="${largeImageURL}">
   <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" />
   <div class="info">
    <p class="info-item">
      <b>Likes</b>
      <span class='info-item-value'>${likes}</span>
    </p>
    <p class="info-item">
      <b>Views</b>
      <span class='info-item-value'>${views}</span>

    </p>
    <p class="info-item">
      <b>Comments</b>
      <span class='info-item-value'>${comments}</span>
    </p>
    <p class="info-item">
      <b>Downloads</b>
      <span class='info-item-value'>${downloads}</span>
    </p>
  </div> </a> </li>`
    );
  });
}

function checkForEndOfResults(totalHits) {
  if (document.querySelector('ul').childElementCount === totalHits) {
    hideLoadMoreButton();
    refs.bodyEl.append(endOfResultsElement);
  } else {
    showLoadMoreButton();
    endOfResultsElement.remove();
  }
}

function showLoadMoreButton() {
  document.querySelector('.frame').classList.remove('frame-off');
  refs.loadMoreBtn.classList.add('enabled');
  refs.loadMoreBtn.disabled = false;
}

function hideLoadMoreButton() {
  document.querySelector('.frame').classList.add('frame-off');

  refs.loadMoreBtn.classList.remove('enabled');
  refs.loadMoreBtn.disabled = true;
}
