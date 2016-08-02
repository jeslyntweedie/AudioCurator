angular.module("AudioCurator").controller("SoundCloudCtrl", function($scope, SoundCloudServ) {

  var username = "caitlin_potter";

  $scope.tracklist;
  $scope.username = username;


  $scope.connectSoundCloud = function(){
    console.log("connectSoundCloud launching");
    SoundCloudServ.connect();

  }

  $scope.getTracks = function() {
  	console.log("getting user tracks");
  	SoundCloudServ.getTracks();
  }

  var getUser = function(username) {

  	console.log("getting user");

  	SoundCloudServ.getUser(username)
  		.then(function(response){

		$scope.tracklist = response;
		console.log(response);
	});
  };

  getUser($scope.username);

});
