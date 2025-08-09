var e=globalThis,t={},s={},a=e.parcelRequire619d;null==a&&((a=function(e){if(e in t)return t[e].exports;if(e in s){var a=s[e];delete s[e];var o={id:e,exports:{}};return t[e]=o,a.call(o.exports,o,o.exports),o.exports}var i=Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){s[e]=t},e.parcelRequire619d=a);var o=a.register;o("2I3QM",function(e,t){let s=document.getElementById("character__list");s&&fetch("https://rickandmortyapi.com/api/character").then(e=>e.json()).then(e=>{s.innerHTML=e.results.map(e=>`
          <li>
            <img class="character__img-list" src="${e.image}" alt="${e.name}">
            <h2 class="character__name">${e.name}</h2>
            <h3 class="character__info">
            <span class="character__span">Origin:</span>  ${e.origin.name}
            </h3>
            <h3 class="character__info">
              <span class="character__span">Location:</span> ${e.location.name}
            </h3>
          </li>
        `).join("")}).catch(e=>{console.error("Помилка завантаження персонажів:",e),s.innerHTML="<li>Не вдалося завантажити дані.</li>"})}),o("bbdgV",function(e,t){let s=document.getElementById("character__list");if(!s)return;let a=document.querySelector(".backdrop"),o=document.body,i=document.querySelector(".see-modal__image"),n=document.querySelectorAll(".see-modal__status-people .see-modal__deteiling"),r=document.querySelector(".see-modal__item-2");async function c(e){try{let t=await fetch(`https://rickandmortyapi.com/api/character/${e}`),s=await t.json();i.src=s.image,i.alt=s.name;let c=[s.status,s.species,s.gender,s.origin.name];for(let e of(n.forEach((e,t)=>e.textContent=c[t]),r.innerHTML='<h1 class="see-modal__modal-title">Episodes</h1>',s.episode.slice(0,5))){let t=await fetch(e),s=await t.json(),a=s.episode.slice(1,3),o=`
        <div class="see-modal__episodas">
          <h2 class="see-modal__season-name">${s.name}</h2>
          <div class="see-modal__season-parameters">
            <div class="see-modal__help-div">
              <p class="see-modal__season">Season</p>
              <h3 class="see-modal__season-number">${a}</h3>
            </div>
            <div>
              <p class="see-modal__season-date">Air date</p>
              <h3 class="see-modal__season-date-number">${s.air_date}</h3>
            </div>
          </div>
        </div>
      `;r.innerHTML+=o}a.classList.add("active"),o.classList.add("no-scroll")}catch(e){console.error("Помилка при відкритті модалки:",e)}}a.addEventListener("click",e=>{e.target===a&&(a.classList.remove("active"),o.classList.remove("no-scroll"))}),fetch("https://rickandmortyapi.com/api/character").then(e=>e.json()).then(e=>{s.innerHTML=e.results.map(e=>`
        <li class="character-card" data-character-id="${e.id}">
          <img class="character__img-list" src="${e.image}" alt="${e.name}">
          <h2 class="character__name">${e.name}</h2>
          <h3 class="character__info">
            <span class="character__span">Origin:</span>  ${e.origin.name}
          </h3>
          <h3 class="character__info">
            <span class="character__span">Location:</span> ${e.location.name}
          </h3>
        </li>
      `).join(""),document.querySelectorAll(".character-card").forEach(e=>{e.addEventListener("click",()=>{c(e.getAttribute("data-character-id"))})})}).catch(e=>{})}),o("6gOyV",function(e,t){if(!document.querySelector(".episodes"))return;let s=document.querySelector(".episodes__input"),a=document.querySelector(".episodes__list"),o=document.querySelector(".episodes__load-more-btn"),i=document.querySelector(".episodes__error-image"),n=document.querySelector(".episodes__error-text"),r=document.querySelector(".episodes__error"),c=document.querySelector(".episodes__custom-select"),l=c.querySelector(".episodes__custom-select-trigger");c.querySelector(".episodes__custom-select-options");let d=c.querySelectorAll(".episodes__custom-select-option"),m=1;async function u(e){try{let t=await fetch(`https://rickandmortyapi.com/api/episode?page=${e}`);return await t.json()}catch(e){console.log("Не вдалось отримати серії через помилку",e)}}async function p(e){return e.map(e=>{let t=e.episode.slice(1,3),s=e.name.length>25?e.name.slice(0,25)+"...":e.name,a=`season-${t}`;return`<li class="episodes__list-item data-modal-open ${a}" data-episode-id="${e.id}">
      <div class="episodes__list-boxing">
        <h2 class="episodes__list-item-text">${s}</h2>
        <div class="episodes__list-item-container">
          <div class="episodes__list-item-div">
            <h2 class="episodes__list-item-season">Season</h2>
            <p class="episodes__list-item-season-number">${t}</p>
          </div>
          <div class="episodes__list-item-box">
            <h2 class="episodes__list-item-date">Air Date</h2>
            <p class="episodes__list-item-season-date">${e.air_date}</p>
          </div>
        </div>
      </div>
    </li>`}).join("")}l.addEventListener("click",()=>{c.classList.toggle("open")}),d.forEach(e=>{e.addEventListener("click",async()=>{let t=e.getAttribute("data-value");if(l.textContent=e.textContent,d.forEach(e=>e.classList.remove("active")),e.classList.add("active"),a.innerHTML="","All"===t){let e=await u(1);a.innerHTML=await p(e.results),o.disabled=!1,o.textContent="Load more",o.style.backgroundColor="",m=1}else{let e=[],s=1;for(;;){let t=await u(s);if(!t||!t.results||(e=e.concat(t.results),!t.info.next))break;s++}let i=e.filter(e=>e.episode.slice(1,3)===t);a.innerHTML=await p(i),o.disabled=!0,o.textContent="Фільтрація за сезоном",o.style.backgroundColor="#ccc"}})}),document.addEventListener("click",e=>{c.contains(e.target)||c.classList.remove("open")}),s.addEventListener("input",async()=>{let e=s.value.trim().toLowerCase();if(a.innerHTML="",!e){let e=await u(1);a.innerHTML=await p(e.results),m=1,o.disabled=!1,o.textContent="Load more",o.style.backgroundColor="";return}let t=[],i=1;for(;;){let e=await u(i);if(!e||!e.results||(t=t.concat(e.results),!e.info.next))break;i++}let n=t.filter(t=>t.name.toLowerCase().includes(e));a.innerHTML=await p(n),o.disabled=!0,o.textContent="Пошук завершено",o.style.backgroundColor="#ccc"}),o.addEventListener("click",async()=>{m++;let e=await u(m);if(!e||!e.results){o.disabled=!0,o.textContent="Епізоди закінчились",o.style.backgroundColor="#ccc";return}let t=await p(e.results);a.innerHTML+=t}),async function(){try{let e=await u(m);a.innerHTML=await p(e.results),r.classList.remove("active"),i.classList.remove("active"),n.style.display="none",o.style.display="inline-flex"}catch(e){console.log("Помилка при рендері серій",e),r.classList.add("active"),i.classList.add("active"),n.style.display="block",o.style.display="none"}}();let _=[];!async function(){let e=1,t=[];for(;;){let s=await u(e);if(!s||!s.results||(t=t.concat(s.results),!s.info.next))break;e++}_=t}(),d.forEach(e=>{e.addEventListener("click",t=>{t.preventDefault();let s=e.getAttribute("data-value"),o=e.nextElementSibling;if(o&&o.classList.contains("episodes__custom-suboptions"))return void o.remove();if(c.querySelectorAll(".episodes__custom-suboptions").forEach(e=>e.remove()),"All"!==s){let t=function(e){let t=_.filter(t=>t.episode.slice(1,3)===e),s=document.createElement("div");return s.classList.add("episodes__custom-suboptions"),s.style.marginLeft="20px",t.forEach(e=>{let t=document.createElement("div");t.classList.add("episodes__custom-select-option","episode-option"),t.textContent=e.name,t.dataset.episodeId=e.id,t.addEventListener("click",async t=>{t.stopPropagation(),a.innerHTML=await p([e])}),s.appendChild(t)}),s}(s);e.after(t)}})})}),o("j3nxa",function(e,t){let s=document.querySelector(".episodes__list");if(!s)return;let a=document.querySelector(".data-modal"),o=document.querySelector(".data-modal-close"),i=document.body,n=document.querySelector(".episodes-modal__series-name"),r=document.querySelector(".episodes-modal__series-name-id"),c=document.querySelector(".episodes-modal__series-date"),l=document.querySelector(".episodes-modal__characters-container");async function d(e){for(let t of(l.innerHTML="",e.slice(0,4)))try{let e=await fetch(t),s=await e.json(),a=s.name.split(" ")[0],o=document.createElement("div");o.classList.add("episodes-modal__characters-card"),o.innerHTML=`
        <img
          class="episodes-modal__characters-image"
          src="${s.image}"
          alt="${s.name}"
        />
        <h3 class="episodes-modal__characters-name">${a}</h3>
      `,l.appendChild(o)}catch(e){console.error("Не вдалось отримати інформацію епізода через помилку:",e)}}async function m(e){try{let t=await fetch(`https://rickandmortyapi.com/api/episode/${e}`),s=await t.json();n.textContent=s.name,r.textContent=s.id.toString().padStart(3,"0"),c.textContent=s.air_date,await d(s.characters),i.classList.add("show-modal","no-scroll"),a.classList.remove("is-hidden")}catch(e){console.error("Не вдалось відкрити модальне вікно через помилку:",e)}}o.addEventListener("click",()=>{a.classList.add("is-hidden"),i.classList.remove("show-modal","no-scroll")}),a.addEventListener("click",e=>{e.target===a&&(a.classList.add("is-hidden"),i.classList.remove("show-modal","no-scroll"))}),s.addEventListener("click",e=>{let t=e.target.closest(".data-modal-open");if(!t)return;let s=t.getAttribute("data-episode-id");s&&m(s)})}),o("cgEE3",function(e,t){let s=document.querySelector(".explore__box");if(!s)return;let a=Array.from(s.children);for(let e=0;e<2;e++)a.forEach(e=>s.appendChild(e.cloneNode(!0)));s.style.gap="33px";let o=a[0].offsetWidth,i=a.length,n=o*i+33*(i-1),r=0;!function e(){Math.abs(r-=1.5)>=n&&(r+=n),s.style.transform=`translateX(${r}px)`,requestAnimationFrame(e)}()}),o("7gSKI",function(e,t){let s=document.getElementById("slides");if(!s)return;let a=document.querySelectorAll(".pagination button"),o=0;function i(e){let t=s.querySelector(".slide").offsetWidth;s.style.transition="0.3s transform",s.style.transform=`translateX(-${e*t}px)`,a.forEach(e=>e.classList.remove("active")),a[e].classList.add("active"),o=e}a.forEach(e=>{e.addEventListener("click",()=>{i(parseInt(e.getAttribute("data-index"),10))})}),window.addEventListener("resize",()=>{i(o)}),i(0)}),document.querySelector(".header__burger").addEventListener("click",function(){document.querySelector(".header__list").classList.toggle("active")}),a("2I3QM"),a("bbdgV"),a("6gOyV"),a("j3nxa"),a("cgEE3"),document.addEventListener("DOMContentLoaded",()=>{let e=document.querySelector(".hero__button-tobottom"),t=document.querySelector(".footer");e&&t?e.addEventListener("click",()=>{t.scrollIntoView({behavior:"smooth"})}):console.warn("Кнопка або футер не знайдені в DOM")}),a("7gSKI");
//# sourceMappingURL=rick-and-morty.29b415ef.js.map
