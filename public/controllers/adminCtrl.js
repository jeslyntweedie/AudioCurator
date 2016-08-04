angular.module('AudioCurator').controller('adminCtrl', function($scope, $http, $state, mainServ){

  // This function checks if the person accessing /admin is logged in, then saves their information $scope.currentUser or will redirect them. The function is called by ng-init in the admin.html template.
  $scope.checkIfLoggedIn = function(){
    $http.get('/user/me')          // This route only tests if a user is logged in and responds
      .then(function(res){
        if (!res.data._id){        // There will be something at res.data._id if a user is logged in
          $state.go("home");       // This will transition back to the home page if the user is not logged in.
        }
    });
  };

  // Checks if the current user is logged in. This function will be executed when the admin state is accessed.
  $scope.checkIfLoggedIn();

  // This handles new post submissions by retrieving required data from SoundCloud's API as well as saving the data to mongoDB
  $scope.postBlog = function(newPost){
    if (newPost){
      mainServ.postBlog(newPost)
      .then(function(res){
        $scope.blogPost = res;
        displayPosts();
        $scope.newBlogPost = "";

      })
    } else {
      alert("Please enter a blog post");
  }
};


  // This function will resolve a soundcloud share URL to it's respective API url which gives us access to it's ID number and streaming URL.
  var resolveShareURLtoAPI = function(shareUrl){
    return $http({
      method: 'GET',
      url: 'http://api.soundcloud.com/resolve.json?url=' + shareUrl + "&client_id=" + mainServ.clientId
    });
  };

  // prepare track data for saving


  // Testing functions, delete later.
  $scope.shareUrl = 'https://soundcloud.com/thedeadstrange/bones';
  console.log(resolveShareURLtoAPI($scope.shareUrl));
  // Example of a working soundcloud stream url for reference:
  // https://api.soundcloud.com/tracks/259010344/stream?client_id=0d74e749681c280ecda7178908e7c62a


  // SC.get($scope.shareUrl, function(trackData) {
  //         SC.stream( '/tracks/' + trackData.id, function( sm_object ){
  //           var url = 'https' + sm_object.url.slice(4);
  //               var track = {
  //                 id: trackData.id,
  //                 title: trackData.title,
  //                 artist: trackData.genre,
  //                 url: url
  //             };
  //             $scope.$apply(function () {
  //                 $scope.songs.push(track);
  //             });
  //         });
  // });

  // This function will be reworked to take in a souncdloud 'share url' (when user makes a post) and return or save the streaming url to the database.
  SC.get("https://api.soundcloud.com/users/slavetothesound/favorites", {
      limit: 30
  }, function(tracks) {
      for (var i = 0; i < tracks.length; i ++) {
          SC.stream( '/tracks/' + tracks[i].id, function( sm_object ){

            var url = 'https' + sm_object.url.slice(4);
                var track = {
                  id: tracks[i].id,
                  title: tracks[i].title,
                  artist: tracks[i].genre,
                  url: url
              };
              $scope.$apply(function () {
                  $scope.songs.push(track);
                  console.log(url);
              });
          });
      }
  });

});
