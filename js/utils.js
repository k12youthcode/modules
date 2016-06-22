
var meta = {} ;

$(document).ready(function() {

	$("#header").load("header.html", function() {
		getLoggedInUser();
		$("#footer").load("footer.html");
	});
	
	

	


});



// ** Utils Methods ** //



function getLoggedInUser(){
	
	var user = sessionStorage.getItem("user");
	
	if(user != undefined && user != ""){
		
		user = JSON.parse(user);
		$("#user-top-pnl").show();
		$("#loggedUser-name").html(user.name);
		$("#login-reg-pnl").hide();
		loadUsers();
		
	}else {
		
		$("#login-reg-pnl").show();
		$("#user-top-pnl").hide();
	}	
}

function logout(){
	sessionStorage.removeItem("user");
	sessionStorage.removeItem("items");
	getLoggedInUser();

}



// **  Action Methods **  //  


function saveUser(){
	
	
	var user = {};
	user.email = $("#email-rgs").val();
	if(user.email == ""){
		alert("Enter Email");
		return ;
	}
	
	user.password = $("#password-rgs").val();
	if(user.password == ""){
		alert("Enter password");
		return ;
	}
	
	user.repwd = $("#repwd-rgs").val();
	if(user.repwd == ""){
		alert("Enter  password");
		return ;
	}
	
	user.address = $("#addrs-rgs").val();
	if(user.address == ""){
		alert("Enter  address");
		return ;
	}

	
	user.firstname = $("#firstName-rgs").val();
	if(user.firstname == ""){
		alert("Enter  firstname");
		return ;
	}
	
	user.lastname = $("#lastName-rgs").val();
	if(user.lastname == ""){
		alert("Enter  lastname");
		return ;
	}
	
	user.phone = $("#phone-rgs").val();

	if(user.phone == ""){
		alert("Enter  Phone");
		return ;
	}
	
	
	user.postCode = $("#postCode-rgs").val();
	if(user.postCode == ""){
		alert("Enter  Post Code");
		return ;
	}
	
	
	$.ajax({
		type : 'POST',
		url : 'server/user.php',
		data : {
			type : "saveUser",
			data : user
		},
		success : function(response) {
			
			$(".form-control").val("");
			obj = JSON.stringify(user);
			sessionStorage.setItem("user", obj);
			$("#close-rg-btn").click();
			getLoggedInUser();

		},
		error : function(data) {
			alert("Server Error please contact admin")
		}
	});
	
	
}







function login(){
	
	var user = {};
	user.email = $("#login-email").val();
	user.password = $("#login-password").val();
	
	if(user.email == ""){
		alert("Email missing");
		return;
		
	}
	if(user.password == ""){
		alert("Password missing");
		return;
	}
	
	
	
	
	$.ajax({
		type : 'POST',
		url : 'server/user.php',
		data : {
			type : "login",
			data : user
		},
		success : function(data) {
			
			var obj =JSON.parse(data)[0];
			obj = JSON.stringify(obj);
			sessionStorage.setItem("user", obj);
			getLoggedInUser();
			$("#close-lg-btn").click();
		},
		error : function(data) {
			alert("Invalid user");
		}
	});
	
	
	
}

function loadUsers(){
	
	
	$.ajax({
		type : 'POST',
		url : 'server/coach.php',
		data : {
			type : "loadUsers",
			data : ""
		},
		success : function(response) {
			meta.users = {} ;
			meta.users = JSON.parse(response);

		},
		error : function(data) {
			alert("Server Error please contact admin");
		}
	});
	
	$.ajax({
		type : 'POST',
		url : 'server/coach.php',
		data : {
			type : "loadChalleneges",
			data : ""
		},
		success : function(response) {
			meta.challenges = {} ;
			meta.challenges = JSON.parse(response);
			$("#challenge-txt").html("No challenge available");
			createChallengeTextHtml();
			//loadChallengeText();

		},
		error : function(data) {
			alert("Server Error please contact admin");
		}
	});
	
}

function loadChallengeText(){
	
	$.ajax({
		type : 'POST',
		url : 'server/coach.php',
		data : {
			type : "loadChallengeText",
			data : ""
		},
		success : function(response) {
			$("#challenge-txt").html("No challenge available");
			meta.challengesText = {} ;
			meta.challengesText = JSON.parse(response);
			createChallengeTextHtml();

		},
		error : function(data) {
			alert("Server Error please contact admin");
		}
	});
	

}

function createChallengeTextHtml(){
	
	if(!meta.challenges || meta.challenges.length == 0){
		$("#challenge-txt").html("No challenge available");
		return ;
	}
	
	var html = "<ul>";
	for(var i in meta.challenges){
		html +=  "<li> Challenge Text "+meta.challenges[i].name + " Start Date:  "+ meta.challenges[i].startDate+ " End Date:  "+ meta.challenges[i].endDate+  " Challenge Text:  "+ meta.challenges[i].text+ "</li>";
		
	}
	
	html +="</ul>"
		
		$("#challenge-txt").html(html);
}

