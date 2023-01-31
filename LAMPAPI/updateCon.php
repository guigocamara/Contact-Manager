<?php

  $inData = getRequestInfo();

  $FirstName = $inData["FirstName"];
  $LastName = $inData["LastName"];
  $Email = $inData["Email"];
  $Phone = $inData["Phone"];
  $UserId = $inData["userId"];
  $ID = $inData["ID"];

  $conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
  if ($conn->connect_error)
  {
    returnWithError($conn->connect_error);
  }

  else
  {
    $stmt = $conn->prepare("SELECT * FROM Contacts WHERE ID=?");
    $stmt->bind_param("s", $ID);
    $stmt->execute();

    $result = $stmt->get_result();

    if ($row = $result->fetch_assoc())
    {
     
      $stmt2 =  $conn->prepare("UPDATE Contacts SET FirstName=?, LastName=?, Email=?, Phone=? WHERE ID=?");
      $stmt2->bind_param("sssss", $FirstName, $LastName, $Email, $Phone, $ID);
      $stmt2->execute();
      $result2 = $stmt2->get_result();
      returnWithError("");
      $stmt2->close();
    }

    else
    {
      returnWithError("No such contact exists");
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