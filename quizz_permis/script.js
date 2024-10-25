let header_screen = document.getElementById("header_screen");
let questions_screen = document.getElementById("questions_screen");
let result_screen = document.getElementById("result_screen");
let explanationElement = document.getElementById("explanation");

// Fonction Quiz permettant d'ajouter des questions et de voir combien de bonnes réponse le user a
function Quiz(){
    this.questions = [];
    this.nbrCorrects = 0;
    this.indexCurrentQuestion = 0;

    // Ajouts de questions
    this.addQuestion = function(question) {
        this.questions.push(question);
    }

    // Fonction servant à passer à la question suivante s'il y en a une, sinon afficher le résultat
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

// Fonction Question permettant de créer les questions avec le titre, les réponses et la réponse correcte
function Question(title, answers, correctAnswers, explanation) {
    this.title = title;
    this.answers = answers;
    this.correctAnswers = correctAnswers;
    this.explanation = explanation; // Nouveau champ pour l'explication

    // Mise en place et structuration du HTML et CSS pour mes questions
    this.getElement = function(indexQuestion, nbrOfQuestions) {
        questions_screen.innerHTML = ''; // Vider la question précédente
        
        let questionTitle = document.createElement("h3");
        questionTitle.classList.add("title_questions");
        questionTitle.textContent = this.title;

        questions_screen.append(questionTitle);

        let questionAnswer = document.createElement("ul");
        questionAnswer.classList.add("list_questions");

        // Boucle pour placer un <li> pour chaque réponse
        this.answers.forEach((answer, index) => {
            let answerElement = document.createElement("li");
            answerElement.classList.add("answers");
            answerElement.textContent = answer;
            answerElement.id = index + 1; // L'index commence à 1 pour correspondre aux indices corrects
            answerElement.addEventListener("click", this.toggleAnswerSelection);

            questionAnswer.append(answerElement);
        });

        // Ajout du bouton de validation
        let validateButton = document.createElement("button");
        validateButton.textContent = "Valider";
        validateButton.classList.add("validate-btn");
        validateButton.addEventListener("click", () => {
            this.checkAnswer();
        });

        // Indicateur d'avancement de la question
        let questionNumber = document.createElement("h4");
        questionNumber.classList.add("avancement_question");
        questionNumber.textContent = "Questions : " + indexQuestion + "/" + nbrOfQuestions;

        questions_screen.append(questionNumber);
        questions_screen.append(questionAnswer);
        questions_screen.append(validateButton);
    }

    // Fonction pour sélectionner ou désélectionner une réponse (ajout d'une classe pour les réponses sélectionnées)
    this.toggleAnswerSelection = function() {
        this.classList.toggle("selectedAnswer");
    };

    // Vérification de la réponse une fois que l'utilisateur a validé ses choix
    this.checkAnswer = () => {
        let selectedAnswers = Array.from(document.querySelectorAll('.selectedAnswer')).map(answer => parseInt(answer.id));
    
        // Vérifier si toutes les bonnes réponses sont sélectionnées et aucune mauvaise
        const allCorrectSelected = this.correctAnswers.every(answer => selectedAnswers.includes(answer));
        const noWrongSelected = selectedAnswers.every(answer => this.correctAnswers.includes(answer));
    
        // Si toutes les bonnes réponses sont sélectionnées et aucune mauvaise réponse
        if (allCorrectSelected && noWrongSelected) {
            quiz.nbrCorrects++; // Incrémente le score si la sélection est parfaite
        }
    
        // Affichage des réponses correctes et fausses
        selectedAnswers.forEach(selectedAnswer => {
            if (this.correctAnswers.includes(selectedAnswer)) {
                let correctAnswerElement = document.getElementById(selectedAnswer);
                correctAnswerElement.classList.add("answersCorrect"); // Affiche en vert si la réponse est correcte
            } else {
                let wrongAnswerElement = document.getElementById(selectedAnswer);
                wrongAnswerElement.classList.add("answersWrong"); // Affiche en rouge si la réponse est fausse
            }
        });
    
        // Afficher toutes les bonnes réponses (même celles non sélectionnées)
        this.correctAnswers.forEach(correctAnswer => {
            let correctAnswerElement = document.getElementById(correctAnswer);
            correctAnswerElement.classList.add("answersCorrect");
        });
    
        // Passer à la question suivante après un court délai
        setTimeout(function() {
            questions_screen.textContent = ''; // Réinitialise l'écran pour la question suivante
            quiz.indexCurrentQuestion++;
            quiz.displayCurrentQuestion();
        }, 1500); // Petit délai pour que l'utilisateur voie la correction avant de passer à la question suivante
    };
}    

this.checkAnswer = () => {
    let selectedAnswers = Array.from(document.querySelectorAll('.selectedAnswer')).map(answer => parseInt(answer.id));

    // Vérification des réponses sélectionnées
    const allCorrectSelected = this.correctAnswers.every(answer => selectedAnswers.includes(answer));
    const noWrongSelected = selectedAnswers.every(answer => this.correctAnswers.includes(answer));

    // Si toutes les bonnes réponses sont sélectionnées et aucune mauvaise réponse
    if (allCorrectSelected && noWrongSelected) {
        quiz.nbrCorrects++; // Incrémente le score si la sélection est parfaite
    }

    // Affichage des réponses correctes et fausses
    selectedAnswers.forEach(selectedAnswer => {
        if (this.correctAnswers.includes(selectedAnswer)) {
            let correctAnswerElement = document.getElementById(selectedAnswer);
            correctAnswerElement.classList.add("answersCorrect"); // Affiche en vert si la réponse est correcte
        } else {
            let wrongAnswerElement = document.getElementById(selectedAnswer);
            wrongAnswerElement.classList.add("answersWrong"); // Affiche en rouge si la réponse est fausse
        }
    });

    // Afficher toutes les bonnes réponses (même celles non sélectionnées)
    this.correctAnswers.forEach(correctAnswer => {
        let correctAnswerElement = document.getElementById(correctAnswer);
        correctAnswerElement.classList.add("answersCorrect");
    });

    // Afficher l'explication après validation
    let explanationElement = document.getElementById('explanation');
    explanationElement.textContent = this.explanation;
    explanationElement.style.display = "block"; // Afficher l'explication

    // Passer à la question suivante après un délai
    setTimeout(function() {
        questions_screen.textContent = ''; // Réinitialiser l'écran pour la question suivante
        explanationElement.style.display = "none"; // Masquer l'explication avant la prochaine question
        quiz.indexCurrentQuestion++;
        quiz.displayCurrentQuestion();
    }, 4000); // Petit délai pour que l'utilisateur voie la correction et l'explication avant de passer à la question suivante
};

// Initialisation du quiz
let quiz = new Quiz();

let question1 = new Question("Où se trouve la commande de réglage des feux ?", ["À gauche du volant", "À droite du volant", "Autre"], [1], "test");
quiz.addQuestion(question1);

let question2 = new Question("Pourquoi doit-on régler les feux ?", ["Pour améliorer la vision de nuit", "Pour éviter l'éblouissement des autres conducteurs", "Pour avoir un bon style"], [1, 2]);
quiz.addQuestion(question2);

let question3 = new Question("Comment et pourquoi protéger une zone de danger en cas d'accident de la route ? ", ["En délimitant clairement et largement la zone", "En attendant les secours ", "Pour éviter un sur-accident", "Pour protéger les victimes"], [1,3,4]);
quiz.addQuestion(question3);

let question4 = new Question("Où se trouve le remplissage de produit lave-glace ? ", ["Sous le Capot, dans un bocal", "Dans le coffre", "Le quoi ?"], [1]);
quiz.addQuestion(question4);

let question5 = new Question("Pourquoi est-il préférable d'utiliser un liquide spéciale en hiver ? ", ["Pourquoi pas ?", "Pour éviter le gel du liquide", "Sa ne sert à rien"], [2]);
quiz.addQuestion(question5);

let question6 = new Question("Quels comportements adopter en cas de diffusion du signal d’alerte du Système d’Alerte et d’Information des Populations (SAIP) ?", ["Se mettre en sécurité", "Paniquer", "S'informer sur internet par les médias", "Sortir", "Respecter les consignes" ], [1,3,5]);
quiz.addQuestion(question6);

let question7 = new Question("Quel est l'intérêt du mode nuit du rétro intérieur ? ", ["Aucun", "Ne pas être éblouie par la voiture de derrière", "Ne pas éblouir les voiture de dérrière"], [2]);
quiz.addQuestion(question7);

let question8 = new Question("Comment mettre le rétroviseur en mode nuit ? ", ["Grâce à une languette sous le rétroviseur intérieur", "En bougant le rétro"], [1]);
quiz.addQuestion(question8);

let question9 = new Question("Comment est composés le signal d'alerte du SAIP ? ", ["Signal de fin d'alerte, en continu", "En continu", "Variation du signal sur trois cycles successifs", "Variation de 4 cycles successifs"], [1,3]);
quiz.addQuestion(question9);

let question10 = new Question("Où peut-on trouver les pressions préconisées pour les pneumatiques ? ", ["Dans la boite à gants", "Dans la notice d'utilisation du véhicule", "Sur le tableau de bord", "sous le capot"], [2]);
quiz.addQuestion(question10);

let question11 = new Question("Sur autoroute, comment indiquer avec précision les lieux de l’accident depuis un téléphone portable ?", ["En indiquant le numéro de l'autoroute", "En indiquant, le point kilométrique et le sens de circulation", "En indiquant le point kilométrique, le numéro de l'autoroute et le sens de circulation"], [3]);
quiz.addQuestion(question11);

let question12 = new Question("Comment détecter l'usure des essuie glace avant en circulation ? ", ["Lorsqu'ils laissent des traces quand il pleut", "Lorsque l'eau devient verte ou bleue sur le pare-brise", "Lorsque les essuie glace font bouger le volant"], [1]);
quiz.addQuestion(question12);

let question13 = new Question("Comment vérifier la respiration d'une victime ? ", ["En lui envoyant un texto, si elle repond c'est qu'elle respire", "Tenez un ballon devant sa bouche, si il se gonfle, c'est qu'elle respire", "Regarder si le ventre et la poitrine se soulèvent et sentir de l'air à l'expiration"], [3]);
quiz.addQuestion(question13);

let question14 = new Question("En cas de panne ou d'accident quel(s) accessoire(s) est necessaire ? ", ["Un parapluie pour couvrir la voiture et un mirroir", "Le triangle de pré-signalisation et le gilet jaune", "Des confettis"], [2]);
quiz.addQuestion(question14);

let question15 = new Question("Si un dégagement d'urgence de la victime est nécessaire, où doit-elle être déplacée ? ", ["Proche du lieu de l'accident", "Le plus loin possible du lieu de l'accident"], [2]);
quiz.addQuestion(question15);

let question16 = new Question("Quelle est la conséquence d'un niveau insuffisant du liquide de frein ? ", ["Aucune conséquences", "Une augmentation de l'éficacité du liquide de frein", "Une perte de l'éficacité du liquide de frein"], [3]);
quiz.addQuestion(question16);

let question17 = new Question("En cas de panne ou d’accident, quel équipement de sécurité doit être porté avant de quitter le véhicule ? ", ["Un gilet normal", "Un gilet de pré-signalisation (ou gilet jaune)", "Un manteau au cas où il pleut"], [2]);
quiz.addQuestion(question17);

let question18 = new Question("Quels sont les documents obligatoires à présenter en cas de contrôle par les forces de l'ordre ? ", ["Carte d'dentité et permis de conduire", "Permis de conduire, carte grise et attestation d'assurance", "Carte grise et passport"], [2]);
quiz.addQuestion(question18);

let question19 = new Question("Pourquoi l’alerte auprès des services de secours doit-elle être rapide et précise ? ", ["Parce qu'on a pas que sa à faire", "Pour permettre aux services de secours d'apporter les moyens adaptés aux victimes dans le délai le plus court."], [2]);
quiz.addQuestion(question19);

let question20 = new Question("Quel est le risque de circuler avec des balais d'essuie glace défectueux ? ", ["Aucun risque", "Une mauvaise visibilité lors d'intempérie", "Beaucoup de risques"], [2]);
quiz.addQuestion(question20);

let question21 = new Question("Quels sont les numéros d'urgences ?", ["Le 15 pour le SAMU", "Le 14 pour la police", "Le 19 pour la gendarmerie", "le 18 pour les pompiers", "le 112 qui est un numéro d'urgence valide dans l'union europpéenne"], [1, 4, 5]);
quiz.addQuestion(question21);

let question22 = new Question("Quelles sont les précautions à prendre lors du remplissage du réservoir ?", ["Aucune", "Laisser le moteur allumé", "Arreter le moteur, ne pas fumer, ne pas telephoner"], [3]);
quiz.addQuestion(question22);

let question23 = new Question("Quels comportements adopter en présence d’une victime qui ne répond pas et ne réagit pas, mais respire ? ", ["La placer en position latérale de sécurité, alerter les secours, surveiller la respiration de la victime", "Aucuns comportements "], [1]);
quiz.addQuestion(question23);

let question24 = new Question("Où se trouve le remplissage du liquide de refroidissement ? ", ["Le quoi ?", "Sous le Capot", "Dans le coffre"], [2]);
quiz.addQuestion(question24);

let question25 = new Question("Quel est le danger si l'on complète le niveau du liquide lorsque le moteur est chaud ? ", ["Quel danger ?", "Aucun risque", "Rique de brûlure"], [3]);
quiz.addQuestion(question25);

let question26 = new Question("Comment arrêter une hémorragie ?", ["En appuyant fortement sur l’endroit qui saigne avec la paume de la main et en mettant un tissu propre sur la plaie.", "En ne faisant rien", "Elle s'arrete toute seule"], [1]);
quiz.addQuestion(question26);

let question27 = new Question("Quel est l'intérêt du mode nuit du rétro intérieur ? ", ["Aucun", "Ne pas être éblouie par la voiture de derrière", "Ne pas éblouir les voiture de dérrière"], [2]);
quiz.addQuestion(question27);

let question28 = new Question(" Comment mettre le rétroviseur en mode nuit ? ", ["Grâce à une languette sous le rétroviseur intérieur", "En bougant le rétro"], [1]);
quiz.addQuestion(question28);

let question29 = new Question("Comment est composés le signal d'alerte du SAIP ? ", ["Signal de fin d'alerte, en continu", "En continu", "Variation du signal sur trois cycles successifs", "Variation de 4 cycles successifs"], [1,3]);
quiz.addQuestion(question29);

let question30 = new Question("Où peut-on trouver les pressions préconisées pour les pneumatiques ? ", ["Dans la boite à gants", "Dans la notice d'utilisation du véhicule", "Sur le tableau de bord", "sous le capot"], [2]);
quiz.addQuestion(question30);

let question31 = new Question("Où se trouve la commande pour activer les essuie-glaces, et comment la mettre sur la position la plus rapide ? ", ["Sur le coté droit du volant, et en le tournant vers soi", "Sur le coté gauche du volant, et en le tournant vers le pare-brise"], [1]);
quiz.addQuestion(question31);

let question32 = new Question("Quelles sont les précautions à prendre en cas d'installation d'un porte vélo ? ", ["Pour être sûr que le porte-vélo ne bouge pas, il suffit de le coller avec de la colle chaude. Ça tient toujours !", "Ne pas cacher la plaque d'immatriculation et les feux arrière", "Pour un style unique, installez le porte-vélo à l'envers. Ça fait des commentaires !"], [2]);
quiz.addQuestion(question32);

let question33 = new Question("Qu'est ce qu'une perte de connaissance ? ", ["C'est un état où la personne ne répond pas et ne semble pas consciente de son environnement, souvent dû à un traumatisme ou à un manque d'oxygène", "C'est un état où l'esprit quitte temporairement le corps pour explorer d'autres dimensions.", "Lorsque la victime ne réagit et ne répond pas, mais respire"], [3]);
quiz.addQuestion(question33);

let question34 = new Question("Où se trouve le gilet de haute visibilité (appelé également gilet jaune) ? ", ["Dans la boite à gants", "Dans la porte coté passager (ou conducteur)", "Supendu au retroviseur exterieur"], [2]);
quiz.addQuestion(question34);

let question35 = new Question("A quel niveau doit etre le liquide de frein ? ", ["Au dessus du Maxi", "Entre le maxi et la mini", "Au dessus du maxi"], [2]);
quiz.addQuestion(question35);

let question36 = new Question("Où doit être la certificat d'immatriculation du véhicule ? ", ["Dans le coffre", "Sous le siège conducteur", "Dans la boîte à gant"], [3]);
quiz.addQuestion(question36);

let question37 = new Question("Où se situe l'indicateur du niveau de carburant ? ", ["Sur le tableau de bord", "Sur le coté de la voiture", "Sur la plaque a carburant"], [1]);
quiz.addQuestion(question37);

let question38 = new Question("Quels sont les précautions à prendre lors du remplissage du réservoir ? ", ["Arreter le moteur, ne pas fumer, ne pas téléphoner", "Laisser la moteur allumer pour éviter d'endommager la batterie", "Arreter le moteur mais laisser les feux allumer popur voir quelque chose"], [1]);
quiz.addQuestion(question38);

let question39 = new Question("Quels comportement adopter en présence d'une victime inconsciente ? ", ["Secouer la victime pour tenter de la réveiller avant d'appeler les secours.", "Placer la victime en position latérale de sécurité (PLS), alerter les secours, surveiller sa respiration.", "Placer la victime sur le dos et surveiller sa respiration en attendant les secours."], [2], ["test"]);
quiz.addQuestion(question39);

let question40 = new Question("Où s'effectue le remplissage du liquide de refroidissement ? ", ["Directement dans le radiateur, par l’avant du véhicule.", "Sous le capot, dans un bocal spécifique prévu à cet effet.", " Dans le réservoir à carburant, avec une petite quantité de liquide."], [2]);
quiz.addQuestion(question40);

let question41 = new Question("Comment arrêter une hémorragie ?", ["Saupoudrer du sel sur la plaie pour coaguler le sang plus rapidement", "Élever la température de la zone blessée en la couvrant pour favoriser la coagulation", "Appliquer une pression directe sur la blessure avec un tissu propre ou une compresse pour stopper le saignement"], [3], ["test"]);
quiz.addQuestion(question41);

let question42 = new Question("Comment actionner le dégivrage de la lunette arrière et où se trouve le voyant ou le repère correspondant ?", ["Appuyer sur le bouton de ventilation intérieure pour activer le dégivrage, et le voyant s’allume sur le pare-brise.", "Appuyer sur un bouton avec un symbole représentant trois flèches ondulées pour activer le dégivrage, et le voyant correspondant s’allume sur le tableau de bord", "Appuyer sur le bouton des feux de détresse, ce qui activera le dégivrage et le voyant clignotera."], [2]);
quiz.addQuestion(question42);

let question43 = new Question("Quelle peut être la conséquence d'une panne de dégivrage de la lunette arrière ? ", ["La climatisation de l’habitacle sera défectueuse, car elle dépend du système de dégivrage", "La voiture ne pourra plus démarrer en raison de l'accumulation d'humidité dans le moteur", "Les phares arrière cesseront de fonctionner, car ils sont liés au système de dégivrage", "Une mauvaise visibilité à l'arrière, surtout par temps froid ou humide, ce qui peut augmenter le risque d'accident"], [4]);
quiz.addQuestion(question43);

let question44 = new Question("Hors autoroute ou endroit dangereux, en cas de panne ou d’accident, où doit être placé le triangle de pré-signalisation ? ", ["Le triangle de pré-signalisation doit être placé à une distance d’environ 30 m de la panne ou de l’accident, ou avant un virage, ou un sommet de côte", "À côté du véhicule, pour indiquer immédiatement la panne aux autres conducteurs", "Sur le toit du véhicule, pour être visible de loin, surtout en cas de brouillard"], [1]);
quiz.addQuestion(question44);

let question45 = new Question("Comment contrôler l'état, la propreté et le fonctionnement de tous les clignotants côté trottoir ? ", ["Régler la climatisation sur la position maximale, ce qui nettoie automatiquement les clignotants côté trottoir.", "Allumer les feux de détresse, puis faire le tour du véhicule pour vérifier que les clignotants fonctionnent et sont propres.", "Tourner le volant à fond à gauche, ce qui active les clignotants côté trottoir pour un contrôle facile."], [2]);
quiz.addQuestion(question45);

let question46 = new Question("Quelle est la signification d'un clignotement plus rapide ? ", ["Les phares sont allumés", "Les clignotants avant sont allumés", "Une ampoule est grillée","Il y a une surcharge"], [3]);
quiz.addQuestion(question46);

let question47 = new Question("Quelles sont les conditions pour réaliser le dégagement d’urgence d’une victime en présence d’un danger réel, immédiat et non contrôlable ?", ["La victime doit être visible, facile à atteindre et rien ne doit gêner son dégagement. Il faut être sûr(e) de pouvoir réaliser le dégagement de la victime", "S’assurer de la sécurité de l'environnement avant d'intervenir", "Déplacer la victime uniquement si elle est en danger de mort immédiat."], [1]);
quiz.addQuestion(question47);

let question48 = new Question("Quel voyant signale une pression insuffisante d'huile dans le moteur ?", ["Le voyant de température moteur", "Le voyant d'alerte de pression d'huile", "Le voyant de freinage", "Le voyant de batterie"], [2]);
quiz.addQuestion(question48);

let question49 = new Question("Quelles sont les conditions à respecter pour contrôler le niveau d'huile ?", ["Moteur chaud et sur une pente", "Moteur froid et sur un terrain plat", "Moteur en marche et sur une surface inclinée", "Moteur éteint et sur un terrain en herbe"], [2]);
quiz.addQuestion(question49);

let question50 = new Question("Quelles sont les trois informations à transmettre aux services de secours ?", ["L'identité des personnes blessées, la gravité des blessures, et la manière dont l'accident s'est produit.", "Le numéro de téléphone à partir duquel l’appel est émis, la nature et la localisation la plus précise du problème", "Le type d'urgence, la couleur des véhicules de secours, et la durée estimée d'arrivée des secours"], [2]);
quiz.addQuestion(question50);

let question51 = new Question("Que devez-vous vérifier concernant les feux de brouillard arrière ?", ["Contrôlez l'intensité de la lumière et la fréquence d'utilisation des feux de brouillard arrière", "Contrôlez l'état, la propreté et le fonctionnement du ou des feux de brouillard arrière.", "Testez leur intensité, la propreté du véhicule, et la luminosité des phares avant"], [2]);
quiz.addQuestion(question51);

let question52 = new Question("Dans quels cas utilise-t-on les feux de brouillard arrière", ["Par temps de brouillard et de neige", "Lorsqu'il pleut beaucoup et par temps de brouillard", "Lorsqu'il neige un petit peu et quand il fait nuit"], [1]);
quiz.addQuestion(question52);

let question53 = new Question("Par quels moyens doit-on alerter les secours ?", ["A l'aide de signaux de fumées", "On doit crier pour les alerter", "Avec un telephone portable, ou fixe ou d'une borne d'arret d'urgence"], [3]);
quiz.addQuestion(question53);

let question54 = new Question("Où se trouve l'ethylotest ?", ["Dans la boite à gant ou dans le vide poche de la porte (conducteur ou passager)", "Sous le siège (passager ou conducteur)", "Dans le coffre"], [1]);
quiz.addQuestion(question54);

let question55 = new Question("A partir de quel taux d'alcoolémie, en période de permis probatoire, est-on en infraction", ["0.5g/l", "0.7g/l", "0.2g/l","0.3g/l"], [3]);
quiz.addQuestion(question55);

let question56 = new Question("Quel comportement adopter en présence d'une victime en arrêt cardiaque ?", ["Deplacer la victime, masser et attendre les secours", "Alerter les secours et attendre en ne faisant rien", "Alerter, Masser et difibriller"], [3]);
quiz.addQuestion(question56);

let question57 = new Question("Comment controler l'etat, la propreter et le fonctionnement des feux de détresse avant et arrière ?", ["Verifier que les feux fonctionnent, qu'ils sont propres et en bon état", "Faire le tour de la voiture et regarder si tous fonctionne", "Demander a un garagiste de verifier l'etat de la voiture"], [1]);
quiz.addQuestion(question57);

let question58 = new Question("Dans quels cas doit-on utiliser les feux de detresse ?", ["En cas de dangers imminents", "En cas de mecontentement", "Pour dire merci à la personne de derrière"], [1]);
quiz.addQuestion(question58);

let question59 = new Question("Dans quel cas peut-on positionner une victime en Position Latérale de Sécurité (PLS)", ["Si la victime ne répond pas, ne réagit pas et respire", "Dans n'importe quel cas", "Dans aucun cas"], [1]);
quiz.addQuestion(question59);

let question60 = new Question("Où se situe la commande de reglage du volant ?", ["En bas à gauche du volant (en-dessous de la commande du clignotant)", "En bas à droite du volant", "En-dessous du volant"], [1]);
quiz.addQuestion(question60);

let question61 = new Question("Pourquoi est-il important de régler son volant correctement (2 bonne réponses)", ["Pour éviter que le volant ne chauffe trop pendant la conduite", "Le confort de la conduite", "Pour aviter de klaxonner accidentellement quand on freine", "l'accessibilité des commandes", "Pour empêcher les vibrations du volant d'endommager les pneus"], [2, 4], ["test"]);
quiz.addQuestion(question61);

let question62 = new Question("Dans quelle situation peut-on déplacer une victime ?", ["En présence d'un danger réel", "Jamais", "Le déplacement doit rester exceptionnel"], [1]);
quiz.addQuestion(question62);

let question63 = new Question("Comment controler l'etat, la propreté et le fonctionnement des feux de route ?", ["En verifiant si les feux fonctionnent lorsqu'on klaxonne", "En éteignant le moteur et en attendant que les feux refroidissent", "En allumant les feux, en vérifiant visuellement qu'ils fonctionnent correctement, qu'ils sont bien éclairés et propres", "En roulant sur une route sombre pour voir s'ils s'allument automatiquement"], [3]);
quiz.addQuestion(question63);

let question64 = new Question("Dans quel cas il faut utiliser de l'appel lumineux ?", ["En cas de danger", "En cas de mecontentement", "Pour dire à la voiture de devant d'aller plus vite"], [1]);
quiz.addQuestion(question64);

let question65 = new Question("Quels sont les deux éléments complémentaires permettant un désembuage efficace.", ["La commande de vitesse de ventilation et la clim", "Le degivrage avant et arrière", "Y en a pas"], [1]);
quiz.addQuestion(question65);

let question66 = new Question("Quel est l’objectif du Signal d’Alerte et d’Information des Populations (SAIP) ?", ["De faire de la musique de temps en temps", "Avertir la population d'un danger imminent", "Aucun objectif particulier"], [2]);
quiz.addQuestion(question66);

let question67 = new Question("Quel est le risque d'un manque d'huile moteur ?", ["Aucun risque particulier", "Un risque de détérioration ou de casse du moteur"], [2]);
quiz.addQuestion(question67);

let question68 = new Question("Comment est diffusée l’alerte émise par le Signal d’Alerte et d’Information aux Populations (SAIP) ?", ["Grâce aux sirènes, aux médias ou encore grâce à l’application SAIP.", "En projetant de la lumière dans le ciel", "Par courrier"], [1]);
quiz.addQuestion(question68);

let question69 = new Question("De quel couleur est le voyant d'alerte signalant un défaut de batterie ?", ["Vert", "Rouge", "Jaune", "Orange"], [2]);
quiz.addQuestion(question69);

let question70 = new Question("Qu'est-ce qui peut provoquer la décharge de la batterie, moteur éteint ?", ["Le klaxon", "Les sièges", "Les feux ou accessoires électriques", "Le coffre qui reste ouvert"], [3]);
quiz.addQuestion(question70);

let question71 = new Question("A partir de quel âge peut-on suivre une formation aux premiers secours ?", ["12 ans", "14 ans", "10 ans"], [3]);
quiz.addQuestion(question71);

let question72 = new Question("Quelle est la solution en cas de panne de batterie pour démarrer le véhicule sans le déplacer ?", ["Enlever la batterie, la brancher sur secteur puis la remettre dans la voiture", "Brancher une seconde batterie en parrallèle (+ sur + et - sur -) ou la remplacer", "La brancher sur une batterie externe"], [2]);
quiz.addQuestion(question72);

let question73 = new Question("Pourquoi faut-il pratiquer immédiatement une réanimation cardio-pulmonaire sur une victime en arrêt cardiaque ?", ["Parce que c'est important", "Parce que les lésions du cerveau, surviennent dès les premières minutes", "Parce que les secours nous le demande"], [2]);
quiz.addQuestion(question73);

let question74 = new Question("De quelle couleur est le voyant qui indique une défaillance du système de freinage ?", ["rose", "violet", "rouge", "jaune"], [3]);
quiz.addQuestion(question74);

let question75 = new Question("Quel est le risque de circuler avec un frein de parking mal desserré ?", ["Une dégradation du système de freinage", "On vas pas avancer tres vite"], [1]);
quiz.addQuestion(question75);

let question76 = new Question("Quelles sont les conséquences d'un mauvais réglage des feux de croisement ?", ["Mauvaise visibilités", "Une bonne vue a l'avant", "Eblouissement des autres usager", "Une mauvaise vue a l'arrière"], [1,3]);
quiz.addQuestion(question76);

let question77 = new Question("De quel couleur est le voyant d'alerte signalant une température trop élevée du liquide de refroidissement ?", ["Bleu", "Orange", "Rouge", "Vert foncé"], [3]);
quiz.addQuestion(question77);

let question78 = new Question("Quelle est la conséquence d'une température trop élevée du liquide de refroidissement ?", ["Un refroidissement du moteur", "Une surchauffe ou une casse moteur", "Aucune conséquence spéciale"], [2]);
quiz.addQuestion(question78);

let question79 = new Question("Lors d’un appel avec les services de secours, pourquoi devez-vous attendre que votre correspondant vous autorise à raccrocher ?", ["Pourquoi pas ?", "Parce que c'est un ordre", "Car il peut nous conseiller ou nous guider dans la réalisation des gestes à faire, ou ne pas faire, jusqu’à l’arrivée des secours"], [3]);
quiz.addQuestion(question79);

let question80 = new Question("Quelle est l'utilité des dispositifs réfléchissants ?", ["Aucune utilité", "Rendre visible le véhicule la nuit.", "Ne pas éblouir les autres usagers"], [2]);
quiz.addQuestion(question80);

let question81 = new Question("A quel moment pouvez-vous mettre fin à un appel avec les secours ?", ["Quand on veut", "Uniquement lorsque notre correspondant nous invite à le faire", "Quand la victime est en sécurité"], [2], ["test"]);
quiz.addQuestion(question81);

let question82 = new Question("De quel couleur est le voyant signalant la mauvaise fermeture d'une portière ?", ["Jaune", "Blanc", "Rouge", "Noir"], [3]);
quiz.addQuestion(question82);

let question83 = new Question("Quelle précaution dois-je prendre pour que les enfants installés à l'arrière ne puissent pas ouvrir leur portière ?", ["Bloquer la porte avec un objet", "Ne rien faire", "Actionner la sécurité enfant sur les deux portières arrière."], [3]);
quiz.addQuestion(question83);

let question84 = new Question("Comment évaluer l’état de conscience d’une victime ? (3 bonnes réponses)", ["En lui pinçant légèrement pour voir si elle réagit", "En la regardant dans les yeux pour voir si elle cligne des paupières", "Lui poser des questions simples (comment ça va ?, vous m'entendez ?)", "En lui lançant de l’eau froide sur le visage", "Lui secouer doucement les épaules", "En observant sa respiration pendant 10 secondes", "Lui prendre la main en lui demandant d'exécuter un geste simple (serrez-moi la main)"], [3,5,7]);
quiz.addQuestion(question4);

let question85 = new Question("Par temps clair, à quelle distance doivent être visible les feux de position ?", ["50", "150", "250"], [2]);
quiz.addQuestion(question85);

let question86 = new Question("Quels sont les risques pour une personne en perte de connaissance qui est allongée sur le dos ?", ["L’arrêt respiratoire et l’arrêt cardiaque.", "Aucun"], [1]);
quiz.addQuestion(question86);

let question87 = new Question("De quel forme est le bouton pour actionner les feux de détresse ?", ["Rond", "Carré", "parallélépipède rectangle", "triangle"], [4]);
quiz.addQuestion(question87);

let question88 = new Question("Quand utilise-t-on les feux de détresse ?", ["En cas de danger imminent, de panne ou d'accident", "pour dire merci aux usagers derrière nous"], [1]);
quiz.addQuestion(question88);

let question89 = new Question("Qu'est-ce que l'aquaplanage, et quelle peut être sa conséquence ?", ["Il suffit de freiner brusquement pour l'éviter", "La présence d'un film d'eau entre le pneumatique et la chaussée pouvant entraîner une perte de contrôle du véhicule", "C'est un phénomène qui n'arrive que sur des routes gelées", "Cela survient uniquement à des vitesses très basses, en dessous de 30 km/h", "Cela ne peut se produire qu'avec des pneus usés"], [2]);
quiz.addQuestion(question89);

let question90 = new Question("Où se trouve la commande du régulateur de vitesse ?", ["Sur le volant", "Sur le tableau de bord", "Dans la porte conducteur", "Sur l'ecran a coté du volant"], [1]);
quiz.addQuestion(question90);

let question91 = new Question("Sans actionner la commande du régulateur, comment le désactiver rapidement ?", ["En appuyant sur la pédale de frein ou d'embrayage", "En klaxonnant", "En activant un clignotant"], [1]);
quiz.addQuestion(question91);

let question92 = new Question("Où se trouve la copmmande du klaxon?", ["Sur le coté de la commande des clignotants", "En plein milieu du volant", "Sur le tableau de bord"], [2]);
quiz.addQuestion(question92);

let question93 = new Question("Dans quel cas peut-on utiliser l'avertisseur sonore en agglomération ?", ["Jamais", "En cas de bouchon", "En cas de danger immédiat"], [3]);
quiz.addQuestion(question93);

let question94 = new Question("Pourquoi ne faut-il pas laisser une personne en perte de connaissance allongée sur le dos ?", ["Parce que cela provoque des crampes dans les jambes", "Car elle risque un étouffement pard des liquides présents dans la gorge", "Parce que cela pourrait accélérer son rythme cardiaque"], [2]);
quiz.addQuestion(question94);

let question95 = new Question("L’utilisation d’un Défibrillateur Automatisé (DAE) sur une victime qui n’est pas en arrêt cardiaque présente-t-elle un risque ?", ["Oui elle peut être en arret cardiaque", "Non aucun danger", "Non, car le défibrillateur se déclenche uniquement quand la victime est en arrêt cardiaque."], [3]);
quiz.addQuestion(question95);

let question96 = new Question("Dans quelle situation doit-on désactiver le airbag du passager avant ?", ["Tout le temps", "Quand on transporte un bébé", "Lors du transport d'un enfant à l'avant dans un siège auto, dos à la route"], [3]);
quiz.addQuestion(question96);

let question97 = new Question("A quelle fréquence est-il préconisé de vérifier la pression des pneus", ["Chaque semaine", "Chaque mois", "Chaque année"], [2]);
quiz.addQuestion(question97);

let question98 = new Question("A partir de quel âge un enfant peut-il être installé sur le siège passager avant ?", ["8 ans ", "10 ans", "14 ans"], [2]);
quiz.addQuestion(question98);

let question99 = new Question("Un défaut d'éclairage de la plaque lors du contrôle technique entraîne-t-il une contre-visite ?", ["Oui", "Non"], [1]);
quiz.addQuestion(question99);

let question100 = new Question("Si la sécurité enfant est enclenchée, est-il possible d'ouvrir la porte arrière depuis l'extérieur ?", ["Oui", "Non"], [1]);
quiz.addQuestion(question100);

let question101 = new Question("Quels sont les risques pour une personne victime d’une hémorragie ?", ["Entraîner pour la victime une détresse circulatoire ou un arrêt cardiaque.", "Qu'elle ne se sente pas bien quand elle est guérie"], [1]);
quiz.addQuestion(question101);

let question102 = new Question("Pouvez-vous utiliser les feux de brouillard arrière par forte pluie ?", ["Non", "Oui"], [1]);
quiz.addQuestion(question102);

let question103 = new Question("Quels sont les signes d’un arrêt cardiaque ?", ["La victime repond lorsqu'on l'appelle", "Son coeur ne bat plus", "La victime ne répond pas, ne réagit pas et ne respire pas ou présente une respiration anormale"], [3]);
quiz.addQuestion(question103);

let question104 = new Question("Quels sont les deux utilités des feux de recul ?", ["Pour faire joli", "Aucune", "Eclairer la zone de recul la nuit", "Etre visible la nuit", "Avertir les autres usagers de la manoeuvre"], [3,5]);
quiz.addQuestion(question104);

let question105 = new Question("Qu’est ce qu’un défibrillateur automatisé externe (DAE) ?", ["Un défibrillateur que l'on peut utiliser que a l'exterieur", "C'est un appareil qui sert a réanimé une personne en arrêt cardiaque", "C’est un appareil qui peut permettre de rétablir une activité cardiaque normale à une victime en arrêt cardiaque"], [3]);
quiz.addQuestion(question105);

let question106 = new Question("Quel est l'utilité du réglage de l'appuie-tête ?", ["Le confort de la conduite", "Meilleur visibilité", "On peut mux tourner la tête pour les rétro et angles-morts", "Permet de retenir le mouvement de la tête en cas de choc et de limiter les blessures."], [4]);
quiz.addQuestion(question106);

let question107 = new Question("Quelle est la conséquence en cas de panne des feux de stop ?", ["Ne pas être vu quand on freine", "Un manque d'information pour les usagers suiveurs et un risque de collision"], [2]);
quiz.addQuestion(question107);

let question108 = new Question("De quelle couleur est le voyant qui indique au conducteur que le feu de brouillard arrière est allumé ?", ["Rouge", "Bleue", "Vert", "Orange", "jaune fluo"], [4]);
quiz.addQuestion(question108);

let question109 = new Question("Quelle est la différence entre un voyant orange et un voyant rouge ?", ["Orange : pas important, Rouge : Important", "Rouge : Une anomalie de fonctionnement ou un danger, Orange : un élément important."], [2]);
quiz.addQuestion(question109);

let question110 = new Question("Qu’est ce qu’un arrêt cardiaque ?", ["Le coeur bat trés vite", "Coeur bat pas trop vite", "Le coeur bat trop vite", "Le coeur ne fonctionne plus ou fonctionne d’une façon anarchique"], [4]);
quiz.addQuestion(question110);

let question111 = new Question("En roulant, quel est le risque d'une mauvaise fermeture du capot ?", ["Un risque d'ouverture du capot pouvant entraîner un accident.", "Une panne de moteur"], [1]);
quiz.addQuestion(question111);

let question112 = new Question("Quel est le risque principal d’un arrêt cardiaque sans intervention des secours ?", ["La victime se réanime seule", "La mort de la victime qui survient en quelques minutes"], [2]);
quiz.addQuestion(question112);

// question 49 verif interieur p20

let question113 = new Question("Quelle est la commande pour recycler l'air dans un véhicule ?", ["Tourner la manivelle de la fenêtre dans le sens inverse", "Appuyer sur le bouton Recyclage d'air", "Activer le bouton Circulation d'air intérieur", "Appuyer sur le bouton Dégivrage rapide"], [2]);
quiz.addQuestion(question113);

let question114 = new Question("Quel peut être le risque de maintenir le recyclage de l’air de manière prolongée ?", ["aucune", "On peut epuiser le stock d'air dans la voiture", "Devenir malade", "Un risque de mauvaise visibilité par l’apparition de buée sur les surfaces vitrées"], [4]);
quiz.addQuestion(question114);

let question115 = new Question("Quel est le principal risque d'une absence de liquide lave-glace ?", ["Une meilleur visibilité", "Une mauvaise visibilité"], [2]);
quiz.addQuestion(question115);

let question116 = new Question("De quel couleur est le voyant des feux de routes ?", ["Rouge", "Orange", "Bleu", "Vert"], [3]);
quiz.addQuestion(question116);

let question117 = new Question("Quel est le risque de maintenir les feux de route lors d'un croisement avec d'autres usagers ?", ["Meilleur visbilité", "Voir plus loin", "Un risque d'éblouissement des autres usagers"], [3]);
quiz.addQuestion(question117);

let question118 = new Question("Quelle est l'utilité des feux diurnes ?", ["Etre visible la nuit", "Mieux voir le jour", "Mieux voir la nuit", "Rendre le véhicule plus visible le jour"], [4]);
quiz.addQuestion(question108);

let question119 = new Question("Où se trouve le constat amiable ?", ["Dans le coffre","Sous le siège", "Dans la boite a gant"], [3]);
quiz.addQuestion(question119);

let question120 = new Question("En cas d'accident, dans quel délai le constat amiable doit-il être transmis à l'assureur ?", ["3 jours", "15 jours", "2 mois", "5 jours"], [4]);
quiz.addQuestion(question120);

let question121 = new Question("Utilise-t-on le triangle de pré-signalisation sur autoroute ?", ["Oui", "Non"], [2]);
quiz.addQuestion(question121);

let question122 = new Question("De quelle couleur est le voyant qui indique une défaillance du système de freinage ?", ["Vert vif", "Jaune fluo", "Rose fluo", "Rouge"], [4]);
quiz.addQuestion(question122);

let question123 = new Question("Quelles sont les conséquences en cas de panne d'un feu de croisement ?", ["Ne plus voir la nuit", "Une mauvaise visibilité et le risque d'être confondu avec un deux roues", "Mieux voir le jour"], [2]);
quiz.addQuestion(question123);

let question124 = new Question("Quelle est l'utilité d'un limiteur de vitesse ?", ["Limiter la vitesse", "Réguler la vitesse", "Ne pas dépasser la vitesse programmée par le conducteur"], [3]);
quiz.addQuestion(question124);

let question125 = new Question("Quelles sont les conséquences en cas de panne d'un feu de position arrière ?", ["Etre vu le jour", "Être mal vu et un risque de collision", "Aucune conséquences"], [2]);
quiz.addQuestion(question125);

let question126 = new Question("Pour une bonne visibilité vers l’arrière, en plus de l’utilisation de l’essuie-glace, quelle commande pouvez-vous actionner par temps de pluie ?", ["Le chauffage", "La commande de désembuage arrière", "La clim"], [2]);
quiz.addQuestion(question126);

let question127 = new Question("Lorsque vous transportez un poids important dans le coffre, quelles sont les précautions à prendre en ce qui concerne les pneumatiques et l'éclairage avant ?", ["Mettre un panneau 'attention poid important' sur la voiture", "Augmenter la pression des pneumatiques et régler la hauteur des feux avants", "diminuer la pression des pneus"], [3]);
quiz.addQuestion(question127);

let question128 = new Question("Peut-on fixer tous les sièges enfant sur des attaches de type Isofix ?", ["Oui", "Non"], [2]);
quiz.addQuestion(question128);

let question129 = new Question("Comment vérifier la respiration d’une victime ?", ["Voir si elle repond a nos questions", "Regarder si le ventre et la poitrine se soulèvent et sentir de l’air à l’expiration"], [2]);
quiz.addQuestion(question129);

let question130 = new Question("Quels sont les risques de circuler avec des objets sur la plage arrière ?", ["Ne rien voir dans le retro interieur", "Les personnes de derrière ne pourront pas voir devant eux correctement", "Une mauvaise visibilité vers l'arrière et un risque de projection en cas de freinage brusque ou de choc."], [3]);
quiz.addQuestion(question130);

let question131 = new Question("Pour un capot s'ouvrant a l'avant du véhicule, quel est du dispositif de sécurité", ["Enpêcher l'ouverture du capot en circulation en cas de mauvais verrouillage", "Pour eviter les vols"], [1]);
quiz.addQuestion(question131);

let question132 = new Question("Quelle est la principale conséquence d'un dispositif de lave-glace défaillant ?", ["Une mauvaise visibilité due à l'impossibilité de nettoyer le pare-brise", "Meilleur visibilité la nuit"], [1]);
quiz.addQuestion(question132);

// Ici je suis obligé de passer par un querySelectroAll pour avoir accès à la fonction ForEach (car le getElement ne le possède pas)
let NbrQuestion = document.querySelectorAll(".nbrQuestion");

NbrQuestion.forEach(function(NbrQuestion) {
    NbrQuestion.textContent = quiz.questions.length;
});


// Fonction servant à lancer le questionnaire en enlevant la page d'introduction du quiz et en mettant la première question
function startQuestions() {
    header_screen.style.display = "none";
    questions_screen.style.display = "block";

    quiz.displayCurrentQuestion();
}


// Récupérer le bouton dans mon html avec le ElementById car le ElementsByClassName n'a pas le addEventListener)
let btn_start = document.getElementById("btn_start");
btn_start.addEventListener("click", startQuestions);