//'use strict';

var app = angular.module('taskApp', ['ngRoute', 'timer']);

	app.config(function($routeProvider){

		$routeProvider

		.when('/test_client', {
			templateUrl: 'partials/test_client.html'
		})

		.when('/dashboard', {
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