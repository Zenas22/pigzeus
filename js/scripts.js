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

//Player Two holding and passing
  $("#paper2").click(function(){
    newKillua.tally();
    $("#score-2").text(newKillua.finalScore);
    pass2();
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
//New Player Constructor
var Player = function(name){
  this.name = name;
  this.score = [];
  this.rolls = [];
  this.tallys = [];
  this.finalScore = [];
};

//Function to run if dice roll is above one to add all individual roll scores
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

//Function to run if dice roll is one to delete round score
Player.prototype.lose = function(){
  this.rolls = [];
};

//Function adding each round's score to get total score
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

//Function to test if a player has reached 100 points
Player.prototype.finish = function(){
  var check = parseInt(this.score) + parseInt(this.finalScore);
  if(check >= 100){
    $(document).ready(function(){
      $(".celebration").fadeIn();
      $(".player1-board").slideUp();
      $(".player2-board").slideUp();
      $(".roll-one1").hide();
      $(".roll-one2").hide();
    });
    document.getElementById("celebration").src = "images/celebration.gif";
    document.getElementById("winner").innerHTML = this.name;
  };
};

//Function to roll dice for Player One
var play1 = function(){
  var dice = [1,2,3,4,5,6];

  var diceRoll = dice[Math.floor(Math.random() * dice.length)];

  document.getElementById("turn-count1").innerHTML = diceRoll;

  if(diceRoll === 1){
    document.getElementById("dice1").src = "images/dice1.png";
    newGon.lose();
    newKillua.score = [];
    newKillua.score.push(0);
    pass1();
    $(document).ready(function(){
      $(".roll-one1").show();
      $(".roll-one2").hide();
    });
  }
  else{
    newGon.rolls.push(diceRoll);
    newGon.win();
    newGon.finish();
    xHunter.forEach(function(number){
      if(diceRoll === number){
        document.getElementById("dice1").src = "images/dice" + number + ".png";
      }
    })
  };
};

//Function to roll dice for Player Two
var play2 = function(){
  var dice = [1,2,3,4,5,6];

  var diceRoll = dice[Math.floor(Math.random() * dice.length)];

  document.getElementById("turn-count2").innerHTML = diceRoll;

  if(diceRoll === 1){
    document.getElementById("dice2").src = "images/dice1.png";
    newKillua.lose();
    newGon.score = [];
    newGon.score.push(0);
    pass2();
    $(document).ready(function(){
      $(".roll-one2").show();
      $(".roll-one1").hide();
    });
  }
  else{
    newKillua.rolls.push(diceRoll);
    newKillua.win();
    newKillua.finish();
    xHunter.forEach(function(number){
      if(diceRoll === number){
        document.getElementById("dice2").src = "images/dice" + number + ".png";
      }
    })
  }
};
