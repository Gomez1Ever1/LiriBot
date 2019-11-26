require("dotenv").config();
var fs = require('file-system');
var axios = require("axios");
var moment = require("moment");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
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
    // var artistTxt = artist.split("+").join(" ");
    // console.log(artistTxt)
    // fs.appendFile("random.txt", command, artistTxt, function (err) {
    //     if (err) throw err;
    //     console.log("saved to file")
    // });
    if (command === "concert-this") {
        var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
        axios.get(queryUrl).then(
            function (response) {
                for (let i = 0; i < response.data.length; i++) {
                    console.log("Concert Venue: " + response.data[i].venue.name)
                    console.log("City: " + response.data[i].venue.city + "," + response.data[i].venue.country)
                    var concertDateBoth = response.data[i].datetime.split("T");
                    var time = concertDateBoth[1].split(":").slice(0, 2);
                    var date = moment(concertDateBoth[0]).format('MMMM Do YYYY') + ", " + moment(time, 'HH:mm').format('h:mm a');
                    console.log(date)
                    console.log("------------------------------------------")
                }
            }
        ).catch(function (error) {
            console.log(error)
        })
    }
    else if (command === "spotify-this-song") {
        if (artist.length < 1) {
            spotify.search({ type: 'track', query: "Rocket Man" }, function (err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err)
                }
                else {
                    console.log("Artist: " + data.tracks.items[0].album.artists[0].name)
                    console.log("Track Name: " + data.tracks.items[0].name)
                    console.log("Link: " + data.tracks.items[0].album.external_urls.spotify)
                    console.log("Album Name: " + data.tracks.items[0].album.name)
                    console.log("---------------------------")
                }
            })
        }
        else {
            spotify.search({ type: 'track', query: artist, limit: 5 }, function (err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }
                else {
                    for (let k = 0; k < data.tracks.items.length; k++) {
                        console.log("Artist: " + data.tracks.items[k].album.artists[0].name)
                        console.log("Track Name: " + data.tracks.items[k].name)
                        console.log("Link: " + data.tracks.items[k].album.external_urls.spotify)
                        console.log("Album Name: " + data.tracks.items[k].album.name)
                        console.log("---------------------------")
                    }
                }
            })
        }
    }
    else if (command === "movie-this") {
        var queryUrl = "http://www.omdbapi.com/?t=" + artist + "&apikey=trilogy"
        axios.get(queryUrl).then(
            function (response) {
                if (artist.length > 1) {
                    console.log("Title: " + response.data.Title)
                    console.log("Year: " + response.data.Year)
                    console.log("IMDB Rating: " + response.data.Ratings[0].Value)
                    console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value)
                    console.log("Produced in: " + response.data.Country)
                    console.log("Actors: " + response.data.Actors)
                    console.log(response.data.Language)
                    console.log(response.data.Plot)
                }
                else {
                    getQuery(command, "Mr+Nobody");
                    console.log("works")
                }
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