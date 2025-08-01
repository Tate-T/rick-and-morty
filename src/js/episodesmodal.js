const list = document.querySelector(".episodes__list");
const modal = document.querySelector(".data-modal");
const modalClose = document.querySelector(".data-modal-close");
const body = document.body;
const modalTitle = document.querySelector(".episodes-modal__series-name");
const modalId = document.querySelector(".episodes-modal__series-name-id");
const modalAirDate = document.querySelector(".episodes-modal__series-date");
const modalCharactersContainer = document.querySelector(".episodes-modal__characters-container");

function clearCharacters() {
  modalCharactersContainer.innerHTML = "";
}

async function renderCharacters(characterUrls) {
  clearCharacters();

  const limitedCharacterUrls = characterUrls.slice(0, 4);

  for (const url of limitedCharacterUrls) {
    try {
      const res = await fetch(url);
      const character = await res.json();
      const firstName = character.name.split(" ")[0];
      const card = document.createElement("div");
      card.classList.add("episodes-modal__characters-card");
      card.innerHTML = `
        <img
          class="episodes-modal__characters-image"
          src="${character.image}"
          alt="${character.name}"
        />
        <h3 class="episodes-modal__characters-name">${firstName}</h3>
      `;
      modalCharactersContainer.appendChild(card);
    } catch (error) {
      console.error(
        "Не вдалось отримати інформацію епізода через помилку:",
        error
      );
    }
  }
}

async function openModal(episodeId) {
  try {
    const res = await fetch(
      `https://rickandmortyapi.com/api/episode/${episodeId}`
    );
    const episode = await res.json();

    modalTitle.textContent = episode.name;
    modalId.textContent = episode.id.toString().padStart(3, "0");
    modalAirDate.textContent = episode.air_date;

    await renderCharacters(episode.characters);

    body.classList.add("show-modal", "no-scroll");
    modal.classList.remove("is-hidden");
  } catch (error) {
    console.error(
      "Не вдалось відкрити модальне вікно через помилку:",
      error
    );
  }
}

modalClose.addEventListener("click", () => {
  modal.classList.add("is-hidden");
  body.classList.remove("show-modal", "no-scroll");
});

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.classList.add("is-hidden");
    body.classList.remove("show-modal", "no-scroll");
  }
});

list.addEventListener("click", (event) => {
  const episodeItem = event.target.closest(".data-modal-open");
  if (!episodeItem) return;

  const episodeId = episodeItem.getAttribute("data-episode-id");
  if (!episodeId) return;

  openModal(episodeId);
});
