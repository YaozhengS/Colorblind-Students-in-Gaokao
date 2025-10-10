let timeCount = 0;
const timeThreshold = 149;
let inputDetected = false;
let pageTitleHidden = true;

function printWidth(){
    console.log("width: ", window.innerWidth);
}

const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
    initPosition: {x: 0, y: 0},
});

function restart(){
    document.querySelector("#restartButton").addEventListener("click", () =>{
        location.reload();
        console.log("page refreshed");
    })
}

//viewer input detection and auto refresh (reset for next viewer) if wait time exceeded

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
            location.reload();
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

//restart button & page title auto show/hide

scroll.on("call", (func, direction, obj) =>{
    const title1 = document.getElementById("pageTitle1");
    const title2 = document.getElementById("pageTitle2");
    const button = document.querySelector("#restartButton");

    if(func == "atOpeningPage"){
        title1.style.opacity = "0";
        title2.style.opacity = "0";
        button.style.opacity = "0";
        title1.style.pointerEvents = "none";
        title2.style.pointerEvents = "none";
        button.style.pointerEvents = "none";
    }
    if(func == "atRegularPage"){
        title1.style.opacity = "1";
        title2.style.opacity = "1";
        button.style.opacity = "1";
        title1.style.pointerEvents = "auto";
        title2.style.pointerEvents = "auto";
        button.style.pointerEvents = "auto";
    }
    if(func == "atEndingPage"){
        title1.style.opacity = "0";
        title2.style.opacity = "0";
        button.style.opacity = "1";
        title1.style.pointerEvents = "none";
        title2.style.pointerEvents = "none";
        button.style.pointerEvents = "auto";
    }
})

//percentage dots animation

scroll.on("call", (func, direction, obj) => {
    if(func == "n207animateA"){
        document.querySelector("#n207imgA").style.opacity = "1";
    }
    if(func == "n207animateB"){
        document.querySelector("#n207imgB").style.opacity = "1";
    }
    if(func == "n207animateC"){
        document.querySelector("#n207imgC").style.opacity = "1";
    }
    if(func == "n208animate"){
        document.querySelector("#n208img").style.opacity = "1";
    }
    if(func == "n209animate"){
        document.querySelector("#n209img").style.opacity = "1";
    }
    if(func == "n210animate"){
        document.querySelector("#n210img").style.opacity = "1";
    }
})

// startDetecting();
restart();
// setInterval(autoRestart, 1000); 
// //auto restart for exhibit has been disabled