//MODEL: communicates to controller

/*Setup mainServ.js by associating app name using .module method, and passing service name to .service method.
Use function argument to inject in $http method*/

/*A service is essentially a Constructor function, 
So when creating function variables, be sure to use the 'this' keyword. */


angular.module("AudioCurator").service("mainServ", function($http) {



	this.getClientStream = function(clientId){

	  	var key = clientId;

	  	return $http({
	  		method: "GET" 
	  		url: 'http://api.soundcloud.com/users/' + username + '/tracks.json?client_id=       ' + key
	  	}).then(function(res){
	  		console.log(res.data);
	  		return res.data;
	  	});

	};

	this.postBlog = function(newPost){
	  	var post = {
	  		body: newPost
	  	};
	  	return $http({
	  		method: "POST",
	  		url: "/",
	  		data: post
	  	}).then(function(res){
	  		console.log(res);
	  		return res.data.body;
	  	})

	};

	this.getPosts = function() {

	  	return $http({
			method: "GET",
			url: "/"
		}).then(function(res){
			console.log(res);
			return res.data;
		})

	};


});
