/*Setup mainCtrl.js by associating app name using .module method, and passing controller name to .controller method
Use function argument to inject in the $scope object and the mainServ service file.*/

angular.module("AudioCurator").controller("mainCtrl", function($scope, mainServ) {

  $scope.name = mainServ.name;
  $scope.readytodelete = false;
  $scope.readytoupdate = false;

  $scope.clientId = mainServ.clientId;
  $scope.clientSecret = mainServ.clientSecret;
  
  $scope.clientStream;

  $scope.blogPost;
  $scope.postHistory;

  $scope.postBlog = function(newPost){
    mainServ.postBlog(newPost)

    .then(function(res){

    $scope.blogPost = res;
    displayPosts();
    $scope.newBlogPost = "";
  })
  }


  $scope.getStream = function(clientId){
  	mainServ.getClientStream(clientId)

	.then(function(res){

	  $scope.clientStream = res;

	})
  }

  var displayPosts = function(){
    mainServ.getPosts()
    .then(function(res){
      $scope.postHistory = res;
    })
  }
  //call getPosts when page loads
  displayPosts();

  $scope.remove = function(id) {
    mainServ.remove(id)
    .then(function(res){
      displayPosts();
    })

  }

  $scope.update =function(post) {
    mainServ.update(post)
    .then(function(res){
      displayPosts();
    })
  }

});
