angular.module("AudioCurator").service("SoundCloudServ", function($http) {

  var clientId = '93b670379c03c10be221ed90ee118f93';
  var clientSecret = '87b74a7dd855b8cb9ec10a533be05848';
  var URL = 'https://github.com/AudioCurator';

this.connect = function(){
	SC.initialize({
	  client_id: clientId,
	  redirect_uri: 'http://localhost:8000/callback.html'
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

/*this.getTracks = function(){

    SC.get("/tracks", {
        user_id: 43374421,
        limit: 100
    }, function (tracks) {
    	console.log(tracks);
        var tmp = '';

        for (var i = 0; i < tracks.length; i++) {

            tmp = '<a href="' + tracks[i].permalink_url + '">' + tracks[i].title + ' - ' + tracks[i].duration + '</a>';

            $("<li/>").html(tmp).appendTo("#track-list");
        }

	});
};*/

    this.getUser = function(username) {
 		return $http({
	  		method: "GET",
	  		url: "http://api.soundcloud.com/users/" + username + "/tracks.json?client_id=93b670379c03c10be221ed90ee118f93"

	  	}).then(function(res){
	  		console.log('mainServ line 47', res.data);
	  		return res.data;
	  	});
 	};

});
