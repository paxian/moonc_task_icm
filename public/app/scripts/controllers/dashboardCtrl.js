
	app.controller('dashboardCtrlr', ['$scope', '$http', '$interval', function($scope, $http, $interval){
		$scope.runners = [];
		$scope.inprogress = false;
		$scope.klass = "alert alert-warning";
		$scope.Msg = "";

		function getRecords ()
		{
			$http.get("/dashboard").then(function(data) {
				
				if( data.data[0] == "empty" ) {
					$scope.klass = "alert alert-danger";
					$scope.Msg = "There is no data loaded into database.";
				} else {
					
					$scope.inprogress = (data.data[0] == 'finished')? false : true;

					$scope.runners = data.data[1];
				}

			}, function( response ) {
				
				switch(response.status) 
				{
					case 0: $scope.klass = "alert alert-danger"; 
							$scope.Msg = "Server is gone ... unexpectedly."; 
							break;
					
					case 500: 	$scope.klass = "alert alert-danger";
								$scope.Msg = "There is no data schema! [ run migrate command ]";  
								break;
				}
					$scope.runners = [];
			});

			if ( $scope.inprogress )
			{
				$scope.klass = "alert alert-success";
				$scope.Msg = "Competition in progress ...";
			
				$('.cover').animate({ scrollTop: 9000 });
			} 
			else 
				{
					$scope.klass = "alert alert-info";
					$scope.Msg = "Competition finished!    ~~>    Winners are three first places, Golden, Silver and Bronce.";
					
					$('.cover').animate({ scrollTop: -9000 });
				}

		}

		$interval(getRecords, 1000);

	}]);

	// app.directive('scollItem', function(){
	// 	return {
	// 		restrict: "A",
	// 		link: function(scoope, element, attributes) {
	// 			if (scope.$last) {
	// 				scope.$emit("Finished");
	// 			}
	// 		}
	// 	}
	// });

	// app.directive('scrollIf', function() {
	// 	return {
	// 		restric: "A",
	// 		link: function(scope, element, attributes) {
	// 			scope.$on("Finished", function(){
	// 				element.scrollTop(1500);
	// 			});
	// 		}
	// 	}
	// });




