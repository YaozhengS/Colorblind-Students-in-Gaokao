let timeCount = 0;
const timeThreshold = 119;
let inputDetected = false;
const hideThreshold = 50;

const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: false,
    initPosition: {x: 0, y: 0},
});

function startDetecting(){
    document.addEventListener("click", ()=>{inputDetected = true;});
    document.addEventListener("mousemove", ()=>{inputDetected = true;});
    document.addEventListener("mousedown", ()=>{inputDetected = true;});
    document.addEventListener("wheel", ()=>{inputDetected = true;});
    document.addEventListener("keydown", ()=>{inputDetected = true;});
    document.addEventListener("keyup", ()=>{inputDetected = true;});
}

function autoRestart(){
    if(!inputDetected){
        if(timeCount > timeThreshold){
            window.location.href = "./index.html";
            console.log("session timeout, page refreshed");
        }else{
            timeCount++;
            // console.log("session inactive: ", timeCount, "s");
        }
    }else{
       inputDetected = false;
       timeCount = 0; 
    }
}

scroll.on("scroll", (data) => {
    const scrollY = data.scroll.y;
    const title1 = document.getElementById("auxPageTitle1");
    const title2 = document.getElementById("auxPageTitle2");

    if (scrollY > hideThreshold) {
        title1.style.opacity = "0";
        title2.style.opacity = "0";
        title1.style.pointerEvents = "none";
        title2.style.pointerEvents = "none";
    } else {
        title1.style.opacity = "1";
        title2.style.opacity = "1";
        title1.style.pointerEvents = "auto";
        title2.style.pointerEvents = "auto";
    }
});

startDetecting();
setInterval(autoRestart, 1000);