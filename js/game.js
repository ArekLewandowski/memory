'use strict';
var game = (function () {

    var initialNumberOfPieces = 4,
        currentNumberOfPieces = 0,
        selectedNumberOfPieces = 1,
        guessedNumberOfPieces = 0,
        currentGameLevel = 1,
        randomPieceIndex,
        gameOn = true,
        pieces,
        allowMissed = 0,
        missed = 0,
        allPiecesInGame = 0,
        numberOfHittedPieces = 0,
        accuracyPercentage,
        accSum,
        x,
        startGame = function (config) {
            if (config && config.numberOfPieces) {
                currentNumberOfPieces = config.numberOfPieces;
            } else if (currentNumberOfPieces === 0) {
                currentNumberOfPieces = initialNumberOfPieces;
            }
            pieces = initializeGame();
        },

        initializeGame = function () {
            var i,
                j,
                pieces = [];
            if (!gameOn) {
                gameOn = true;
            }

            for (i = 0; i < currentNumberOfPieces; i++) {
                pieces.push({
                    toGuess: false,
                    guessed: false
                });
            }
            for (j = 0; j < selectedNumberOfPieces;) {
                randomPieceIndex = Math.floor(Math.random() * currentNumberOfPieces);
                if (pieces[randomPieceIndex].toGuess === false) {
                    pieces[randomPieceIndex].toGuess = true;
                    j++;
                }
            }
            allPiecesInGame += selectedNumberOfPieces;
            return pieces;
        },

        getPieces = function () {
            return pieces;
        },

        getLevel = function () {
            return currentGameLevel;
        },

        getNumberOfPiecesToGuess = function () {
            return selectedNumberOfPieces;
        },

        getAllowedMisses = function () {
            return allowMissed;
        },

        getMisses = function () {
            return missed;
        },

        getAccuracyPercentage = function () {
            accSum = missed + numberOfHittedPieces;
            accuracyPercentage = accSum !== 0 ? ((numberOfHittedPieces / accSum) * 100) : 0;

            return Math.round(accuracyPercentage);
        },

        checkPiece = function (userPieceIndex) {
            if (gameOn === true && pieces[userPieceIndex].toGuess === true && pieces[userPieceIndex].guessed === false) {
                pieces[userPieceIndex].guessed = true;
                numberOfHittedPieces++;

                return true;
            } else {
                missed++;
                if (missed > allowMissed) {
                    gameOn = false;
                }
                return false;
            }
        },
        getGameOn = function () {
            return gameOn;
        },


        isNextLevel = function () {
            for (x = 0; x < currentNumberOfPieces; x++) {
                if (pieces[x].toGuess === true && pieces[x].guessed === false) {
                    return false;
                }
            }
            return true;
        },
        nextLevel = function () {
            currentGameLevel++;
            selectedNumberOfPieces += 1;
            currentNumberOfPieces += 2;
            return true;
        },

        incrementAvailableMisses = function () {
            if (allowMissed < 10) {
                allowMissed++;
            }
        },

        decrementAvailableMisses = function () {
            if (allowMissed > 0) {
                allowMissed--;
            }
        },

        resetGameFromBegin = function () {
            currentNumberOfPieces = 0;
            selectedNumberOfPieces = 1;
            guessedNumberOfPieces = 0;
            currentGameLevel = 1;
            gameOn = true;
            allowMissed = 0;
            missed = 0;
            allPiecesInGame = 0;
            numberOfHittedPieces = 0;
        };

    return {
        'startGame': startGame,
        'getPieces': getPieces,
        'checkPiece': checkPiece,
        'nextLevel': nextLevel,
        'isNextLevel': isNextLevel,
        'initializeGame': initializeGame,
        'resetGameFromBegin': resetGameFromBegin,
        'getLevel': getLevel,
        'getNumberOfPiecesToGuess': getNumberOfPiecesToGuess,
        'getGameOn': getGameOn,
        'getAllowedMisses': getAllowedMisses,
        'getMisses': getMisses,
        'getAccuracyPercentage': getAccuracyPercentage,
        'incrementAvailableMisses': incrementAvailableMisses,
        'decrementAvailableMisses': decrementAvailableMisses
    }
})();
