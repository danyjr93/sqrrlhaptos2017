(function () {
    "use strict";

    angular
        .module("sitesApp")
        .factory("DataService", DataService);

    DataService.$inject = ["$http"];

    function DataService($http) {
        var service = {
            getLocations: getLocations,
            getLocation: getLocation,
            newLocation: newLocation,
            voteLocation: voteLocation,
            //newSuggestion: newSuggestion,
        };

        return service;

        function getLocations() {
            return $http.get("/api/locations/")
        }

        function getLocation(locationId) {
            return $http.get("/api/locations/" + locationId);
        }

        function newLocation(location) {
            return $http.post("/api/locations/", location);
        }

        function voteLocation(locationId) {
            return $http.post("/api/locations/" + locationId + "/votes")
        }

    }
})();