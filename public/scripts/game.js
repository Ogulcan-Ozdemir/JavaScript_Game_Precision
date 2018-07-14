var stage = holder = start = tickerListener = undefined;
var heigthre1 = heightre = count = 0;
var diff_selection = "medium";
var isGameStarted = isPlayerEnteredGameArea = isPlayerReachedEnd = isPlayerHitBlock = isPlayerLeaveGameArea= false;

        function drawgame() {
           heigthre1 = heightre = count = 0;
           isGameStarted = isPlayerEnteredGameArea = isPlayerReachedEnd = isPlayerHitBlock = isPlayerLeaveGameArea = false;

           stage = new createjs.Stage("gameCanvas");

           holder = stage.addChild(new createjs.Container());

           for (let i = 0; i < 200; i++) {
              const shape = new createjs.Shape();
              count += difficulty[diff_selection];
              heightre = Math.random() * 190;

              shape.graphics.beginFill("red").drawRect(i + count, 0, 10, heightre);
              heigthre1 = stage.canvas.height - heightre;
              heigthre1 -= difficulty[diff_selection];
              shape.graphics.beginFill("yellow").drawRect(i + count, 200, 10, -heigthre1);

              holder.addChild(shape);

           }

           start = new createjs.Shape();
           start.graphics.beginFill("green").drawRect(0, 0, 10, 200);
           start.alpha = 0.5;
           stage.addChild(start);
           stage.addChild(holder);
           tickerListener  = createjs.Ticker.addEventListener("tick", tick);

           createjs.Ticker.setFPS(60);
        }

        function tick(event) {

           const l = holder.getNumChildren();

           for (let i = 0; i < l; i++) {

              const child = holder.getChildAt(i);

              child.alpha = 0.5;

              const pt = child.globalToLocal(stage.mouseX, stage.mouseY);

              if (stage.mouseInBounds && child.hitTest(pt.x, pt.y) && isGameStarted && isPlayerEnteredGameArea && !isPlayerHitBlock) {

                 isPlayerHitBlock = true;
                 child.alpha = 1;
                 $("body").css("background-color", "#b30000");
                 setTimeout("restartGame()", 3000);

              }

              if (pt.x < 20 && pt.x > 0 && !isPlayerEnteredGameArea && isGameStarted) {
                

                    $("body").css("background-color", "#717b6b");
                    isPlayerEnteredGameArea = true;

                 
              }

              if (!stage.mouseInBounds && isPlayerEnteredGameArea && !isPlayerReachedEnd && !isPlayerLeaveGameArea) {
                    
                    isPlayerLeaveGameArea = true;
                    $("body").css("background-color", "#993300");
                    setTimeout("restartGame()", 3000);
              
              }

              if (pt.x > 990 && stage.mouseInBounds && !isPlayerHitBlock && isPlayerEnteredGameArea) {
          
                    $("body").css("background-color", "#009933");
                    isPlayerReachedEnd = true;
                 
              }
           }

           const la = start.globalToLocal(stage.mouseX, stage.mouseY);
           if (start.hitTest(la.x, la.y)) {
              start.alpha = 1;

           }

           stage.update(event);
        }

        function restartGame() {
           createjs.Ticker.off("tick",tickerListener);
           stage.removeAllChildren();
           stage.update();
           drawgame();
           $("body").css("background-color", "#009933");
        }

        var difficulty = {
           "easy": 40,
           "medium": 30,
           "hard": 20
        }

        $(document).ready(function () {

            $("#start_btn").click(function () {
               isGameStarted = true;

            });

            $("#reload_btn").click(function () {
               location.reload();

            });

            $("#head").animate({}, 2000).css("color", "#" + Math.random().toString(16).slice(2, 8));

            $("#hideCanvas").animate({
               height: "toggle"
            });

            $(".diffBtn").click((event) => {
               diff_selection = event.currentTarget.innerText.toLocaleLowerCase();
               restartGame();

            })

        });