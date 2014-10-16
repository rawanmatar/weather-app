(function(){
var myApp = angular.module('myApp', [
'ngRoute',
'ngResource']);

myApp.controller('weatherCtrl', ['$scope', 'weatherService', function($scope, weatherService) {
 
	    $scope.findWeather = function(city) {
		 	$scope.weather = weatherService.getWeather(city);
	     };
}]);
	 
myApp.factory('weatherService', ['$http', function ($http){
  return { 
      getWeather: function(city) {
	 var weather = { temp: {}, clouds: null, name:null, country:null, id:null, description:null};  
    $http.jsonp('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric&callback=JSON_CALLBACK')
   
      .success(function(data){
      		if (data) {
                if (data.main) {
                    weather.temp.current = data.main.temp;
                    weather.temp.min = data.main.temp_min;
                    weather.temp.max = data.main.temp_max;
                }
                weather.clouds = data.clouds ? data.clouds.all : undefined;
				weather.name = data.name;
				weather.country = data.sys.country;
				weather.id = data.weather[0].id;
				weather.description= data.weather[0].description;
			}
        });

        return weather;
  }

  	 
  };

}]);

myApp.directive('weatherIcon', function() {
    return {
            restrict: 'E', replace: true,
            scope: {
      			weatherid: '@'
            },
		  controller: function($scope) {
	            $scope.imgurl = function() {
	                var baseUrl = 'img/'
					//weather taken from http://openweathermap.org/weather-conditions
					 if ($scope.weatherid == 800 || $scope.weatherid == 904 ) {
		                    //sunny
		  					return baseUrl + 'sunny.gif';
	                }else if (($scope.weatherid > 801 && $scope.weatherid < 810) || ($scope.weatherid >= 701 && $scope.weatherid < 782)) {
	                    //cloudy
						
	  					return baseUrl + 'cloudy.gif';
	                }else if ($scope.weatherid >= 500 && $scope.weatherid < 532 ) {
	                   //rainy
						
						return baseUrl + 'rain.gif';
	                }else if(($scope.weatherid >= 200 && $scope.weatherid < 232) || ($scope.weatherid >=960 && $scope.weatherid <=962)) {
	                    //thunder
					
	 					return baseUrl + 'rain-thunder.gif';
	                }else if($scope.weatherid == 905 || ($scope.weatherid >=957 && $scope.weatherid <=959)) {
		                    //windy
						
		 					return baseUrl + 'cloud-wind.gif';
		            }else if(($scope.weatherid >=600 && $scope.weatherid <=612)) {
				             //snow
									console.log($scope.weatherid);
				 					return baseUrl + 'snow.gif';
		     		}else if(($scope.weatherid >=613 && $scope.weatherid <=622)) {
				             //snow-rain
									
				 					return baseUrl + 'rain-snow.gif';
				     }else{
					return baseUrl + 'na.gif';
					}
					
	            };
	        },
        template: '<img ng-src="{{ imgurl() }}">'
    };
});



myApp.filter('temp', function($filter) {
    return function(input, precision) {
        if (!precision) {
            precision = 1;
        }
        var numberFilter = $filter('number');
        return numberFilter(input, precision) + '\u00B0C';
    };
});

})();


