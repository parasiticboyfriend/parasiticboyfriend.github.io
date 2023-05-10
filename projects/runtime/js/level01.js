var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            "name": "Robot Romp",
            "number": 1, 
            "speed": -3,
            "gameItems": [
                { "type": "sawblade", "x": 400, "y": groundY },
                { "type": "sawblade", "x": 600, "y": groundY },
                { "type": "sawblade", "x": 900, "y": groundY },
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE
        function createSawBlade (x, y) {

        var hitZoneSize = 25;
        var damageFromObstacle = 100;
        var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
        sawBladeHitZone.x = x;
        sawBladeHitZone.y = y;
        game.addGameItem(sawBladeHitZone);
        var obstacleImage = draw.bitmap("img/sawblade.png");
        sawBladeHitZone.addChild(obstacleImage);
        obstacleImage.x = -25
        obstacleImage.y = -25
       

        }

        createSawBlade(700, 190);
        createSawBlade(1000, 300);

        

        

        function createEnemy (x, y) {
          var enemy = game.createGameItem("enemy", 25);
        var redSquare = draw.rect(50, 50, "red");
        redSquare.x = -25;
        redSquare.y = -25;
        enemy.addChild(redSquare);
        enemy.x = x;
        enemy.y = groundY - y;
        enemy.velocityX = -7
        enemy.rotationalVelocity = 1
        game.addGameItem(enemy);

        enemy.onPlayerCollision = function () {
            game.changeIntegrity(-10)
        };

        enemy.onProjectileCollision = function () {
            game.increaseScore(100);
            enemy.shrink();
        };  
          }

          createEnemy(600, groundY - 250);
          createEnemy(1000, groundY - 200);
          createEnemy(1500, groundY - 275);

          function createReward (x, y) {
            var reward = game.createGameItem("reward", 25);
        var blueSquare = draw.rect(50, 50, "blue");
        blueSquare.x = -25;
        blueSquare.y = -25;
        reward.addChild(blueSquare);
        reward.x = x;
        reward.y = groundY - y;
        reward.velocityX = -5
        reward.rotationalVelocity = -1
        game.addGameItem(reward);

        reward.onPlayerCollision = function () {
            game.changeIntegrity(10)
            reward.shrink();
          }
          reward.onProjectileCollision = function () {
            game.increaseScore(0);
            reward.shrink();
          }

        }

        //function createMarker (x, y) {
          
        //}
        createReward(3000, groundY - 180)
        // DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
