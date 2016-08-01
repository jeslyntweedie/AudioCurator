angular.module("AudioCurator").controller("passportCtrl", function($scope, $rootScope, $http, $state, mainServ, passportService){

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
        $rootScope.loggedInUser = res.config.data.email; // Sets loggedInUser to email of logged in user. Need to fix this to include displayName.
        $rootScope.showLoginButton = false;          // Hide login button and show logout button.
        $scope.showAuthForm = false;                 // Hide the auth form.
        $state.go('admin');                          // Redirects to admin page after login.
      })
  };

  // This is submitted by our registration form and sends a new user object to our /signup route which will test for a unique username and email, then create the user in the database and log them in.
  $scope.register = function(user) {
    $http.post('/signup', user)
      .then(function(res){
        console.log('/signup res', res);
        $rootScope.showLoginButton = false;          // Hide login button and show logout button.
        $scope.showAuthForm = false;                 // Hide the auth form
        $state.go('admin');                          // Redirects to admin page after registration/login
      })
  };

  // This function calls /logout to log out the current user and clear session data.
  $scope.logout = function() {
    $http.get('/lougout')
      .then(function(res){
        console.log('logged out!');
        $scope.showLoginButton = true;               // Show login button and hide logout button.
        $scope.loggedInUser = {};     // Set loggedInUser to empty object (will also cause login button to display again instead of logout).
        $state.go('home');
      })
  };


});
