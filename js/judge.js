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
	
		
		var data = { jid : user.id}
		$.ajax({
			type : 'POST',
			url : 'server/judge.php',
			data : {
				type : "loadLinks",
				data : data
			},
			success : function(response) {
				
				var response = JSON.parse(response);
				for(var i in response){
					var html ="";
					html +='<div class="col-md-4" id="video-'+response[i].id+'">';
						html +='<a href="'+response[i].url+'" class="thumbnail">';
						html +='<p>"'+response[i].title+'"</p>';
						html +='<img src="https://www.youtube.com/yt/brand/media/image/YouTube-icon-full_color.png" style="width: 150px; height: 150px"></img>';
						html +='</a>';
						html +='<input id="rate-'+response[i].id+'" type="number" min="1" max="100" placeholder="1-100" />';
						html +='<input type="button" class="btn btn-primary" value="Rate" placeholder="1-100" onclick="rateLink(this,'+response[i].id+','+user.id+')"/>';
					html +='</div>';
					
					$("#links").append(html);
				}
				
				loadRatedLinks(user.id);

			},
			error : function(data) {
				alert("Server Error please contact admin")
			}
		});
		

	}
	
	

	 
 


});


function loadRatedLinks(jid){
	
	
	var data = { jid :jid } ;
	$.ajax({
		type : 'POST',
		url : 'server/judge.php',
		data : {
			type : "loadRatedLinks",
			data : data
		},
		success : function(response) {
			
			var response = JSON.parse(response);
			for(var i in response){
				var html ="";
				html +='<div class="col-md-4">';
					html +='<span class="badge">'+response[i].rating+'</span>';
					html +='<a href="'+response[i].url+'" class="thumbnail">';
					html +='<p>"'+response[i].title+'"</p>';
					html +='<img src="https://www.youtube.com/yt/brand/media/image/YouTube-icon-full_color.png" style="width: 150px; height: 150px"></img>';
					html +='</a>';
				
				html +='</div>';
				
				$("#historyLinks").append(html);
			}

		},
		error : function(data) {
			alert("Server Error please contact admin")
		}
	});
	
}

function switchView(id){
	if(id == "history"){
		$("#historyLinks").show();
		$("#links").hide();
		$("#links-title").hide();
		$("#history-title").show();
		$("#history-btn").show();
		$("#link-btn").hide();
	}else{
		
		$("#historyLinks").hide();
		$("#links").show();
		$("#links-title").show();
		$("#history-title").hide();
		$("#link-btn").show();
		$("#history-btn").hide();
	}
}

function rateLink(element,id,userId){
	
	  $(element).prop('disabled', true);
	var rating =$("#rate-"+id).val();
	var data = { linkId :id ,rating :rating,userId:userId } ;
	$.ajax({
		type : 'POST',
		url : 'server/judge.php',
		data : {
			type : "rateLink",
			data : data
		},
		success : function(response) {
			
				
			$("#video-"+id).remove();
			alert("Added Successfully");
			location.reload();

		},
		error : function(data) {
			alert("Server Error please contact admin")
		}
	});
}

