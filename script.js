const quizData = [
  {
    question: "Which language runs in a web browser?",
    a: "Java",
    b: "C",
    c: "Python",
    d: "JavaScript",
    correct: "d",
  },
  {
    question: "What does CSS stand for?",
    a: "Central Style Sheets",
    b: "Cascading Style Sheets",
    c: "Cascading Simple Sheets",
    d: "Cars SUVs Sailboats",
    correct: "b",
  },
  {
    question: "What year was JavaScript launched?",
    a: "1996",
    b: "1995",
    c: "1994",
    d: "None of the above",
    correct: "b",
  },
];

const questionEl = document.getElementById("question");
const answerEls = document.querySelectorAll(".answer");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const timerEl = document.getElementById("timer");

let currentQuiz = 0;
let score = 0;
let timeLeft = 15;
let timer;

loadQuiz();

function loadQuiz() {
  deselectAnswers();
  const currentQuizData = quizData[currentQuiz];
  questionEl.innerText = currentQuizData.question;
  a_text.innerText = currentQuizData.a;
  b_text.innerText = currentQuizData.b;
  c_text.innerText = currentQuizData.c;
  d_text.innerText = currentQuizData.d;

  resetTimer();
}

function deselectAnswers() {
  answerEls.forEach(answerEl => answerEl.checked = false);
}

function getSelected() {
  let answer;
  answerEls.forEach(answerEl => {
    if(answerEl.checked) {
      answer = answerEl.id;
    }
  });
  return answer;
}

function saveAnswer() {
  const answer = getSelected();
  if(answer) {
    if(answer === quizData[currentQuiz].correct) {
      score++;
    }
  }
}

function showResult() {
  document.querySelector(".quiz-container").innerHTML = `
    <h2>You scored ${score} / ${quizData.length} 🎉</h2>
    <button onclick="location.reload()">Restart</button>
  `;
}

function resetTimer() {
  clearInterval(timer);
  timeLeft = 15;
  timerEl.innerText = `⏳ ${timeLeft}s`;

  timer = setInterval(() => {
    timeLeft--;
    timerEl.innerText = `⏳ ${timeLeft}s`;
    if(timeLeft === 0) {
      clearInterval(timer);
      nextBtn.click(); // auto go to next question
    }
  }, 1000);
}

// Next button
nextBtn.addEventListener("click", () => {
  saveAnswer();
  currentQuiz++;
  if(currentQuiz < quizData.length) {
    loadQuiz();
  } else {
    clearInterval(timer);
    showResult();
  }
});

// Previous button
prevBtn.addEventListener("click", () => {
  if(currentQuiz > 0) {
    currentQuiz--;
    loadQuiz();
  }
});
