angular.module("AudioCurator").controller("SoundCloudCtrl", function($scope, SoundCloudServ) {

  $scope.connectSoundCloud = function(){
    console.log("connectSoundCloud launching");
    SoundCloudServ.connect();

  }


});
