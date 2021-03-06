angular.module("AudioCurator").service("SoundCloudServ", function($http) {

  var clientId = '93b670379c03c10be221ed90ee118f93';
  var clientSecret = '87b74a7dd855b8cb9ec10a533be05848';
  var URL = 'https://github.com/AudioCurator';

this.connect = function(){
	SC.initialize({
	  client_id: clientId,
	  redirect_uri: 'http://localhost:8000/callback.html'
	  /*oauth_token (optional): If you want to reuse an access token*/
	});

	// initiate login popup
	var connection = SC.connect();
	console.log(connection);

	var step1 = connection.then(function() {
	  	return SC.get('/me');
	}).then(function(me) {
		console.log(me);
		console.log('Hello, ' + me.username);
	}).catch(function(error) {
		console.log('error, ' + error);
	});
};


    this.getUser = function(username) {
 		return $http({
	  		method: "GET",
	  		url: "http://api.soundcloud.com/users/" + username + "/tracks.json?client_id=" + clientId

	  	}).then(function(res){
	  		console.log('mainServ line 47', res.data);
	  		return res.data;
	  	});
 	};

/*	this.embed = function(url) {

	    return SC.oEmbed(url, {
	  		auto_play: true
		});

 	};*/	



/* 	this.streamMusic = function(){

	 	SC.stream('/tracks/293').then(function(player){
	  	player.play();

		});

 	};*/

});
