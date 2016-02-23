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
		$("#user").val(user.id);
		
		var data = { orgId : user.id};
		$(".coachTable").hide();
		$.ajax({
			type : 'POST',
			url : 'server/user.php',
			data : {
				type : "loadCoachOrganization",
				data : data
			},
			success : function(response) {
				
				var response = JSON.parse(response);
				for(var i in response){
					var html ="";
					html +='<li><a href="javascript:void(0)" onclick="loadTeam(this)" data-coachId="'+response[i].id+'">'+response[i].name+'</a></li>';					
					$("#coach-list").append(html);
				}

			},
			error : function(data) {
				alert("Server Error please contact admin")
			}
		});
	
	

	}

});


function loadTeam(element){
	$(".coachTable").hide();
	var coachId = $(element).data("coachid");
	var data = { coachId : coachId};
	
	$.ajax({
		type : 'POST',
		url : 'server/coach.php',
		data : {
			type : "loadTeams",
			data : data
		},
		success : function(response) {
			
			$("#teamList").html("");
			var response = JSON.parse(response);
			for(var i in response){
				$(".coachTable").show();
				var html= "<tr>";
					html +="<td>"+response[i].id+"</td>";
					html +="<td>"+response[i].name+"</td>";
					html +="<td>"+user.name+"</td>";
					html +='<td><button onclick="loadPlayers(this)" data-teamId="'+response[i].id+'" data-toggle="modal" data-target="#addPlayer" type="button" class="btn btn-default" > Players</button></td>';
					html +='<td><button onclick="loadScore(this)" data-teamId="'+response[i].id+'" data-toggle="modal" data-target="#scorePP" type="button" class="btn btn-default" >Team Average Score</button></td>';
					
				html += "</tr>";
				
				$("#teamList").append(html);
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
				$("#players-list").html("");
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




