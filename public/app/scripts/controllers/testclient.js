'use strict';

angular.module('taskApp')

	.controller('test_clientCtrlr', function($scope, $http){

		$scope.runners = [];
		

		$http.get("/runners").success(function(data){
			$scope.runners = data;
		});



	});


