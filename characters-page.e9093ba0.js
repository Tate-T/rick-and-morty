document.querySelector(".header__burger").addEventListener("click",function(){document.querySelector(".header__list").classList.toggle("active")}),document.querySelector(".episodes"),document.querySelector(".episodes__input"),document.querySelector(".episodes__season-select");const e=document.querySelector(".episodes__list");async function s(){try{let e=await fetch("https://rickandmortyapi.com/api/episode");return await e.json()}catch(e){console.log("Не вдалось отримати серії через помилку",e)}}async function t(e){return e.map(e=>{let s=e.episode.slice(1,3),t=e.name.length>25?e.name.slice(0,25)+"...":e.name,i=`season-${s}`;return`<li class="episodes__list-item ${i}">
    <div class="episodes__list-boxing">
    <h2 class="episodes__list-item-text">${t}</h2>
    <div class="episodes__list-item-container">
      <div class="episodes__list-item-div">
        <h2 class="episodes__list-item-season">Season</h2>
        <p class="episodes__list-item-season-number">${s}</p>
      </div>
      <div class="episodes__list-item-box">
        <h2 class="episodes__list-item-date">Air Date</h2>
        <p class="episodes__list-item-season-date">${e.air_date}</p>
      </div>
    </div>
    </div>
  </li>
  `}).join("")}document.querySelector(".episodes__load-more-btn"),async function(){try{let i=await s();e.innerHTML=await t(i.results)}catch(e){console.log("Помилка при рендері серій",e)}}();const i=document.querySelector(".explore__box"),o=Array.from(i.children);for(let e=0;e<2;e++)o.forEach(e=>i.appendChild(e.cloneNode(!0)));i.style.gap="33px";const n=o[0].offsetWidth,a=o.length,l=n*a+33*(a-1);let c=0;!function e(){Math.abs(c-=1.5)>=l&&(c+=l),i.style.transform=`translateX(${c}px)`,requestAnimationFrame(e)}();
//# sourceMappingURL=characters-page.e9093ba0.js.map
