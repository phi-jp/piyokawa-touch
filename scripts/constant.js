/*
 * constant.js
 */

var SCREEN_WIDTH    = 640;
var SCREEN_HEIGHT   = 960;
var SCREEN_CENTER_X = SCREEN_WIDTH/2;
var SCREEN_CENTER_Y = SCREEN_HEIGHT/2;

var QUERY = tm.util.QueryString.parse(location.search.substr(1));
var LANGUAGE = "ja";

var POSITION_LIST = [
	[316, 221],
	[87, 235],
	[555, 293],
	[171, 340],
	[490, 449],
	[320, 455],
	[95, 508],
	[580, 550],// 
	[341, 640],// 
	[150, 650],
	[550, 679],
	[200, 750],
	[344, 818],// 13
	[70, 850], // 14
	[518, 861],// 15
];

ASSETS.$extend({
	se_animal00: "sounds/animal00.wav",
	se_animal01: "sounds/animal01.wav",
	se_bom09: "sounds/bom09.wav",
	se_bom13: "sounds/bom13.wav",
	se_bom16: "sounds/bom16.wav",
	se_buble03: "sounds/buble03.wav",
	se_fm005: "sounds/fm005.wav",
	se_valve00: "sounds/valve00.wav",

	bgm_main: "sounds/main.mp3",
})

