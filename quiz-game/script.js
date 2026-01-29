// =====================
// DOM ELEMENTS
// =====================

// Screens
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

// Buttons
const startQuizButton = document.getElementById("start-quiz-btn");
const restartQuizButton = document.getElementById("restart-btn");

// Quiz UI
const questionText = document.getElementById("question");
const currentQuestionNumber = document.getElementById(
  "current-question-number",
);
const totalQuestionNumber = document.getElementById("total-question-number");
const scoreSpan = document.getElementById("score");
const answersContainer = document.getElementById("answers-container");
const progressBar = document.getElementById("progress");

// Result UI
const totalScore = document.getElementById("total-score");
const totalQuestion = document.getElementById("total-question");
const resultFeedback = document.getElementById("result-feedback");

// QUIZ QUESTIONS
const quizQuestions = [
  {
    question: "What is the capital of Nigeria?",
    answers: [
      { text: "Lagos", correct: false },
      { text: "Abuja", correct: true },
      { text: "Ibadan", correct: false },
      { text: "Port Harcourt", correct: false },
    ],
  },
  {
    question: "Which language is primarily used for styling web pages?",
    answers: [
      { text: "HTML", correct: false },
      { text: "CSS", correct: true },
      { text: "JavaScript", correct: false },
      { text: "Python", correct: false },
    ],
  },
  {
    question: "What does CPU stand for?",
    answers: [
      { text: "Central Processing Unit", correct: true },
      { text: "Computer Personal Unit", correct: false },
      { text: "Central Program Utility", correct: false },
      { text: "Control Processing Unit", correct: false },
    ],
  },
  {
    question: "Which continent is the Sahara Desert located on?",
    answers: [
      { text: "Asia", correct: false },
      { text: "South America", correct: false },
      { text: "Africa", correct: true },
      { text: "Australia", correct: false },
    ],
  },
  {
    question: "Which of these is a JavaScript framework?",
    answers: [
      { text: "Laravel", correct: false },
      { text: "Django", correct: false },
      { text: "React", correct: true },
      { text: "Flask", correct: false },
    ],
  },
  {
    question: "How many days are there in a leap year?",
    answers: [
      { text: "365", correct: false },
      { text: "366", correct: true },
      { text: "364", correct: false },
      { text: "360", correct: false },
    ],
  },
  {
    question: "Which HTML tag is used to create a hyperlink?",
    answers: [
      { text: "<a>", correct: true },
      { text: "<link>", correct: false },
      { text: "<href>", correct: false },
      { text: "<nav>", correct: false },
    ],
  },
  {
    question: "What gas do plants absorb from the atmosphere?",
    answers: [
      { text: "Oxygen", correct: false },
      { text: "Nitrogen", correct: false },
      { text: "Carbon Dioxide", correct: true },
      { text: "Hydrogen", correct: false },
    ],
  },
  {
    question: "Which device is used to point and click on a computer?",
    answers: [
      { text: "Keyboard", correct: false },
      { text: "Monitor", correct: false },
      { text: "Mouse", correct: true },
      { text: "Printer", correct: false },
    ],
  },
  {
    question:
      "Which method is used to add an element to the end of a JavaScript array?",
    answers: [
      { text: "push()", correct: true },
      { text: "pop()", correct: false },
      { text: "shift()", correct: false },
      { text: "unshift()", correct: false },
    ],
  },
];

// QUIZ STATE VARS
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;
let answeredCount = 0;

totalQuestionNumber.textContent = quizQuestions.length;
totalQuestion.textContent = quizQuestions.length;

startQuizButton.addEventListener("click", startQuiz);
restartQuizButton.addEventListener("click", restartQuiz);

function startQuiz() {
  // reset vars
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = score;
  answeredCount = 0;

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  progressBar.style.width = "0%";
  showQuestion();
}

function showQuestion() {
  answersDisabled = false;

  const currentQuestion = quizQuestions[currentQuestionIndex];

  questionText.textContent = currentQuestion.question;
  currentQuestionNumber.textContent = currentQuestionIndex + 1;

  // Clear old answers
  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {
    const answerButton = document.createElement("button");
    answerButton.textContent = answer.text;
    answerButton.classList.add("answer-btn");
    answerButton.dataset.correct = answer.correct;
    answersContainer.addEventListener("click", selectAnswer);

    answersContainer.appendChild(answerButton);
  });
 
 
}

function selectAnswer(event) {
  if (answersDisabled) return;
  answersDisabled = true;

  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  Array.from(answersContainer.children).forEach((answerButton) => {
    if (answerButton.dataset.correct === "true") {
      answerButton.classList.add("correct");
    } else if (answerButton === selectedButton) {
      answerButton.classList.add("incorrect");
    }
  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  answeredCount++;
  updateProgressBar();
  

  setTimeout(nextQuestion, 1000);
}

function nextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex < quizQuestions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function updateProgressBar() {
  const progressPercent = (answeredCount / quizQuestions.length) * 100;

  progressBar.style.width = `${progressPercent}%`;
}

function showResult() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");
  totalScore.textContent = score;

  if (score === quizQuestions.length) {
    resultFeedback.textContent = "Well Done Champ!";
  } else if (score >= quizQuestions.length / 2) {
    resultFeedback.textContent = "Good Job! Keep Winning";
  } else {
    resultFeedback.textContent = "Try again!";
  }
}

function restartQuiz() {
  resultScreen.classList.remove("active");

  startQuiz();
}
