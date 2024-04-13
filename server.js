const express = require('express'),
    app = express();
    bodyParser = require('body-parser');

// this variable will contain the exports of our songs.js file which has all the routes in it
const songRoutes = require('./routes/songRoutes')

// This line of code is used to serve static files such as images, CSS files, and JavaScript files. 
// Here, it's set to serve files from the 'views' directory in the application directory.
app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/views'))


// This line of code is a middleware that parses incoming requests with JSON payloads. 
// It is based on body-parser. It allows us to use req.body to access the data sent with the request.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// so when you send a get request to our route, what will happen?
// the second parameter of app.get is a callback function (a function inside a function)
// the function has 2 parameters, request or respond, which are 2 objects.
// In this case we want to work with the respond object
// we do so by saying: do a send with the respond parameter, and make the response be what I write here

app.get('/', function(req, res){
    // because the app.use earlier we're actually going into the views directory when we reference static files
    res.sendFile("index.html")
});

app.get('/happy', function(req, res){
    res.send(":))))) ");
});

// this is where we define the route that we'll see in the web. Our routes in the routes file start at /, but they actually start at /api/songs now. We've added a prefix
app.use('/api/songs', songRoutes)



// start our server
// for app.listen we need to provide a port for the app to listen to it. 3000 is the standard local port
// the second parameter is a callback function
app.listen(3000, function(){
    console.log("APP IS RUNNING ON PORT 3000")
})

