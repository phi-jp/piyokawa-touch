/*
 * main.js
 */

tm.main(function() {
    
    var app = tm.display.CanvasApp("#world");
    app.resize(SCREEN_WIDTH, SCREEN_HEIGHT);
    app.fitWindow();

    // query(http://...?{~}) からシーン名を取得
    var sceneName = QUERY.scene || "MainScene";

    var flow = tm.util.Flow(2, function() {
        var sceneClassName = tm.using(sceneName);
        app.replaceScene(sceneClassName({
            time: 1234,
        }));
    });

    var loading = tm.ui.LoadingScene({
        assets: ASSETS,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
    });
    // ロード完了時イベントリスナを登録
    loading.onload = function() {
        flow.pass();
    };
    // シーンきりかえ
    app.replaceScene(loading);

    tm.native.api.getLanguage(function(lang) {
        LANGUAGE = lang;
        flow.pass();
    });

    app.run();
});


tm.define("MainScene", {
    superClass: "tm.app.Scene",

    init: function() {
        this.superInit();

        tm.asset.Manager.get("bgm_main").setVolume(0.25).setLoop(true).play();
    },

    onenter: function() {
        this.setup();
        this.onenter = null;
    },

    setup: function() {

        var self = this;

        this.fromJSON({
            children: {
                "bg": {
                    type: "tm.display.Sprite",
                    init: ["img_bg"],
                    originX: 0,
                    originY: 0,
                },
                "status": {
                    type: "tm.display.Sprite",
                    init: ["img_status"],
                    x: SCREEN_CENTER_X,
                    y: 80,
                },
                "nowNumberLabel": {
                    type: "tm.display.Label",
                    x: 135,
                    y: 78,
                    text: "1",
                    fillStyle: "black",
                    fontWeight: "bold",
                    fontSize: 64,
                },
                "timeLabel": {
                    type: "tm.display.Label",
                    x: 510,
                    y: 83,
                    align: "right",
                    text: " ",
                    fillStyle: "black",
                    fontWeight: "bold",
                    fontSize: 42,
                },
            },
        });

        this.currentNumber = 1;

        var RAND_POSITIONS_X = [];
        var RAND_POSITIONS_Y = [];
        var x = 0;
        var y = 0;

        for (var i=0; i<10; ++i) {
            x += Math.random()*2 + 40;
            y += Math.random()*2 + 140;
            RAND_POSITIONS_X.push(x);
            RAND_POSITIONS_Y.push(y);
        }

        RAND_POSITIONS_X.shuffle();
        RAND_POSITIONS_Y.shuffle();

        var numbers = Array.range(1, 16).shuffle();

        for (var i=0; i<15; ++i) {
            var num = numbers[i];
            var piyokawa = Piyokawa(num).addChildTo(this);
            piyokawa.x = Math.rand(50, SCREEN_WIDTH-50);
            piyokawa.y = Math.rand(80, SCREEN_HEIGHT-50);

            piyokawa.x = POSITION_LIST[i][0];
            piyokawa.y = POSITION_LIST[i][1];

            piyokawa.onpointingstart = function() {
                if (this.number == self.currentNumber) {
                    if (self.currentNumber >= 15) {
                        self.app.pushScene(ResultScene({
                            time: self.getTime(),
                        }))
                    }
                    else {
                        self.currentNumber++;

                        self.nowNumberLabel.text = self.currentNumber;
                        self.nowNumberLabel.tweener
                            .clear()
                            .set({scaleX:2.5, scaleY:2.5})
                            .to({scaleX:1.0, scaleY:1.0}, 500, "easeOutBounce");
                        this.supo();
                    }
                }
                else {
                    alert("ぶぶー");
                }
            };
        }

        var scene = CountdownScene();
        this.app.pushScene(scene);

        scene.onfinish = function() {
            this.fire(tm.event.Event("startgame"));
        }.bind(this);
    },



    onstartgame: function() {
        this.startTime = new Date();

        this.update = function(app) {
            var time = this.getTime();
            var date = new Date(time);
            var timeStr = date.format("s:S").slice(0, -1);

            this.timeLabel.text = timeStr;
        };
    },

    onendgame: function() {

        console.log()
    },

    getTime: function() {
        return (new Date()) - this.startTime;
    },

    onpointingstart: function(e) {
        console.log(e.app.pointing.x |0, e.app.pointing.y |0);
    },

});

tm.define("CountdownScene", {
    superClass: "tm.app.Scene",

    init: function() {
        this.superInit();

        this.fromJSON({
            children: {
                filter: {
                    type: "tm.display.RectangleShape",

                    init: [SCREEN_WIDTH, SCREEN_HEIGHT, {
                        fillStyle: "white",
                        strokeStyle: "transparent",
                    }],
                    originX: 0,
                    originY: 0,
                    alpha: 0.5,
                },
            },
        });

        this.countdown = tm.display.Sprite("img_countdown").addChildTo(this);
        this.countdown.x = SCREEN_CENTER_X;
        this.countdown.y = SCREEN_CENTER_Y;
        this.countdown.width = 420;
        this.countdown.setFrameIndex(2);


        this.countdown.tweener
            .clear()
            .set({scaleX:0.2, scaleY:0.2}).scale(1, 1000, "easeOutBounce")
            .call(function() {
                this.countdown.setFrameIndex(1);
            }.bind(this))
            .set({scaleX:0.2, scaleY:0.2}).scale(1, 1000, "easeOutBounce")
            .call(function() {
                this.countdown.setFrameIndex(0);
            }.bind(this))
            .set({scaleX:0.2, scaleY:0.2}).scale(1, 1000, "easeOutBounce")
            .call(function() {
                this.countdown.remove();
                this.fire(tm.event.Event("finish"));
                this.app.popScene();
            }.bind(this));
    },
});

tm.define("Piyokawa", {
    superClass: "tm.display.CanvasElement",

    init: function(number) {
        this.superInit();

        this.width = 100;
        this.height = 100;

        this.number = number;

        this.setup();
    },

    setup: function() {
        var self = this;

        this.fromJSON({
            children: {
                piyokawa: {
                    type: "tm.display.Sprite",
                    init: ["img_piyokawa"],
                },
                kusa: {
                    type: "tm.display.Sprite",
                    init: ["img_kusa"],
                    y: 60,
                },
            },
        });

        this.piyokawa.fromJSON({
            width: 140,
            children: {
                label: {
                    type: "tm.display.Label",
                    y: 25,
                    text: this.number,
                    fontSize: 52,
                    fillStyle: "black",
                    fontWeight: "bold",
                },
            },
        });
        this.piyokawa.setFrameIndex(0);

        this
            .setInteractive(true)
            .setBoundingType("rect");

        this.tweener
            .wait(250)
            .call(function() {
                self.piyokawa.setFrameIndex(0);
            })
            .wait(250)
            .call(function() {
                self.piyokawa.setFrameIndex(1);
            }).setLoop(true);

    },

    supo: function() {
        this.piyokawa.image = "img_piyokawa2";
        this.piyokawa.setFrameIndex(0);

        this.piyokawa.y -= 25;

        tm.asset.Manager.get("se_fm005").clone().play();
        tm.asset.Manager.get("se_animal01").clone().play();

        this.piyokawa.label.hide();
    },

    update: function() {

    }
});


