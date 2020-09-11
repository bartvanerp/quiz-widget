export { StartConfetti, DeactivateConfetti };

    // globals
    var canvas = [];
    var ctx = [];
    var W;
    var H;
    var mp = 150; //max particles
    var particles = [];
    var angle = 0;
    var tiltAngle = 0;
    var confettiActive = [];
    var animationComplete = [];
    var deactivationTimerHandler;
    var reactivationTimerHandler;
    var animationHandler;

    // objects

    var particleColors = {
        colorOptions: ["DodgerBlue", "OliveDrab", "Gold", "pink", "SlateBlue", "lightblue", "Violet", "PaleGreen", "SteelBlue", "SandyBrown", "Chocolate", "Crimson"],
        colorIndex: 0,
        colorIncrementer: 0,
        colorThreshold: 10,
        getColor: function () {
            if (this.colorIncrementer >= 10) {
                this.colorIncrementer = 0;
                this.colorIndex++;
                if (this.colorIndex >= this.colorOptions.length) {
                    this.colorIndex = 0;
                }
            }
            this.colorIncrementer++;
            return this.colorOptions[this.colorIndex];
        }
    }

    function confettiParticle(color, quizNumber) {
        this.x = Math.random() * canvas[quizNumber].width; // x-coordinate
        this.y = (Math.random() * canvas[quizNumber].height) - canvas[quizNumber].height; //y-coordinate
        this.r = 1.5*RandomFromTo(15, 30); //radius;
        this.d = (Math.random() * mp) + 10; //density;
        this.color = color;
        this.tilt = Math.floor(Math.random() * 10) - 10;
        this.tiltAngleIncremental = (Math.random() * 0.07) + .05;
        this.tiltAngle = 0;

        this.draw = function (quizNumber) {
            ctx[quizNumber].beginPath();
            ctx[quizNumber].lineWidth = this.r / 2;
            ctx[quizNumber].strokeStyle = this.color;
            ctx[quizNumber].moveTo(this.x + this.tilt + (this.r / 4), this.y);
            ctx[quizNumber].lineTo(this.x + this.tilt, this.y + this.tilt + (this.r / 4));
            return ctx[quizNumber].stroke();
        }
    }


    $( window ).on( "load", function() { 
        
        // fetch quizes on the page
        var quizes = document.getElementsByClassName("quiz-container");
        var quizNumber = 0;
        H = window.innerHeight;
        W = window.innerWidth;
        
        // loop through quizes on the page
        for (let currentQuiz of quizes) {
    
            // set globals
            canvas[quizNumber] = currentQuiz.getElementsByTagName("canvas")[0];
            ctx[quizNumber] = canvas[quizNumber].getContext("2d");
            canvas[quizNumber].width = window.innerWidth;
            canvas[quizNumber].height = window.innerHeight;

            // initialize confetti
            particles[quizNumber] = [];
            animationComplete[quizNumber] = false;
            confettiActive[quizNumber] = false;
            for (var i = 0; i < mp; i++) {
                var particleColor = particleColors.getColor();
                particles[quizNumber].push(new confettiParticle(particleColor, quizNumber));
            }
            
            //StartConfetti(currentQuiz, quizNumber);

            quizNumber = quizNumber + 1; 
        }

    });


    function Draw(quizNumber) {
        ctx[quizNumber].clearRect(0, 0, canvas[quizNumber].width, canvas[quizNumber].height);
        var results = [];
        for (var i = 0; i < mp; i++) {
            (function (j, quizNumber) {
                results.push(particles[quizNumber][j].draw(quizNumber));
            })(i, quizNumber);
        }
        Update(quizNumber);
        
        return results;
    }

    function RandomFromTo(from, to) {
        return Math.floor(Math.random() * (to - from + 1) + from);
    }


    function Update(quizNumber) {
        var remainingFlakes = 0;
        var particle;
        angle += 0.01;
        tiltAngle += 0.1;

        for (var i = 0; i < mp; i++) {
            particle = particles[quizNumber][i];
            if (animationComplete[quizNumber]) return;

            if (!confettiActive[quizNumber] && particle.y < -15) {
                particle.y = canvas[quizNumber].height + 100;
                continue;
            }

            stepParticle(particle, i);

            if (particle.y <= canvas[quizNumber].height) {
                remainingFlakes++;
            }
            CheckForReposition(particle, i, quizNumber);
        }

        if (remainingFlakes === 0) {
            StopConfetti(quizNumber);
        }
    }

    function CheckForReposition(particle, index, quizNumber) {
        if ((particle.x > canvas[quizNumber].width + 20 || particle.x < -20 || particle.y > canvas[quizNumber].height) && confettiActive[quizNumber]) {
            if (index % 5 > 0 || index % 2 == 0) //66.67% of the flakes
            {
                repositionParticle(particle, Math.random() * canvas[quizNumber].width, -10, Math.floor(Math.random() * 10) - 20);
            } else {
                if (Math.sin(angle) > 0) {
                    //Enter from the left
                    repositionParticle(particle, -20, Math.random() * canvas[quizNumber].height, Math.floor(Math.random() * 10) - 20);
                } else {
                    //Enter from the right
                    repositionParticle(particle, canvas[quizNumber].width + 20, Math.random() * canvas[quizNumber].height, Math.floor(Math.random() * 10) - 20);
                }
            }
        }
    }
    function stepParticle(particle, particleIndex) {
        particle.tiltAngle += particle.tiltAngleIncremental;
        particle.y += (Math.cos(angle + particle.d) + 3 + particle.r / 2) / 2;
        particle.x += Math.sin(angle);
        particle.tilt = (Math.sin(particle.tiltAngle - (particleIndex / 3))) * 15;
    }

    function repositionParticle(particle, xCoordinate, yCoordinate, tilt) {
        particle.x = xCoordinate;
        particle.y = yCoordinate;
        particle.tilt = tilt;
    }

    function StartConfetti(quiz, quizNumber) {
        confettiActive[quizNumber] = true;
        (function animloop(quizNumber) {
            if (animationComplete[quizNumber]) return null;
            animationHandler = requestAnimFrame(animloop.bind(animloop, quizNumber));
            return Draw(quizNumber);
        })(quizNumber);
    }

    function ClearTimers(quizNumber) {
        clearTimeout(reactivationTimerHandler);
        clearTimeout(animationHandler[quizNumber]);
    }

    function DeactivateConfetti(quizNumber) {
        confettiActive[quizNumber] = false;
        ClearTimers(quizNumber);
    }

    function StopConfetti(quizNumber) {
        animationComplete[quizNumber] = true;
        if (ctx[quizNumber] == undefined) return;
        ctx[quizNumber].clearRect(0, 0, canvas[quizNumber].width, canvas[quizNumber].height);
    }

    function RestartConfetti() {
        ClearTimers();
        StopConfetti(quizNumber);
        reactivationTimerHandler = setTimeout(function () {
            confettiActive = true;
            animationComplete = false;
            InitializeConfetti();
        }, 100);

    }

    window.requestAnimFrame = (function () {
        return window.requestAnimationFrame || 
        window.webkitRequestAnimationFrame || 
        window.mozRequestAnimationFrame || 
        window.oRequestAnimationFrame || 
        window.msRequestAnimationFrame || 
        function (callback) {
            return window.setTimeout(callback, 1000 / 60);
        };
    })();
