const characterList = document.getElementById('character__list');
if (!characterList) return;

fetch('https://rickandmortyapi.com/api/character')
  .then(response => response.json())
  .then(data => {
    const characters = data.results;
    characterList.innerHTML = characters.map(character => `
          <li>
            <img class="character__img-list" src="${character.image}" alt="${character.name}">
            <h2 class="character__name">${character.name}</h2>
            <h3 class="character__info">
            <span class="character__span">Origin:</span>  ${character.origin.name}
            </h3>
            <h3 class="character__info">
              <span class="character__span">Location:</span> ${character.location.name}
            </h3>
          </li>
        `).join('');
  })
  .catch(error => {
    console.error('Помилка завантаження персонажів:', error);
    characterList.innerHTML = '<li>Не вдалося завантажити дані.</li>';
  });

