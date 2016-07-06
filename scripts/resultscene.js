

tm.define("ResultScene", {
    superClass: "tm.app.Scene",

    init: function(param) {
        this.superInit();

        this.param = param;

        // bg
        this.fromJSON({
            children: {
                layout: {
                    type: "tm.display.Sprite",
                    init: ["img_result_bg"],
                    x: SCREEN_CENTER_X,
                    y: 465,
                }
            },
        });

        this.gotoTime();
        // this.showButton();

        return ;

        this.fromJSON({
            children: {
                layout: {
                    type: "tm.display.Sprite",
                    init: ["img_layout"],
                    originX: 0,
                    originY: 0,
                    alpha: 0.5,
                }
            },
        });

    },

    gotoTime: function() {
        var self = this;

        this.timeGroup = tm.display.CanvasElement().addChildTo(this);
        this.timeGroup.fromJSON({
            x: SCREEN_CENTER_X,
            y: SCREEN_CENTER_Y,
            children: {
                textTime: {
                    type: "tm.display.Sprite",
                    init: ["img_text_time"],
                    y: -30
                },
                label: {
                    type: "tm.display.Label",
                    text: " ",
                    y: 30,
                    fontSize: 42,
                    fillStyle: "black",
                    fontWeight: "bold",
                }
            },
        });

        var label = this.timeGroup.label;

        this.timeGroup.textTime.tweener
            .set({scaleX: 4, scaleY: 4})
            .to({scaleX: 1, scaleY: 1}, 500, "easeOutBounce")
            .wait(150)
            .call(function() {
                var timeStr = (new Date(self.param.time)).format("s:S").slice(0, -1);
                label.text = timeStr;
            })
            .wait(200)
            .call(function() {
                self.timeGroup.tweener
                    .moveBy(0, -320, 250)
                    .wait(200)
                    .call(function() {
                        self.gotoRank();
                    })
            });
    },

    gotoRank: function() {
        var self = this;

        this.rankGroup = tm.display.CanvasElement().addChildTo(this);
        this.rankGroup.fromJSON({
            x: SCREEN_CENTER_X,
            y: SCREEN_CENTER_Y,
            children: {
                textTime: {
                    type: "tm.display.Sprite",
                    init: ["img_text_rank"],
                    y: -30
                },
                label: {
                    type: "tm.display.Label",
                    text: " ",
                    y: 36,
                    fontSize: 42,
                    fillStyle: "black",
                    fontWeight: "bold",
                }
            },
        });

        var label = this.rankGroup.label;
        label.time = 0;

        this.rankGroup.textTime.tweener
            .set({scaleX: 4, scaleY: 4})
            .to({scaleX: 1, scaleY: 1}, 500, "easeOutBounce")
            .wait(150)
            .call(function() {
                label.text = 42;
            })
            .wait(200)
            .call(function() {
                self.rankGroup.tweener
                    .moveBy(0, -190, 250)
                    .wait(500)
                    .call(function() {
                       self.showButton();
                    })
            });
    },

    showButton: function() {
        var self = this;

        this.fromJSON({
            children: {
                "tweetButton": {
                    type: "SpriteButton",
                    init: ["img_btn_tweet"],
                    x: 168,
                    y: 412,
                },
                "facebookButton": {
                    type: "SpriteButton",
                    init: ["img_btn_facebook"],
                    x: SCREEN_CENTER_X,
                    y: 412,
                },
                "lineButton": {
                    type: "SpriteButton",
                    init: ["img_btn_line"],
                    x: 472,
                    y: 412,
                },

                "rankButton": {
                    type: "SpriteButton",
                    init: ["img_btn_rank", "img_btn_rank_tap"],
                    x: SCREEN_CENTER_X,
                    y: 528,
                },
                "titleButton": {
                    type: "SpriteButton",
                    init: ["img_btn_title", "img_btn_title_tap"],
                    x: 202,
                    y: 655,
                },
                "continueButton": {
                    type: "SpriteButton",
                    init: ["img_btn_continue", "img_btn_continue_tap"],
                    x: 438,
                    y: 655,
                },

                "ongakuText": {
                    type: "tm.display.Label",
                    text: "音楽:",
                    x: 310,
                    y: 745,
                    align: "right",
                    fillStyle: "black",
                    fontSize: 22,
                    fontWeight: "bold",
                },
                "ongakuText2": {
                    type: "tm.display.Label",
                    text: "魔王魂\nザ・マッチメイカァズ",
                    x: 315,
                    y: 745,
                    align: "left",
                    fillStyle: "black",
                    fontSize: 22,
                },
                "appliText": {
                    type: "tm.display.Label",
                    text: "アプリ:",
                    x: 310,
                    y: 800,
                    align: "right",
                    fillStyle: "black",
                    fontSize: 22,
                    fontWeight: "bold",
                },
                "appliText2": {
                    type: "tm.display.Label",
                    text: "flowork",
                    x: 315,
                    y: 800,
                    align: "left",
                    fillStyle: "black",
                    fontSize: 22,
                },
            },
        });
    },

    onpointingstart: function(e) {
        console.log(e.app.pointing.x |0, e.app.pointing.y |0);
    },
});

tm.define("SpriteButton", {
    superClass: "tm.app.Sprite",

    init: function(image, tapImage) {

        this.superInit(image);

        this.setInteractive(true);
        this.on("pointingstart", function() {
            this.setInteractive(false);

            if (tapImage) this.image = tapImage;

            this.tweener
                .clear()
                .wait(100)
                // .to({scaleX:1.25, scaleY:1.125}, 50)
                // .to({scaleX:1.0, scaleY:1.0}, 50)
                .call(function() {
                    this.setInteractive(true);

                    var e = tm.event.Event("push");
                    this.fire(e);
                    this.image = image;
                }.bind(this));
        });


    },
});




