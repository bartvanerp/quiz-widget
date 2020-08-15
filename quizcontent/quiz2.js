var questions = [
    {
      type: "numerical",
      question: "James has <x> apple(s). Emma gives him <y> apple(s). How many apples does James have?",
      correctAnswer: "<z>",
      tolerance: 1e-10,
      variables: (function() {
        var vars = {};
        vars["x"] = Math.round(10*Math.random())+1;
        vars["y"] = Math.round(10*Math.random())+1;
        vars["z"] = vars["x"] + vars["y"];
        return vars
      }())
    },
    {
      type: "numerical",
      question: "James has <x> apple(s). Emma gives him <y> apple(s). How many apples does James have?",
      correctAnswer: "<z>",
      tolerance: 1e-10,
      variables: (function() {
        var vars = {};
        vars["x"] = Math.round(10*Math.random())+1;
        vars["y"] = Math.round(10*Math.random())+1;
        vars["z"] = vars["x"] + vars["y"];
        return vars
      }())
    }
  ];

var options = {
  shuffleQuestions: true,
  shuffleAnswers: true,
  select: "all",
  showCorrectAnswer: true,
  confetti: true
};