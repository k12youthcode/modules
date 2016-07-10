
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
			loadRounds();

		},
		error : function(data) {
			alert("Server Error please contact admin");
		}
	});
	
}

function loadRounds(){
	
	$.ajax({
		type : 'POST',
		url : 'server/coach.php',
		data : {
			type : "loadRounds",
			data : ""
		},
		success : function(response) {
			meta.rounds = {} ;
			meta.rounds = JSON.parse(response);
			getCompleteChallenges();

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

function getTodaysChallenge(){
	
	$("#winner-body").html("");
	$.ajax({
		type : 'POST',
		url : 'server/coach.php',
		data : {
			type : "getTodaysChallenge",
			data : ""
		},
		success : function(response) {
			
			var result = JSON.parse(response);
			for(var i in result){
				
				getWinners(result[i])
			}

		},
		error : function(data) {
			alert("Server Error please contact admin");
		}
	});
	

	
}

function getWinners(challenge){
	
	var groupBy = "";
	
	if(!isRoundCompleted(challenge.round)){
		return ;
	}
	
	if(challenge.round == "1"){
		
		
		groupBy =  "county";
	}
	
	if(challenge.round == "2"){
		groupBy =  "state";
	}
	
	if(challenge.round == "3"){
		groupBy =  "state";
	}
	
	
	var data = {cid : challenge.id , groupBy : groupBy } ;
	$.ajax({
		type : 'POST',
		url : 'server/coach.php',
		data : {
			type : "getWinners",
			data : data
		},
		success : function(response) {
			meta.users = {} ;
			var result  = JSON.parse(response);
			
			var html = "";
			for(var i in result){
				
				html += '<tr>';
			    	html += '<td> '+result[i].teamName+' </td> ';
			    	html += '<td> '+result[i].rating+' </td> ';
			    	html += '<td> '+challenge.round+' </td> ';
			    	html += '<td> '+challenge.name+' </td> ';
			  	html += '</tr>';
				
			}
			
			$("#winner-body").append(html);

		},
		error : function(data) {
			alert("Server Error please contact admin");
		}
	});
	

	
}

function getCompleteChallenges(){
	
	var data = { };
	$.ajax({
		type : 'POST',
		url : 'server/coach.php',
		data : {
			type : "getCompletedChallenges",
			data : ""
		},
		success : function(response) {
				
				meta.comletedChallenges = {} ;
				meta.completedChallenges = JSON.parse(response);

		},
		error : function(data) {
			alert("Server Error please contact admin")
		}
	});
	
}


function isRoundCompleted(round){
	
	var roundChallanges = 0 ;
	for(var i in meta.rounds){
		if(round == meta.rounds[i].round){
			roundChallanges = meta.rounds[i].challenges ;
		}
	}
	
	for(var i in meta.completedChallenges){
		if(round == meta.completedChallenges[i].round){
			if(roundChallanges == meta.completedChallenges[i].counter){
				return true ;
			} 
		}
	}
	
	return false ;
}
