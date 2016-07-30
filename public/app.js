/*Setup angular.module method, using same name as ng-app directive in index.html. */
angular.module("AudioCurator", ['ui.router'])
  .config(function($stateProvider, $urlRouterProvider){
    $stateProvider
    .state("home", {
      url: "/",
      templateUrl: "./templates/blog.html"
    }).state("admin", {
      url: "/admin",
      templateUrl: "./templates/admin.html"
    });

    $urlRouterProvider.otherwise("/");
});
