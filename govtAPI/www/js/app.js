 // create the module and name it govtAPI
 	// also include ngRoute for all our routing needs
    var govtAPI = angular.module('govtAPI', ['ngRoute','ngAnimate']);

    // configure our routes
    govtAPI.config(function($routeProvider) {
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl : 'views/home.html',
                controller  : 'mainController'
            })

            .when('/home', {
                templateUrl : 'views/home.html',
                controller  : 'mainController'
            })

            .when('/enacted-laws', {
                templateUrl : 'views/enacted-laws.html',
                controller  : 'enactedController'
            })

            .when('/bill/:id', {
                templateUrl : 'views/bill.html',
                controller  : 'billViewController'
            })
            // route for the about page
            .when('/about', {
                templateUrl : 'views/about.html',
                controller  : 'aboutController'
            })

            // route for the contact page
            .when('/contact', {
                templateUrl : 'views/contact.html',
                controller  : 'contactController'
            });
    });


     // create the controller and inject Angular's $scope
    govtAPI.controller('mainController', function($scope,$http,$routeParams) {
        
    });

    govtAPI.controller('enactedController', function($scope,$http,$routeParams) {
        // create a message to display in our view
        $scope.message = 'Enacted laws passed during current session of Congress';
        $scope.names = null;
        $http.get("https://www.govtrack.us/api/v2/bill?congress=114&current_status__in=enacted_signed|enacted_veto_override|enacted_tendayrule")
    		.success(function(response) {
                $scope.names = response.objects;
                console.log(response.objects);
            });
    });




 //    govtAPI.controller('countVote', function ($scope) {
	//     $scope.counterYes = 0;
	//     $scope.counterNo = 0;
	//     $scope.countYes = function (inc) {
	//         $scope.counterYes += inc;
	//     };
	//     $scope.countNo = function (inc) {
	//         $scope.counterNo += inc;
	//     };

	// });
	govtAPI.controller('MyCtrl', function ($scope) {
	    $scope.value= 'foo';
	    
	    $scope.newValue = function(value) {
	       console.log(value);
	    };
	});

	govtAPI.controller('formController', function($scope) {
  
        // we will store our form data in this object
        $scope.formData = {};

        // process the form
	    $scope.processForm = function() {

	    };
        
    }); 

    govtAPI.controller('billViewController', function($scope,$http,$routeParams,$sce) {
        // create a message to display in our view
        $scope.message = 'Individual Bill View';
        // console.log('test');
        $scope.bill = null;

        $http.get("https://www.govtrack.us/api/v2/bill/"+$routeParams.id+"")
    		.success(function(response) {
                $scope.trustSrc = function(src) {
                    return $sce.trustAsResourceUrl(src);
                }
                $scope.movie = {src: response.link+"/text#main_text_content", title:"Source: www.govtrack.us"};
                console.log(response);
                $scope.bill = response;
            });

    });

    govtAPI.controller('aboutController', function($scope,$http,$routeParams) {
        $scope.message = 'Bills passed by the 113th congress';
        $scope.names = null;
        $http.get("https://www.govtrack.us/api/v2/bill?congress=113&current_status__in=enacted_signed|enacted_veto_override|enacted_tendayrule")
    		.success(function(response) {$scope.names = response.objects;});
    });

    govtAPI.controller('contactController', function($scope,$http,$routeParams) {
        $scope.message = 'Bills passed by the 112th congress';
        $scope.names = null;
        $http.get("https://www.govtrack.us/api/v2/bill?congress=112&current_status__in=enacted_signed|enacted_veto_override|enacted_tendayrule")
    		.success(function(response) {$scope.names = response.objects;});
    });






