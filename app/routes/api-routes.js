var friends = require('../data/friends.js');
var checkFriend =[];
var chosenFriendIndex;

module.exports = function(app){
	app.get('/api/friends', function(req,res){
		res.json(friends);
	});

	//Used to compare scores of friends to user score.Post does not need to change any data, just used for any incoming data
	app.post('/api/friends', function(req,res){
		var surveyScores = req.body.scores;
		
		console.log(surveyScores);
		checkFriend = [];
		friendFun(surveyScores,afterFriends);

		friends.push(req.body);
		
		//Response after receiving user input
		res.json(friends[chosenFriendIndex]);
	});
};

function friendFun(surveyScores,callback){
	for(var i=0; i < friends.length; i++){
		var total = 0;
		console.log('Name:',friends[i].name);

		for(var j=0; j < friends[i].scores.length; j++){
			var diff = surveyScores[j]-friends[i].scores[j];

			if (diff < 0){
				diff = -1*diff;
			};

			total += diff;
			console.log('Total:', total);
		}

		checkFriend.push(total);
	}
	console.log(checkFriend);
	callback();
};

function afterFriends(){
	chosenFriendIndex = 0;
	
	for (var k=0; k < checkFriend.length; k++){
		//Adds first index to var chosenFriendIndex
		if(chosenFriendIndex === undefined){
			chosenFriendIndex = k;
		//compares if current k score is less than chosenFriendIndex score
		}else if(checkFriend[k] < checkFriend[chosenFriendIndex]){
			chosenFriendIndex = k;
		};
	}
	console.log('Index is:',chosenFriendIndex);
}