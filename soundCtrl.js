$scope.play = function(id){
   SC.stream("/tracks/" + id ,function(sound){
      // Save sound, it holds all the data needed to stop, resume, etc.
      $scope.soundObj = sound;
      sound.play({
      onfinish: function() {              
          //Start a new song or something.
        }
      });
  });
}

$scope.pause = function(){
  $scope.soundObj.pause();
}