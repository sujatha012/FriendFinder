// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// ===============================================================================

var friendsData = require("../data/friends");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {

    app.get("/api/friends", function (req, res) {
        res.json(friendsData);
    });


//Implement the logic here to check the best match
    app.post("/api/friends", function (req, res) {
        var newFriend = req.body;
        var currentMatch;
        var currentDiff;
        var bestDiff;

        for (var i = 0; i < friendsData.length; i++) {
            currentDiff = 0;
            for (var j = 0; j < 10; j++) {
                currentDiff = currentDiff + Math.abs((parseInt(newFriend.scores[j]) - friendsData[i].scores[j]));
            }
            //none to check for first time.
            if (i === 0) {
                currentMatch = 0;
                bestDiff = currentDiff;
            } else {
                if (currentDiff < bestDiff) {
                    currentMatch = i;
                    bestDiff = currentDiff;
                }
            }
        }
        friendsData.push(newFriend);
        //display best match
        res.send(friendsData[currentMatch]);


    });


};
