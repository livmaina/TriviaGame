var panel = $('.disney_trivia');
var countStartNumber = 30;

var questions = [{
  question: "Cruella de Vil is in which Disney Movie?",
  answers: ["101 Dalmations", "Monsters Inc.", "The Little Mermaid", "Aladdin"],
  correctAnswer: "101 Dalmations",
}, 
{
  question: "What is the name of the boy who owned Buzz Light Year?",
  answers: ["Sam", "Tony", "Mike", "Andy"],
  correctAnswer: "Andy",
},
 {
  question: "Which Disney character has a tiger as a sidekick?",
  answers: ["Pocahontas", "Merida", "Jasmine", "Tiana"],
  correctAnswer: "Jasmine",
}, 
{
  question: "Whats the name of the song Elsa sings in Frozen as she builds her ice castle?",
  answers: ["Love is an Open Door", "Let it Go", "For the First Time In Forever", "Frozen Heart"],
  correctAnswer: "Let it Go",
}, 
{
  question: "In Finding Nemo, which country was Nemo taken to?",
  answers: ["Australia", "Switzerland", "Spain", "Norway"],
  correctAnswer: "Australia",
}, 
{
  question: "Which movie features the song, 'A Whole New World'?",
  answers: ["Beauty and the Beast","Aladdin","Sleeping Beauty","Tarzan"],
  correctAnswer: "Aladdin",
},
 {
  question: "What does Cinderella's step mother turn into a carriage?",
  answers: ["An apple","An orange", "A pumpkin", "Squash"],
  correctAnswer: "A pumpkin",
}, {
  question: "What was not one of the dwarf's name in Snow White?",
  answers: ["Sleepy", "Dopey", "Hungry", "Happy"],
  correctAnswer: "Hungry",
}];

 

$(document).on('click', '#start-over', function(e) {
  game.reset();
});

$(document).on('click', '.answer-button', function(e) {
  game.clicked(e);
});

$(document).on('click', '#start', function(e) {
  $('#container').prepend('<h2>Time Remaining: <span id="counter-number">30</span> Seconds</h2>');
  game.loadQuestion();
});

// unable to append gifs or images correctly, 


var game = {
  questions:questions,
  currentQuestion:0,
  counter:countStartNumber,
  correct:0,
  incorrect:0,
  countdown: function(){
    game.counter--;
    $('#counter-number').html(game.counter);

    if (game.counter === 0){
      game.timeUp();
    }
  },
  loadQuestion: function(){
    timer = setInterval(game.countdown, 1000);
    panel.html('<h2>' + questions[this.currentQuestion].question + '</h2>' );
    for (var i = 0; i<questions[this.currentQuestion].answers.length; i++){
      panel.append('<button class="answer-button" id="button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i]+ '</button>');
    }
  
  },
  nextQuestion: function(){
    game.counter = countStartNumber;
    $('#counter-number').html(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },
  timeUp: function (){
    clearInterval(timer);
    $('#counter-number').html(game.counter);

    panel.html("<h2>You're out of time!</h2>");
    panel.append('<h3>The Correct Answer was: ' + questions[this.currentQuestion].correctAnswer);

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  results: function() {
    clearInterval(timer);

    panel.html('<h2>Your score below!</h2>');
    $('#counter-number').html(game.counter);
    panel.append('<h3>Correct Answers: ' + game.correct + '</h3>');
    panel.append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>');
    panel.append('<h3>Unanswered: ' + (questions.length - (game.incorrect + game.correct)) + '</h3>');
    panel.append('<br><button id="play_again">Play Again?</button>');
  },
  clicked: function(e) {
    clearInterval(timer);

    if ($(e.target).data("name") === questions[this.currentQuestion].correctAnswer){
      this.answeredCorrectly();
    } else {
      this.answeredIncorrectly();
    }
  },
  answeredIncorrectly: function() {
    game.incorrect++;
    clearInterval(timer);
    panel.html('<h2>Incorrect!</h2>');
    panel.append('<h3>The Correct Answer was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 2 * 1000);
    } else {
      setTimeout(game.nextQuestion, 2 * 1000);
    }
  },
  answeredCorrectly: function(){
    clearInterval(timer);
    game.correct++;
    panel.html('<h2>Correct!</h2>');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 2 * 1000);
    } else {
      setTimeout(game.nextQuestion, 2 * 1000);
    }
  },
  reset: function(){
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }

};
