
	app.controller('test_clientCtrlr', ['$scope', '$http', '$interval', function($scope, $http, $interval){

		$scope.runners_efc = [];
		$scope.runners_cfl = [];
		$scope.timerRunning = true;
		$scope.cm = true;
		$scope.log = "";

		$scope.resultOrder = 1;
		var data_object;
		var url;
		var i;
		var turn = 0;

		$scope.minWait = 3;
		$scope.maxWait = 7;
		

		$http.get("/runners").success(function(data)
		{
			$scope.runners_efc = data;
			console.log('EFC array initialized with retreived values.\nCFL array is empty ... which is correct!');
			

				$interval(function(){
		
					turn = Math.floor(Math.random() * 2) + 1;
					console.log('~~> Generated turn => ' + turn);

					execute( turn );

				}, 4000 );


		}).error(function(data, status, headers, config) {
			console.log(data);
		});

		$scope.stopTimer = function() 
		{
			$scope.$broadcast('timer-stop');
			$scope.timerRunning = false;
		};

		$scope.timing_point = function(timing_point) 
		{
			$scope.$broadcast('timer-stop');

			data_object = {"timing_point":timing_point, "clock_time":$scope.clock_time, "resultOrder":$scope.resultOrder};
				
				if ( timing_point == 'A' ) 
				{
					
					console.log('-------[ TP_A \'s Turn ]------');
					
					if( $scope.runners_efc.length == 0 )
					{
						console.log('No more runners in EFC.\n------[ END of TP_A \'s Turn ]------');
						$scope.log = $scope.log.concat('No more runners in EFC.\n------[ END of TP_A \'s Turn ]------');
					} 
					else 
						{
							i = Math.floor((Math.random() * $scope.runners_efc.length) + 0);
							console.log('Index selected for EFC array ... ' + i);
							url = "/runners/"+$scope.runners_efc[i].chip_code;
							
							$http.put(url, data_object)
							.success(function(data_object, status){
								console.log('Time saved [ '+$scope.clock_time + ']');
								$scope.runners_cfl.push($scope.runners_efc[i]);

								console.log('CFL\'s length = ' + $scope.runners_cfl.length);

								$scope.runners_efc.splice(i,1);

								$scope.log = $scope.log.concat('>> Deleted index: ' + i + ' from EFC.\n');
								console.log('Deleted index: ' + i + ' from EFC.');

								$scope.$broadcast('timer-resume');
								console.log('------[ END of TP_A \'s Turn ]------');
							})
							.error(function(error){
								console.log(error);	
							});
						}
				} else 
					{ 
						console.log('======[ TP_B \'s Turn ]======');
						
						if( $scope.runners_cfl.length == 0 ) 
						{
							console.log('No more runners in CFL.\n======[ END of TP_B \'s Turn ]======');
							$scope.log = $scope.log.concat('No more runners in CFL.\n======[ END of TP_B \'s Turn ]======');
						} 
							else 
							{
								i = Math.floor((Math.random() * $scope.runners_cfl.length) + 0);
								console.log('Index selected for CFL array ... ' + i);
								url = "/runners/"+$scope.runners_cfl[i].chip_code;

								$http.put(url, data_object)
								.success(function(data_object, status){
									console.log('Time saved [ '+$scope.clock_time+']');

									$scope.runners_cfl.splice(i,1);
									console.log('Deleted index: ' + i + ' from [CFL]');
									console.log('[CFL] has ' + $scope.runners_cfl.length);
									$scope.log = $scope.log.concat('Deleted index: ' + i + ' from [CFL]\n');
									$scope.resultOrder++;

									$scope.$broadcast('timer-resume');
									console.log('======[ END of TP_B \'s Turn ]======');
								})
								.error(function(error){
									console.log(error);	
								});
							}
					}
		};


		$scope.$on('timer-stopped', function(event, data){
			$scope.clock_time = data.minutes + ':' + data.seconds + ':' + data.millis;
			console.log('TIME STAMP => ' + $scope.clock_time);
			$scope.log = $scope.log.concat($scope.clock_time + '\n');
		});

	function execute( turno )
	{
		if ( $scope.runners_efc.length == 0 && $scope.runners_cfl.length == 0 ) 
		{
				$scope.stopTimer();

				$scope.cm = false;
		
				console.log("There are no more runners, demo is finished, final results on dashboard's Runners - Results");
				$scope.log = $scope.log.concat("Demo is finished.\n");
		} else
			{
				switch ( turno ) {
					case 1: $interval($scope.timing_point('A'), 5000 ); break;
					case 2: $interval($scope.timing_point('B'), 5000 ); break;
				}
			}
	};

	function getSeconds(minWait, maxWait)
	{
		return Math.floor((Math.random() * maxWait) + minWait) * 1000;
	};

	}]).$inject = ['$scope'];

