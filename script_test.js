let header_screen = document.getElementById("header_screen");
let questions_screen = document.getElementById("questions_screen");
let result_screen = document.getElementById("result_screen");
let explanationElement = document.getElementById("explanation");

// Fonction Quiz permettant d'ajouter des questions et de voir combien de bonnes réponses l'utilisateur a
function Quiz() {
    this.questions = [];
    this.nbrCorrects = 0;
    this.indexCurrentQuestion = 0;

    // Ajout de questions
    this.addQuestion = function(question) {
        this.questions.push(question);
    };

    // Fonction pour afficher la question courante ou le résultat si le quiz est terminé
    this.displayCurrentQuestion = function() {
        if (this.indexCurrentQuestion < this.questions.length) {
            this.questions[this.indexCurrentQuestion].getElement(
                this.indexCurrentQuestion + 1, this.questions.length
            );
        } else {
            questions_screen.style.display = "none";
            let NbrCorrectUser = document.querySelector("#nbrCorrects");
            NbrCorrectUser.textContent = quiz.nbrCorrects;
            result_screen.style.display = "block";
        }
    };
}

// Fonction Question permettant de créer une question avec un titre, des réponses et la bonne réponse
function Question(title, answers, correctAnswers, explanation) {
    this.title = title;
    this.answers = answers;
    this.correctAnswers = correctAnswers;
    this.explanation = explanation; // Nouveau champ pour l'explication

    // regarder comment afficher les explications apres chaque questions

    // Générer la structure HTML pour afficher la question
    this.getElement = function(indexQuestion, nbrOfQuestions) {
        questions_screen.innerHTML = ''; // Vider la question précédente

        let questionTitle = document.createElement("h3");
        questionTitle.textContent = this.title;
        questions_screen.append(questionTitle);

        let questionAnswer = document.createElement("ul");
        questionAnswer.classList.add("list_questions");

        // Boucle pour afficher chaque réponse possible
        this.answers.forEach((answer, index) => {
            let answerElement = document.createElement("li");
            answerElement.textContent = answer;
            answerElement.id = index + 1; // L'index commence à 1
            answerElement.addEventListener("click", this.toggleAnswerSelection);
            questionAnswer.append(answerElement);
        });

        questions_screen.append(questionAnswer);

        // Ajouter un bouton de validation
        let validateButton = document.createElement("button");
        validateButton.textContent = "Valider";
        validateButton.classList.add("validate-btn");
        validateButton.addEventListener("click", () => {
            this.checkAnswer();
        });

        questions_screen.append(validateButton);
    };

    // Sélectionner ou désélectionner une réponse
    this.toggleAnswerSelection = function() {
        this.classList.toggle("selectedAnswer");
    };

    // Vérification des réponses sélectionnées
    this.checkAnswer = () => {
        let selectedAnswers = Array.from(document.querySelectorAll('.selectedAnswer')).map(answer => parseInt(answer.id));

        const allCorrectSelected = this.correctAnswers.every(answer => selectedAnswers.includes(answer));
        const noWrongSelected = selectedAnswers.every(answer => this.correctAnswers.includes(answer));

        if (allCorrectSelected && noWrongSelected) {
            quiz.nbrCorrects++; // Incrémente le score si toutes les bonnes réponses sont sélectionnées
        }

        // Affichage des bonnes et mauvaises réponses
        selectedAnswers.forEach(selectedAnswer => {
            let answerElement = document.getElementById(selectedAnswer);
            if (this.correctAnswers.includes(selectedAnswer)) {
                answerElement.classList.add("answersCorrect");
            } else {
                answerElement.classList.add("answersWrong");
            }
        });

        this.correctAnswers.forEach(correctAnswer => {
            let correctAnswerElement = document.getElementById(correctAnswer);
            correctAnswerElement.classList.add("answersCorrect");
        });

        // Afficher l'explication
        explanationElement.textContent = this.explanation;
        explanationElement.style.display = "block";

        // Passer à la question suivante après un délai
        setTimeout(() => {
            questions_screen.textContent = '';
            explanationElement.style.display = "none";
            quiz.indexCurrentQuestion++;
            quiz.displayCurrentQuestion();
        }, 4000); // Délai pour voir l'explication avant la question suivante
    };
}

// Initialisation du quiz avec les questions
let quiz = new Quiz();

let question1 = new Question("Où se trouve la commande de réglage des feux ?",["À gauche du volant", "À droite du volant", "Autre"], [1],"La commande de réglage des feux se trouve à gauche du volant.");
quiz.addQuestion(question1);

let question2 = new Question(
    "Pourquoi doit-on régler les feux ?",
    ["Pour améliorer la vision de nuit", "Pour éviter l'éblouissement des autres conducteurs", "Pour avoir un bon style"],
    [1, 2],
    "Régler les feux est important pour améliorer la visibilité et éviter l'éblouissement des autres conducteurs."
);
quiz.addQuestion(question2);

// Fonction pour commencer le quiz
function startQuestions() {
    header_screen.style.display = "none";
    questions_screen.style.display = "block";
    quiz.displayCurrentQuestion();
}

// Démarrer le quiz lorsque le bouton est cliqué
let btn_start = document.getElementById("btn_start");
btn_start.addEventListener("click", startQuestions);
