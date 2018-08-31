'use strict';
var controller = function () {
    var pieces,
        level;
    var startGame = function () {
            view.clearWindow();
            game.startGame();
            pieces = game.getPieces();
            view.renderPieces(pieces);
        },

        resetGame = function () {
            game.resetGameFromBegin();
            startGame();
        },

        nextLevel = function () {
            game.nextLevel();
        },

        renderPieces = function () {
            view.renderPieces();
        },

        checkPieces = function (piece) {
            if (game.checkPiece(piece)) {
                view.correctShot(piece);
                if (game.isNextLevel()) {
                    setTimeout(function () {
                        game.nextLevel();
                        startGame();
                    }, 1000);
                }
            } else {
                view.missed(piece);
                if (game.getGameOn()) {
                    setTimeout(function () {
                        startGame();
                    }, 500);
                } else {
                    alert("Your accuracy: "+ game.getAccuracyPercentage()+"%");
                    setTimeout(function () {
                        resetGame();
                    }, 2000);
                }
            }
        },

        getLevel = function () {
            level = game.getLevel();
            return level;
        },

        getAllowMisses = function () {
            return game.getAllowedMisses();
        },

        getMisses = function () {
            return game.getMisses();
        },

        getAccuracy = function () {
            return game.getAccuracyPercentage();
        },


        getNumberPiecesToGuess = function () {
            return game.getNumberOfPiecesToGuess();
        },

        incrementTime = function () {
            view.incrementTime();
        },

        decrementTime = function () {
            view.decrementTime();
        },

        incrementAvailableMisses = function () {
            game.incrementAvailableMisses();
            view.updateAvailableMisses();
        },

        decrementAvailableMisses = function () {
            game.decrementAvailableMisses();
            view.updateAvailableMisses();
        }

    return {
        'startGame': startGame,
        'nextLevel': nextLevel,
        'renderPieces': renderPieces,
        'checkPieces': checkPieces,
        'resetGame': resetGame,
        'getLevel': getLevel,
        'getNumberPiecesToGuess': getNumberPiecesToGuess,
        'getAllowMisses': getAllowMisses,
        'getMisses': getMisses,
        'getAccuracy': getAccuracy,
        'incrementTime': incrementTime,
        'decrementTime': decrementTime,
        'incrementAvailableMisses': incrementAvailableMisses,
        'decrementAvailableMisses': decrementAvailableMisses
    }
}();
