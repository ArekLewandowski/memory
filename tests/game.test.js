describe('Game', function () {
    it('should have 4 pieces after game start', function () {
        var pieces,
            config = {
                numberOfPieces: 6
            };

        game.resetGameFromBegin();
        game.startGame(config);

        pieces = game.getPieces();

        expect(pieces.length).toBe(6);
    });

    it('one piece should be to guess after game start', function () {
        var piecesToGuess;
        game.resetGameFromBegin();
        game.startGame();

        piecesToGuess = findPiecesToGuess(game.getPieces());

        expect(piecesToGuess.length).toBe(1);
    });

    it('should start game with configured number of pieces', function () {
        var pieces,
            config = {
                numberOfPieces: 6
            };
        game.resetGameFromBegin();
        game.startGame(config);

        pieces = game.getPieces();

        expect(pieces.length).toBe(6);
    });

    function findPiecesToGuess(pieces) {
        return pieces.filter(function (piece) {
            return piece.toGuess;
        });
    }

    it('should select random piece at start', function () {
        var pieces,
            selected = 0,
            config = {
                numberOfPieces: 4,
                numberToGuess: 1
            };
        game.resetGameFromBegin();
        game.startGame(config);

        pieces = game.getPieces();
        for (let i = 0; i < pieces.length; i++) {
            if (pieces[i].toGuess === true) {
                selected++;
            }
        }

        expect(selected).toBe(config.numberToGuess);
    });

    it('should go to next level and return 2 pieces to guess', function () {
        var pieces,
            selected = 0,
            config = {
                numberOfPieces: 4,
                numberToGuess: 1
            };
        game.resetGameFromBegin();
        game.startGame(config);

        nextLevel = game.nextLevel();
        numbersToGuess = game.getNumberOfPiecesToGuess();

        expect(numbersToGuess).toBe(2);
    });

    it('should increment available misses to 1', function () {
        var misses;
        game.resetGameFromBegin();
        game.startGame();

        game.incrementAvailableMisses();
        misses = game.getAllowedMisses();

            expect(misses).toBe(1);
    });

    it('should decrement available misses from 3 to 2', function () {
        var misses;
        game.resetGameFromBegin();
        game.startGame();

        game.incrementAvailableMisses();
        game.incrementAvailableMisses();
        game.incrementAvailableMisses();
        game.decrementAvailableMisses();
        misses = game.getAllowedMisses();

        expect(misses).toBe(2);
    });

    it('should get accuracy percentage', function () {
        var acc;
        game.resetGameFromBegin();
        game.startGame();
        acc = game.getAccuracyPercentage();

        expect(acc).toBe(0);
    });

    it('should get level', function () {
        var level;
        game.resetGameFromBegin();
        game.startGame();
        level = game.getLevel();

        expect(level).toBe(1);
    });

    it('should get misses', function () {
        var misses;
        game.resetGameFromBegin();
        game.startGame();
        misses = game.getMisses();

        expect(misses).toBe(0);
    });

    it('should get allowed misses', function () {
        var misses;
        game.resetGameFromBegin();
        game.startGame();
        misses = game.getAllowedMisses();

        expect(misses).toBe(0);
    });

    it('should get gameOn', function () {
        var gameOn;
        game.resetGameFromBegin();
        game.startGame();
        gameOn = game.getGameOn();

        expect(gameOn).toBe(true);
    });

    it('should get number of pieces to guess', function () {
        var piecesToGuess;
        game.resetGameFromBegin();
        game.startGame();
        piecesToGuess = game.getNumberOfPiecesToGuess();

        expect(piecesToGuess).toBe(1);
    });

    it('should check is next level and return false', function () {
        var piecesToGuess;
        game.resetGameFromBegin();
        game.startGame();
        isNextLevel = game.isNextLevel();

        expect(isNextLevel).toBe(false);
    });

    it('should reset game from begin', function () {
        var pieces,
            config = {
                numberOfPieces: 6,
                numberToGuess: 1
            };
        game.resetGameFromBegin();
        game.startGame(config);
        game.resetGameFromBegin();

        pieces = game.getNumberOfPiecesToGuess();

        expect(pieces).toBe(1);
    });

    it('should reset game from begin with Mock', function () {

        SpyOn(game, 'startGame');
        SpyOn(view, 'clearWindow');
        SpyOn(view, 'renderPieces');
        SpyOn(game.getPieces().and.returnValue(2));
        SpyOn(view, 'renderPieces');
        controller.startGame();


        expect(game.startGame).toHaveBeenCalledWith(2);
    });

});

