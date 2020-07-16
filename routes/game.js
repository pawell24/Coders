function gameRoutes(app) {
  let goodAnswers = 0;
  let isGameOver = false;
  let callToAFriend = false;
  let questionToTheCrowdUsed = false;
  let halfOnHalfUsed = false;

  const questions = [
    {
      question: "Jaki jest najlepszy język progarmowania ?",
      answers: ["C++", "Python", "JavaScript", "Java"],
      correctAnswer: 2,
    },
    {
      question: "Czy ten kurs jest fajny ?",
      answers: ["Nie wiem", "Oczywiście, że tak", "Nie", "Jest najlpszy"],
      correctAnswer: 3,
    },
    {
      question: "Czy chcesz zjeść pizze",
      answers: [
        "Nawet dwie!",
        "Jestem na redukcji",
        "Nie, dzięki",
        "Wolę brokuły",
      ],
      correctAnswer: 0,
    },
  ];

  app.get("/question", (req, res) => {
    if (goodAnswers === questions.length) {
      res.json({
        winner: true,
      });
    } else if (isGameOver) {
      res.json({
        looser: true,
      });
    } else {
      const nextQuestion = questions[goodAnswers];

      const { question, answers } = nextQuestion;

      res.json({ question, answers });
    }
  });
  app.post("/answer/:index", (req, res) => {
    if (isGameOver) {
      res.json({
        looser: true,
      });
    }
    const { index } = req.params;

    const question = questions[goodAnswers];

    const isGoodAnswer = question.correctAnswer === Number(index);
    if (isGoodAnswer) {
      goodAnswers++;
    } else {
      isGameOver = true;
    }

    res.json({
      correct: isGoodAnswer,
      goodAnswers,
    });
  });

  app.get("/help/friend", (req, res) => {
    if (callToAFriend) {
      return res.json({
        text: "To koło ratunkowe zostało już wykorzystane",
      });
    }
  });
}

module.exports = gameRoutes;
