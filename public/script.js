const question = document.querySelector("div#question");
const gameBoard = document.querySelector("#game-board");
const buttons = document.querySelectorAll("button");

const h2 = document.querySelector("h2");

function fillQuestionElements(data) {
  if (data.winner === true) {
    gameBoard.style.display = "none";
    h2.innerText = "WYGRAŁEŚ!!!";
    return;
  }

  if (data.looser === true) {
    gameBoard.style.display = "none";
    h2.innerText = "Nie poszło tym razem, spróbuj ponownie ;)";
    return;
  }

  question.innerText = data.question;
  buttons.forEach((button, index) => (button.innerText = data.answers[index]));
}

function showNextQuestion() {
  fetch("/question")
    .then((data) => data.json())
    .then((data) => fillQuestionElements(data));
}
showNextQuestion();
const goodAnswersSpan = document.querySelector("#good-answers");

function handleAnswerFeedback(data) {
  goodAnswersSpan.innerText = data.goodAnswers;
  showNextQuestion();
}

function sendAnswer(answerIndex) {
  fetch(`/answer/${answerIndex}`, {
    method: "POST",
  })
    .then((data) => data.json())
    .then((data) => handleAnswerFeedback(data));
}

for (const button of buttons) {
  button.addEventListener("click", (event) => {
    const answerIndex = event.target.dataset.answer;
    sendAnswer(answerIndex);
  });
}

function callToAFriend() {
  fetch(`/help/friend`, {
    method: "GET",
  })
    .then((data) => data.json())
    .then((data) => console.log(data));
}
