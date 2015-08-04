
	app.controller('dashboardCtrlr', ['$scope', '$http', '$interval', function($scope, $http, $interval){
		$scope.runners = [];

		function getRecords (){
			$http.get("/dashboard").success(function(data){
				 $scope.runners = data;
				//return data;
			});
		}

		$interval(getRecords, 3000);

	}]);