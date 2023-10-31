const questions = [
  {
    question: "Which is largest animal in the world?",
    answers: [
      {
        text: "Shark",
        correct: false,
      },
      {
        text: "Blue Whale",
        correct: true,
      },
      {
        text: "Elephant",
        correct: false,
      },
      {
        text: "Giraffe",
        correct: false,
      },
    ],
  },
  {
    question: "Which is smallest country  in the world?",
    answers: [
      {
        text: "Vatican City",
        correct: true,
      },
      {
        text: "Bhutan",
        correct: false,
      },
      {
        text: "Nepal",
        correct: false,
      },
      {
        text: "Sri Lanka",
        correct: false,
      },
    ],
  },
  {
    question: "Which is largest animal in the world?",
    answers: [
      {
        text: "Kalahari",
        correct: false,
      },
      {
        text: "Gobi",
        correct: false,
      },
      {
        text: "Sahara",
        correct: false,
      },
      {
        text: "Antarctica",
        correct: true,
      },
    ],
  },
  {
    question: "Which is smallest continent in the world?",
    answers: [
      {
        text: "Asia",
        correct: false,
      },
      {
        text: "Australia",
        correct: true,
      },
      {
        text: "Arctic",
        correct: false,
      },
      {
        text: "Africa",
        correct: false,
      },
    ],
  },
];
const questionElement = document.getElementById("question");
const answerbtn = document.getElementById("answer-btn");
const nextbtn = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

// function
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextbtn.innerHTML = "Next";
  showQuestion();
}
function showQuestion() {
  resetState();

  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
  //to display answer

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerbtn.appendChild(button);
    if (answer.correct) {
      //this will add true/false from dataset
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextbtn.style.display = "none";
  while (answerbtn.firstChild) {
    answerbtn.removeChild(answerbtn.firstChild);
  }
}
//
function selectAnswer(e) {
  const selectedBtn = e.target; //add selected answer
  const isCorrect = selectedBtn.dataset.correct === "true"; //check
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;//increment score
  } else {
    selectedBtn.classList.add("incorrect");
  }

  //   on clicking wrong answer right answer should get highlighted
  Array.from(answerbtn.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextbtn.style.display = "block"; //display next button
}
function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;//display score
  nextbtn.innerHTML = "Play Again";
  nextbtn.style.display = "block";
}

function handleNextButton() {
  //
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}
nextbtn.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
