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


function saveChallengeText(){
	
	

	
	var data = {};
	data.text = $("#chalng-txt").val();
	data.deadline = new Date($("#deadline").val()).toISOString();
	data.createdBy =user.id;
	
	
	
	$.ajax({
		type : 'POST',
		url : 'server/user.php',
		data : {
			type : "saveChallengeText",
			data : data
		},
		success : function(response) {
			
			alert("Successfully added");
			 $("#chalng-txt").val("");
			$("#deadline").val("");
	
		},
		error : function(data) {
			alert("Server Error please contact admin")
		}
	});
	
	

}

function saveChallenge(){
	
	var data = {};
	data.name = $("#chalng-name").val();
	data.startDate = new Date($("#startDate").val()).toISOString();
	data.endDate =   new Date($("#endDate").val()).toISOString();
	data.round = $("#round-dd").val();
	
	
	data.text = $("#chalng-txt").val();
	
	
	
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
			$("#chalng-txt").val("");
		},
		error : function(data) {
			alert("Server Error please contact admin")
		}
	});
	
	
}
function showChangeName(element){
	$("#txt-league"+$(element).data("id")).show();
	$("#btn-txt-league"+$(element).data("id")).show();
}

function editLeague(element){
	
	
	var txt = $("#txt-league"+$(element).data("id")).val();
	if(txt == ""){
		return ;
	}
	var data = { txt :txt ,id :$(element).data("id")  };
	$.ajax({
		type : 'POST',
		url : 'server/user.php',
		data : {
			type : "updateLeagueName",
			data : data
		},
		success : function(response) {
			$("#label-league"+$(element).data("id")).html(txt);
			
		},
		error : function(data) {
			alert("Server Error please contact admin")
		}
	});
}

function searchLeague(){
	
	var leagueName = $("#league-name").val();
	var data = { leagueName : leagueName };
	$.ajax({
		type : 'POST',
		url : 'server/user.php',
		data : {
			type : "searchLeague",
			data : data
		},
		success : function(response) {
			var html ="";
			$("#league-list").html("");
			try{
				
				response = JSON.parse(response);
				for(var i in response){
					html +="<li ><span id='label-league"+response[i].id+"'>"+response[i].name+" <span> ";
						html +="<input id='txt-league"+response[i].id+"' style='display:none;' type='text'></input>";
						html +="<button id='btn-txt-league"+response[i].id+"' data-id='"+response[i].id+"' style='display:none;' class='btn btn-default dropdown-toggle' data-id='"+response[i].id+"' onclick='editLeague(this)'>Save</button>";
						html +="<button class='btn btn-default dropdown-toggle' data-id='"+response[i].id+"' onclick='showChangeName(this)'>Change name</button>";
					html +="</li>";
				}
			
				$("#league-list").html(html);
				
			}catch(e){
				alert("Not found");
			}
		
			
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

function searchTeam(){
	
	var teamName = $("#team-name").val();
	var data = { teamName : teamName };
	$.ajax({
		type : 'POST',
		url : 'server/user.php',
		data : {
			type : "searchTeam",
			data : data
		},
		success : function(response) {
			var html ="";
			$("#team-list").html("");
			try{
				
				response = JSON.parse(response);
				for(var i in response){
					html +="<li ><span id='label-league"+response[i].id+"'>"+response[i].name+" <span> ";
					
					html +="</li>";
				}
			
				$("#team-list").html(html);
				
			}catch(e){
				alert("Not found");
			}
		
			
		},
		error : function(data) {
			alert("Server Error please contact admin")
		}
	});
}

function loadAllUser(){
	
	$("#user-list").html("");
	var html ="";
	for(var i in meta.users){
		
		 html ="";
		
		html +='<li id="'+meta.users[i].id+'"><span>'+meta.users[i].name+' <span> ';
		html +='<select id="user-select-'+meta.users[i].id+'" data-id="'+meta.users[i].id+'" data-state="'+meta.users[i].status+'" onchange="changeStatus(this)"> ';
			html +='<option value="0">Active</option> ';
			html +='<option value="1">In Active</option> ';
			html +='<option value="2">Suspeneded</option> ';
		html +='</select> ';
	//	html +="<button class='btn btn-primary btn-lg' data-state='"+state+"' data-index='"+i+"' onclick='changeStatus(this)'>"+status+"</button>";
		
		html +="</li>";
		$("#user-list").append(html);
		$("#user-select-"+meta.users[i].id).val(meta.users[i].status);
		
	}
	
	//$("#user-list").html(html);	
	
	
}


function changeStatus(element){
	
	var id = $(element).data("id");
	var state = $(element).data("state");

	state = $("#user-select-"+id).val();
	var data = {state : state , id :id};
	
	$.ajax({
		type : 'POST',
		url : 'server/coach.php',
		data : {
			type : "changeStatus",
			data : data
		},
		success : function(response) {
			
			
			alert('Stated Changed Successfully');
		location.reload();

		},
		error : function(data) {
			alert("Server Error please contact admin")
		}
	});
	
	
}
