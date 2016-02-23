var user  = null ;
var team_players = [] ;
var teamsids =[];
$(document).ready(function() {

	 user = sessionStorage.getItem("user");
	
	if(user != undefined && user != ""){
		user = JSON.parse(user);
		$("#name").html(user.name);
		$("#email").html(user.email);
		$("#league").html(user.league);
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
		$("#user").val(user.id);
		$("#dp").attr("src","server/uploads/"+user.picUrl.trim());
		
		var data = { coachId : user.id}
		$.ajax({
			type : 'POST',
			url : 'server/coach.php',
			data : {
				type : "loadTeams",
				data : data
			},
			success : function(response) {
				
				var response = JSON.parse(response);
				for(var i in response){
					
					var html= "<tr>";
						html +="<td>"+response[i].id+"</td>";
						html +="<td>"+response[i].name+"</td>";
						html +="<td>"+user.name+"</td>";
						html +='<td><button onclick="loadPlayers(this)" data-teamId="'+response[i].id+'" data-toggle="modal" data-target="#addPlayer" type="button" class="btn btn-default" > Players</button></td>';
						html +='<td><button onclick="loadLinks(this)" data-teamId="'+response[i].id+'" data-toggle="modal" data-target="#addVideos" type="button" class="btn btn-default" >Upload Videos.</button></td>';
						html +='<td><button onclick="loadScore(this)" data-teamId="'+response[i].id+'" data-toggle="modal" data-target="#scorePP" type="button" class="btn btn-default" >Team Average Score</button></td>';
						html += "</tr>";
						
						teamsids.push(response[i].id);
					$("#coachList").append(html);
				}
				
				

			},
			error : function(data) {
				alert("Server Error please contact admin")
			}
		});
		

	}
	
	
	var options = { 
		  // target element(s) to be updated with server response 
			beforeSubmit:  beforeSubmit,  // pre-submit callback 
			success:       afterSuccess,  // post-submit callback 
			resetForm: true        // reset the form after successful submit 
		}; 
		
	 $('#MyUploadForm').submit(function() { 
			$(this).ajaxSubmit(options);  			
			// always return false to prevent standard browser submit and page navigation 
			return false; 
		});
	 
	 
	 


});

function afterSuccess(data)
{

	$('#submit-btn').show(); //hide submit button
	$('#loading-img').hide(); //hide submit button
	
	$("#dp").attr("src","server/uploads/"+data.trim());
	user.picUrl = data.trim() ;
	var obj = JSON.stringify(user);
	sessionStorage.setItem("user", obj);

}

function beforeSubmit(){
    //check whether browser fully supports all File API
   if (window.File && window.FileReader && window.FileList && window.Blob)
	{
	   
		if( !$('#FileInput').val()) //check empty input filed
		{
			$("#output").html("Are you kidding me?");
			return false
		}
		
		var fsize = $('#FileInput')[0].files[0].size; //get file size
		var ftype = $('#FileInput')[0].files[0].type; // get file type
		

		//allow file types 
		switch(ftype)
        {
            case 'image/png': 
			case 'image/gif': 
			case 'image/jpeg': 
             break;
            default:
                $("#output").html("<b>"+ftype+"</b> Unsupported file type!");
				return false
        }
		
		//Allowed file size is less than 5 MB (1048576)
		if(fsize>5242880) 
		{
			$("#output").html("<b>"+bytesToSize(fsize) +"</b> Too big file! <br />File is too big, it should be less than 5 MB.");
			return false
		}
				
		$('#submit-btn').hide(); //hide submit button
		$('#loading-img').show(); //hide submit button
		$("#output").html("");  
	}
	else
	{
		//Output error to older unsupported browsers that doesn't support HTML5 File API
		$("#output").html("Please upgrade your browser, because your current browser lacks some new features we need!");
		return false;
	}
}

//progress bar function
function OnProgress(event, position, total, percentComplete)
{
    //Progress bar

}

//function to format bites bit.ly/19yoIPO
function bytesToSize(bytes) {
   var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
   if (bytes == 0) return '0 Bytes';
   var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
   return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

function saveTeam(){
	var data = {};
	var teamName = $("#teamName").val();
	if(teamName != ""){
		data.teamName = teamName ;
		
		var user = sessionStorage.getItem("user");
		user = JSON.parse(user);
		data.coach_id = user.id;
			
		
		
		$.ajax({
			type : 'POST',
			url : 'server/coach.php',
			data : {
				type : "saveTeam",
				data : data
			},
			success : function(response) {
				
				alert("Added Successfully");
				location.reload();

			},
			error : function(data) {
				alert("Server Error please contact admin")
			}
		});
		
	}
}

function addPlayer(){
	var data = {};
	var teamId =  $("#addPlayerBtn").data("teamid");
	
	data.teamId = teamId ;
	data.user_id = $("#dd-players").val();
	if(data.user_id  == "-1"){
		return ;
	}
	var temp = "";

		
		for(var j in team_players){
			if(team_players[j].id == data.user_id){
				
				alert("Player is already added.");
				return ;
			}
		}
	
	
		
		
		$.ajax({
			type : 'POST',
			url : 'server/coach.php',
			data : {
				type : "addPlayer",
				data : data
			},
			success : function(response) {
				
				for(var i in meta.users){
					if(data.user_id == meta.users[i].id){
						team_players.push(meta.users[i]); 
						$("#players-list").append("<li>"+meta.users[i].name+"</li>");
					}
				}
				

			},
			error : function(data) {
				alert("Server Error please contact admin")
			}
		});
		
	
}

function loadPlayers(element){
	
	var teamId = $(element).data("teamid");
	$("#addPlayerBtn").data("teamid",teamId);
	
	var data = { teamId :teamId } ;
	$.ajax({
		type : 'POST',
		url : 'server/coach.php',
		data : {
			type : "loadPlayers",
			data : data
		},
		success : function(response) {
			
			team_players = [] ;
			
			$("#dd-players").html("<option value='-1'>Select Player</option>");
			$("#players-list").html("");
			for(var i in meta.users){
				if(meta.users[i].role_id == "2"){
					$("#players-list").append("<option value="+meta.users[i].id+">"+meta.users[i].name+"</option>");
				}
			}
			
			if(response != ""){
				var players = JSON.parse(response);
				
				for(var i in players){
					
						team_players.push(players[i]);
						$("#players-list").append("<li>"+players[i].name+"</li>");
					
				}
			}

		},
		error : function(data) {
			alert("Server Error please contact admin")
		}
	});
	
	

	
}


function loadLinks(element){
	
	for(var i in meta.challenges){
		
		$("#chg-players").append("<option value="+meta.challenges[i].id+">"+meta.challenges[i].name+"</option>");
	}
	var teamId = $(element).data("teamid");
	$("#addLinkBtn").data("teamid",teamId);
	
	var data = { teamId :teamId } ;
	$.ajax({
		type : 'POST',
		url : 'server/coach.php',
		data : {
			type : "loadLinks",
			data : data
		},
		success : function(response) {
			$("#video-list").html("");
		
			if(response != ""){
				var links = JSON.parse(response);
				
				for(var i in links){
			
						$("#video-list").append("<li><a href="+links[i].url+">"+links[i].title+"</a></li>");
					
				}
			}

		},
		error : function(data) {
			alert("Server Error please contact admin")
		}
	});
	
}

function loadScore(element){
	


	var teamId = $(element).data("teamid");

	
	var data = { teamId :teamId } ;
	$.ajax({
		type : 'POST',
		url : 'server/coach.php',
		data : {
			type : "getTeamRating",
			data : data
		},
		success : function(response) {
			$("#video-list").html("");
		
			if(response != ""){
				var data = JSON.parse(response);
				if( data[0].rating == null){
					$("#score").html(""+0);
				}else{
					var score = data[0].rating / meta.challenges.length ;
					
					$("#score").html(""+score);
				}
				
			}

		},
		error : function(data) {
			alert("Server Error please contact admin")
		}
	});
	
}

function getTeamRanking(){
	


	var teamId = teamsids.toString();
	
	var data = { teamIds :teamId } ;
	$.ajax({
		type : 'POST',
		url : 'server/coach.php',
		data : {
			type : "getTeamRanking",
			data : data
		},
		success : function(response) {
		
		
			if(response != ""){
				var data = JSON.parse(response);
				var html ="";
				for(var i in data){
					html+="<tr>"
						html+="<td>"+data[i].name+"</td>"
						html+="<td>"+data[i].rating+"</td>"
					html+="</tr>"
					
					
				}
				
				$("#standings").html(html)
			}

		},
		error : function(data) {
			alert("Server Error please contact admin")
		}
	});
	
}

function addLink(){
	var data = {};
	var teamId =  $("#addLinkBtn").data("teamid");
	
	data.teamId = teamId ;
	data.challenge_id = $("#chg-players").val();
	data.videoTitle =  $("#videoTitle").val();
	data.url =  $("#url").val();
	
	if(data.videoTitle == "" && data.url == ""){
		return ;
	}

	
		$.ajax({
			type : 'POST',
			url : 'server/coach.php',
			data : {
				type : "addLink",
				data : data
			},
			success : function(response) {
				
				alert(response);
				location.reload();
				

			},
			error : function(data) {
				alert("Server Error please contact admin")
			}
		});
		
	
}