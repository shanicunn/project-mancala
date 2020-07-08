////////////////////////////////////////////////////////////////
//**************************MANCALA***************************** 
////////////////////////////////////////////////////////////////

$(() => {

    //////////////////////////////
    // Global Variables
    ////////////////////////////
    // Total marbles on the board
    let marbles = 24;
    let player1Marbles = marbles;
    let player2Marbles = marbles;
    // Counter for player turns
    let playerTurn = 1;
    // Remaining marbles
    let remMarbles = null;
    // Hole turn starts from
    let turnStart = null;
    // Hole turn ends on
    let turnEnd = null;
    // Row turn ends on
    let turnRow = null;
    let $wellMarbles1 = null;
    let $wellMarbles2 = null;

    ////////////////////////////
    // Game Play Functions
    ////////////////////////////

    // First Loop of Play
    function start(e) {
        // Store the clicked hole
        let $clicked = $(e.currentTarget);
        // Log hole clicked
        console.log($clicked);
        // Log current player count
        console.log("Player turn:", playerTurn);
        // Store amount of marbles in hole
        // https://stackoverflow.com/questions/26319183/how-to-get-number-inside-a-div-with-jquery
        remMarbles = parseInt($clicked.children('h3').text());
        // Log the remaining marbles not in wells
        console.log("Remaining marbles:", remMarbles);
        // Store the location of the click
        turnStart = $clicked.index();
        if ($clicked.hasClass('player_1')) {
            let current = player1Marbles - remMarbles;
            // Log available marbles for player 1
            console.log("Player 1 marbles:", current);
            $("#marbles_1").text("0");
            // Find amount of marbles in the clicked hole and log
            remMarbles = parseInt($clicked.children('h3').text());
            console.log("Marbles in clicked hole:", remMarbles);
        } else {
            let current = player2Marbles - remMarbles;
            console.log("Player 2 marbles:", current);
        }
        moveFirstRowOfMarbles();
    };
    // Move player's row of marbles
    function moveFirstRowOfMarbles() {
        let count = null;
        console.log("Move first row of marbles");
        // Player 1
        if (playerTurn % 2 === 1) {
            // Start on top row
            turnRow = 1;
            if (turnStart <= remMarbles) {
                count = 0;
            } else {
                count = turnStart - remMarbles;
            };
            // Loop to add one marble to each hole on top row
            let $hole = document.querySelectorAll('.player_1.hole');
            for (i = turnStart - 1; i >= count; i--) {
                player1Marbles++;
                remMarbles--;
                $hole[i].textContent++;
                // Last hole a marble was added to
                turnEnd = i;
            };
        } else {
            // If player 2
            // Start on bottom row
            turnRow = 2;
            if (5 - turnStart <= remMarbles) {
                count = 5;
            } else {
                count = turnStart + remMarbles;;
            }
            // Loop to add one marble to each hole on the bottom row
            let $hole = document.querySelectorAll('.player_2.hole');
            for (i = turnStart + 1; i <= count; i++) {
                player2Marbles++;
                remMarbles--;
                $hole[i].textContent++;
                // Last hole a marble was added to
                turnEnd = i;
            };
        };
        marblesToWells();
    };
    // Moving the marbles into mancalas
    function marblesToWells() {
        // Player 1's Turn
        if (remMarbles > 0 && playerTurn % 2 === 1) {
            turnRow = 1;
            player1Marbles++;
            remMarbles--;
            document.querySelector(".player_1.well").textContent++;
            $wellMarbles1 = document.querySelector(".player_1.well").textContent;
            console.log("Player 1's well:", $wellMarbles1);
            moveSecondRowOfMarbles();
        } // Player 2's turn
        else if (remMarbles > 0 && playerTurn % 2 === 0) {
            turnRow = 2;
            player2Marbles++;
            remMarbles--;
            document.querySelector(".player_2.well").textContent++;
            $wellMarbles2 = document.querySelector(".player_2.well").textContent;
            console.log("Player 2's well:", $wellMarbles2);
            moveSecondRowOfMarbles();
        } else {
            // Do nothing
        };

    };
    // Moving marbles to opponent's rows
    function moveSecondRowOfMarbles() {
        let count = null;
        if (remMarbles > 0 && playerTurn % 2 != 0) {
            turnRow = 2;
            // If there's more marbles left than holes in the row
            if (6 < remMarbles) {
                count = 6;
            } else {
                count = remMarbles;
            }
            let $hole = document.querySelectorAll('.player_2.hole');
            for (i = 0; i < count; i++) {
                player2Marbles++;
                remMarbles--;
                turnEnd = i;
                $hole[i].textContent++;

            };
            moveFirstRowOfMarbles2();
        } else {
            turnRow = 1;
            if (6 < remMarbles) {
                count = 0;
            } else {
                count = 6 - remMarbles;
            }
            let $hole = document.querySelectorAll('.player_1.hole');
            for (i = 5; i >= count; i--) {
                player1Marbles++;
                remMarbles--;
                turnEnd = i;
                $hole[i].textContent++;
            }
            moveFirstRowOfMarbles2();
        };
    };
    // If necesessary, move marbles along player's row again 
    function moveFirstRowOfMarbles2() {
        let count = null;
        if (remMarbles > 0 && playerTurn % 2 != 0) {
            turnRow = 1;
            if (6 < remMarbles) {
                count = 0;
            } else {
                count = 6 - remMarbles;
            }
            let $hole = document.querySelectorAll('.player_1.hole');
            for (i = 5; i >= count; i--) {
                player1Marbles++;
                remMarbles--;
                turnEnd = i;
                $hole[i].textContent++;
            };
        } else {
            turnRow = 2;
            if (6 < remMarbles) {
                count = 6;
            } else {
                count = remMarbles;
            }
            let $hole = document.querySelectorAll('.player_2.hole');
            for (i = 0; i < count; i++) {
                player2Marbles++;
                remMarbles--;
                turnEnd = i;
                $hole[i].textContent++;
            };
        };
        marblesToWells()
    };
    // See if Player 1 holes are all empty
    let player1Holes = () => {
        for (i = 0; i < $('.player_1.hole').length; i++) {
            if ($('player_1.hole').text() == "0") {
                return false;
            } else {
                return true;
            }
        }
    };
    // See if Player 2 holes are all empty
    let player2Holes = () => {
        for (i = 0; i < $('.player_2.hole').length; i++) {
            if ($('player_2.hole').text() == "0") {
                return false;
            } else {
                return true;
            }
        }
    };

    ////////////////////////////
    // Game Play
    ////////////////////////////
    let welcome =
        () => {
            swal({
                title: "Welcome!",
                text: "Let's Play Mancala!",
                buttons: {
                    confirm: {
                        text: "Sure",
                        value: true,
                        visible: true,
                        className: "confirm",
                        closeModal: true
                    },
                    cancel: {
                        text: "Nope",
                        value: false,
                        visible: true,
                        className: "cancel",
                        closeModal: true,
                    },
                },
            }).then((value) => {
                if (value === true) {
                    wholeGame();
                } else {
                    swal({
                        text: "Maybe Next Time Then ;-)"
                    });
                }

            });
        };
    let wholeGame = () => {
        // While neither player has 0 in all holes
        if (player1Holes() || player2Holes()) {

            if (playerTurn % 2 != 0) {
                document.getElementById('announcement').innerHTML = '<h3>Player 1</h3>';
                swal({
                    text: "It's player 1's turn!"
                });
                console.log("Player 1's turn begins");
                $('.player_1.hole').on('click', start);
                $('.player_2.hole').off('click', start);

            } else {

                document.getElementById('announcement').innerHTML = '<h3>Player 2</h3>';
                swal({
                    text: "It's player 2's turn!"
                });
                console.log("Player 2's turn begins");
                $('.player_2.hole').on('click', start);
                $('.player_1.hole').off('click', start);

            };
        } // If Player 1 has the most marbles they win
        if ($wellMarbles1 > $wellMarbles2) {
            // Sweet Alert syntax
            swal("WINNER!", "Player 1, You Win!", "success");
            console.log("Player 1 wins");
        } else if ($wellMarbles2 > $wellMarbles1) {
            swal("WINNER!", "Player 2, You Win!", "success");
            console.log("Player 2 wins");
        } else {
            swal("Tie!", "It is a tie!", "success");
            console.log("Players drew a tie");
        };
    };
    ////////////////////////////
    // End or play again
    ////////////////////////////
    swal({
            title: "New Game?",
            text: "Would you like to play again?",
            buttons: {
                confirm: {
                    text: "Yes",
                    value: true,
                    visible: true,
                    className: "confirm",
                    closeModal: true
                },
                cancel: {
                    text: "No",
                    value: false,
                    visible: true,
                    className: "cancel",
                    closeModal: true,
                },
            },
        })
        .then((value) => {
            if (value === true) {
                location.reload();
            } else {
                console.log("Game Over!");
                swal("GAME OVER!");
            }

        });

    //////////////////////////////
    // Events
    //////////////////////////////
    welcome();

})