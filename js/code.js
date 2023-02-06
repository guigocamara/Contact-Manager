const urlBase = 'http://spacecontacts.online///LAMPAPI';
const extension = 'php';

function loginValidation(){
	document.getElementById("loginUsernameError").innerHTML = "";
 	document.getElementById("loginPasswordError").innerHTML = "";
}

function registerValidation(){
	const registerUsernameError = document.getElementById("registerUsernameError");
	const registerPasswordError = document.getElementById("registerPasswordError");
	const registerFirstNameError = document.getElementById("registerFirstNameError");
	const registerLastNameError = document.getElementById("registerLastNameError");
	const registerUsername = document.getElementById("registerUsername").value;
	const registerPassword = document.getElementById("registerPassword").value;
	const registerFirstName = document.getElementById("registerFirstName").value;
	const registerLastName = document.getElementById("registerLastName").value;

	var startLetter = /^[A-Za-z]/g;
	var betweenLetters = /^[A-Za-z0-9]*$/g;
	var totalRegexUsername = /^[A-Za-z][A-Za-z0-9_]{3,29}$/g
	var totalRegexPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{3,29}$/g
	var totalRegexName = /^[a-z ,.'-]+$/i
	let resultusername = false;
	let resultpassword = false;
	let resultfirstname = false;
	let resultlastname = false;

	//Validate the Username
	if(registerUsername.match(totalRegexUsername)){
		registerUsernameError.innerHTML = "";
		resultusername = true;
	}else if(registerUsername.length == 0){
		registerUsernameError.innerHTML = "";
	}else{
		if(!registerUsername.match(betweenLetters)){
			registerUsernameError.innerHTML = "Username must contain only letters, numbers, or _";
		}
	
		if(!registerUsername.match(startLetter)){
			registerUsernameError.innerHTML = "Username must start with a letter";
		}

		if(registerUsername.length < 3 || registerUsername.length > 29){
			registerUsernameError.innerHTML = "Username length should be 3-29";
		}
	}

	//Validate the Password
	if(registerPassword.match(totalRegexPassword)){
		registerPasswordError.innerHTML = "";
		resultpassword = true;
	}else if(registerPassword.length == 0){
		registerPasswordError.innerHTML = "";
	}else{
		if(!registerPassword.match(totalRegexPassword)){
			registerPasswordError.innerHTML = "Password must contain one letter, number, and special character";
		}
		
		if(registerPassword.length < 3 || registerPassword.length > 29){
			registerPasswordError.innerHTML = "Password length should be 3-29";
		}
	}


	//Validate first name
	if(registerFirstName.match(totalRegexName)){
		registerFirstNameError.innerHTML = "";
		resultfirstname = true;
	}else if(registerFirstName.length == 0){
		registerFirstNameError.innerHTML = "";
	}else{
		if(!registerFirstName.match(totalRegexName)){
			registerFirstNameError.innerHTML = "Please enter a valid first name";
		}
	}

	
	//Validate last name
	if(registerLastName.match(totalRegexName)){
		registerLastNameError.innerHTML = "";
		resultlastname = true;
	}else if(registerLastName.length == 0){
		registerLastNameError.innerHTML = "";
	}else{
		if(!registerLastName.match(totalRegexName)){
			registerLastNameError.innerHTML = "Please enter a valid last name";
		}
	}



	if(resultusername && resultpassword && resultfirstname && resultlastname){
		return(true);
	}else{
		return(false);
	}
}

function addContactValidation(){
	const contactFirstNameError = document.getElementById("contactFirstNameError");
	const contactLastNameError = document.getElementById("contactLastNameError");
	const contactPhoneNumberError = document.getElementById("contactPhoneNumberError");
	const contactEmailError = document.getElementById("contactEmailError");
	const contactFirstName = document.getElementById("contactFirstName").value;
	const contactLastName = document.getElementById("contactLastName").value;
	const contactPhoneNumber = document.getElementById("contactPhoneNumber").value;
	const contactEmail = document.getElementById("contactEmail").value;

	var startLetter = /^[A-Za-z]/g;
	var betweenLetters = /^[A-Za-z0-9]*$/g;
	var totalRegexName = /^[a-z ,.'-]+$/i
	var totalRegexPhone = /^\d+$/g
	var totalRegexEmail = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
	let resultfirstname = false;
	let resultlastname = false;
	let resultphonenumber = false;
	let resultemail = false;


	//Validate first name
	if(contactFirstName.match(totalRegexName)){
		contactFirstNameError.innerHTML = "";
		resultfirstname = true;
	}else if(contactFirstName.length == 0){
		contactFirstNameError.innerHTML = "";
	}else{
		if(!contactFirstName.match(totalRegexName)){
			contactFirstNameError.innerHTML = "Please enter a valid first name";
		}
	}

	
	//Validate last name
	if(contactLastName.match(totalRegexName)){
		contactLastNameError.innerHTML = "";
		resultlastname = true;
	}else if(contactLastName.length == 0){
		contactLastNameError.innerHTML = "";
	}else{
		if(!contactLastName.match(totalRegexName)){
			contactLastNameError.innerHTML = "Please enter a valid last name";
		}
	}

	//Validate phone number
	if(contactPhoneNumber.match(totalRegexPhone)){
		contactPhoneNumberError.innerHTML = "";
		resultphonenumber = true;
	}else if(contactPhoneNumber.length == 0){
		contactPhoneNumberError.innerHTML = "";
	}else{
		if(!contactPhoneNumber.match(totalRegexPhone)){
			contactPhoneNumberError.innerHTML = "Please enter a valid phone number";
		}
	}

	//Validate email
	if(contactEmail.match(totalRegexEmail)){
		contactEmailError.innerHTML = "";
		resultemail= true;
	}else if(contactEmail.length == 0){
		contactEmailError.innerHTML = "";
	}else{
		if(!contactEmail.match(totalRegexEmail)){
			contactEmailError.innerHTML = "Please enter a valid email address";
		}
	}





	if(resultemail && resultphonenumber && resultfirstname && resultlastname){
		return(true);
	}else{
		return(false);
	}
}

let userId = 0;
let firstName = "";
let lastName = "";

function doLogin()
{	
	//Check login fields aren't empty
	if(document.getElementById("loginUsername").value.length == 0 || document.getElementById("loginPassword").value.length == 0){
		if(document.getElementById("loginUsername").value.length == 0){
			document.getElementById("loginUsernameError").innerHTML = "Please enter a Username!";
		}

		if(document.getElementById("loginPassword").value.length == 0){
			document.getElementById("loginPasswordError").innerHTML = "Please enter a Password!";
		}
	}else{
		userId = 0;
		firstName = "";
		lastName = "";
		
		let login = document.getElementById("loginUsername").value;
		let password = document.getElementById("loginPassword").value;
	//	var hash = md5( password );
		document.getElementById("loginResult").innerHTML = "";

		
		let tmp = {login:login,password:password};
	//	var tmp = {login:login,password:hash};
		let jsonPayload = JSON.stringify( tmp );
		
		let url = urlBase + '/Login.' + extension;

		let xhr = new XMLHttpRequest();
		xhr.open("POST", url, true);
		xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
		try
		{
			xhr.onreadystatechange = function() 
			{
				if (this.readyState == 4 && this.status == 200) 
				{
					let jsonObject = JSON.parse( xhr.responseText );
					userId = jsonObject.id;
			
					if( userId < 1 )
					{		
						document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
						return;
					}
			
					firstName = jsonObject.firstName;
					lastName = jsonObject.lastName;

					saveCookie();

					displayLaser();
					setTimeout(() => {  window.location.href = "contacts.html"; }, 700);

				}
			};
			xhr.send(jsonPayload);
			}
			catch(err)
			{
				document.getElementById("loginResult").innerHTML = err.message;
			}
		}
	
}

function displayLaser(){
	console.log("trigger");
	document.getElementById("ufo").style.zIndex = "20";
	document.getElementById("ufo").style.position = "relative";
	document.getElementById("ufo").style.transform = "scale(20,10)";
	document.getElementById("ufo").style.transitionDuration = "1s";
}

function doRegistration(){
	//Check that the input field are not empty
	if(document.getElementById("registerUsername").value.length == 0 || document.getElementById("registerPassword").value.length == 0 || document.getElementById("registerFirstName").value.length == 0 || document.getElementById("registerLastName").value.length == 0){
		if(document.getElementById("registerUsername").value.length == 0){
			document.getElementById("registerUsernameError").innerHTML = "Please enter a Username!";
		}

		if(document.getElementById("registerPassword").value.length == 0){
			document.getElementById("registerPasswordError").innerHTML = "Please enter a Password!";
		}

		if(document.getElementById("registerFirstName").value.length == 0){
			document.getElementById("registerFirstNameError").innerHTML = "Please enter a First Name!";
		}

		if(document.getElementById("registerLastName").value.length == 0){
			document.getElementById("registerLastNameError").innerHTML = "Please enter a Last Name!";
		}
		
	}else if(registerValidation() == true){
		firstName = document.getElementById("registerFirstName");
		lastName = document.getElementById("registerLastName");
		
		let username = document.getElementById("registerUsername").value;
		let password = document.getElementById("registerPassword").value;
	//	var hash = md5( password );
		
		document.getElementById("registerResult").innerHTML = "";

		let tmp = {
			firstName: firstName,
			lastName: lastName,
			login:username,
			password:password,
		};
	//	var tmp = {login:login,password:hash};

		let jsonPayload = JSON.stringify( tmp );
		
		let url = urlBase + '/register.' + extension;

		let xhr = new XMLHttpRequest();
		xhr.open("POST", url, true);
		xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
		try
		{
			xhr.onreadystatechange = function() 
			{
				if (this.status == 409){
					document.getElementById("registerResult").innerHTML = "User exists"
				}

				if (this.status == 200) 
				{
					let jsonObject = JSON.parse( xhr.responseText );
					userId = jsonObject.id;

					document.getElementById("registerResult").innerHTML = "User added to database";			
			
					firstName = jsonObject.firstName;
					lastName = jsonObject.lastName;

					saveCookie();
					window.location.href = "contacts.html";
					return;
				}
			};

			xhr.send(jsonPayload);
		}
		catch(err)
		{
			document.getElementById("registerResult").innerHTML = err.message;
		}
	}
}



function saveCookie()
{
	let minutes = 20;
	let date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));	
	document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
}

function readCookie()
{
	userId = -1;
	let data = document.cookie;
	let splits = data.split(",");
	for(var i = 0; i < splits.length; i++) 
	{
		let thisOne = splits[i].trim();
		let tokens = thisOne.split("=");
		if( tokens[0] == "firstName" )
		{
			firstName = tokens[1];
		}
		else if( tokens[0] == "lastName" )
		{
			lastName = tokens[1];
		}
		else if( tokens[0] == "userId" )
		{
			userId = parseInt( tokens[1].trim() );
		}
	}
	
	if( userId < 0 )
	{
		window.location.href = "index.html";
	}
	else
	{
		//document.getElementById("userName").innerHTML = "Logged in as " + firstName + " " + lastName;
	}
}

function doLogout()
{
	userId = 0;
	firstName = "";
	lastName = "";
	document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "index.html";
}

var globalContactsCounter = 1;

function addContact()
{
	if(document.getElementById("contactFirstName").value.length == 0 || document.getElementById("contactLastName").value.length == 0 || document.getElementById("contactPhoneNumber").value.length == 0 || document.getElementById("contactEmail").value.length == 0){
		if(document.getElementById("contactFirstName").value.length == 0){
			document.getElementById("contactFirstNameError").innerHTML = "Please enter a First Name!";
		}

		if(document.getElementById("contactLastName").value.length == 0){
			document.getElementById("contactLastNameError").innerHTML = "Please enter a Last Name!";
		}

		if(document.getElementById("contactPhoneNumber").value.length == 0){
			document.getElementById("contactPhoneNumberError").innerHTML = "Please enter a Phone Number!";
		}

		if(document.getElementById("contactEmail").value.length == 0){
			document.getElementById("contactEmailError").innerHTML = "Please enter a email!";
		}
		
	}else if(addContactValidation() == true){
		let firstName = document.getElementById("contactFirstName").value;
		let lastName = document.getElementById("contactLastName").value;
		let phoneNumber = document.getElementById("contactPhoneNumber").value;
		let email = document.getElementById("contactEmail").value;
		document.getElementById("addContactResult").innerHTML = "";``

		let tmp = {FirstName:firstName, LastName:lastName, Phone: phoneNumber, Email:email, UserId:userId};
		let jsonPayload = JSON.stringify( tmp );

		let url = urlBase + '/addCon.' + extension;
		
		let xhr = new XMLHttpRequest();
		xhr.open("POST", url, true);
		xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
		try
		{
			xhr.onreadystatechange = function() 
			{
				if (this.readyState == 4 && this.status == 200) 
				{
					// clears fields in contact box
					document.getElementById("contact-form").reset();
					// puts contact box away
					
					searchContacts();
				}
			};
			xhr.send(jsonPayload);
		}
		catch(err)
		{
			document.getElementById("addContactResult").innerHTML = err.message;
		}

	}
	
}

function deleteContact(i){
	// console.log("tableFirstName" + i);
	// //Need to get the first and last name from the current object
	console.log(i);
	let firstName = document.getElementById("tableFirstName"+i).innerHTML;
	let lastName = document.getElementById("tableLastName"+i).innerHTML;
	console.log(firstName);
	console.log(lastName);

	let check = confirm("Are you sure you want to delete contact: " + firstName + ' ' + lastName);
	if (check === false )
		return; // exit function (contact doesn't get deleted)

	let tmp = {FirstName:firstName, LastName:lastName, UserId:userId};
	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/deleteCon.' + extension;
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				console.log("contact deleted");	
				searchContacts();			
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("addContactResult").innerHTML = err.message;
	}
}

//if it is empty, display all, otherwise just display some.
function searchContacts()
{
	let srch = document.getElementById("searchBox").value;
	
	let contactList = "";

	let tmp = {search:srch,userId:userId};
	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/searchCon.' + extension;
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				let jsonObject = JSON.parse( xhr.responseText );
				console.log(jsonObject);
				const tableBody = document.getElementById("tableBody");
				tableBody.innerHTML = "";
				for( let i=0; i<jsonObject.results.length; i++ )
				{
					let firstName = jsonObject.results[i].FirstName;
					let lastName = jsonObject.results[i].LastName;
					let phoneNumber = jsonObject.results[i].Phone;
					let email = jsonObject.results[i].Email;
					//Actually change the dom

					if( i < jsonObject.results.length)
					{
						const tr = document.createElement("tr");
						tr.setAttribute("id", "tr");
						tr.innerHTML = `
						<td id="tableFirstName${i}">${firstName}</td>
						<td id="tableLastName${i}">${lastName}</td>
						<td id="tableEmail${i}">${email}</td>
						<td id="tablePhoneNumber${i}">${phoneNumber}</td>
						<td>
							<button id="deleteButton" type="button" class="btn" onclick='deleteContact(${i})'>
								<span class="button__text"></span>
								<span class="button__icon">
									<ion-icon name="trash-outline"></ion-icon>
								</span>
							</button>

							<button id="edit-btn" type="button" class="btn" onclick='editContact(${i})'>
								<span class="button__text"></span>
								<span class="button__icon">
									<ion-icon name="create-outline"></ion-icon>
								</span>
							</button>
						</td>
						`
						contactList += tr;
						tableBody.appendChild(tr);
					}
					
				}
				
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		console.log("Search error");
	}
	
}




function editContact(i) 
{	
	
	const table = document.getElementById("table");
	
	
	let firstName = document.getElementById("tableFirstName"+i).innerHTML
	let lastName = document.getElementById("tableLastName"+i).innerHTML;
	let phoneNumber = document.getElementById("tablePhoneNumber"+i).innerHTML;
	let email = document.getElementById("tableEmail"+i).innerHTML;
	

	const editContactForm = document.createElement('div');
	editContactForm.setAttribute("id", "editContactForm");
	editContactForm.setAttribute("class", "sign-up-form formHidden");
	editContactForm.innerHTML =
	` <img src="images/alien-user-icon.png">
			<h1>Edit Contact</h1>
			<form id="contact-form">
			<i class="fa-solid fa-user-alien"></i>
				<input type="text" class="input-box" id="contactFirstName" placeholder=${firstName}>
				<input type="text" class="input-box" id="contactLastName" placeholder=${lastName}>
				<input type="text" class="input-box" id="contactPhoneNumber" placeholder=${phoneNumber}>
				<input type="text" class="input-box" id="contactEmail" placeholder=${email}>
				<button type="button" id="addContactButton" onclick="updateContact()" class="signup-btn">Update Contact</button>
				<button id="back-btn" type="button" class="back-btn" onclick="backButton()">
					<span class="button__text"></span>
					<span class="button__icon"> 
						<ion-icon name="arrow-back-outline"></ion-icon>
					</span>
				</button>
			</form>
	<span id="editContactResult"></span>	
	`;
	
	document.body.appendChild(editContactForm);
	
	table.classList.add("formHidden");
	editContactForm.classList.remove("formHidden");
	
	
	
}

function updateContact() 
{
	
	let firstName = document.getElementById("contactFirstName").value;
	let lastName = document.getElementById("contactLasttName").value;
	let phoneNumber = document.getElementById("contactPhoneNumber").value;
	let email = document.getElementById("contactEmail").value;
	document.getElementById("editContactResult").innerHTML = "";``

	console.log(firstName);
	console.log(lastName);
	console.log(phoneNumber);
	console.log(email);

	let tmp = {FirstName:firstName, LastName:lastName, Phone: phoneNumber, Email:email, UserId:userId};
	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/updateCon.' + extension;
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				searchContacts();
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("editContactResult").innerHTML = err.message;
	}

}

function backButton(table)
{
	console.log("gets in");
	editContactForm.classList.add("formHidden");
	table.classList.remove("formHidden");
	console.log("gets out");
}
// function addColor()
// {
	// 	let newColor = document.getElementById("colorText").value;
	// 	document.getElementById("colorAddResult").innerHTML = "";
	
// 	let tmp = {color:newColor,userId,userId};
// 	let jsonPayload = JSON.stringify( tmp );

// 	let url = urlBase + '/AddColor.' + extension;
	
// 	let xhr = new XMLHttpRequest();
// 	xhr.open("POST", url, true);
// 	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
// 	try
// 	{
// 		xhr.onreadystatechange = function() 
// 		{
// 			if (this.readyState == 4 && this.status == 200) 
// 			{
// 				document.getElementById("colorAddResult").innerHTML = "Color has been added";
// 			}
// 		};
// 		xhr.send(jsonPayload);
// 	}
// 	catch(err)
// 	{
// 		document.getElementById("colorAddResult").innerHTML = err.message;
// 	}
	
// }

// function searchColor()
// {
// 	let srch = document.getElementById("searchText").value;
// 	document.getElementById("colorSearchResult").innerHTML = "";
	
// 	let colorList = "";

// 	let tmp = {search:srch,userId:userId};
// 	let jsonPayload = JSON.stringify( tmp );

// 	let url = urlBase + '/SearchColors.' + extension;
	
// 	let xhr = new XMLHttpRequest();
// 	xhr.open("POST", url, true);
// 	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
// 	try
// 	{
// 		xhr.onreadystatechange = function() 
// 		{
// 			if (this.readyState == 4 && this.status == 200) 
// 			{
// 				document.getElementById("colorSearchResult").innerHTML = "Color(s) has been retrieved";
// 				let jsonObject = JSON.parse( xhr.responseText );
				
// 				for( let i=0; i<jsonObject.results.length; i++ )
// 				{
// 					colorList += jsonObject.results[i];
// 					if( i < jsonObject.results.length - 1 )
// 					{
// 						colorList += "<br />\r\n";
// 					}
// 				}
				
// 				document.getElementsByTagName("p")[0].innerHTML = colorList;
// 			}
// 		};
// 		xhr.send(jsonPayload);
// 	}
// 	catch(err)
// 	{
// 		document.getElementById("colorSearchResult").innerHTML = err.message;
// 	}
	
// }
