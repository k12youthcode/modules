<?php



include('db.php');
error_reporting(E_ALL);
ini_set('display_errors', 1);

$type = $_POST['type'];
$data = $_POST['data'];

if($type == "loadStates")
{
	loadStates($data);
}

if($type == "loadCounties")
{
	loadCounties($data);
}

if($type == "registerUser")
{
	registerUser($data);
}


if($type == "login")
{
	login($data);
}

if($type == "loadOrganization")
{
	loadOrganization();
}

if($type == "saveCoachOrganization")
{
	saveCoachOrganization($data);
}

if($type == "loadCoachOrganization")
{
	loadCoachOrganization($data);
}


if($type == "saveChallenge")
{
	saveChallenge($data);
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

function loadStates(){
	
	$array = array();
	$sql = "SELECT DISTINCT (`state_abv`) FROM `county_state`   ";
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

function loadOrganization(){


	$array = array();
	$sql = "SELECT * FROM `users` where role_id = '4'  ";
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




function registerUser($data){
	$fullName = $data["fullName"];
	$email = $data["email"];
	$password= $data["password"];
	$role_id= $data["role_id"];
	$state = $data["state"];
	$county = $data["county"];
	$city = $data["city"];

	$zip = null;
	$parent_email = null;
	$parent_consent = null;
	$league = $state.'_'.$county;

	if(isset($data["zip"])){
		$zip = $data["zip"] ;
	}
	if(isset($data["parent_email"])){
		$parent_email = $data["parent_email"] ;
	}
	
	if(isset($data["parent_consent"])){
		$parent_consent = $data["parent_consent"] ;
		if($parent_consent == "1"){
			$parent_consent = '1' ;
		}else {
			$parent_consent = '0';
		}
	}

	
	$sql  = mysql_query("INSERT INTO users (name,email,password,role_id,county,city,state,zip,parent_email,parent_consent,league)
			VALUES ('$fullName','$email','$password','$role_id','$county','$city','$state' , '$zip', '$parent_email' , '$parent_consent' ,'$league'  )");
	if(! $sql )
	{
		die('Could not enter data: ' . mysql_error());
	}else {
		
		mail($email,"Registration Confirmation","Thanks for registering  with us ");
		$array = array();
	$sql = "SELECT Max(id) as id FROM `users`    ";
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

function saveCoachOrganization($data){
	
	$userId = $data["userId"];
	$orgId = $data["orgId"];
	

	$sql  = mysql_query("INSERT INTO coach_organization (coach_id,organization_id)
			VALUES ('$userId','$orgId'  )");
	if(! $sql )
	{
		die('Could not enter data: ' . mysql_error());
	}else {
		
		
		echo "Success";
	}

}

function saveChallenge($data){

	$name = $data["name"];
	$startDate = $data["startDate"];
	$endDate = $data["endDate"];

	$sql  = mysql_query("INSERT INTO challenge (name,startDate,endDate)
			VALUES ('$name','$startDate','$endDate'  )");
	if(! $sql )
	{
		die('Could not enter data: ' . mysql_error());
	}else {
		
		
		echo $sql;
	}

}
function loadCoachOrganization($data){
	
	
	$orgId = $data["orgId"];
	

	$sql = "SELECT u.*  FROM `users` u , coach_organization co where co.coach_id = u.id and co.organization_id = '$orgId'  ";
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