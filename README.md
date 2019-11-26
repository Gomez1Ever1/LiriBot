1-The LiriBot app is an interface similar to SIRI from the iPhone franchise, except it uses typed language rather than speech. Its purpose in our case is to search a variety of API's for information on several forms of media. These are: Concerts, Movies, and Music. We scour the databases of the OMDB, Spotify, and Bandsintown API's for our information and output it to the terminal in a format that is easy to understand. The app returns exact information on any movie searched for; It returns a list of all concerts for any artist input as a query; And it returns 5 songs with a track name that we searched for. 
2-We do not have much organization in our js file. Variables that are being made from the user's input are created before any functions are run, while we use objects to call our api functions. These variables are two, the command and the artist they are searching for. The objects then call the responses and the organization of the data in the main function, getQuery.
3-The app is very straightforward to use. Dont forget to type npm init -y to download the packages your node interface needs! It runs based on the command given, then the artist/movie/song we are searching for. The commands are:
- concert-this for a concert. Lists the venue, city and State, and the date and time
- spotify-this-song for a song. Lists the name of the artist, the track name, a link to the song, and the Album name.
- movie-this for a movie. Lists the title, the year released, a Rotten Tomato and IMDB rating, where it was produced, the languages in the movie, and a smhort synopsis on the plot of the movie. 

Then the search parameter of the user's choice, which will be stored in the artist variable. To begin, type 'node LiriBot.js' then the command of your choice, as catalogued in the above list of commands, followed by whatever medium you are searching for, be it an artist for a concert, a song for spotify information, or a movie for OMDB information.

!!! do-what-it-says is a command that does not need a search query, at the moment it will require an external file, called random.txt, which will show information for all Bad Religion concerts. !!!
If you do not specify what song/movie you want to search for, the LiriBot.js app will execute:
- Information on Rocket Man by Elton John if one calls the spotify-this-song without a song specified.
- Information on Mr. Nobody if one calls the movies-this without a movie.
- Nothing happens for the concert-this command
4 Refer to our screenshots folder for examples of how to utilize the app and the results we will receive.
5 The link for this GitHub repository is https://github.com/Gomez1Ever1/Basic-Portfolio
6 The technologies we utilize in this app are:
- Node.js for the terminal interface in which we input our command and search query.
- Axios to call our API's in our Javascript file
- Javascript for the logic of our apps functionality.
- moment.js for time formats
- dotenv for keeping some of our files private
7 I was responsible for every single part of the apps logic as well as the functionality of its interface. I received help from TA's and other people for some parts, mostly the spotify API and the functionality of moment.js