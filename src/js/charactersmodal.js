const characterList = document.getElementById("character__list");
if (!characterList) return;
const modal = document.querySelector(".backdrop");
const body = document.body;

const modalImage = document.querySelector(".see-modal__image");
const modalParams = document.querySelectorAll(".see-modal__status-people .see-modal__deteiling");
const episodesContainer = document.querySelector(".see-modal__item-2");

async function openCharacterModal(characterId) {
  try {
    const res = await fetch(`https://rickandmortyapi.com/api/character/${characterId}`);
    const character = await res.json();

    modalImage.src = character.image;
    modalImage.alt = character.name;

    const params = [
      character.status,
      character.species,
      character.gender,
      character.origin.name,
    ];

    modalParams.forEach((el, i) => el.textContent = params[i]);

    episodesContainer.innerHTML = `<h1 class="see-modal__modal-title">Episodes</h1>`;

    for (const url of character.episode.slice(0, 5)) {
      const epRes = await fetch(url);
      const epData = await epRes.json();
      const season = epData.episode.slice(1, 3);

      const epHTML = `
        <div class="see-modal__episodas">
          <h2 class="see-modal__season-name">${epData.name}</h2>
          <div class="see-modal__season-parameters">
            <div class="see-modal__help-div">
              <p class="see-modal__season">Season</p>
              <h3 class="see-modal__season-number">${season}</h3>
            </div>
            <div>
              <p class="see-modal__season-date">Air date</p>
              <h3 class="see-modal__season-date-number">${epData.air_date}</h3>
            </div>
          </div>
        </div>
      `;
      episodesContainer.innerHTML += epHTML;
    }

    modal.classList.add("active");
    body.classList.add("no-scroll");
  } catch (err) {
    console.error("Помилка при відкритті модалки:", err);
  }
}

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("active");
    body.classList.remove("no-scroll");
  }
});

fetch("https://rickandmortyapi.com/api/character")
  .then((response) => response.json())
  .then((data) => {
    characterList.innerHTML = data.results
      .map(
        (character) => `
        <li class="character-card" data-character-id="${character.id}">
          <img class="character__img-list" src="${character.image}" alt="${character.name}">
          <h2 class="character__name">${character.name}</h2>
          <h3 class="character__info">
            <span class="character__span">Origin:</span>  ${character.origin.name}
          </h3>
          <h3 class="character__info">
            <span class="character__span">Location:</span> ${character.location.name}
          </h3>
        </li>
      `
      )
      .join("");

    document.querySelectorAll(".character-card").forEach((card) => {
      card.addEventListener("click", () => {
        const id = card.getAttribute("data-character-id");
        openCharacterModal(id);
      });
    });
  })
  .catch((error) => {
  });
