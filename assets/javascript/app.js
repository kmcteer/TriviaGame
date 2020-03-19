$(document).ready(function () {

    // events
    $("#remaining-time").hide();
    $("#start").on('click', trivia.startGame);
    $(document).on('click', '.option', trivia.guessChecker);


})
// sort out trivia questions that is going to be asked.
// variables = correct, incorrect, unanswered, currentSet, timer, timerOn, timerId
var trivia = {
    // trivia variables
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 20,
    timerOn: false,
    timerId: '',

    // trivia questions and answers.. below will be the questions section, then will follow the options i have selected which include the answer in a randomized order, then will follow the correct answer.
    questions: {
        q1: ' In "The Alliance" episode, Michael is asked by Oscar to donate to his nephews walkathon for a charity. How much money does Michael donate, not realizing that the donation is per mile and not a flat amount?',
        // '25 dollars',
        q2: '6 What is Michael Scotts middle name?',
        // 'Gary',
        q3: 'In the "Fun Run" episode, what objects in Angelas freezer convinced her that Dwight had killed her cat?',
        // 'Bags of frozen french fries',
        q4: 'What is the web address of Creeds blog?',
        // ' www.creedthoughts.gov.www/creedthought',
        q5: 'In the episode "Diwali", Michael eats some Indian food and spits it out because he thought it was what?',
        // 's-mores',
        q6: ' What is the exclusive club that Pam, Oscar, and Toby establish in the episode "Branch Wars"?',
        // 'Finer Things Club',

    },

    options: {

        q1: ['38 dollars', '25 dollars', '7 dollars', '13 dollars'],
        q2: ['Dwight', 'Robert', 'Gary', 'John'],
        q3: ['Bags of frozen french fries', 'Bags of peas', 'Bags of cat-nip', 'Ice'],
        q4: ['www.creedthoughts.gov.www/creedrocks', 'www.creedthoughts.gov.www/thoughts', 'www.creed.gov.www/thought', 'www.creedthoughts.gov.www/creedthought'],
        q5: ['chocolate', 'bread', 's-mores', 'chicken'],
        q6: ['Pinkys up club', 'You cant sit with us club', 'Books n Things', 'Finer things club'],

    },

    answers: {
        q1: '25 dollars',
        q2: 'Gary',
        q3: 'Bags of frozen french fries',
        q4: 'www.creedthoughts.gov.www/creedthought',
        q5: 's-mores',
        q6: 'Finer Things Club',
    },

    // methods for game utilization

    startGame: function () {
        trivia.correct = 0;
        trivia.incorrect = 0;
        trivia.unanswered = 0;
        trivia.currentSet = 0;
        clearInterval(trivia.timerId);

        // show game selection
        $('#game').show();

        // empty last results
        $('#results').html('');

        // show timer
        $('#timer').text(trivia.timer);

        // remove start button
        $('#start').hide();

        $('#remaining-time').show();

        // ask first question
        trivia.nextQuestion();

    },

    //  loop and display questions and options
    nextQuestion: function () {
        // set timer to 20 seconds each questions
        trivia.timer = 10;
        $('#timer').removeClass('last-seconds');
        $('#timer').text(trivia.timer);

        // to prevent timer speed up
        if (!trivia.timerOn) {
            clearInterval(trivia.timerId)
            trivia.timerId = setInterval(trivia.timerRunning, 1000);
        }

        // gets all the questions then indexes the current questions
        var questionContent = Object.values(trivia.questions)[trivia.currentSet];
        $('#question').text(questionContent);

        // an array of all the user options for the current question
        var questionOptions = Object.values(trivia.options)[trivia.currentSet];

        // creates all the trivia guess options in the html
        $("#options").empty()
        $.each(questionOptions, function (index, key) {
            $('#options').append($('<button class="option btn btn-info btn-lg">' + key + '</button>'));


        })
    },

    // decrementing counter and counting unanswered if timer runs out
    timerRunning: function () {
        // if theres still time left and theres still questions to ask
        if (trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length) {
            $('#timer').text(trivia.timer);
            trivia.timer--;
            if (trivia.timer === 4) {
                $('#timer').addClass('last-seconds');
            }
        }

        // the time has concluded and increment left unanswered, run result
        else if (trivia.timer === -1) {
            trivia.unanswered++;
            trivia.result = false;
            clearInterval(trivia.timerId);

            console.log(trivia.answers, trivia.currentSet)
            $('#results').html('<h3> OUT OF TIME! The answer is ' + Object.values(trivia.answers)[trivia.currentSet] + '</h3>');
            resultId = setTimeout(trivia.guessResult, 5000);

        }
        // if all the questions have been shown end the game, show results 
        else if (trivia.currentSet === Object.keys(trivia.questions).length) {

            // adds results of game (correct, incorrect, unanswered) to the main page
            $('#results')
                .html('<h3> Thank you for playing The Office Trivia!</h3>' +
                    '<p> Correct: ' + trivia.correct + '</p>' +
                    '<p> Incorrect: ' + trivia.incorrect + '</p>' +
                    '<p> Unanswered: ' + trivia.unanswered + '</p>' +
                    '<p> Please Try Again! </p>');

            // hide hame section
            $('#game').hide();

            // show start button to begin a new game
            $('#start').show();
        }
    },

    //method to evaluate the option clicked
    guessChecker: function () {
        // timer ID for gameResult setTimeout
        var resultId;

        // the answer to the current question being asked
        var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];
        console.log(currentAnswer, $(this).text())
        // if the next option picked matches the answer of the current question, increment correct
        if ($(this).text() === currentAnswer) {
            console.log("inside if guesschecker")

            // display what to do if the answer is correct
            trivia.correct++;
            clearInterval(trivia.timerId);
            $('#results').html('<h3> Correct Answer!!</h3>');
            resultId = setTimeout(trivia.guessResult, 5000);


        }

        // else if the user didnt pick the correct option, therefore its incorrect
        else {
            // button will turn red if incorrect
            $(this).addClass('btn-danger').removeClass('btn-info');

            trivia.incorrect++;
            clearInterval(trivia.timerID);

            $('#results').html('<h3> Sorry, try again! ' + currentAnswer + '</h3>');
            resultId = setTimeout(trivia.guessResult, 5000);
        }

    },

    guessResult: function () {
        $("#results").empty()
        trivia.currentSet++
        trivia.nextQuestion()
    },
    // how to remove previous question results and options
    gameResult: function () {

        // change to next question
        trivia.currentSet++;

        // remove the options automatically and results
        $('.option').remove();
        $('#results h3').remove();

    }
}