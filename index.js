//global constant
const fieldWidth = 652;
const fieldHeight = 400;
const diameter = 70;

const maxLeft = fieldWidth - diameter - 2;
const maxTop = fieldHeight - diameter - 2;
const vx = 5;
const vy = 5;

//global variable
let running = false;
let x = (fieldWidth - diameter) / 2;
let y = (fieldHeight - diameter) / 2;
let goRight = true;
let goDown = true;

const run = () => {
    running = !running;
    render();
}



const calculate = () => {
    if (goRight) {
        x = x + vx;
        if (x > maxLeft) {
            x = maxLeft;
            goRight = false;
        }
    } else {
        x = x - vx;
        if (x < 0) {
            x = 0;
            goRight = true;
        }
    }

    if (goDown) {
        y = y + vy;
        if (y >= maxTop) {
            goDown = false;
        }
    } else {
        y = y - vy;
        if (y < 0) {
            goDown = true;
        }
    }
}

//ball images
const ballImages = {
  basketball: "public/balls/basketball.png",
  football: "public/balls/football.png",
  volleyball: "public/balls/volleyball.png",
  human: "public/balls/human.jpeg",
  cartoon: "public/balls/cartoon.png",
  logo: "public/balls/logo.png",
};

//add keyboard event listener
document.addEventListener("keydown", (event) => {
  if (event.key === " ") { // spacebar to toggle run/stop
    run();
  } else if (event.key === "0") { // 0 for none
    selectBall("none");
  } else if (event.key === "1") { // 1 for basketball
    selectBall("basketball");
  } else if (event.key === "2") { // 2 for football
    selectBall("football");
  } else if (event.key === "3") { // 3 for volleyball
    selectBall("volleyball");
  } else if (event.key === "4") { // 4 for human
    selectBall("human");
  } else if (event.key === "5") { // 5 for cartoon
    selectBall("cartoon");
  } else if (event.key === "6") { // 6 for logo
    selectBall("logo");
  }
});

//function to change ball image
function selectBall(ballType) {
  const ballImg = document.getElementById("ball");
  if (!ballImg) return;

  if (ballType === "none") {
    ballImg.src = "";   // ว่างเปล่า
  } else {
    ballImg.src = ballImages[ballType] || "";
  }
}



const render = () => {
    const btn = document.getElementById("run");
    //run button
    if (running) {
        btn.innerHTML = " <i class='bi bi-stop-circle'></i>&nbsp;Stop";
        btn.classList.remove("btn-success");
        btn.classList.add("btn-danger");
    } else {
        btn.innerHTML = "<i class='bi bi-play-circle'></i>&nbsp;Run";
        btn.classList.remove("btn-danger");
        btn.classList.add("btn-success");
    }
    

    //ball position
    document.getElementById("ball").style.left = x + "px";
    document.getElementById("ball").style.top = y + "px";
}   

const process = () => {
    if (running) {
        calculate();
        render();
    } 
}

const initial = () => {
    //field
    document.getElementById("field").style.width = fieldWidth + "px";
    document.getElementById("field").style.height = fieldHeight + "px";

    //ball
    document.getElementById("ball").style.width = diameter + "px";
    document.getElementById("ball").style.height = diameter + "px";
}

document.addEventListener("DOMContentLoaded", () => {
    initial();
    // animation 40frame/s  
    setInterval(process, 25);
    });

