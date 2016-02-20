var user  = null ;
var team_players = [] ;
$(document).ready(function() {

	 user = sessionStorage.getItem("user");
	
	if(user != undefined && user != ""){
		user = JSON.parse(user);
		$("#name").html(user.name);
		$("#email").html(user.email);
		
		if(user.role_id =="1"){
			$("#role").html("Coach");
		}
		if(user.role_id =="2"){
			$("#role").html("Player");
		}
		if(user.role_id =="3"){
			$("#role").html("Judge");
		}
		if(user.role_id =="4"){
			$("#role").html("Organization");
		}
		if(user.role_id =="5"){
			$("#role").html("Admin");
		}
		$("#user").val(user.id);
	
		
		var data = { jid : user.id}

	}

});


function saveChallenge(){
	
	var data = {};
	data.name = $("#chalng-name").val();
	data.startDate = new Date($("#startDate").val()).toISOString();
	data.endDate =   new Date($("#endDate").val()).toISOString();
	
	
	
	$.ajax({
		type : 'POST',
		url : 'server/user.php',
		data : {
			type : "saveChallenge",
			data : data
		},
		success : function(response) {
			
			alert("Successfully added");
			$("#chalng-name").val("");
			$("#startDate").val("");
			$("#endDate").val("");
		},
		error : function(data) {
			alert("Server Error please contact admin")
		}
	});
	
	
}

function loadChallenge(){
	

	
	
	
	$.ajax({
		type : 'POST',
		url : 'server/user.php',
		data : {
			type : "loadChallenge",
			data : data
		},
		success : function(response) {
			
			
		},
		error : function(data) {
			alert("Server Error please contact admin")
		}
	});
	
	
}


function convertUTCDateToLocalDate(date) {
    var newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);

    var offset = date.getTimezoneOffset() / 60;
    var hours = date.getHours();

    newDate.setHours(hours - offset);

    return newDate;   
}
