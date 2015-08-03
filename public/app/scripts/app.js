'use strict';

angular.module('taskApp', ['ngRoute'])

	.config(function($routeProvider){

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