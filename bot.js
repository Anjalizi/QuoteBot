console.log("The replier bot is starting");

var Twit = require('twit');
var config = require('./config')

var T = new Twit(config);

// Setting up a user stream
var stream = T.stream('user');

// Anytime someone tweets
stream.on('tweet', tweetEvent);

function tweetEvent(event){
	quotes_list = ['Life is about making an impact, not making an income. --Kevin Kruse',
	'Whatever the mind of man can conceive and believe, it can achieve. –Napoleon Hill',
	'Strive not to be a success, but rather to be of value. –Albert Einstein',
	'Two roads diverged in a wood, and I—I took the one less traveled by, And that has made all the difference.  –Robert Frost',
	'I attribute my success to this: I never gave or took any excuse. –Florence Nightingale',
	'You miss 100% of the shots you don’t take. –Wayne Gretzky',
	'Every strike brings me closer to the next home run. –Babe Ruth'];

    var r = Math.floor(Math.random()*(quotes_list.length-1));
	var replyto = event.in_reply_to_screen_name;
	var from = event.user.screen_name;

	if(replyto === "anjaluripi"){
		var newtweet = 'Hi ' + '@' +from + ' here is one of my favourite quotes: ' + 
		quotes_list[r];
		tweetIt(newtweet);
	}
}

function tweetIt(txt){
	var tweet = {
		status: txt
	}

	T.post('statuses/update', tweet, gotData);

	function gotData(err, data, response) {
		if(err){
			console.log("Something went wrong")
		}else{
			console.log("It worked")
		}
	}
}