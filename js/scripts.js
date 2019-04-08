//Old js
/*
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
}

function scissor() {
  xHunter = 0;
  (mtupaDice === 0) ? (mtupaDice = 1) : (mtupaDice = 0);

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
*/

//New Js
//Define Variables
var newGon = "";
var newKillua = "";
var xHunter = [1, 2, 3, 4, 5, 6];





//UI logic
//Gon
$(document).ready(function(){
  $(".player-gon").submit(function(event){
    event.preventDefault();
    var name = $(".gon-name").val();
    newGon = new Player(name);
    $(".login-gon").slideUp();
    $(".gon-board").fadeIn();
    $("#gon1").text(newGon.name);
    $("#current-1").text(0);
    $("#total-current1").text(0);
    $("#score-1").text(0);
  });

//Killua
  $(".player-killua").submit(function(event){
    event.preventDefault();
    var name = $(".killua-name").val();
    newKillua = new Player(name);
    $(".login-killua").slideUp();
    $(".killua-board").fadeIn();
    $("#killua2").text(newKillua.name);
    $("#current-2").text(0);
    $("#total-current2").text(0);
    $("#score-2").text(0);
  });

//Gon dice
  $("#rock1").click(function(){
    play1();
    $("#total-current1").text(newGon.score);
  });

//Gon hold
  $("#paper1").click(function(){
    newGon.tally();
    $("#score-1").text(newGon.finalScore);
    paper1();
  });

//Killua dice
  $("#rock2").click(function(){
    play2();
    $("#total-current2").text(newKillua.score);
  });

//Killua hold
  $("#paper2").click(function(){
    newKillua.tally();
    $("#score-2").text(newKillua.finalScore);
    paper2();
  });
});

//Gon function for hold
var paper1 = function(){
  $(document).ready(function(){
    $(".gon-board").addClass("inactive");
    $(".gon-board").removeClass("active");
    $(".killua-board").addClass("active");
    $(".killua-board").removeClass("inactive");
    $(".submit1").attr("disabled", true);
    $(".submit2").attr("disabled", false);
    $(".paper1").attr("disabled", true);
    $(".paper2").attr("disabled", false);
    $(".scissor2").hide();
    $("#current-2").text(0);
    $("#total-current2").text(0);
  });
};

//Killua function for hold
var paper2 = function(){
  $(document).ready(function(){
    $(".gon-board").addClass("active");
    $(".gon-board").removeClass("inactive");
    $(".killua-board").addClass("inactive");
    $(".killua-board").removeClass("active");
    $(".submit2").attr("disabled", true);
    $(".submit1").attr("disabled", false);
    $(".paper2").attr("disabled", true);
    $(".paper1").attr("disabled", false);
    $(".scissor1").hide();
    $("#current-1").text(0);
    $("#total-current1").text(0);
  });
};





//Bussines logic
//newPlayer Constructor
var Player = function(name){
  this.name = name;
  this.score = [];
  this.rolls = [];
  this.tallys = [];
  this.finalScore = [];
};

//Prototypes
Player.prototype.win = function(){
  var total = 0;
  this.rolls.forEach(function(roll){
    total += roll;
  })
  var score = 0;
  score = score + total;
  this.score = [];
  this.score.push(score);
};


Player.prototype.lose = function(){
  this.rolls = [];
};


Player.prototype.tally = function(){
  this.rolls = [];
  this.tallys.push(parseInt(this.score));
  var sum = 0;
  this.tallys.forEach(function(tally){
    sum += tally;
  })
  var score1 = 0;
  score1 = score1 + sum;
  this.finalScore = [];
  this.finalScore.push(score1);
  this.score = [];
  this.score.push(0);
};


Player.prototype.finish = function(){
  var check = parseInt(this.score) + parseInt(this.finalScore);
  if(check >= 100){
    $(document).ready(function(){
      $(".winner").fadeIn();
      $(".gon-board").slideUp();
      $(".killua-board").slideUp();
      $(".scissor1").hide();
      $(".scissor2").hide();
    });
    document.getElementById("winner").src = "images/";
    document.getElementById("winner").innerHTML = this.name;
  };
};

//Gon play function
var play1 = function(){
  var dice = [1,2,3,4,5,6];

  var diceRoll = dice[Math.floor(Math.random() * dice.length)];

  document.getElementById("current-1").innerHTML = diceRoll;

  if(diceRoll === 1){
    document.getElementById("speed1").src = "images/dice-1.png";
    newGon.lose();
    newKillua.score = [];
    newKillua.score.push(0);
    paper1();
    $(document).ready(function(){
      $(".scissor1").show();
      $(".scissor2").hide();
    });
  }
  else{
    newGon.rolls.push(diceRoll);
    newGon.win();
    newGon.finish();
    xHunter.forEach(function(number){
      if(diceRoll === number){
        document.getElementById("speed1").src = "images/dice-" + number + ".png";
      }
    })
  };
};

//Killua play function
var play2 = function(){
  var dice = [1,2,3,4,5,6];

  var diceRoll = dice[Math.floor(Math.random() * dice.length)];

  document.getElementById("current-2").innerHTML = diceRoll;

  if(diceRoll === 1){
    document.getElementById("speed2").src = "images/dice-1.png";
    newKillua.lose();
    newGon.score = [];
    newGon.score.push(0);
    paper2();
    $(document).ready(function(){
      $(".scissor2").show();
      $(".scissor1").hide();
    });
  }
  else{
    newKillua.rolls.push(diceRoll);
    newKillua.win();
    newKillua.finish();
    xHunter.forEach(function(number){
      if(diceRoll === number){
        document.getElementById("speed2").src = "images/dice-" + number + ".png";
      }
    })
  }
};
