
/*Setup mainCtrl.js by associating app name using .module method, and passing controller name to .controller method
Use function argument to inject in the $scope object and the mainServ service file.*/

angular.module("AudioCurator").controller("mainCtrl", function($scope, $rootScope, mainServ) {

  // This variable will hold info about the currently logged in user and will be falsy if no user is been logged in.
  $rootScope.loggedInUser = {};

  // Variable for showing or hiding login button. Logout button should display when this is false.
  $rootScope.showLoginButton = true;

  // This variable controls whether the Login/Register form is displayed.
  $rootScope.showAuthForm = false;

  // Toggles the value of the showAuthForm variable to display or hide the login form.
  $scope.toggleLoginView = function() {
    console.log("showAuthForm value", $scope.showAuthForm)
    $scope.showAuthForm = $scope.showAuthForm ? false : true;
  };

  // This variable determines which of the Login/Register forms is displayed. (true = login)
  $scope.loginOrRegister = true;



  $scope.name = mainServ.name;

  $scope.readytodelete = false;
  $scope.readytoupdate = false;

  $scope.clientId = mainServ.clientId;
  $scope.clientSecret = mainServ.clientSecret;

  $scope.clientStream;

  $scope.blogPost;
  $scope.postHistory;


  $scope.postBlog = function(newPost){
    if (newPost){

      mainServ.postBlog(newPost)
      .then(function(res){
        $scope.blogPost = res;
        displayPosts();
        $scope.newBlogPost = "";

      })
    } else {
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
