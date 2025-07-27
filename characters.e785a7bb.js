const e=document.querySelector(".explore__box"),t=Array.from(e.children);for(let o=0;o<2;o++)t.forEach(t=>e.appendChild(t.cloneNode(!0)));e.style.gap="33px";const o=t[0].offsetWidth,r=t.length,n=o*r+33*(r-1);let a=0;!function t(){Math.abs(a-=1.5)>=n&&(a+=n),e.style.transform=`translateX(${a}px)`,requestAnimationFrame(t)}();
//# sourceMappingURL=characters.e785a7bb.js.map
