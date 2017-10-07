(function () {
    "use strict";

    angular
        .module("sitesApp")
        .factory("DataService", DataService);

    DataService.$inject = ["$http"];

    function DataService($http) {
        var service = {

        };

        return service;

        
    }
})();