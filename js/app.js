//ANGULAR
var app = angular.module('project', ['ngRoute', 'ngStorage', 'ui.bootstrap', 'angular-toArrayFilter']);


app.config(['$routeProvider', function($routeProvider) {
	$routeProvider
	.when('/', {	
		templateUrl: 'views/homeView.html',
		controller: 'HomeViewController'
	})
	.when('/bars', {	
		templateUrl: 'views/bars.html',
		controller: 'FilterController'
	})
	.when('/artists', {	
		templateUrl: 'views/artists.html',
		controller: 'FilterController'
	})
	.when('/signin', {	
		templateUrl: 'views/form.html',
		controller: 'HomeViewController'
	})
	.when('/register', {	
		templateUrl: 'views/register.html',
		controller: 'RegisterController'
	})
	.when('/loggedView', {
		templateUrl: 'views/loggedView.html',
		controller: 'RegisterController'
	})
	.when('/profileView', {
		templateUrl: 'views/profileView.html',
		controller: 'ProfileController'
	})
	.when('/artist/:name', {
		templateUrl: 'views/eachArtistView.html',
		controller: 'eachArtistController'
	})
	.when('/bar/:name', {
		templateUrl: 'views/eachBarView.html',
		controller: 'eachArtistController'
	})
	.otherwise({
		redirectTo: '/'
	})
}])




/*CONTROLADORES*/

// utilizar $.localstorage (para refactorizar el código)
app.controller('HomeViewController', ['$scope', function($scope) {
	
}]);


app.controller("RegisterController", function($scope, $localStorage, $sessionStorage, $location) {

	$scope.save = function() {
		var userName = $("#userName").val();
		var userEmail = $("#userEmail").val();
		var userPass = $("#userPass").val();
		var userRole = $("#userType").val();

		var user = {};
		user["name"]= userName;
		user["email"] = userEmail;
		user["password"] = userPass;
		user["role"] = userRole;

		var storedUsers = JSON.parse(window.localStorage.getItem('ngStorage-user')) || {};
		storedUsers[userName] = user;
		$localStorage.user = storedUsers;
		alert("Usuario Registrado. Por favor, haz log in");
		
		// $scope.users = storedUsers;
	}

	$scope.logIn = function (data){
		var currentUserName = $("#login-userEmail").val();
		var currentUserPassword = $("#login-userPass").val();

		var currentUser = {};
		currentUser["userName"] = currentUserName;
		currentUser["userPassword"] = currentUserPassword;

		var currentStoredUser = JSON.parse(window.localStorage.getItem('ngStorage-user')) || {};

		if(currentStoredUser[currentUserName]) {
			if(currentStoredUser[currentUserName].password == currentUserPassword) {
				currentStoredUser[currentUserName] = currentUser;
				$sessionStorage.currentUser = currentUserName;
					// $scope.currentUsers = currentStoredUser;
				}
			}else {
				alert("usuario no existe");
			}
		}

		if($sessionStorage.currentUser){
			$scope.user = $sessionStorage.currentUser;
		}else{
			$scope.user = false;
		}
		
		if($scope.user){
			$location.url("/loggedView")
		}else {
			$location.url("/register")
		}



		$scope.addNewBar = function() {
			var barName = $("#barName").val();
			var barAddress = $("#barAddress").val();
			var barPhoto = $("#barPhoto").val();
			var barPhone = $("#barPhone").val();

			var bar = {}
			bar["name"]= barName;
			bar["address"] = barAddress;
			bar["photo"] = barPhoto;
			bar["phone"] = barPhone;

			var storedBars = JSON.parse(window.localStorage.getItem('ngStorage-bar')) || {};
			storedBars[barName] = bar;
			$localStorage.bar = storedBars;
		}



		$scope.addNewArtist = function() {
			var artistName = $("#artistName").val();
			var artistTypeMusic = $("#artistTypeMusic").val();
			var artistTypeMusician = $("#artistTypeMusician").val();
			var artistPhoto = $("#artistPhoto").val();

			var artist = {}
			artist["name"]= artistName;
			artist["typemusic"] = artistTypeMusic;
			artist["typeband"] = artistTypeMusician;
			artist["photo"] = artistPhoto;

			var storedArtists = JSON.parse(window.localStorage.getItem('ngStorage-artist')) || {};
			storedArtists[artistName] = artist;
			$localStorage.artist = storedArtists;
		}
/*$scope.load = function() {
		$scope.data = $localStorage.user;
	}*/
});


app.controller('FilterController', ['$scope', '$routeParams', function($scope, $routeParams){
	$scope.name = $routeParams.name;
	$scope.artists = JSON.parse(window.localStorage.getItem('ngStorage-artist'));
	$scope.bars = JSON.parse(window.localStorage.getItem('ngStorage-bar'));
}]);


/*controlador profilecontroller hacer*/

app.controller('ProfileController', ['$scope', '$routeParams', '$localStorage', '$sessionStorage', '$location', function($scope, $routeParams, $localStorage, $sessionStorage, $location) {
	$scope.name = $routeParams.name;
	$scope.currentUser = $sessionStorage.currentUser;
	$scope.user = $localStorage.user[$scope.currentUser];
	
	if($scope.user){
		$location.url("/profileView")
	}else {
		$location.url("/register")
	}

}]);


app.controller('eachArtistController', ['$scope', '$routeParams', function($scope, $routeParams) {
	$scope.name = $routeParams.name;
	var currentArtist = JSON.parse(window.localStorage.getItem('ngStorage-artist'));
	var currentBar = JSON.parse(window.localStorage.getItem('ngStorage-bar'));
	$scope.artists = currentArtist;
	$scope.bars = currentBar;
}]);




app.controller('DatepickerCtrl', function ($scope) {
	$scope.today = function() {
		$scope.dt = new Date();
	};
	$scope.today();

	$scope.clear = function() {
		$scope.dt = null;
	};

	$scope.options = {
		customClass: getDayClass,
		minDate: new Date(),
		showWeeks: true
	};

  // Disable weekend selection
  function disabled(data) {
  	var date = data.date,
  	mode = data.mode;
  	return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
  }

  $scope.toggleMin = function() {
  	$scope.options.minDate = $scope.options.minDate ? null : new Date();
  };

  $scope.toggleMin();

  $scope.setDate = function(year, month, day) {
  	$scope.dt = new Date(year, month, day);
  };

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date(tomorrow);
  afterTomorrow.setDate(tomorrow.getDate() + 1);
  $scope.events = [
  {
  	date: tomorrow,
  	status: 'full'
  },
  {
  	date: afterTomorrow,
  	status: 'partially'
  }
  ];

  function getDayClass(data) {
  	var date = data.date,
  	mode = data.mode;
  	if (mode === 'day') {
  		var dayToCheck = new Date(date).setHours(0,0,0,0);

  		for (var i = 0; i < $scope.events.length; i++) {
  			var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

  			if (dayToCheck === currentDay) {
  				return $scope.events[i].status;
  			}
  		}
  	}

  	return '';
  }
});














