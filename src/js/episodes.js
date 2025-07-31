const form = document.querySelector('.episodes');
const input = document.querySelector('.episodes__input');
const select = document.querySelector('.episodes__season-select');
const list = document.querySelector('.episodes__list');
const loadMoreBtn = document.querySelector('.episodes__load-more-btn');

async function getEpisodes () {
    try{
        const fetching = await fetch(`https://rickandmortyapi.com/api/episode`);
        const response = await fetching.json();
        return response;
    } catch (error) {
      console.log("Не вдалось отримати серії через помилку", error)
    }
}

async function renderEpisodes (episodes) {
      return episodes.map((episode) => {
     const season = episode.episode.slice(1, 3);
    const maxLength = 25;
    const shortName = episode.name.length > maxLength
      ? episode.name.slice(0, maxLength) + '...'
      : episode.name;
     const seasonClass = `season-${season}`;
    return `<li class="episodes__list-item ${seasonClass}">
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
  </li>
  `;
}).join("")
};

async function addEpisodesToDOM () {
    try {
    const data = await getEpisodes();
    const markup = await renderEpisodes(data.results);
    list.innerHTML = markup;
  } catch (error) {
    console.log("Помилка при рендері серій", error);
  }
}

addEpisodesToDOM();