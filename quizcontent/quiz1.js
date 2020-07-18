var questions = [
    {
      type: "multiple-choice",
      question: "What is the current-voltage relationship through a resistor of value $R$?",
      answers: {
        1: "$I = UR^2$",
        2: "$V = IR^2$",
        3: "$I = \\frac{V}{R}$",
        4: "$I = \\frac{R}{V}$"
      },
      correctAnswer: 3
    },
    {
      type: "multiple-choice",
      question: "A signal is sampled with a sample frequency of $f_s=<fs>$ Hz. The highest frequency contained in the signal is $<f>$ Hz. To what relative frequency does the highest frequency map?",
      answers: {
        1: "$\\theta = <ans>\\pi$",
        2: "$\\theta = <ansx1>\\pi$",
        3: "$\\theta = <ansx2>\\pi$",
        4: "$\\theta = <ansx3>\\pi$"
      },
      correctAnswer: 1,
      variables: (function() {
        var vars = {};
        vars["f"] = 10*(Math.round(100*Math.random())+1);
        vars["fs"] = 10*Math.round(100*Math.random())+2*vars["f"];
        vars["ans"] = Math.round(100*2*vars["f"]/vars["fs"])/100;
        vars["ansx1"] = Math.round(100*Math.PI*2*vars["f"]/vars["fs"])/100
        vars["ansx2"] = Math.round(100*2*Math.PI*vars["fs"]/vars["f"])/100
        vars["ansx3"] = Math.round(100*2*vars["fs"]/vars["f"])/100
        return vars
      }())
    },
    {
      type: "multiple-choice",
      question: "How can the complex number $\\sqrt{j}$ also be represented?",
      answers: {
        1: "$e^{j\\pi/4}$",
        2: "$e^{-j\\pi/4}$",
        3: "$e^{j3\\pi/4}$",
        4: "$e^{-j3\\pi/4}$"
      },
      correctAnswer: 1
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
        vars["x"] = Math.round(10*Math.random())+1;
        vars["y"] = Math.round(10*Math.random())+1;
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