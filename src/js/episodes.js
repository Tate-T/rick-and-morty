const form = document.querySelector(".episodes");
if (!form) return;
const input = document.querySelector(".episodes__input");
const list = document.querySelector(".episodes__list");
const loadMoreBtn = document.querySelector(".episodes__load-more-btn");
const errorImage = document.querySelector(".episodes__error-image");
const errorText = document.querySelector(".episodes__error-text");
const errorContainer = document.querySelector(".episodes__error");
const customSelect = document.querySelector(".episodes__custom-select");
const trigger = customSelect.querySelector(".episodes__custom-select-trigger");
const optionsContainer = customSelect.querySelector(".episodes__custom-select-options");
const options = customSelect.querySelectorAll(".episodes__custom-select-option");
let currentPage = 1;
let selectedSeason = "All";

trigger.addEventListener("click", () => {
  customSelect.classList.toggle("open");
});

options.forEach(option => {
  option.addEventListener("click", async () => {
    const value = option.getAttribute("data-value");
    const label = option.textContent;
    selectedSeason = value;
    trigger.textContent = label;
    options.forEach(option => option.classList.remove("active"));
    option.classList.add("active");
    list.innerHTML = "";

    if (value === "All") {
      const data = await getEpisodes(1);
      const markup = await renderEpisodes(data.results);
      list.innerHTML = markup;

      loadMoreBtn.disabled = false;
      loadMoreBtn.textContent = "Load more";
      loadMoreBtn.style.backgroundColor = "";
      currentPage = 1;
    } else {
      let allEpisodes = [];
      let page = 1;

      while (true) {
        const data = await getEpisodes(page);
        if (!data || !data.results) break;
        allEpisodes = allEpisodes.concat(data.results);
        if (!data.info.next) break;
        page++;
      }

      const filteredEpisodes = allEpisodes.filter(
        (episode) => episode.episode.slice(1, 3) === value
      );

      const markup = await renderEpisodes(filteredEpisodes);
      list.innerHTML = markup;

      loadMoreBtn.disabled = true;
      loadMoreBtn.textContent = "Фільтрація за сезоном";
      loadMoreBtn.style.backgroundColor = "#ccc";
    }
  });
});

document.addEventListener("click", (e) => {
  if (!customSelect.contains(e.target)) {
    customSelect.classList.remove("open");
  }
});


async function getEpisodes(currentPage) {
  try {
    const fetching = await fetch(
      `https://rickandmortyapi.com/api/episode?page=${currentPage}`
    );
    const response = await fetching.json();
    return response;
  } catch (error) {
    console.log("Не вдалось отримати серії через помилку", error);
  }
}

async function renderEpisodes(episodes) {
  return episodes
    .map((episode) => {
      const season = episode.episode.slice(1, 3);
      const maxLength = 25;
      const shortName =
        episode.name.length > maxLength
          ? episode.name.slice(0, maxLength) + "..."
          : episode.name;
      const seasonClass = `season-${season}`;
      return `<li class="episodes__list-item data-modal-open ${seasonClass}" data-episode-id="${episode.id}">
      <div class="episodes__list-boxing">
        <h2 class="episodes__list-item-text">${shortName}</h2>
        <div class="episodes__list-item-container">
          <div class="episodes__list-item-div">
            <h2 class="episodes__list-item-season">Season</h2>
            <p class="episodes__list-item-season-number">${season}</p>
          </div>
          <div class="episodes__list-item-box">
            <h2 class="episodes__list-item-date">Air Date</h2>
            <p class="episodes__list-item-season-date">${episode.air_date}</p>
          </div>
        </div>
      </div>
    </li>`;
    })
    .join("");
}

input.addEventListener("input", async () => {
  const query = input.value.trim().toLowerCase();
  list.innerHTML = "";

  if (!query) {
    const data = await getEpisodes(1);
    const markup = await renderEpisodes(data.results);
    list.innerHTML = markup;
    currentPage = 1;
    loadMoreBtn.disabled = false;
    loadMoreBtn.textContent = "Load more";
    loadMoreBtn.style.backgroundColor = "";
    return;
  }
  let allEpisodes = [];
  let page = 1;
  while (true) {
    const data = await getEpisodes(page);
    if (!data || !data.results) break;
    allEpisodes = allEpisodes.concat(data.results);
    if (!data.info.next) break;
    page++;
  }
  const filteredEpisodes = allEpisodes.filter((episode) =>
    episode.name.toLowerCase().includes(query)
  );
  const markup = await renderEpisodes(filteredEpisodes);
  list.innerHTML = markup;
  loadMoreBtn.disabled = true;
  loadMoreBtn.textContent = "Пошук завершено";
  loadMoreBtn.style.backgroundColor = "#ccc";
});


loadMoreBtn.addEventListener("click", async () => {
  currentPage++;
  const newEpisodes = await getEpisodes(currentPage);

  if (!newEpisodes || !newEpisodes.results) {
    loadMoreBtn.disabled = true;
    loadMoreBtn.textContent = "Епізоди закінчились";
    loadMoreBtn.style.backgroundColor = "#ccc";
    return;
  }

  const newMarkup = await renderEpisodes(newEpisodes.results);
  list.innerHTML += newMarkup;
});
async function addEpisodesToDOM() {
  try {
    const data = await getEpisodes(currentPage);
    const markup = await renderEpisodes(data.results);
    list.innerHTML = markup;
    errorContainer.classList.remove("active");
    errorImage.classList.remove("active");
    errorText.style.display = "none";
    loadMoreBtn.style.display = "inline-flex";
  } catch (error) {
    console.log("Помилка при рендері серій", error);
    errorContainer.classList.add("active");
    errorImage.classList.add("active");
    errorText.style.display = "block";
    loadMoreBtn.style.display = "none";
  }
}

addEpisodesToDOM();


let allEpisodes = [];

async function loadAllEpisodesOnce() {
  let page = 1;
  let episodes = [];
  while (true) {
    const data = await getEpisodes(page);
    if (!data || !data.results) break;
    episodes = episodes.concat(data.results);
    if (!data.info.next) break;
    page++;
  }
  allEpisodes = episodes;
}
loadAllEpisodesOnce();

function createEpisodesListForSeason(seasonValue) {
  const filteredEpisodes = allEpisodes.filter(ep => ep.episode.slice(1, 3) === seasonValue);

  const container = document.createElement("div");
  container.classList.add("episodes__custom-suboptions");
  container.style.marginLeft = "20px";

  filteredEpisodes.forEach(ep => {
    const epDiv = document.createElement("div");
    epDiv.classList.add("episodes__custom-select-option", "episode-option");
    epDiv.textContent = ep.name;
    epDiv.dataset.episodeId = ep.id;

    epDiv.addEventListener("click", async (e) => {
      e.stopPropagation();
      const markup = await renderEpisodes([ep]);
      list.innerHTML = markup;
    });

    container.appendChild(epDiv);
  });

  return container;
}
options.forEach(option => {
  option.addEventListener("click", (e) => {
    e.preventDefault();

    const value = option.getAttribute("data-value");
    const nextElem = option.nextElementSibling;
    if (nextElem && nextElem.classList.contains("episodes__custom-suboptions")) {
      nextElem.remove();
      return;
    }
    const openedSubs = customSelect.querySelectorAll(".episodes__custom-suboptions");
    openedSubs.forEach(sub => sub.remove());

    if (value !== "All") {
      const episodesList = createEpisodesListForSeason(value);
      option.after(episodesList);
    }

  });
});

