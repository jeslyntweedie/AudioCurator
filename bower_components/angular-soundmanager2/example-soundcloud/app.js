angular.module('myApp', ['angularSoundManager']).controller('MainCtrl', ['$scope',
    function($scope) {
        $scope.songs = [];
        $scope.test = 'got nuffin';

        SC.initialize({
            client_id: "0d74e749681c280ecda7178908e7c62a"
        });

        console.log('hello');

        console.log(SC.stream("/tracks/18944215"));

        var clickderp = function(){
          console.log('1');
          $scope.derp = SC.stream("/tracks/18944215");
          console.log('2');
        };

        // SC.get("/groups/55517/tracks", {
        //     limit: 5
        // }, function(tracks) {
        //     for (var i = 0; i < tracks.length; i ++) {
        //         SC.stream( '/tracks/' + tracks[i].id, function( sm_object ){
        //             var track = {
        //                 id: tracks[i].id,
        //                 title: tracks[i].title,
        //                 artist: tracks[i].genre,
        //                 url: sm_object.url
        //             };
        //
        //             $scope.$apply(function () {
        //                 $scope.songs.push(track);
        //             });
        //         });
        //     }
        // });
    }
]);
