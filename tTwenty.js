function weightedRandom (arr) {
	var table = [];
	for (i in arr) {
		for (let [key, value] of Object.entries(arr[i])) {
			for(var k = 0; k< value; k++) {
				table.push(Number(key));
            }
		}
	}
return table[Math.floor(Math.random() * Math.floor(10))];
}

var playerStrikeInfo = [
    {
        'kb': {
            'prob': [{0:0.5, 1:0, 2:2.5, 3:0.1, 4:1.5, 5:0.1, 6:0.9, 7:4}],
            'score': 0,
            'out': '',
            'balls': 0
        }
    },
    {
        'ns': {
            'prob': [{0:1, 1:0, 2:2, 3:0.5, 4:1, 5:0.1, 6:0.4, 7:5}],
            'score': 0,
            'out': '',
            'balls': 0
        }
    },
    {
        'rr': {
            'prob': [{0:2, 1:3, 2:1.5, 3:0.5, 4:0.5, 5:0.1, 6:0.4, 7:2}],
            'score': 0,
            'out': '',
            'balls': 0
        }
    },
    {
        'sh': {
            'prob': [{0:3, 1:2.5, 2:0.5, 3:0, 4:0.5, 5:0.1, 6:0.4, 7:3}],
            'score': 0,
            'out': '',
            'balls': 0
        }
    }
];

getNextPlayer = function(index) {
    return playerStrikeInfo[index];
}

scoreBoard = function(over, target) {
    var palyersOnField = 2
    var sb = playerStrikeInfo[0];
    var nb = playerStrikeInfo[1];
    sb[Object.keys(sb)].out = 'No';
    nb[Object.keys(nb)].out = 'No';
    var noOfPlayers = 2;
    var temp;
    var scorePerBall;
    var noOfOver = 0;
    var overCount = over;
    var totalScore = 0;
    var ballCountPerOver = 1;
    var runsRequired = target;
    console.log(overCount+ ' over(s) left ' + target + ' to win ');
    for(var i=0; i<over*6; i++){
        if (totalScore < target && noOfPlayers <= playerStrikeInfo.length) {
            scorePerBall = weightedRandom(sb[Object.keys(sb)].prob);

            if (scorePerBall !== 7){
                totalScore = totalScore + scorePerBall;
                runsRequired = target - totalScore;
            }
             
            console.log(noOfOver+ ':' + ballCountPerOver +' '+Object.keys(sb)[0]+ ' scored '+ scorePerBall);
            ballCountPerOver = ballCountPerOver +1;

            if (scorePerBall === 7 && noOfPlayers< 4 && (i+1)%6 !== 0) {
                sb[Object.keys(sb)].out = 'Yes';
                sb = getNextPlayer(noOfPlayers);
                sb[Object.keys(sb)].out = 'No';
                noOfPlayers = noOfPlayers + 1;
            }

            if (scorePerBall === 1 || scorePerBall === 3 || scorePerBall === 5) {
                temp = sb;
                sb = nb;
                nb = temp;
            }

            

            if (i!==0 && (i+1)%6 === 0) {
                
                overCount = overCount-1;
                console.log(overCount + ' over(s) left ' + runsRequired + ' to win ');
                ballCountPerOver = 1;
                if (scorePerBall === 7 && noOfPlayers< 4) {
                    sb = nb;
                    nb = getNextPlayer(noOfPlayers);
                    nb[Object.keys(nb)].out = 'No';
                } else {
                    noOfOver = noOfOver+1;
                    temp = sb;
                    sb = nb;
                    nb = temp;
                }
            }       

            if (Object.keys(playerStrikeInfo.indexOf(sb[Object.keys(sb)])) && scorePerBall !== 7) {
                sb[Object.keys(sb)].score = sb[Object.keys(sb)].score + scorePerBall;
                sb[Object.keys(sb)].balls = sb[Object.keys(sb)].balls + 1;
            }
                
        }
        
    }
    if (totalScore >= target) {
        console.log('Team won the match and scored '+ totalScore)
    } else {
        console.log('Team lost the match and scored '+ totalScore)
    }
    for(k in playerStrikeInfo) {
        var symbol = '';
        if (playerStrikeInfo[k][Object.keys(playerStrikeInfo[k])[0]].out === 'No') {
            symbol = '*'
        }
        console.log(Object.keys(playerStrikeInfo[k])[0] + symbol + ' scored: '+ playerStrikeInfo[k][Object.keys(playerStrikeInfo[k])[0]].score + '('+playerStrikeInfo[k][Object.keys(playerStrikeInfo[k])[0]].balls + ' balls)');
    }
}
scoreBoard(4, 40);