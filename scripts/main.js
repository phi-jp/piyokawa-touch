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
        app.replaceScene(sceneClassName());
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
            }
        })
    },

});

tm.define("Piyokawa", {
    superClass: "tm.display.Sprite",

    init: function() {
        this.superInit();

        
    }
});


