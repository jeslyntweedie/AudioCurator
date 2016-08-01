angular.module('AudioCurator').controller('adminCtrl', function($scope, $http, $state, passportService){

  // This function checks if the person accessing /admin is logged in, then saves their information $scope.currentUser or will redirect them. The function is called by ng-init in the admin.html template.
  $scope.checkIfLoggedIn = function(){
    $http.get('/user/me')          // This route only tests if a user is logged in and responds
      .then(function(res){
        if (!res.data._id){        // There will be something at res.data._id if a user is logged in
          $state.go("home");       // This will transition back to the home page if the user is not logged in.
        }
    });
  };

  $scope.checkIfLoggedIn();         // The function will be executed when the admin state is accessed.

});
