
	app.controller('dashboardCtrlr', ['$scope', '$http', '$interval', '$rootScope',
	function($scope, $http, $interval, $rootScope) 
	{	
		$scope.Msg = "";	 		// To set a message to be displayed on the view.
		$scope.finished;	 		// To save whether competition is finished or not.
		$scope.runners = []; 		// Array to contain all results from server.
		$scope.klass = "";	 		// To se a class which message will contain.
		$scope.inprogress = false;	// Flag used to understand when to show the gif showing a runner.

		var focused = false; 			// User is looking at brower's Window/Tab

		/**
		* Gets Runners and associate them to runners arra.
		**/
		function updateDashboard ()
		{
			$http.get("/dashboard").then(function(data) {
				
				if( data.data[0] == "empty" )
				{
					$scope.klass = "alert alert-danger";
					$scope.Msg = "..., ..., THERE IS NO RUNNERS DATA!";
				} 
				 else
				{	
					switch ( data.data[0] )
					{
						case 'notable': 	$scope.klass = "alert alert-danger";
											$scope.Msg = "[ ... THERE IS NO TABLE SCHEMA ON DATABASE ... ]";
											break;

						case 'finished':	$scope.klass = "alert alert-info";
											$scope.Msg = "[       COMPETITION FINISHED       ]";
											$scope.finished = true;
											$scope.inprogress = false;
											$rootScope.testClient_running = $scope.inprogress;
											$('.cover').animate({ scrollTop: -10000 });
											break;

						case 'inprogress':	$scope.klass = "alert alert-success";
											$scope.Msg = "... [ COMPETITION IN PROGRESS ] ...";
											$scope.inprogress = true;
											$rootScope.testClient_running = $scope.inprogress;

											if( $rootScope.testClient_running ) {
												$('.theRunning').text(' ');
											}

											$scope.finished = false;
											$('.cover').animate({ scrollTop: 10000 });
											break;
					}
					$scope.runners = data.data[1];  // Set retreived data to runners array.
				}

			}, function( response ) {
				
				switch( response.status ) 
				{
					case 0: $scope.klass = "alert alert-danger";
							$scope.Msg = "SERVER IS GONE! ... [ UNEXPECTEDLY ]";
							break;
					
					case 500: 	$scope.klass = "alert alert-danger";
								$scope.Msg = "There is no data schema! [ run migrate command ]";
								break;
				}
					$scope.runners = [];
			});

			// This detects when user is looking at tab/browser, where Runners - Resuls is.
			$(window).on("blur focus", function(e)
			{
			    var prevType = $(this).data("prevType");

			    if (prevType != e.type) {   //  reduce double fire issues
			        switch (e.type) 
			        {
			            case "blur": 	focused = false;
							            $scope.Msg = "USER IS AWAY !!! ... connection with server was [ INTERRUPTED ]";
										$scope.klass = "alert alert-danger";
			                			break;

			            case "focus": 	focused = true;
					            		$scope.Msg = "USER CAME BACK! ... [ CONNECTION IS RESTORED ]";
										$scope.klass = "alert alert-warning";
			               				break;
			        }
			    }

			    $(this).data("prevType", e.type);
			});
		}

		/*
		* This function is called every second in order to get updated records from database.
		*/
		$interval(function(){
			if ( focus ) 
				updateDashboard();
		}, 1000);

	}]);
