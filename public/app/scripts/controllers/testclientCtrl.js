
app.controller('test_clientCtrlr', ['$scope', '$http', '$interval', '$rootScope',  
	function($scope, $http, $interval, $rootScope)
	{
		$scope.runners_efc = [];	// Array for runners who enter final corridor.
		$scope.runners_cfl = [];	// Array for runners who cross final line.
		$scope.timerRunning = true; // For automatically start timer.
		$scope.cm = true;			// For message indicators to either apperar or not.
		$scope.log = "";			// For containing all ocurred events during execution.

		var resultOrder = 1;		// Counter which value is assigned to every runner crossing final line.
		var data_object;			// Object to be sent to backend.
		var url;					// Used to set url, it's attribute of data_object.
		var i;						// To contain generated index to interact between efc and cfl arrays.
		var turn = 0;				// To contain generated turn, it can be either 1 or 2.

		$http.get("/dashboard").then(function(data) 
		{ 

			switch( data.data[0] )
			{
				case "notable": 	endDemo(); 
									$scope.log = $scope.log.concat('Demo is finished due no database schema .. [ Run migration ]');
									break;
				
				case "empty": 		endDemo(); 
									$scope.log = $scope.log.concat('There is no data in runners table .. [ Seed database ]\n\n');
									break;
				
				case "finished": 	endDemo(); 
									$scope.log = $scope.log.concat('Please reset databse values .. [ Demo was executed previously ]\n\n');
									break;				

				default:
							$http.get("/runners").success(function(data)  
							{   
								$scope.testClient_running = true;
								
								if( data.length == 0 ) 
								{
									endDemo();
									$scope.log = $scope.log.concat('There are no runners, run migrate command [ End of Test-Client ]\n');
								} 
								else 
									 {	
									 	$rootScope.testClient_running = true;
										$scope.runners_efc = data;
										
										$scope.log = $scope.log.concat('EFC array initialized with retreived values.\nCFL array is empty ... which is correct!\n');

										$interval(function(){ 
								
											turn = Math.floor(Math.random() * 2) + 1;
											
											$scope.log = $scope.log.concat('\n#~~> Generated turn => ' + turn + '\n');

											execute( turn );

										}, 4000 );
									}

							}).error(function(data, status, headers, config) {
								console.log(data);
							});
			}
		
		}, function( response ) {

			switch(response.status) {
				case 500: 	endDemo(); 
							$scope.log = $scope.log.concat('There is no data schema! [ run migrate command ]\n\n'); 
						break;
			}

		});


		$scope.stopTimer = function() 
		{
			$scope.$broadcast('timer-stop');
			$scope.timerRunning = false;
		};

		$scope.timing_point = function(timing_point) 
		{
			$scope.$broadcast('timer-stop');

			data_object = {"timing_point":timing_point, "clock_time":$scope.clock_time, "resultOrder":resultOrder};
				
				if ( timing_point == 'A' ) 
				{
					$scope.log = $scope.log.concat('----------[ TP_A \'s Turn ]---------\n')

					if( $scope.runners_efc.length == 0 )
					{
						$scope.log = $scope.log.concat('No more runners in EFC.\n---------[ END of TP_A \'s Turn ]---------\n\n');
					} 
					else 
						{
							i = Math.floor((Math.random() * $scope.runners_efc.length) + 0);
							
							$scope.log = $scope.log.concat('Index selected for EFC array ... ' + i + '\n');

							url = "/runners/"+$scope.runners_efc[i].chip_code;
							
							$http.put(url, data_object)
							.success(function(data_object, status){
								
								$scope.log = $scope.log.concat('Time saved [ '+$scope.clock_time + ' ]\n');

								$scope.runners_cfl.push($scope.runners_efc[i]);

								$scope.log = $scope.log.concat('CFL\'s length = ' + $scope.runners_cfl.length + '\n');

								$scope.runners_efc.splice(i,1);

								$scope.log = $scope.log.concat('>> Deleted index: ' + i + ' from EFC.\n');

								$scope.$broadcast('timer-resume');

								$scope.log = $scope.log.concat('------[ END of TP_A \'s Turn ]------\n\n');
							})
							.error(function(error){
								console.log(error);	
							});
						}
				} else 
					{ 
						$scope.log = $scope.log.concat('=========[ TP_B \'s Turn ]=========\n');
						
						if( $scope.runners_cfl.length == 0 ) 
						{
							$scope.log = $scope.log.concat('No more runners in CFL.\n======[ END of TP_B \'s Turn ]======\n\n');
						} 
							else 
							{
								i = Math.floor((Math.random() * $scope.runners_cfl.length) + 0);

								$scope.log = $scope.log.concat('Index selected for CFL array ... ' + i + '\n');

								url = "/runners/"+$scope.runners_cfl[i].chip_code;

								$http.put(url, data_object)
								.success(function(data_object, status){
									$scope.log = $scope.log.concat('Time saved [ '+$scope.clock_time+' ]\n');

									$scope.runners_cfl.splice(i,1);

									$scope.log = $scope.log.concat('Deleted index: ' + i + ' from [CFL]\n');
									$scope.log = $scope.log.concat('[CFL] has ' + $scope.runners_cfl.length + ' elements\n');
									$scope.log = $scope.log.concat('Deleted index: ' + i + ' from [CFL]\n');
									
									resultOrder++;

									$scope.$broadcast('timer-resume');
									
									$scope.log = $scope.log.concat('======[ END of TP_B \'s Turn ]======\n\n');
								})
								.error(function(error){
									console.log(error);	
								});
							}
					} 
			scrollLog();
		};


		$scope.$on('timer-stopped', function(event, data) {
			$scope.clock_time = data.minutes + ':' + data.seconds + ':' + data.millis;
			$scope.log = $scope.log.concat('TIME STAMP => ' + $scope.clock_time + '\n');
		});

		function scrollLog() { $('.log').animate({ scrollTop: 9000 }); };

		function execute( turn )
		{
			if ( empty($scope.runners_efc) && empty($scope.runners_cfl) ) 
			{
					endDemo();
					$scope.log = $scope.log.concat("No more runners, demo finished, final results on Dashboard.\n");
			} else
				{
					switch ( turn ) {
						case 1: $interval($scope.timing_point('A'), 5000 ); break;
						case 2: $interval($scope.timing_point('B'), 5000 ); break;
					}
				}
		};

		function endDemo() { $scope.stopTimer(); $scope.cm = false; $rootScope.testClient_running = $scope.cm; };

		function empty( a ) { return a.length == 0; };

		$scope.$on('$locationChangeStart', function( event ) {
			var answer = confirm("Are you sure to leave Test-Client?");
			if( answer ) {
				endDemo();
			} else {
				event.preventDefault();
			}
		});

}]).$inject = ['$scope'];

