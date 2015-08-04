
	app.controller('test_clientCtrlr', ['$scope', '$http', function($scope, $http){

		$scope.runners_efc;
		$scope.runners_cfl = [];
		$scope.timerRunning = true;
		
		var url;
		var data_object;
		var i;
		var resultOrder=1;

		$http.get("/runners").success(function(data){
			$scope.runners_efc = data;
		}).error(function(data, status, headers, config){
			console.log(data);
		});

		$scope.timing_point = function(timing_point) {
			$scope.$broadcast('timer-stop');

			data_object = {"timing_point":timing_point, "clock_time":$scope.clock_time, "resultOrder":resultOrder};

			$scope.$broadcast('timer-resume');

				
				if ( timing_point == 'A' ) {

					if( $scope.runners_efc.length == 0 ) {
						console.log('No more runners in EFC.')
					} else {
						i = Math.floor((Math.random() * $scope.runners_efc.length) + 0);
						url = "/runners/"+$scope.runners_efc[i].chip_code;
						
						$http.put(url, data_object)
						.success(function(data_object, status){

							$scope.runners_cfl.push($scope.runners_efc[i]);
							$scope.runners_efc.splice(i,1);
							console.log('Deleted index: ' + i + ' from EFC.');
						})
						.error(function(error){
							console.log(error);	
						});
					}

				} else { 

					if( $scope.runners_cfl.length == 0 ) {
						console.log('No more runners in EFC.')
					} else {
						i = Math.floor((Math.random() * $scope.runners_cfl.length) + 0);
						url = "/runners/"+$scope.runners_cfl[i].chip_code;

						$http.put(url, data_object)
						.success(function(data_object, status){
							$scope.runners_cfl.splice(i,1);
							console.log('Deleted index: ' + i + ' from [CFL]');
							resultOrder++;
						})
						.error(function(error){
							console.log(error);	
						});
					}

				}

		};


		$scope.$on('timer-stopped', function(event, data){
			console.log(data.minutes + ':' + data.seconds + ':' + data.millis);
			$scope.clock_time = data.minutes + ':' + data.seconds + ':' + data.millis;
		});

	}]);//.$inject = ['$scope'];

