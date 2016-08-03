// ---------------- DEPENDENCIES ----------------
var express   = require('express'),
  bodyParser  = require('body-parser'),
  cors        = require('cors'),
  mongoose    = require('mongoose'),          // NoSQL DB connector
  passport    = require('passport'),          // Handles authentication
  session     = require('express-session');   // Saves session data and cookies

// ---------------- CONTROLLERS ----------------
var postCtrl  = require('./controllers/postCtrl'); // Controller functions for posting blog entries
var userCtrl  = require('./controllers/userCtrl'); // COntroller functions for creating or modifying users
var config    = require('./passport/config');      // Secret for express-session. Probably should find out how to randomly generate on the first run of the program

// Create an instance of Express
var app = express();

// Configure Passport by passing an instance of itself to the configuration file containing strategies, etc.
require('./passport/passport')(passport);

// ---------------- MIDDLEWARE ----------------
// Initialize the middleware. These will perform their given tasks on each request and response that passes through the server.
app.use(session(config));         // Set session secret
app.use(passport.initialize());   // Initialize Passport
app.use(passport.session());      // Configure session through passport. Starts session on login
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(__dirname + '/public')); // Makes all of our files in the /public directory available to the internet


// ---------------- ROUTES ----------------
// These are authentication related routes for creation and authentication of accounts.
app.post('/signup', passport.authenticate('local-signup'), userCtrl.login);     // Route for creating a new user.
app.post('/login', passport.authenticate('local-login'), userCtrl.login);       // Route for logging in an existing user.
app.get('/logout', function(req, res){
  req.logout();         // Method 'req.logout' is added by passport middleware. It clears req.user and any stored session data.
  res.redirect('/');    // Send user back to home page after loggin out.
});

// These routes are for modifying or retrieving info about the users in the database. There is no create because passport handles all user creation in passport/passport.js
app.get('/user/me', userCtrl.getMe);        // Gets info about the logged in user making the request
app.get('/user', userCtrl.getall);          // Get list of all users
app.get('/user/:id', userCtrl.read);        // Get info on a single user
app.put('/user/:id', userCtrl.update);      // Update a user's info
app.delete('/user/:id', userCtrl.delete);   // Remove a user from the database

// // This route is for testing purposes and could be removed later. It checks whether a user is authenticated (look in the console)
// app.get('/loggedin', function(req, res) {   // Route to test if user is authenticated
//   console.log('user is authenticated? ', req.isAuthenticated()); // logs true or false
//   res.send(req.isAuthenticated() ? req.user : 'NOT_AUTHENTICATED');  // Passport places isAuthenticated() method on all req so we can use it to test. It also places the .user object. ".user" will not be present if a user in not authenticated.
// });

// These routes are for posting and updating blog posts on the site.
app.post('/post', postCtrl.create);
     // Create new blog entry in the database
app.get('/post', postCtrl.read);            // Get all blog posts
app.put('/post/:id', postCtrl.update);      // Edit a blog entry
app.delete('/post/:id', postCtrl.delete);   // Remove a blog from teh database


// // This is how to authenticate users attempting to access an API route or page (but it won't block a state in a SPA) - that must be done in logic on the front end. Theoretically a user could get our admin page, but shouldn't be able to use it to modify any data.
// // I will delete the route later after applying the principles to our blog post routes.
// app.get('/admin', function(req, res, next){
//   console.log ("req.isAuthenticated: ", req.isAuthenticated());
//   if (req.isAuthenticated()){
//     res.send
//   } else {
//     console.log("Unauthorized attempt to access /admin has been recorded");
//     res.send("Unauthorized attempt to access /admin has been recorded");
//   }
// });


// ---------------- CONNECT TO MONGODB ----------------
var mongoUri = "mongodb://localhost:27017/AudioCurator";    // Set database to 'AudioCurator' on local MongoDB instance
mongoose.connect(mongoUri);                                 // Connect to database specified on previous line
mongoose.connection.on('error', console.error.bind(console, 'connection error'));     // If error, inform us!
mongoose.connection.once('open', function(){
  console.log("Connected to mongoDB");      // Confirm that we have connected to MongoDB in the console when app is started
});


// ---------------- BEGIN TAKING NETWORK REQUESTS ----------------
app.listen(8000, function(){                // Begin listening on selected port
  console.log("listening to 8000 ");        // Confirm port to user in the console when the app is started
});
