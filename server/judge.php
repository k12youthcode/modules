<?php



include('db.php');
error_reporting(E_ALL);
ini_set('display_errors', 1);

$type = $_POST['type'];
$data = $_POST['data'];

if($type == "loadLinks")
{
	loadLinks($data);
}

if($type =="loadRatedLinks"){

	loadRatedLinks($data);

}

if($type =="rateLink"){

	rateLink($data);

}

if($type =="loadRatedLinksByAllJudges"){

	loadRatedLinksByAllJudges();

}


function loadRatedLinks($data){
	
	$jid = $data["jid"];

	$rowStatus = 0;
	$array = array();
	$sql = "SELECT l.url  , l.posted_date , l.title , vr.rating   FROM video_rating vr , links l where vr.link_id = l.id  AND   vr.judge_id = '$jid'   ";
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

function loadRatedLinksByAllJudges(){
	
	

	$rowStatus = 0;
	$array = array();
	$sql = "SELECT l.url , u.name , l.posted_date , l.title , vr.rating   FROM video_rating vr , users u  , links l where vr.link_id = l.id  and u.id = vr.judge_id    ";
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

function loadLinks($data){
	
	$jid = $data["jid"];

	$rowStatus = 0;
	$array = array();
	$sql = "select * FROM links l where l.id not IN ( SELECT l.id FROM links l JOIN video_rating vr ON l.id = vr.link_id where vr.judge_id = '$jid')  ";
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

function rateLink($data){
	
	$linkId = $data["linkId"];
	$rating = $data["rating"];
	$userId = $data["userId"];
	$creativity = $data["creativity"];
	$artistic = $data["artistic"];
	$logic = $data["logic"];
	$problem_solved = $data["problem_solved"];

	$sql  = mysql_query("INSERT INTO video_rating (judge_id,rating,link_id,creativity,artistic,logic,problem_solved)
			VALUES ('$userId','$rating','$linkId','$creativity','$artistic','$logic','$problem_solved'  )");
	if(! $sql )
	{
		die('Could not enter data: ' . mysql_error());
	}else {
		
		mail($email,"Registration Confirmation","Thanks for registering  with us ");
		echo "Success";
	}
}



?>