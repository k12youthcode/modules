<?php



include('db.php');
error_reporting(E_ALL);
ini_set('display_errors', 1);

$type = $_POST['type'];
$data = $_POST['data'];

if($type == "saveTeam")
{
	saveTeam($data);
}

if($type == "changeStatus")
{
	changeStatus($data);
}

if($type =="loadTeams"){

	loadTeams($data);

}

if($type =="loadPlayers"){

	loadPlayers($data);

}

if($type =="loadUsers"){

	loadUsers();

}
if($type =="addPlayer"){

	addPlayer($data);

}

if($type == "loadChalleneges"){

	loadChalleneges();

}
if($type == "loadChallengeText"){

	loadChallengeText();

}

if($type == "addLink"){

	addLink($data);

}

if($type == "loadLinks"){

	loadLinks($data);

}

if($type == "getTeamRating"){

	getTeamRating($data);

}
if($type == "getTeamRanking"){

	getTeamRanking($data);

}

if($type == "getWinners"){

	getWinners($data);

}

if($type == "getTodaysChallenge"){

	getTodaysChallenge($data);

}




function changeStatus($data){
	$id = $data["id"];
	$state = $data["state"];
	
	


	$sql  = mysql_query(" UPDATE  users SET status = '$state'  WHERE  id = '$id' ");
	if(! $sql )
	{
		die('Could not enter data: ' . mysql_error());
	}else {
		echo "Success";
	}
}


function updateCustomer($data){
	$id = $data["id"];
	$firstname = $data["firstname"];
	$lastname = $data["lastname"];
	$phone= $data["phone"];
	$address= $data["address"];
	$rowStatus = 0;
	$phone2 = null;
	$distance = null;
	
	if(isset($data["phone_2"])){
		$phone2 = $data["phone_2"] ;
	}
	if(isset($data["distance"])){
		$distance = $data["distance"] ;
	}

	$sql  = mysql_query(" UPDATE  customer SET distance = '$distance' ,firstname = '$firstname' , lastname = '$lastname' ,phone = '$phone' ,address = '$address' , phone_2 ='$phone2' WHERE  id = '$id' ");
	if(! $sql )
	{
		die('Could not enter data: ' . mysql_error());
	}else {
		echo "Success";
	}
}



function customerQuery($data){
	
	$rowStatus = 0;
	$array = array();
	$sql = "SELECT id as id , concat(firstname, ' ', lastname) as label , concat(firstname, ' ', lastname) as value , phone , address  FROM customer where rowStatus = '$rowStatus'  AND  ( firstname LIKE '%$data%' OR phone LIKE '%$data%'  OR lastname LIKE '%$data%' )  ";
	$retval = mysql_query( $sql );

	if(! $retval )
	{
		die('Could not enter data: ' . mysql_error());
	}else {

		while($row = mysql_fetch_assoc($retval))
		{
			$array[] = $row;
		}

	}



	echo json_encode($array);
}


function login($data){
	
	$email = $data["email"];
	$password = $data["password"];
	$check = 0 ;
	
	$array = array();
	$sql = "SELECT * FROM `users` where email = '$email' and password = '$password'   ";
	$retval = mysql_query( $sql );
	
	if(! $retval )
	{
		die('Could not enter data: ' . mysql_error());
	}else {
		
		while($row = mysql_fetch_assoc($retval))
		{
			$array[] = $row;
			$check = 1 ;
		}
		
	}

	if($check == 1){
		echo json_encode($array);
	}else{
		echo $check = 0 ;
	}

	
}

function loadTeams($data){
	$coachId = $data["coachId"];
	$array = array();
	$sql = "SELECT * FROM `team` where coach_id = '$coachId'   ";
	$retval = mysql_query( $sql );
	
	if(! $retval )
	{
		die('Could not enter data: ' . mysql_error());
	}else {
		
		while($row = mysql_fetch_assoc($retval))
		{
			$array[] = $row;
		}
		
	}

	

	echo json_encode($array);
}

function loadChalleneges(){
	
	$sql = "SELECT * FROM `challenge`     ";
	$retval = mysql_query( $sql );
	
	if(! $retval )
	{
		die('Could not enter data: ' . mysql_error());
	}else {
		
		while($row = mysql_fetch_assoc($retval))
		{
			$array[] = $row;
		}
		
	}

	

	echo json_encode($array);
}

function loadChallengeText(){
	
	$sql = "SELECT * FROM `challenge_text`  WHERE DATE(deadline) >= CURDATE();    ";
	$retval = mysql_query( $sql );
	
	if(! $retval )
	{
		die('Could not enter data: ' . mysql_error());
	}else {
		
		while($row = mysql_fetch_assoc($retval))
		{
			$array[] = $row;
		}
		
	}

	

	echo json_encode($array);
}





function loadPlayers($data){
	$teamId = $data["teamId"];
	$array = array();
	$sql = "SELECT u.* FROM `team_player` tp , `users` u   where u.id = tp.user_id   and tp.team_id = '$teamId'  ";
	$retval = mysql_query( $sql );
	
	if(! $retval )
	{
		die('Could not enter data: ' . mysql_error());
	}else {
		
		while($row = mysql_fetch_assoc($retval))
		{
			$array[] = $row;
		}
		
	}

	

	echo json_encode($array);
}

function loadUsers(){

	$array = array();
	$sql = "SELECT * FROM `users`     ";
	$retval = mysql_query( $sql );
	
	if(! $retval )
	{
		die('Could not enter data: ' . mysql_error());
	}else {
		
		while($row = mysql_fetch_assoc($retval))
		{
			$array[] = $row;
		}
		
	}

	

	echo json_encode($array);
}


function loadCounties($data){
	$state = $data["state"];
	$array = array();
	$sql = "SELECT DISTINCT (`county`) FROM `county_state` where state_abv = '$state'  ";
	$retval = mysql_query( $sql );
	
	if(! $retval )
	{
		die('Could not enter data: ' . mysql_error());
	}else {
		
		while($row = mysql_fetch_assoc($retval))
		{
			$array[] = $row;
		}
		
	}

	

	echo json_encode($array);
}


function saveTeam($data){
	
	$teamName = $data["teamName"];
	$coach_id = $data["coach_id"];



	
	$sql  = mysql_query("INSERT INTO team (name,coach_id)
			VALUES ('$teamName','$coach_id'  )");
	if(! $sql )
	{
		die('Could not enter data: ' . mysql_error());
	}else {
		
	
		echo "Success";
	}
}

function addPlayer($data){
	
	$teamId = $data["teamId"];
	$user_id = $data["user_id"];



	
	$sql  = mysql_query("INSERT INTO team_player (team_id,user_id)
			VALUES ('$teamId','$user_id'  )");
	if(! $sql )
	{
		die('Could not enter data: ' . mysql_error());
	}else {
		
	
		echo "Success";
	}
}

function deleteCustomer($data){
	$id = $data;
	$rowStatus = 1;
	$sql  = mysql_query("DELETE FROM customer WHERE id = '$id'   ");

	if(! $sql )
	{
		echo 'ERROR ' . mysql_error();
		
	}else {
		echo "Success";
	}
}

function addLink($data){
	
	$teamId = $data["teamId"];
	$challenge_id = $data["challenge_id"];
	$videoTitle = $data["videoTitle"];
	$url = $data["url"];



	
	$sql  = mysql_query("INSERT INTO links (url,title,team_id,challenge_id,posted_date)
			VALUES ('$url','$videoTitle','$teamId','$challenge_id',NOW()  )");
	if(! $sql )
	{
		die('Could not enter data: ' . mysql_error());
	}else {
		
	
		echo "Success";
	}
}

function loadLinks($data){
	$teamId = $data["teamId"];
	$array = array();
	$sql = "SELECT * FROM `links` where team_id = '$teamId'  ";
	$retval = mysql_query( $sql );
	
	if(! $retval )
	{
		die('Could not enter data: ' . mysql_error());
	}else {
		
		while($row = mysql_fetch_assoc($retval))
		{
			$array[] = $row;
		}
		
	}

	

	echo json_encode($array);
}

function getTeamRating($data){
	$teamId = $data["teamId"];
	$array = array();
	$sql = "SELECT sum(vr.rating) as rating FROM video_rating vr , links l where l.id = vr.link_id AND  l.team_id = '$teamId'  ";
	$retval = mysql_query( $sql );
	
	if(! $retval )
	{
		die('Could not enter data: ' . mysql_error());
	}else {
		
		while($row = mysql_fetch_assoc($retval))
		{
			$array[] = $row;
		}
		
	}

	

	echo json_encode($array);
}

function getTeamRanking($data){
	$teamIds = $data["teamIds"];
	$array = array();
	$sql = "SELECT sum(vr.rating) as rating , l.team_id , t.name FROM video_rating vr , links l , team t	 where t.id=l.team_id and  l.id = vr.link_id AND  l.team_id IN ($teamIds) GROUP by l.team_id  ";

	$retval = mysql_query( $sql );
	
	if(! $retval )
	{
		die('Could not enter data: ' . mysql_error());
	}else {
		
		while($row = mysql_fetch_assoc($retval))
		{
			$array[] = $row;
		}
		
	}

	

	echo json_encode($array);
}

function getWinners($data){
	
	$cid = $data["cid"];
	$groupBy = $data["groupBy"];
	$array = array();
	$sql = "SELECT MAX(rating) AS rating ,   teamId   ,   teamName, county , state  ";
	$sql .= " FROM  ";
	$sql .= "  (SELECT  SUM(vr.rating) AS rating ,     l.team_id AS teamId , t.name AS teamName , u.`county` AS county , ";
	$sql .= "   u.`state` AS state FROM  ";
	$sql .= " video_rating vr ,  links l , team t ,  users u    ";
	$sql .= "  WHERE t.id = l.team_id AND u.id = t.`coach_id`  AND l.id = vr.link_id AND l.`challenge_id` = '$cid'     ";
	$sql .= "   GROUP BY l.team_id ) AS temp   ";
	$sql .= "  GROUP BY ";
	$sql .= $groupBy  ;
	
	
	
	$retval = mysql_query( $sql );
	
	if(! $retval )
	{
		die('Could not enter data: ' . mysql_error());
	}else {
		
		while($row = mysql_fetch_assoc($retval))
		{
			$array[] = $row;
		}
		
	}

	

	echo json_encode($array);
}

function getTodaysChallenge(){
	

	$array = array();
	$sql = " SELECT * FROM challenge WHERE DATE(endDate) = CURDATE()  ";
	$retval = mysql_query( $sql );
	
	if(! $retval )
	{
		die('Could not enter data: ' . mysql_error());
	}else {
		
		while($row = mysql_fetch_assoc($retval))
		{
			$array[] = $row;
		}
		
	}

	

	echo json_encode($array);
}



?>