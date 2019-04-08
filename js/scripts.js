var scores, xHunter, mtupaDice, isPlaying;

function osu() {
  scores = [0, 0];
  xHunter = 0;
  mtupaDice = 0;
  isPlaying = true;
  document.querySelector(".dice").style.display = "none";
  document.getElementById("score-0").innerTEXT = "0";
  document.getElementById("score-1").innerTEXT = "0";
  document.getElementById("current-0").innerTEXT = "0";
  document.getElementById("current-1").innerTEXT = "0";

  document.querySelector(".hunter-0-zone").classList.remove("winner");
  document.querySelector(".hunter-1-zone").classList.remove("winner");
  document.querySelector(".hunter-0-zone").classList.remove("active");
  document.querySelector(".hunter-1-zone").classList.remove("active");
  document.querySelector(".hunter-0-zone").classList.add("active");
}

function scissor() {
  xHunter = 0;
  mtupaDice === 0 ? (mtupaDice = 1) : (mtupaDice = 0);

  document.getElementById("current-0").innerTEXT = 0;
  document.getElementById("current-1").innerTEXT = 0;
  document.querySelector(".hunter-0-zone").classList.toggle("active");
  document.querySelector(".hunter-1-zone").classList.toggle("active");
  document.querySelector(".dice").style.display = "none";
}

osu();

// ROLL
document.querySelector(".btn-rock").addEventListener("click", function() {
  if (isPlaying) {
    var dice = Math.floor(Math.random() * 6) + 1;
    var diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    diceDOM.src = "images/dice-" + dice + ".png";
    if (dice !== 1) {
      xHunter += dice;
      document.getElementById( "current-" + mtupaDice).innerTEXT = xHunter;
    } else {
      scissor();
    }
  }
});
// hold 
document.querySelector(".btn-paper").addEventListener("click", function() {
  if (isPlaying) {
    scores[mtupaDice] += xHunter;
    document.querySelector("#score-" + mtupaDice).innerTEXT = scores[mtupaDice];
    if (scores[mtupaDice] >= 100) {
      document.querySelector("#name-" + mtupaDice).innerTEXT = "Winner!";
      document.querySelector(".dice").style.display = "none";
      document.querySelector(".hunter-" + mtupaDice + "-zone").classList.add("winner");
      document.querySelector(".hunter-" + mtupaDice + "-zone").classList.remove("active");
      isPlaying = false;
    } else {
      scissor();
    }
  }
});


// to start again
document.querySelector(".btn-rewind").addEventListener("click", osu());
