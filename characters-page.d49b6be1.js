var e=globalThis,t={},a={},s=e.parcelRequire619d;null==s&&((s=function(e){if(e in t)return t[e].exports;if(e in a){var s=a[e];delete a[e];var n={id:e,exports:{}};return t[e]=n,s.call(n.exports,n,n.exports),n.exports}var r=Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,t){a[e]=t},e.parcelRequire619d=s);var n=s.register;n("2I3QM",function(e,t){let a=document.getElementById("character__list"),s=document.querySelector(".character__load-more");if(!a||!s)return;let n=1,r=!1;function i(e){r=!0,fetch(`https://rickandmortyapi.com/api/character?page=${e}`).then(e=>e.json()).then(e=>{let t=e.results;a.innerHTML+=t.map(e=>`
        <li>
          <img class="character__img-list" src="${e.image}" alt="${e.name}">
          <h2 class="character__name">${e.name}</h2>
          <h3 class="character__info character__origin">
            <span class="character__span">Origin:</span> ${e.origin.name}
          </h3>
          <h3 id="location" class="character__info character__location">
            <span class="character__span">Location:</span> ${e.location.name}
          </h3>
        </li>
      `).join(""),e.info.next||(s.style.display="none")}).catch(e=>{console.error("Помилка завантаження персонажів:",e),a.innerHTML+="<li>Не вдалося завантажити дані.</li>"}).finally(()=>{r=!1})}i(1),s.addEventListener("click",()=>{r||i(++n)}),document.addEventListener("DOMContentLoaded",()=>{let e=document.querySelector(".character__input"),t=document.querySelectorAll(".character__filter-container select"),a=document.querySelector(".character__list"),s=document.querySelector(".character__search-button"),n=a.innerHTML;function r(e,t){return t?(t=t.trim().toLowerCase(),"gender"===e&&"all"===t)?"":t:""}async function i(){if(function(){if(""!==e.value.trim())return!1;for(let e of t)if(""!==r(e.previousElementSibling.textContent.toLowerCase(),e.value))return!1;return!0}()){a.innerHTML=n;return}a.innerHTML="<li>Loading...</li>";try{let s=await fetch(function(){let a=new URLSearchParams,s=e.value.trim();return s&&a.append("name",s),t.forEach(e=>{let t=e.previousElementSibling.textContent.toLowerCase(),s=r(t,e.value);s&&a.append(t,s)}),"https://rickandmortyapi.com/api/character/"+(a.toString()?`?${a.toString()}`:"")}());if(!s.ok)throw Error("No characters found");let n=await s.json();if(!n.results||0===n.results.length){a.innerHTML="<li>No characters found.</li>";return}a.innerHTML="",n.results.forEach(e=>{let t=document.createElement("li");t.className="character__item",t.innerHTML=`
          <img src="${e.image}" alt="${e.name}" width="50" height="50" style="vertical-align: middle; border-radius: 50%; margin-right: 10px;">
          <strong>${e.name}</strong> \u{2014} ${e.status}, ${e.species}, ${e.gender}
        `,a.appendChild(t)})}catch(e){a.innerHTML=`<li>${e.message}</li>`}}e.addEventListener("input",i),t.forEach(e=>e.addEventListener("change",i)),s.addEventListener("click",e=>{e.preventDefault(),i()})})}),n("bbdgV",function(e,t){let a=document.getElementById("character__list");if(!a)return;let s=document.querySelector(".backdrop"),n=document.body,r=document.querySelector(".see-modal__image"),i=document.querySelectorAll(".see-modal__status-people .see-modal__deteiling"),o=document.querySelector(".see-modal__item-2");async function c(e){let t=await fetch(`https://rickandmortyapi.com/api/character/${e}`),a=await t.json();r.src=a.image,r.alt=a.name;let c=[a.status,a.species,a.gender,a.origin.name];for(let e of(i.forEach((e,t)=>e.textContent=c[t]),o.innerHTML='<h1 class="see-modal__modal-title">Episodes</h1>',a.episode.slice(0,5))){let t=await fetch(e),a=await t.json(),s=a.episode.slice(1,3),n=`
        <div class="see-modal__episodas">
          <h2 class="see-modal__season-name">${a.name}</h2>
          <div class="see-modal__season-parameters">
            <div class="see-modal__help-div">
              <p class="see-modal__season">Season</p>
              <h3 class="see-modal__season-number">${s}</h3>
            </div>
            <div>
              <p class="see-modal__season-date">Air date</p>
              <h3 class="see-modal__season-date-number">${a.air_date}</h3>
            </div>
          </div>
        </div>
      `;o.innerHTML+=n}s.classList.add("active"),n.classList.add("no-scroll")}s.addEventListener("click",e=>{e.target===s&&(s.classList.remove("active"),n.classList.remove("no-scroll"))}),fetch("https://rickandmortyapi.com/api/character").then(e=>e.json()).then(e=>{a.innerHTML=e.results.map(e=>`
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
      `).join(""),document.querySelectorAll(".character-card").forEach(e=>{e.addEventListener("click",()=>{c(e.getAttribute("data-character-id"))})})})}),n("6gOyV",function(e,t){if(!document.querySelector(".episodes"))return;let a=document.querySelector(".episodes__input"),s=document.querySelector(".episodes__list"),n=document.querySelector(".episodes__load-more-btn"),r=document.querySelector(".episodes__error-image"),i=document.querySelector(".episodes__error-text"),o=document.querySelector(".episodes__error"),c=document.querySelector(".episodes__custom-select"),l=c.querySelector(".episodes__custom-select-trigger");c.querySelector(".episodes__custom-select-options");let d=c.querySelectorAll(".episodes__custom-select-option"),m=1;async function u(e){try{let t=await fetch(`https://rickandmortyapi.com/api/episode?page=${e}`);return await t.json()}catch(e){console.log("Не вдалось отримати серії через помилку",e)}}async function p(e){return e.map(e=>{let t=e.episode.slice(1,3),a=e.name.length>25?e.name.slice(0,25)+"...":e.name,s=`season-${t}`;return`<li class="episodes__list-item data-modal-open ${s}" data-episode-id="${e.id}">
      <div class="episodes__list-boxing">
        <h2 class="episodes__list-item-text">${a}</h2>
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
    </li>`}).join("")}l.addEventListener("click",()=>{c.classList.toggle("open")}),d.forEach(e=>{e.addEventListener("click",async()=>{let t=e.getAttribute("data-value");if(l.textContent=e.textContent,d.forEach(e=>e.classList.remove("active")),e.classList.add("active"),s.innerHTML="","All"===t){let e=await u(1);s.innerHTML=await p(e.results),n.disabled=!1,n.textContent="Load more",n.style.backgroundColor="",m=1}else{let e=[],a=1;for(;;){let t=await u(a);if(!t||!t.results||(e=e.concat(t.results),!t.info.next))break;a++}let r=e.filter(e=>e.episode.slice(1,3)===t);s.innerHTML=await p(r),n.disabled=!0,n.textContent="Фільтрація за сезоном",n.style.backgroundColor="#ccc"}})}),document.addEventListener("click",e=>{c.contains(e.target)||c.classList.remove("open")}),a.addEventListener("input",async()=>{let e=a.value.trim().toLowerCase();if(s.innerHTML="",!e){let e=await u(1);s.innerHTML=await p(e.results),m=1,n.disabled=!1,n.textContent="Load more",n.style.backgroundColor="";return}let t=[],r=1;for(;;){let e=await u(r);if(!e||!e.results||(t=t.concat(e.results),!e.info.next))break;r++}let i=t.filter(t=>t.name.toLowerCase().includes(e));s.innerHTML=await p(i),n.disabled=!0,n.textContent="Пошук завершено",n.style.backgroundColor="#ccc"}),n.addEventListener("click",async()=>{m++;let e=await u(m);if(!e||!e.results){n.disabled=!0,n.textContent="Епізоди закінчились",n.style.backgroundColor="#ccc";return}let t=await p(e.results);s.innerHTML+=t}),async function(){try{let e=await u(m);s.innerHTML=await p(e.results),o.classList.remove("active"),r.classList.remove("active"),i.style.display="none",n.style.display="inline-flex"}catch(e){console.log("Помилка при рендері серій",e),o.classList.add("active"),r.classList.add("active"),i.style.display="block",n.style.display="none"}}();let _=[];!async function(){let e=1,t=[];for(;;){let a=await u(e);if(!a||!a.results||(t=t.concat(a.results),!a.info.next))break;e++}_=t}(),d.forEach(e=>{e.addEventListener("click",t=>{t.preventDefault();let a=e.getAttribute("data-value"),n=e.nextElementSibling;if(n&&n.classList.contains("episodes__custom-suboptions"))return void n.remove();if(c.querySelectorAll(".episodes__custom-suboptions").forEach(e=>e.remove()),"All"!==a){let t=function(e){let t=_.filter(t=>t.episode.slice(1,3)===e),a=document.createElement("div");return a.classList.add("episodes__custom-suboptions"),a.style.marginLeft="20px",t.forEach(e=>{let t=document.createElement("div");t.classList.add("episodes__custom-select-option","episode-option"),t.textContent=e.name,t.dataset.episodeId=e.id,t.addEventListener("click",async t=>{t.stopPropagation(),s.innerHTML=await p([e])}),a.appendChild(t)}),a}(a);e.after(t)}})})}),n("j3nxa",function(e,t){let a=document.querySelector(".episodes__list");if(!a)return;let s=document.querySelector(".data-modal"),n=document.querySelector(".data-modal-close"),r=document.body,i=document.querySelector(".episodes-modal__series-name"),o=document.querySelector(".episodes-modal__series-name-id"),c=document.querySelector(".episodes-modal__series-date"),l=document.querySelector(".episodes-modal__characters-container");async function d(e){for(let t of(l.innerHTML="",e.slice(0,4)))try{let e=await fetch(t),a=await e.json(),s=a.name.split(" ")[0],n=document.createElement("div");n.classList.add("episodes-modal__characters-card"),n.innerHTML=`
        <img
          class="episodes-modal__characters-image"
          src="${a.image}"
          alt="${a.name}"
        />
        <h3 class="episodes-modal__characters-name">${s}</h3>
      `,l.appendChild(n)}catch(e){console.error("Не вдалось отримати інформацію епізода через помилку:",e)}}async function m(e){try{let t=await fetch(`https://rickandmortyapi.com/api/episode/${e}`),a=await t.json();i.textContent=a.name,o.textContent=a.id.toString().padStart(3,"0"),c.textContent=a.air_date,await d(a.characters),r.classList.add("show-modal","no-scroll"),s.classList.remove("is-hidden")}catch(e){console.error("Не вдалось відкрити модальне вікно через помилку:",e)}}n.addEventListener("click",()=>{s.classList.add("is-hidden"),r.classList.remove("show-modal","no-scroll")}),s.addEventListener("click",e=>{e.target===s&&(s.classList.add("is-hidden"),r.classList.remove("show-modal","no-scroll"))}),a.addEventListener("click",e=>{let t=e.target.closest(".data-modal-open");if(!t)return;let a=t.getAttribute("data-episode-id");a&&m(a)})}),n("cgEE3",function(e,t){let a=document.querySelector(".explore__box");if(!a)return;let s=Array.from(a.children);for(let e=0;e<2;e++)s.forEach(e=>a.appendChild(e.cloneNode(!0)));a.style.gap="33px";let n=s[0].offsetWidth,r=s.length,i=n*r+33*(r-1),o=0;!function e(){Math.abs(o-=1.5)>=i&&(o+=i),a.style.transform=`translateX(${o}px)`,requestAnimationFrame(e)}()}),n("7gSKI",function(e,t){let a=document.getElementById("slides");if(!a)return;let s=document.querySelectorAll(".pagination button"),n=0;function r(e){let t=a.querySelector(".slide").offsetWidth;a.style.transition="0.3s transform",a.style.transform=`translateX(-${e*t}px)`,s.forEach(e=>e.classList.remove("active")),s[e].classList.add("active"),n=e}s.forEach(e=>{e.addEventListener("click",()=>{r(parseInt(e.getAttribute("data-index"),10))})}),window.addEventListener("resize",()=>{r(n)}),r(0)});const r=document.querySelector(".backdrop-serch"),i=document.querySelector(".modal"),o=document.querySelector(".header__button-serch"),c=document.querySelector(".modal__close");document.querySelector(".header__burger").addEventListener("click",function(){document.querySelector(".header__list").classList.toggle("active")}),o.addEventListener("click",()=>{r.style.display="block",i.style.display="block"}),c.addEventListener("click",()=>{r.style.display="none",i.style.display="none"}),window.addEventListener("click",e=>{e.target===r&&(r.style.display="none",i.style.display="none")});const l=document.querySelector(".modal__input"),d=document.getElementById("modal__results");l.addEventListener("input",()=>{let e=l.value.trim();if(!e){d.innerHTML="";return}fetch(`https://rickandmortyapi.com/api/character/?name=${encodeURIComponent(e)}`).then(e=>e.json()).then(e=>{if(e.error){d.innerHTML="<li>Персонажа не знайдено \uD83D\uDE22</li>";return}d.innerHTML=e.results.map(e=>`
        <li class="modal__results-item">
          <img class="character__img-list" src="${e.image}" alt="${e.name}">
          <h2 class="header__name">${e.name}</h2>
          <h3 class="header__info">
            <span class="header__span">Origin:</span>  ${e.origin.name}
          </h3>
          <h3 class="header__info">
            <span class="header__span">Location:</span> ${e.location.name}
          </h3>
        </li>
      `).join("")})}),s("2I3QM"),s("bbdgV"),s("6gOyV"),s("j3nxa"),s("cgEE3"),document.addEventListener("DOMContentLoaded",()=>{let e=document.querySelector(".hero__button-tobottom"),t=document.querySelector(".footer");e&&t?e.addEventListener("click",()=>{t.scrollIntoView({behavior:"smooth"})}):console.warn("Кнопка або футер не знайдені в DOM")}),s("7gSKI");
//# sourceMappingURL=characters-page.d49b6be1.js.map
