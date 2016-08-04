
/*Setup mainCtrl.js by associating app name using .module method, and passing controller name to .controller method
Use function argument to inject in the $scope object and the mainServ service file.*/

angular.module("AudioCurator").controller("mainCtrl", function($scope, $http, $state, mainServ) {

  // This will hold an arry of songs that make up or continuous playlist
  $scope.songs = [];

  // This variable will hold info about the currently logged in user and will be falsy if no user is been logged in.
  $scope.loggedInUser = {};

  // Variable for showing or hiding login button. Logout button should display when this is false.
  $scope.showLoginButton = $scope.loggedInUser === {} ? true : false;

  // This variable controls whether the Login/Register form is displayed.
  $scope.showAuthForm = false;

  // Toggles the value of the showAuthForm variable to display or hide the login form.
  $scope.toggleLoginView = function() {
    console.log("showAuthForm value", $scope.showAuthForm)
    $scope.showAuthForm = $scope.showAuthForm ? false : true;
  };

  // Clears sensitive login information from the input forms. Called immediately after being passed login or register function.
  $scope.clearLogin = function(){
    $scope.user = {};
    $scope.newUser = {};
  };

  // This variable determines which of the Login/Register forms is displayed. (true = login)
  $scope.loginOrRegister = true;

  // This function calls /logout to log out the current user and clear session data.
  $scope.logout = function() {
    console.log('logout now!');
    $http.get('/logout')
      .then(function(res){
        console.log('logged out!');
        $scope.showLoginButton = true;               // Show login button and hide logout button.
        $scope.loggedInUser = {};     // Set loggedInUser to empty object (will also cause login button to display again instead of logout).
        $state.go('home');
      })
  };

  // This function will get info about the logged in user if we need it.
  $scope.getUser = function () {
    mainServ.getUser()
    .then(function(res){
      console.log('Got user info: ', res);
      $scope.user = res;
    });
  };

  // This function initiates the login process when the login form is submitted.
  $scope.login = function(user) {
    $http.post('/login', user)
      .then(function(res){
        $scope.loggedInUser = res.config.data.email; // Sets loggedInUser to email of logged in user. Need to fix this to include displayName.
        $scope.showLoginButton = false;          // Hide login button and show logout button.
        $scope.showAuthForm = false;                 // Hide the auth form.
        $state.go('admin');                          // Redirects to admin page after login.
      })
  };

  // This is submitted by our registration form and sends a new user object to our /signup route which will test for a unique username and email, then create the user in the database and log them in.
  $scope.register = function(user) {
    $http.post('/signup', user)
      .then(function(res){
        console.log('/signup res', res);
        $scope.showLoginButton = false;              // Hide login button and show logout button.
        $scope.showAuthForm = false;                 // Hide the auth form
        $state.go('admin');                          // Redirects to admin page after registration/login
      })
  };


  // Tell SC to use our client ID
  SC.initialize({
      client_id: mainServ.clientId
  });

  // This function will be reworked to take in a souncdloud 'share url' (when user makes a post) and return or save the streaming url to the database.
  SC.get("https://api.soundcloud.com/users/slavetothesound/favorites", {
      limit: 30
  }, function(tracks) {
      for (var i = 0; i < tracks.length; i ++) {
          SC.stream( '/tracks/' + tracks[i].id, function( sm_object ){

            var url = 'https' + sm_object.url.slice(4);
                var track = {
                  id: tracks[i].id,
                  title: tracks[i].title,
                  artist: tracks[i].genre,
                  url: url
              };
              $scope.$apply(function () {
                  $scope.songs.push(track);
              });
          });
      }
  });

  $scope.name = mainServ.name;

  $scope.readytodelete = false;
  $scope.readytoupdate = false;

  $scope.clientId = mainServ.clientId;
  $scope.clientSecret = mainServ.clientSecret;

  $scope.clientStream;

  $scope.blogPost;
  $scope.postHistory;

  // Moved to adminCtrl, should be deleted after confirmed that implementation is successful.
  $scope.postBlog = function(newPost){
    if (newPost){
      console.log(newPost);

      mainServ.postBlog(newPost)
      .then(function(res){
        $scope.blogPost = res;
        displayPosts();
        $scope.newBlogPost = "";

      })   
    } else {                             //Will not allow an empty post to be submitted
      alert("Please enter a blog post"); 
  }
};



  $scope.getStream = function(clientId){

    mainServ.getClientStream(clientId)

  .then(function(res){

    $scope.clientStream = res;

  })

  }

  var displayPosts = function(){
    mainServ.getPosts()
    .then(function(res){
      $scope.postHistory = res;
    })
  }
  //call getPosts when page loads
  displayPosts();

  $scope.remove = function(id) { 
    mainServ.remove(id)
    .then(function(res){
      displayPosts();
    })

  }

  $scope.update =function(post) {
    mainServ.update(post)
    .then(function(res){
      displayPosts();
    })
  }

});
