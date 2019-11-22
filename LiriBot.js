require("dotenv").config();
var fs = require('file-system');
var axios = require("axios");
// var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);
var command = process.argv[2];
var nodeSearch = process.argv;
var artist = "";
for (var i = 3; i < nodeSearch.length; i++) {
    if (i > 3 && i < nodeSearch.length) {
        artist = artist + "+" + nodeSearch[i];
    } else {
        artist += nodeSearch[i];
    }
}
function getQuery(command, artist) {
    if (command === "concert-this") {
        var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
        axios.get(queryUrl).then(
            function (response) {
                for (let i = 0; i < response.data.length; i++) {
                    console.log("Concert Venue: " + response.data[i].venue.name)
                    console.log("City: " + response.data[i].venue.city + "," + response.data[i].venue.country)
                    console.log("Concert Time: " + response.data[i].datetime)
                    console.log("------------------------------------------")
                }
            }
        ).catch(function (error) {
            console.log(error)
        })
    }
    else if (command === "spotify-this-song") {

    }
    else if (command === "movie-this") {
        var queryUrl = "http://www.omdbapi.com/?t=" + artist + "&apikey=trilogy"
        axios.get(queryUrl).then(
            function (response) {
                console.log("Title: " + response.data.Title)
                console.log("Year: " + response.data.Year)
                console.log("IMDB Rating: " + response.data.Ratings[0].Value)
                console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value)
                console.log("Produced in: " + response.data.Country)
                console.log("Actors: " + response.data.Actors)
                console.log(response.data.Language)
                console.log(response.data.Plot)
            }
        ).catch(function (error) {
            console.log(error)
        })
    }
    else if (command === "do-what-it-says") {
        fs.readFile('random.txt', "utf-8", function (err, data) {
            if (err) {
                console.log(error)
            }
            else {
                var newInputs = data.split(",");
                var newCommand = newInputs[0];
                var newArtistPieces = newInputs[1].substr(1).split(" ");
                var newArtist = newArtistPieces.join("+");
                console.log(newArtist)
                getQuery(newCommand, newArtist);
            }
        });
    }
}
getQuery(command, artist);
