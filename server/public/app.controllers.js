(function () {
    "use strict";

    angular
        .module("sitesApp")
        .controller("SitesController", SitesController);

    SitesController.$inject = ["DataService", "NgMap"];

    function SitesController(DataService, NgMap) {
        var vm = this;
        vm.locations = [];
        vm.getLocations = getLocations();


        function getLocations() {
            DataService.getLocations()
                .success(function (data) {
                    console.log(data);
                    vm.locations = data;
                    if (vm.locations.length > 0) {
                        NgMap.getMap().then(function (map) {
                            // console.log(map.getCenter());
                            // console.log('markers', map.markers);
                            // console.log('shapes', map.shapes);
                        });
                    }
                })
                .error(function (err) {
                    console.log(err);
                })
        };

    }
})();