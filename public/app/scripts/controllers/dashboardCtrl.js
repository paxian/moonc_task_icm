
	app.controller('dashboardCtrlr', ['$scope', '$http', '$interval', function($scope, $http, $interval){
		$scope.runners = [];
		$scope.inprogress = false;

		function getRecords ()
		{
			$http.get("/dashboard").success(function(data) {
				
				$scope.inprogress = (data[0] == 'finished')? false : true;

				$scope.runners = data[1];

			});
		}

		$interval(getRecords, 500);

	}]);