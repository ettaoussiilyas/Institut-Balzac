const questions = [
    {
        question: "Quelle est la capitale de la France?",
        options: ["Paris", "Lyon", "Marseille", "Nice"],
        correct: "Paris"
    },
    {
        question: "Quel est le plus grand fleuve de France?",
        options: ["La Seine", "La Loire", "Le Rhône", "La Garonne"],
        correct: "La Loire"
    },
    {
        question: "En quelle année la Révolution française a-t-elle commencé?",
        options: ["1789", "1792", "1804", "1776"],
        correct: "1789"
    },
    {
        question: "Quel est le symbole national de la France?",
        options: ["La Tour Eiffel", "Le coq gaulois", "La baguette", "Le fromage"],
        correct: "Le coq gaulois"
    },
    {
        question: "Quel est l'hymne national de la France?",
        options: ["La Marseillaise", "La Carmagnole", "Le Chant des Partisans", "Aux armes citoyens"],
        correct: "La Marseillaise"
    },
    {
        question: "Quelle est la devise de la République française?",
        options: ["Liberté, Égalité, Fraternité", "Liberté, Fraternité, Justice", "Union, Progrès, Paix", "Égalité, Justice, Démocratie"],
        correct: "Liberté, Égalité, Fraternité"
    },
    {
        question: "Quel est le plus haut sommet de France?",
        options: ["Mont Blanc", "Mont Ventoux", "Pic du Midi", "Mont Aiguille"],
        correct: "Mont Blanc"
    },
    {
        question: "Qui a écrit 'Les Misérables'?",
        options: ["Victor Hugo", "Émile Zola", "Gustave Flaubert", "Alexandre Dumas"],
        correct: "Victor Hugo"
    },
    {
        question: "Quelle est la plus grande île française?",
        options: ["La Corse", "Réunion", "Martinique", "Guadeloupe"],
        correct: "La Corse"
    },
    {
        question: "Comment s'appelle le célèbre dessert français composé de pâte feuilletée, crème pâtissière et glaçage?",
        options: ["Mille-feuille", "Éclair", "Tarte Tatin", "Profiterole"],
        correct: "Mille-feuille"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timerInterval;

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const rand = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[rand]] = [arr[rand], arr[i]]; // Swap elements
    }
    return arr;
}

function startQuiz() {
    // Shuffle questions before starting the quiz
    shuffle(questions);
    document.getElementById("timer").style.display ="flex";
    document.getElementById("start-button").classList.add("hidden");
    document.getElementById("question-container").classList.remove("hidden");
    loadQuestion();
}

function startTimer() {
    let timeLeft = 10;
    document.getElementById('timer').textContent = `${timeLeft}s`;

    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = `${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            goToNextQuestion();
        }
    }, 1000);
}

function loadQuestion() {
    document.getElementById("timer").style.display ="flex";
    clearInterval(timerInterval);
    startTimer();
    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById("question").textContent = currentQuestion.question;
    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = ""; // Clear previous options

    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.className = ""; // Reset button class for safety
        button.disabled = false; // Ensure buttons are enabled
        button.addEventListener("click", () => {
            clearInterval(timerInterval); // Stop the timer if an answer is clicked
            selectAnswer(option, button);
        });
        optionsContainer.appendChild(button);
    });
}

function goToNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
        document.getElementById("next-button").classList.add("hidden");
    } else {
        endQuiz();
    }
}

function selectAnswer(answer, button) {

    const currentQuestion = questions[currentQuestionIndex];
    document.querySelectorAll('#options button').forEach(button => button.disabled = true);
    if (answer === currentQuestion.correct) {
        button.classList.add("correct");
        score++;
    } else {
        button.classList.add("incorrect");
        highlightCorrectAnswer();
    }
    document.getElementById("next-button").classList.remove("hidden");
    
}

function highlightCorrectAnswer() {
    document.querySelectorAll('#options button').forEach(button => {
        if (button.textContent === questions[currentQuestionIndex].correct) {
            button.classList.add('correct');
        }
    });
}

document.getElementById("next-button").addEventListener('click', () => {
    goToNextQuestion();
});


function endQuiz() {
    //     const scoreContainer = document.getElementById("score-container");
    localStorage.setItem("LastScore", score);
    const scoreContainer = document.getElementById("sc");
    scoreContainer.classList.remove("hidden");
    scoreContainer.style.display = "block"; // Ensure the container is visible
    scoreContainer.innerHTML = `Votre score est de ${score} / ${questions.length}, votre Niveau est : ${levelScore(score)}`;
    document.getElementById("timer").style.display ="none";
    clearInterval(timerInterval);
    document.getElementById("question-container").classList.add("hidden");
    document.getElementById('retake-button').classList.remove('hidden');
    
}





function levelScore(score) {
    if (score <= 2) return 'A1';
    if (score <= 4) return 'A2';
    if (score <= 6) return 'B1';
    if (score <= 8) return 'B2';
    if (score === 9) return 'C1';
    if (score === 10) return 'C2';
}

function retakeQuiz() {
    document.getElementById("sc").textContent = "Test de compréhension";

    currentQuestionIndex = 0;
    score = 0;
    // document.getElementById('score-container').classList.add('hidden');
    document.getElementById('retake-button').classList.add('hidden');
    document.getElementById('question-container').classList.remove('hidden');
    document.getElementById('next-button').classList.add('hidden');
    loadQuestion();
}
