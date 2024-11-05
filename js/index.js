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
  

document.getElementById('start-button').addEventListener('click',startQuiz);

let currentQuestionIndex = 0;
let score = 0;
let timerInterval;

function startQuiz() {
    // document.getElementById("restart-button").classList.add("hidden");
    document.getElementById("start-button").classList.add("hidden");
    document.getElementById("question-container").classList.remove("hidden");
    document.getElementById("timer").classList.remove("hidden");
    loadQuestion();
}

function startTimer() {
    let timeLeft = 10; // Set the timer to 10 seconds
    document.getElementById('timer').textContent = `${timeLeft}s`;

    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = `${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            goToNextQuestion(); // Move to the next question when the timer hits 0
        }
    }, 1000);
}

function loadQuestion() {
    clearInterval(timerInterval); // Clear any existing timer before starting a new one
    startTimer(); // Start the timer for the new question

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
    document.getElementById("timer").classList.add("hidden");
    clearInterval(timerInterval); // Stop the timer when the quiz ends
    document.getElementById("question-container").classList.add("hidden");
    const scoreContainer = document.getElementById("score-container");
    scoreContainer.classList.remove("hidden");
    scoreContainer.innerHTML = `Votre score est de ${score} / ${questions.length}, votre Niveau est : ${levelScore(score)}`;
    // document.getElementById("restart-button").classList.remove("hidden");
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
    // Reset quiz variables
    currentQuestionIndex = 0;
    score = 0;

    // Hide score container and show the question container
    document.getElementById('score-container').classList.add('hidden');
    document.getElementById('retake-button').classList.add('hidden');
    document.getElementById('question-container').classList.remove('hidden');

    // Load the first question
    loadQuestion();
}

