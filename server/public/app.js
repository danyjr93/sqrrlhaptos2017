(function () {
    "use strict";

    angular.module("sitesApp", ["ui.router", "ngMap"]);

    angular.module("sitesApp").config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state({
            name: "home",
            url: "/",
            templateUrl: "/templates/template-home.html",
            controller: "SitesController",
            controllerAs: "siteCtrl"
        });
        
        $urlRouterProvider.otherwise("/");
    });

})();