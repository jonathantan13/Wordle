let e,t,n,o,r;const l=document.querySelector(".guesses-container"),c=document.querySelector(".keyboard"),s=document.querySelector(".header"),a=document.querySelector(".retry-btn"),i=function(){e=1,t=1,r=!0,s.textContent="Welcome to wordle!",l.innerHTML="";let n="";for(let e=0;e<6;e++)n+=`
        <div class="row-guesses row-${e+1}">
            <div class="letter col-1"></div>
            <div class="letter col-2"></div>
            <div class="letter col-3"></div>
            <div class="letter col-4"></div>
            <div class="letter col-5"></div>
        </div>
    `;l.innerHTML=n},d=function(e,t){o=(n=document.querySelector(`.row-${e}`)).children[t-1]},u=function(){e<=6&&e++,t=1},v=function(t){let n="apple",o=n.split(""),l=[...o];for(let e=0;e<n.length;e++)o[e]==t[e].textContent.toLowerCase()&&(t[e].classList.add("correct-letter"),l[e]=null);if(t.map(e=>{let t=e.textContent.toLowerCase();if(l.includes(t)){e.classList.add("partial-correct");let n=l.indexOf(t);l[n]=null}else e.classList.add("wrong-letter")}),console.log(t.map(e=>e.textContent).join("").toLowerCase()),t.map(e=>e.textContent).join("").toLowerCase()===n){s.textContent=`You win! the word was ${n}`,r=!1;return}e<6?u():(s.textContent=`You lost! the word was ${n}`,r=!1)};i();let w=!1;c.addEventListener("click",l=>{l.preventDefault();let c=l.target,s=c.dataset.letter;if(!c.hasAttribute("data-letter")||!r||w)return;w=!0,d(e,t),t<=5&&"backspace"!==s&&"enter"!==s&&(""==o.textContent&&o.append(c.textContent),t<=5&&t++),"backspace"===s&&t>=1&&(t>1&&t--,d(e,t),o.innerHTML="");let a=Array.from(n.children);"enter"===s&&a.every(e=>""!==e.textContent)&&v(a),setTimeout(()=>w=!1,100)}),a.addEventListener("click",i);
//# sourceMappingURL=wordle.289a8934.js.map
