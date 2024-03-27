const paras = [
    "The world has 7 continents in the world namely the asia, africa, north Amaerica and all." ,
    "Phatik Chakravarti was the ring-leader amongst the boys of the village. One day a plan for new mischief entered his head. There was a heavy log lying on the mud-flat of the river, waiting to be shaped into a mast for a boat. His plan was that they should all work together to shift the log by main force from its place and roll it away. The owner of the log would be angry and surprised, while they would all enjoy the fun. Every one supported the proposal, and it was carried unanimously." ,
    "Muammar Gaddafi came to power in Libya in 1969 and ruled the country as a dictator until his death in 2011. He was the longest ruling leader in the Middle East and Northern Africa. At 27 he overthrew the Libyan king when he was in Turkey for medical treatment. During the last few years of his rule Gaddafi tried to gain international recognition and become a statesman.",
];

const typing =document.querySelector('.typing p');
const inputField=document.querySelector(".wrapper .input-text")
const btn=document.querySelector(".content button");
const timeTag=document.querySelector(".time span b");
const mistakeTag=document.querySelector(".mistake span");
const wpmTag=document.querySelector(".wpm span");
const cpmTag =document.querySelector(".cpm span");
let timer;
let maxTime=60;
let timeLeft=maxTime;
let charIndex = mistakes = isTyping=0;

function loadpara(){
    const ranIndex=Math.floor(Math.random() * paras.length );
    typing.innerHTML="";
    paras[ranIndex].split("").forEach(c => { 
        console.log(c);
        let span=`<span>${c}</span>`
        typing.innerHTML+=span;
    });
    typing.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", ()=> inputField.focus());
    typing.addEventListener("click",()=>inputField.focus());
}
function initTyping() {
    let char = typing.querySelectorAll("span");
    let typedChar = inputField.value;

    if (charIndex < char.length && timeLeft > 0) {
        if (!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }

        // Compare the current character being typed with the corresponding character in the paragraph
        if (typedChar[charIndex] !== undefined) {
            if (char[charIndex].innerText === typedChar[charIndex]) {
                char[charIndex].classList.add("correct");
            } else {
                mistakes++;
                char[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }

        char.forEach(span => span.classList.remove("active"));
        char[charIndex].classList.add("active");

        let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        wpmTag.innerText = wpm;
        mistakeTag.innerText = mistakes;
        cpmTag.innerText = charIndex - mistakes;
    } else {
        clearInterval(timer);
        inputField.value = "";
    }
}

function initTimer(){
    if(timeLeft>0){
        timeLeft--;
        timeTag.innerText=timeLeft;
        let wpm=Math.round(((charIndex-mistakes)/5) / (maxTime-timeLeft)*60);
        wpmTag.innerText=wpm;
    }else{
        clearInterval(timer);
    }
}
function reset(){
    loadpara();
    clearInterval(timer);
    timeLeft=maxTime;
    charIndex=mistakes=isTyping=0;
    inputField.value="";
    timeTag.innerText=timeLeft;
    wpmTag.innerText=0;
    mistakeTag.innerText=0;
    cpmTag.innerText=0;
}
loadpara();
inputField.addEventListener("input",initTyping);
btn.addEventListener("click",reset);



