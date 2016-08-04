angular.module('myApp', ['angularSoundManager']).controller('MainCtrl', ['$scope',
    function($scope) {


        $scope.songs = [];

        SC.initialize({
            client_id: "0d74e749681c280ecda7178908e7c62a"
        });


        SC.get("https://api.soundcloud.com/groups/55517/tracks", {
            limit: 5
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

                    console.log('track', track);
                    $scope.$apply(function () {
                        $scope.songs.push(track);
                    });
                });
            }
        });
    }
]);
