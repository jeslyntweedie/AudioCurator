angular.module("AudioCurator").controller("SoundCloudCtrl", function($scope, SoundCloudServ) {

  $scope.connectSoundCloud = function(){
    SoundCloudServ.connect();
    
  }


});


