angular.module('AudioCurator').controller('adminCtrl', function($scope, $rootScope, $http, $state, mainServ){

  $scope.currentUser = '';

  // This function checks if the person accessing /admin is logged in, then saves their information $scope.currentUser or will redirect them. The function is called by ng-init in the admin.html template.
  $scope.checkIfLoggedIn = function(){
    $http.get('/user/me')          // This route only tests if a user is logged in and responds
      .then(function(res){
        if (!res.data._id){        // There will be something at res.data._id if a user is logged in
          $state.go("home");       // This will transition back to the home page if the user is not logged in.
        } else {
          $scope.currentUser = res.data.displayName;  // Since the user is logged in, save their displayName.
        }
    });
  };

  // Checks if the current user is logged in. This function will be executed when the admin state is accessed.
  $scope.checkIfLoggedIn();

  // This handles new post submissions by retrieving required data from SoundCloud's API as well as saving the data to mongoDB
  $scope.postBlog = function(newPost){                // newPost object will contain all of our new post data. see postModel.js for more details.
    if (newPost.body){                                // newPost must have at least a post body to be valid post
      newPost.postedBy = $scope.currentUser;          // Record the post's author
      mainServ.resolveShareURLtoAPI(newPost.trackInfo.shareUrl) // This makes the HTTP request to soundcloud's API for data based on shareUrl
      .then(function(res){                            // This section grabs the data we want to keep from soundcloud
        newPost.trackInfo = {
          art: res.data.artwork_url,                  // Artwork because pictures are pretty!
          title: res.data.title,                      // Title so people know what they are hearing. Soundcloud usually includes artist with title.
          streamURL: res.data.stream_url,             // This is what we will feed SoundManager2 for the audio stream
          apiURL: res.data.uri                        // The direct API url in case we need to grab info from soundcloud again someday
        };
        mainServ.postBlog(newPost);                   // Data is prepared! Now POST it to the database!
      }).then(function(){
        mainServ.getPosts()                           // Get the full list of posts again since there is a new one now
        .then(function(res){
          $rootScope.postHistory = res;               // Save the posts we just got to rootScope which will display them on the page.
        })
      });
        $scope.newBlogPost = '';                      // Clear the blog post form
    } else {                                          // If the post is empty...
      alert("Please enter a some thoughts!");         // Alert the user that they are not trying hard enough.
    }
  };




  // prepare track data for saving


  // Testing functions, delete later.
  // $scope.shareUrl = 'https://soundcloud.com/thedeadstrange/bones';
  // console.log(mainServ.resolveShareURLtoAPI($scope.shareUrl));
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
                  // console.log(url);
              });
          });
      }
  });

});
