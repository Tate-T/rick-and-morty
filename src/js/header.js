const linkOnBackdrop = document.querySelector(".backdrop-serch");
const linkOnModal = document.querySelector(".modal");
const linkOnSerch = document.querySelector(".header__button-serch");
const linkOnClose = document.querySelector(".modal__close");

document.querySelector('.header__burger').addEventListener('click', function () {
  document.querySelector('.header__list').classList.toggle('active');
});


linkOnSerch.addEventListener("click", () => {
  linkOnBackdrop.style.display = "block";
  linkOnModal.style.display = "block";
})

linkOnClose.addEventListener("click", () => {
  linkOnBackdrop.style.display = "none";
  linkOnModal.style.display = "none";
})

window.addEventListener("click", (event) => {
  if (event.target === linkOnBackdrop) {
    linkOnBackdrop.style.display = "none";
    linkOnModal.style.display = "none";
  }
});


const searchInput = document.querySelector(".modal__input");
const resultsList = document.getElementById("modal__results");

searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim();

  if (!query) {
    resultsList.innerHTML = ''; // якщо інпут порожній — очистити
    return;
  }

  fetch(`https://rickandmortyapi.com/api/character/?name=${encodeURIComponent(query)}`)
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        resultsList.innerHTML = '<li>Персонажа не знайдено 😢</li>';
        return;
      }

      const characters = data.results;
      resultsList.innerHTML = characters.map(character => `
        <li class="modal__results-item">
          <img class="character__img-list" src="${character.image}" alt="${character.name}">
          <h2 class="header__name">${character.name}</h2>
          <h3 class="header__info">
            <span class="header__span">Origin:</span>  ${character.origin.name}
          </h3>
          <h3 class="header__info">
            <span class="header__span">Location:</span> ${character.location.name}
          </h3>
        </li>
      `).join('');
    })
});
