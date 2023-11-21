import fetchPics from './pics-api';
import renderGallery from './render-gallery';
import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let page;
let lightbox;
const refs = {
  searchBtn: document.querySelector('.btn-search'),
  inputEl: document.querySelector('.input-search'),
  bodyEl: document.querySelector('body'),
  searchFormEl: document.querySelector('.search-form'),
  galleryDiv: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

const endOfResultsElement = document.createElement('span');
endOfResultsElement.classList.add('end-of-results');
endOfResultsElement.textContent = "Sorry, you've reached the end of results.";

refs.searchFormEl.addEventListener('submit', onSearch);

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
  Notify.info(`Hooray! We found ${response.data.totalHits} images.`);
  refs.galleryDiv.innerHTML = '';
  renderGallery(response.data.hits);
  lightbox = new SimpleLightbox('.gallery a', {
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

  renderGallery(response.data.hits);
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 1.5,
    behavior: 'smooth',
  });
  lightbox.refresh();
  checkForEndOfResults(response.data.totalHits);
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
