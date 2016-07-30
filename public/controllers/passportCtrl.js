angular.module("AudioCurator").controller("passportCtrl", function($scope, $http, mainServ){

  // This will hold user details if we need them for something.
  $scope.user = {};

  // This function will get info about the logged in user if we need it.
  $scope.getUser = function () {
    mainServ.getUser()
    .then(function(res){
      console.log('Got user info: ', res);
      $scope.user = res;
    });
  };

  // This function tests whether a user is logged in and logs it to the console.
  // NOT CURRENTLY IN USE BUT CAN BE USED FOR TESTING BY IMPLEMENTING A BUTTON TO CALL IT
  $scope.amILoggedIn = function(){
    $http.get('/loggedin').then(function(res){
      console.log(res);
    });
  };

  // This function initiates the login process when the login form is submitted.
  $scope.login = function(user) {
    console.log("line 25", user);
    $http.post('/auth', user)
      .then(function(res){
        console.log("line 28", res.data);
        window.location = '/#/admin';
      })
  };


});
