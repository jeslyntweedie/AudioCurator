angular.module("AudioCurator").controller("SoundCloudCtrl", function($scope, SoundCloudServ, $sce) {

  var username = "caitlin_potter";

  $scope.tracklist;
  $scope.username = username;
  $scope.htmlPlayer;



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

  $scope.stream = function() {
   SC.stream('/tracks/293').then(function(player){
  		player.play();
	});

  }

  $scope.play = function(url){
  	console.log('clicked artwork');
  	/*SoundCloudServ.play(url);*/
/*  	 SC.oEmbed(stream_url, { auto_play: true }, function(oEmbed) {
        $scope.$apply($scope.player_html = $sce.trustAsHtml(oEmbed.html));

    });*/
    SoundCloudServ.embed(url).then(function(embed) {
    	console.log('embed data', embed);

    	/*$scope.$apply($scope.htmlPlayer = $sce.trustAsHtml(embed.html));*/
    	$scope.$apply($scope.htmlPlayer = "asdf");
    	console.log($scope.htmlPlayer);
    	//oEmbed variable is being passed into this function

    	
    });

  };    

});
