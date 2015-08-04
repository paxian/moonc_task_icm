//'use strict';

var app = angular.module('taskApp', ['ngRoute', 'timer']);

	app.config(function($routeProvider){

		$routeProvider

		.when('/test_client', {
			templateUrl: 'partials/test_client.html'
		})

		.when('/board', {
			templateUrl: 'partials/dashboard.html'
		})

		// .when('/d', {
		// 	templateUrl: 'partials/dashboard.html',
		// 	controller: 'dashboardCtrlr'
		// })

		.otherwise({
			redirectTo: '/'
		});

	});


	app.controller('test_clientCtrlr', ['$scope', '$http', function($scope, $http){

		$scope.runners;
		$scope.timerRunning = true;

		$http.get("/runners").success(function(data){
			$scope.runners = data;
		}).error(function(data, status, headers, config){
			console.log(data);
		});

		$scope.getTime = function() {
			//$scope.time = args.minutes + ':' + args.seconds + ":" + args.millis;
			$scope.$broadcast('timer-stop');
			//$scope.$broadcast('timer-resume');

			//var data = {"chip_code":$scope.runners[0], "time":$scope.time};
			//console.log('/runners/'+$scope.runners[0].chip_code, {"efc":$scope.time});
			$http.post("/runners/"+$scope.runners[0].chip_code, {"efc":$scope.time})
			.success(function(data, status){
				console.log('Exito.');
			})
			.error(function(error){
				console.log(error);
			});

		};

		$scope.$on('timer-stopped', function(event, data){
			console.log(data.minutes + ':' + data.seconds + ':' + data.millis);
			$scope.time = data.minutes + ':' + data.seconds + ':' + data.millis;
		});

	}]);//.$inject = ['$scope'];

	app.controller('dashboardCtrlr', ['$scope', '$http', function($scope, $http){
		$scope.runnerss = [];

		$http.get("/dash").success(function(data){
			$scope.runnerss = data;
		});

	}]);
