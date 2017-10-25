/*
 * Michelle Chiu
 * LMC 2700 - Project #5
 * "Buzz Lightyear" Twitter Bot
 */

// Configuration
var Twit = require('twit');
var T = new Twit(require('./config.js'));

// Common Phrases
var catchphrases = [
"How dare someone open attempt to open my helmet on an uncharted planet? My eyeballs could have been sucked from their sockets.",
"I tell you, I could fly around this room with my eyes closed!",
"Years of Academy training wasted.",
"I might have to get another utility belt to handle another day like this.",
"To infinity, and beyond!",
"I need to commandeer the vessel to Sector 12. Who's in charge here?",
"I’ve set my laser from stun to kill.",
"Spare me your lies, temptress! Your emperor's defeated, and I'm immune to your bewitching good looks.",
"I can show you the wonders of the galaxy.",
"I need to repair my turbo boosters. Are we still using fossil fuels or has anyone discovered crystallic fusion?"
];

// Phrases Related to Location
var locationQuotes = [
"My ship has crash-landed here by mistake.",
"There seems to be a huge indicator of intelligent life here...",
"My name is Buzz Lightyear and I come in peace.",
"Terrain seems a bit unstable. No readout yet if the air here is breathable.",
"Just landed here. I'm not on my planet, am I? Help to confirm?"
];

// Popular Country/City Accounts
var locations = [
"Paris", "CityOfMiami", "SFGov", "Cityofatlanta", "citybeautiful",
"downtownseattle", "Brazil", "CityOfBoston", "Canada", "mexico",
];

// Woody accounts
var woodyAccounts = [
"CowboyWoodyy", "WoodyToyStory", "WOODY__TOYSTORY", "WoodyToyStory2", "Woody_Toy_Story"
];

// What Buzz says to Woody
var quotesToWoody = [
"Don't worry, Woody. We'll find it. You'll have your hat back in no time!",
"That'll teach you to try and keep up with that scoot-bootin', loop-loopin' cowgirl, pardner!",
"Another stunt like that, cowboy, you going to kill us killed.",
"How could you do this to us, Woody? Why would you leave, don't you get it! Andy doesn't love us anymore, he's all grown up!",
"I love ya, Woody! I thank the stars for you everyday, best friend."
];

// Queries of Tweets to Like
var tweetsToLike = [
{q: "Buzz%20LightYear", count: 3, result_type: "popular"},
{q: "Toy%20Story", count: 3, result_type: "popular"},
{q: "Buzz%20and%20Woody", count: 3, result_type: "recent"}
];

// Hashtags and Associated Strings
var queries = [
[{q: "%23feelingaccomplished", count: 10, result_type: "recent"},
"I'm proud of you, cowboy."],
[{q: "%23astronaut", count: 10, result_type: "recent"},
"Excuse me, I think the word you’re searching for is ‘Space Ranger.'"],
[{q: "%23imevil", count: 10, result_type: "recent"},
"Because of you, the future of this entire universe is in jeopardy!"],
[{q: "%23ifell", count: 10, result_type: "recent"},
"It’s not falling, it’s called flying with style!"],
[{q: "%23imisscamping", count: 10, result_type: "recent"},
"Pretty soon you’ll be sitting by a campfire, eating nice hot schmo’es."],
[{q: "%23nofood", count: 10, result_type: "recent"},
"This is an intergalactic emergency."],
[{q: "%23panicking", count: 10, result_type: "recent"},
"Sheriff, this is no time to panic."],
[{q: "%23payback", count: 10, result_type: "recent"},
"Revenge is not an idea we promote on my planet."],
[{q: "%23squad", count: 10, result_type: "recent"},
"Do you know these life forms?"],
[{q: "%23imintrouble", count: 10, result_type: "recent"}, "Trouble? Trouble where?"]
];

// Creates a new tweet to post as a status update on the profile
function tweetToNewsfeed(num) {
    T.post('statuses/update', {status: catchphrases[num]}, function (error, response) {
        if (response) {
            console.log(
            "\n================================================================================\n"
            + "Success! You tweeted:\n"
            + catchphrases[num]
            + "\nCheck your profile feed for the new tweet.\n"
            + "================================================================================");
        }
        if (error) {
            console.log("There was an error with Twitter:\n", error.message);
        }
    });
}

// Creates a new tweet to a popular location account
function tweetToLocation(num) {
    var index = Math.floor(num / 2);
    var newTweet = "@" + locations[num] + " " + locationQuotes[index];
    T.post('statuses/update', {status: newTweet}, function (error, response) {
        if (response) {
            console.log(
            "\n================================================================================\n"
            + "Success! You tweeted:\n"
            + newTweet
            + "\nCheck your profile feed for the new tweet.\n"
            + "================================================================================");
        }
        if (error) {
            console.log("There was an error with Twitter:\n", error.message);
        }
    });
}

// Creates a new tweet directed at a Woody Twitter account
function tweetToWoody(num) {
    var random = Math.floor((Math.random() * (9 + 1))/2);
    var index = Math.floor(num/2);
    var newTweet = "@" + woodyAccounts[index] + " " + quotesToWoody[random];
    T.post('statuses/update', {status: newTweet}, function (error, response) {
        if (response) {
            console.log(
            "\n================================================================================\n"
            + "Success! You tweeted:\n"
            + newTweet
            + "\nCheck your profile feed for the new tweet.\n"
            + "================================================================================");
        }
        if (error) {
            console.log("There was an error with Twitter:\n", error);
        }
    });
}

// Creates a new tweet directed at a particular hashtag
function tweetToHashtag(num) {
    T.get('search/tweets', queries[num][0], function (error, data) {
        if (!error) {
            var tweet = data.statuses[num];
            if (tweet == null) {
                console.log("Unfortunately, the search for this query returned no results.");
            } else {
                var ID = tweet.id_str;
                var newTweet = "@" + tweet.user.screen_name + " " + queries[num][1];
                T.post('statuses/update', {status: newTweet, in_reply_to_status_id: ID}, function (error, response) {
                    if (response) {
                        console.log(
                        "\n================================================================================\n"
                        + "Success! You tweeted:\n"
                        + newTweet
                        + "\nCheck your profile feed for the new tweet.\n"
                        + "================================================================================");
                    }
                    if (error) {
                        console.log("There was an error with Twitter:\n", error);
                    }
                });
            }
        } else {
            console.log("An error occured when searching for the hashtag.\n");
            console.log(error, data);
        }
    });
}

// Likes a popular tweet that references Buzz Lightyear
function likeTweet() {
    var index = Math.floor(Math.random() * (2 + 1));
    T.get('search/tweets', tweetsToLike[index], function (error, data) {
        if (!error) {
            var index = Math.floor(Math.random() * (2 + 1));
            var tweetToLike = data.statuses[index];
            if (tweetToLike == null) {
                console.log("Unfortunately, there were no tweets to favorite.");
            } else {
                var tweetID = tweetToLike.id_str;
                T.post('favorites/create', {id: tweetID}, function (error, response) {
                    if (response) {
                        likedTweet = "" + tweetToLike;
                        console.log(
                        "\n================================================================================\n"
                        + "Success! You liked a tweet:\n"
                        + likedTweet
                        + "\nCheck your profile feed for the new tweet.\n"
                        + "================================================================================");
                    }
                    if (error) {
                        console.log("There was an error with Twitter:\n", error.message);
                    }
                });
            }
        } else {
            console.log("An error occured when searching for the tweet.\n");
            console.log(error, data);
        }
    });
}

// Randomizes the type of tweet that is written to the Twitter account
function writeNewTweet(){
    var i = Math.random();
    var random = Math.floor(Math.random() * (9 + 1));
    if ((i >= 0) && (i <= 0.25)) {
        tweetToNewsfeed(random);
    } else if ((i >= 0.26) && (i <= 0.5)) {
        tweetToWoody(random);
    } else if ((i >= 0.51) && (i <= 0.75)) {
        tweetToLocation(random);
    } else {
        tweetToHashtag(random);
    }
}

writeNewTweet();
likeTweet();

// Writes a new tweet every 10 minutes
setInterval(writeNewTweet, 1000 * 60 * 10);

// Likes a popular tweet every 2 hours
setInterval(likeTweet, 1000 * 60 * 120);
