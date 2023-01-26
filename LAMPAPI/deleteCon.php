<?php

  $inData = getRequestInfo();
  
  $firstName = $inData["firstName"];
  $lastName = $inData["lastName"];
  $userId = $inData["userId"];

  $conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
  
  if ($conn->connect_error) 
  {
    returnWithError($conn->connect_error);
  } 

  else
  {
    $stmt = $conn->prepare("SELECT * FROM Records WHERE FirstName = ? AND LastName = ? AND UserID = ?");
    $stmt->bind_param("sss", $firstName, $lastName, $userId);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($row = $result->fetch_assoc())
    {
      $stmt2 =  $conn->prepare("DELETE FROM Records WHERE FirstName = ? AND LastName = ? AND UserID = ?");
      $stmt2->bind_param("ssi", $firstName, $lastName, $userId);
      $stmt2->execute();
      returnWithError("");
      $stmt2->close();
    }

    else
    {
      returnWithError("No contact with that name");
    }
    
    $stmt->close();
    $conn->close();
  }

  function getRequestInfo()
  {
    return json_decode(file_get_contents('php://input'), true);
  }

  function sendResultInfoAsJson($obj)
  {
    header('Content-type: application/json');
    echo $obj;
  }

  function returnWithError($err)
  {
    $retValue = '{"error":"' . $err . '"}';
    sendResultInfoAsJson($retValue);
  }
?>