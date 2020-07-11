var questions = [
    {
      question: "Who invented JavaScript?",
      answers: {
        a: "Douglas Crockford",
        b: "Sheryl Sandberg",
        c: "Brendan Eich a",
        d: "$ 1 + \\phi = \\pi $"
      },
      correctAnswer: "c"
    },
    {
      question: "Which one of these is a JavaScript package manager?",
      answers: {
        a: "Node.js",
        b: "TypeScript",
        c: "$$ \\frac{1}{\\pi} $$"
      },
      correctAnswer: "c"
    },
    {
      question: "Which tool can you use to ensure code quality?",
      answers: {
        a: "Angular",
        b: "jQuery",
        c: "RequireJS",
        d: "ESLint"
      },
      correctAnswer: "d"
    },
    {
      question: "James has <x> apple(s). Emma gives him <y> apple(s). How many apples does James have?",
      answers: {
        a: "<x> apple(s)",
        b: "<y> apple(s)",
        c: "<z> apple(s)",
        d: "<z> pear(s)"
      },
      correctAnswer: "c",
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
  shuffleQuestions: true
};