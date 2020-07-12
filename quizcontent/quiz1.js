var questions = [
    {
      type: "multiple-choice",
      question: "Who invented JavaScript?",
      answers: {
        1: "Douglas Crockford",
        2: "Sheryl Sandberg",
        3: "Brendan Eich a",
        4: "$ 1 + \\phi = \\pi $"
      },
      correctAnswer: 3
    },
    {
      type: "multiple-choice",
      question: "Which one of these is a JavaScript package manager?",
      answers: {
        1: "Node.js",
        2: "TypeScript",
        3: "$$ \\frac{1}{\\pi} $$"
      },
      correctAnswer: 3
    },
    {
      type: "multiple-choice",
      question: "Which tool can you use to ensure code quality?",
      answers: {
        1: "Angular",
        2: "jQuery",
        3: "RequireJS",
        4: "ESLint"
      },
      correctAnswer: 4
    },
    {
      type: "multiple-choice",
      question: "James has <x> apple(s). Emma gives him <y> apple(s). How many apples does James have?",
      answers: {
        1: "<x> apple(s)",
        2: "<y> apple(s)",
        3: "<z> apple(s)",
        4: "<z> pear(s)"
      },
      correctAnswer: 3,
      variables: (function() {
        var vars = {};
        vars["x"] = Math.round(10*Math.random());
        vars["y"] = Math.round(10*Math.random());
        vars["z"] = vars["x"] + vars["y"];
        return vars
      }())
    }
  ];

const options = {
  shuffleQuestions: true,
  shuffleAnswers: true,
  select: "all",
  confetti: true
};