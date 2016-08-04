/*Setup angular.module method, using same name as ng-app directive in index.html. */
angular.module("AudioCurator", ['ui.router', 'angularSoundManager'])
  .config(function($stateProvider, $urlRouterProvider){
    $stateProvider
    .state("home", {
      url: "/",
      templateUrl: "./templates/blog.html"
    }).state("admin", {
      url: "/admin",
      templateUrl: "./templates/admin.html",
      controller: "adminCtrl"
    }).state("about", {
      url: "/about",
      templateUrl: "./templates/about.html",
    });

    $urlRouterProvider.otherwise("/");
});
