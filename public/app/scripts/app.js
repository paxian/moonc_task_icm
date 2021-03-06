//'use strict';

var app = angular.module('taskApp', ['ngRoute', 'timer']).
	run(function($rootScope) {
		$rootScope.testClient_running = false;
	});

	app.config(function($routeProvider){

		$routeProvider

		.when('/test_client', {
			templateUrl: 'partials/test_client.html'
		})

		.when('/dashboard', {
			templateUrl: 'partials/dashboard.html'
		})

		.when('/api', {
			templateUrl: 'partials/api.html'
		})

		.otherwise({
			//redirectTo: '/'
			templateUrl: 'partials/context.html'
		});

	});

	//app.value('testClient_running', {value:'false'});