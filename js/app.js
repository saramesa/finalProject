//ANGULAR
var app = angular.module('project', ['ngRoute', 'ngStorage']);

app.controller('HomeViewController', ['$scope', function($scope) {
	$scope.appTittle = 'Simple Expenses Tracker';
}]);



app.config(['$routeProvider', function($routeProvider) {
	$routeProvider
	.when('/', {	
		templateUrl: 'views/homeView.html',
		controller: 'HomeViewController'
	})
	.when('/bars', {	
		templateUrl: 'views/bars.html',
		controller: 'HomeViewController'
	})
	.when('/artists', {	
		templateUrl: 'views/artists.html',
		controller: 'HomeViewController'
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
	.otherwise({
		redirectTo: '/'
	})
}])


// utilizar $.localstorage (para refactorizar el código)
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

		var bar = {}
		bar["name"]= barName;
		bar["address"] = barAddress;
		
		var storedBars = JSON.parse(window.localStorage.getItem('ngStorage-bars')) || {};
		storedBars[name] = bar;
		$localStorage.bar = storedBars;
	}



	$scope.addNewArtist = function() {
		var artistName = $("#artistName").val();
		var artistTypeMusic = $("#artistTypeMusic").val();
		var artistTypeMusician = $("#artistTypeMusician").val();

		var artist = {}
		artist["name"]= artistName;
		artist["typemusic"] = artistTypeMusic;
		artist["typeband"] = artistTypeMusician;
		
		var storedArtists = JSON.parse(window.localStorage.getItem('ngStorage-artists')) || {};
		storedArtists[name] = artist;
		$localStorage.artist = storedArtists;
	}





/*$scope.load = function() {
		$scope.data = $localStorage.user;
	}*/
	








});



















/*
app.filter('favoriteFilter', 'localStorage', function (localStorage) {

	if(localStorage.getItem('favorites')!=undefined)
	{
		var out = [];
		return out;
	}
	else{
		return function (dishes) {
			var old_favorite = JSON.parse($localStorage.get('favorites'));
			var leng = Object.keys(old_favorite).length;
			console.log(leng);

			var out = [];
			for (var i = 0; i < leng; i++) {
				for (var j = 0; j < dishes.length; j++) {
					if (dishes[j].id === favorites[i].id)
						out.push(dishes[j]);
				}
			}
			return out;
		}}
	});*/