export default function renderGallery(arrayOfData) {
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

    document.querySelector('.gallery').insertAdjacentHTML(
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
