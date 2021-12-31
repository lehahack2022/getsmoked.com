let cigaretteLit = false;
let cigaretteRemaining = 100;
let zippoOpen = false;
let zippoLit = false;
let cigaretteInterval;

const zippoOpenSound = new Audio("./assets/zippo_open.mp3");
const zippoCloseSound = new Audio("./assets/zippo_close.mp3");
const zippoStrikeSound = new Audio("./assets/zippo_strike.mp3");
const blemBurning = new Audio("./assets/burning.mp3");
blemBurning.loop = true;

function render(){
    const burning = document.getElementById("burning")
    const tobaccoChamber = document.getElementById("tobacco-chamber")
    const zippoLid = document.getElementById("lid")
    const zippoFlame = document.getElementById("flame")
    const smoke = document.getElementById("smoke")

    if(cigaretteLit && cigaretteRemaining >0){
        burning.style.opacity = "1";
        burning.style.backgroundColor = "#ef500b";
        smoke.style.opacity = "40%";
    }
    else{
        if(cigaretteRemaining >0)
            burning.style.backgroundColor = "#77726d";
        else
            burning.style.opacity = "0";
        clearInterval(cigaretteInterval);
        blemBurning.pause();
        smoke.style.opacity = "0%";
      }
   
    if(zippoOpen)
        zippoLid.classList.add("open");
    else
        zippoLid.classList.remove("open");

    if(zippoLit)
        zippoFlame.style.opacity = 1;
    else
        zippoFlame.style.opacity = 0;

    tobaccoChamber.style.width = (cigaretteRemaining/100 * 74) + "%";
}

function toggleZippoLid(){
    zippoOpen = !zippoOpen;
    if(zippoOpen)
        zippoOpenSound.play();
    else
        zippoCloseSound.play();
    if(zippoOpen == false)
        zippoLit = false;
    render();
}

function strikeWheel(){
    zippoLit = true;
    zippoStrikeSound.play();
    if(!cigaretteLit)
    cigaretteInterval = setInterval(() => {
        cigaretteRemaining = cigaretteRemaining-1;
        render();
    }, 500);
    cigaretteLit = true;
    blemBurning.play();
    render();
    
}

function stubOut(){
    clearInterval(cigaretteInterval);
    cigaretteLit = false;
    blemBurning.pause();
    render();
}