
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

		// $scope.minWait = 3;
		// $scope.maxWait = 7;


	$http.get("/dashboard").then(function(data) 
	{	
		if( data.data[0] == "empty" ) {
			endDemo();
			
			$scope.log = $scope.log.concat('There is no data loaded in database .. [ Seed database ]\n\n');
		} 
		else 
			{
			// $scope.inprogress = (data.data[0] == 'finished')? false : true;
			// $scope.runners = data.data[1];

				if ( data.data[0] == 'finished' ) {
					endDemo();
			
					$scope.log = $scope.log.concat('Please reset databse values .. [ Demo was executed previously ]\n\n');
				} 
				else
					{
						$http.get("/runners").success(function(data)
						{
							if( data.length == 0 ) 
							{
								endDemo();
			
								$scope.log = $scope.log.concat('There are no runners, run migrate command [ End of Test client ]\n');
							} 
							else 
								{
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

		data_object = {"timing_point":timing_point, "clock_time":$scope.clock_time, "resultOrder":$scope.resultOrder};
			
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
					scrollLog();
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
								
								$scope.resultOrder++;

								$scope.$broadcast('timer-resume');
								
								$scope.log = $scope.log.concat('======[ END of TP_B \'s Turn ]======\n\n');
							})
							.error(function(error){
								console.log(error);	
							});
						}
				} scrollLog();
	};


	$scope.$on('timer-stopped', function(event, data){
		$scope.clock_time = data.minutes + ':' + data.seconds + ':' + data.millis;
		$scope.log = $scope.log.concat('TIME STAMP => ' + $scope.clock_time + '\n');
	});

	function scrollLog(){
		$('.log').animate({
			scrollTop: 9000
		});
	}

	function execute( turn )
	{
		if ( $scope.runners_efc.length == 0 && $scope.runners_cfl.length == 0 ) 
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

	function endDemo() {
		$scope.stopTimer();
		$scope.cm = false;
	}

	function getSeconds(minWait, maxWait)
	{
		return Math.floor((Math.random() * maxWait) + minWait) * 1000;
	};

	}]).$inject = ['$scope'];

