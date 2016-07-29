//MODEL: communicates to controller

/*Setup mainServ.js by associating app name using .module method, and passing service name to .service method.
Use function argument to inject in $http method*/

/*A service is essentially a Constructor function, 
So when creating function variables, be sure to use the 'this' keyword. */


angular.module("AudioCurator").service("mainServ", function($http) {

	this.userName = "chalice";
	this.clientId = '93b670379c03c10be221ed90ee118f93';
    this.clientSecret = '87b74a7dd855b8cb9ec10a533be05848';

	this.postBlog = function(newPost){
		var today = "[" + new Date().toISOString().slice(0, 10) + "] - " + new Date().toISOString().slice(11, 19);
		var worddate = (new Date()).toString().slice(4, 15);
	  	var post = {
	  		body: newPost,
	  		date: today,
	  		displaydate: worddate
	  	};
	  	console.log(post);
	  	return $http({
	  		method: "POST",
	  		url: "/post",
	  		data: post
	  	}).then(function(res){
	  		console.log(res);
	  		return res.data.body;
	  	})

	};

	this.getPosts = function() {

	  	return $http({
			method: "GET",
			url: "/post"
		}).then(function(res){
			console.log(res.data);
			return res.data;
		})

	};

	this.remove = function(id) {
		return $http({
			method: "DELETE", 
			url:"/post/" + id
		}).then(function(res){
			console.log(res.data);
			return res.data;
		})
	};

	this.update = function(post) {
		return $http({
			method: "PUT",
			url:"/post/" + post._id,
			data: post
		}).then(function(res){
			console.log(res.data);
			return res.data;
		})
	}

});


