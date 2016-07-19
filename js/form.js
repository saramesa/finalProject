/*$(document).ready(function() {
	$('#buttonSubmit').click(function(e){
		e.preventDefault();
		SignInButtonSubmit();
	});

});
function SignInButtonSubmit() {
	var user = getData();
	saveLocalStorage(user);	
}

function getData(){
	var userName = $("#userEmail").val();
	var userPass = $("#userPass").val();
	var userRole = $("#typeOfUser").val();

	var user = {};
	user["name"] = userName;
	user["password"] = userPass;
	user["role"] = userRole;

	return user;
}

function saveLocalStorage(user) {
	var storedUsers = JSON.parse(window.localStorage.getItem('user')) || {};
	storedUsers[Object.keys(storedUsers).length + 1] = user;
	window.localStorage.setItem("user", JSON.stringify(storedUsers));
}



*/