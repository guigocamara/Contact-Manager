const urlBase = 'http://cop4331group24.online//LAMPAPI';
const extension = 'php';

document.addEventListener("DOMContentLoaded", () =>{
	//Following code hides or shows the registration/login information.
	const loginForm = document.querySelector("#loginDiv");
	const createAccountForm = document.querySelector("#registerDiv");

	
	document.querySelector("#signUpLink").addEventListener("click", e => {
		e.preventDefault();
		loginForm.classList.add("formHidden");
		createAccountForm.classList.remove("formHidden");
	});

	document.querySelector("#backToLoginButton").addEventListener("click", e =>{
		loginForm.classList.remove("formHidden");
		createAccountForm.classList.add("formHidden");
	})
});

function loginValidation(){
	const loginUsernameError = document.getElementById("loginUsernameError");
	const loginPasswordError = document.getElementById("loginPasswordError");
	const loginusername = document.getElementById("loginUsername").value;
	const loginpassword = document.getElementById("loginPassword").value;
	
	var startLetter = /^[A-Za-z]/g;
	var betweenLetters = /^[A-Za-z0-9]*$/g;
	var totalRegex = /^[A-Za-z][A-Za-z0-9_]{3,29}$/g
	let result = false;
	//Validate the Username
	if(loginusername.match(totalRegex)){
		loginUsernameError.innerHTML = "";
		result = true;
	}else if(loginusername.length == 0){
		loginUsernameError.innerHTML = "";
	}else{
		if(!loginusername.match(betweenLetters)){
			loginUsernameError.innerHTML = "Username must contain only letters, numbers, or _";
		}
	
		if(!loginusername.match(startLetter)){
			loginUsernameError.innerHTML = "Username must start with a letter";
		}

		if(loginusername.length < 3 || loginusername.length > 29){
			loginUsernameError.innerHTML = "Username length should be 3-29";
		}
	}


	//Validate the Password
	if(loginpassword.match(totalRegex)){
		loginPasswordError.innerHTML = "";
		result = true;
	}else if(loginpassword.length == 0){
		loginPasswordError.innerHTML = "";
	}else{
		if(!loginpassword.match(betweenLetters)){
			loginPasswordError.innerHTML = "Password must contain only letters, numbers, or _";
		}
	
		if(!loginpassword.match(startLetter)){
			loginPasswordError.innerHTML = "Password must start with a letter";
		}

		if(loginpassword.length < 3 || loginpassword.length > 29){
			loginPasswordError.innerHTML = "Passowrd length should be 3-29";
		}
	}


	return(result);
}

function registerValidation(){
	const registerUsernameError = document.getElementById("registerUsernameError");
	const registerPasswordError = document.getElementById("registerPasswordError");
	const registerUsername = document.getElementById("registerUsername").value;
	const registerPassword = document.getElementById("registerPassword").value;

	var startLetter = /^[A-Za-z]/g;
	var betweenLetters = /^[A-Za-z0-9]*$/g;
	var totalRegex = /^[A-Za-z][A-Za-z0-9_]{3,29}$/g
	let result = false;

	//Validate the Username
	if(registerUsername.match(totalRegex)){
		registerUsernameError.innerHTML = "";
		result = true;
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
	if(registerPassword.match(totalRegex)){
		registerPasswordError.innerHTML = "";
		result = true;
	}else if(registerPassword.length == 0){
		registerPasswordError.innerHTML = "";
	}else{
		if(!registerPassword.match(betweenLetters)){
			registerPasswordError.innerHTML = "Password must contain only letters, numbers, or _";
		}
	
		if(!registerPassword.match(startLetter)){
			registerPasswordError.innerHTML = "Password must start with a letter";
		}

		if(registerPassword.length < 3 || registerUsername.length > 29){
			registerPasswordError.innerHTML = "Password length should be 3-29";
		}
	}

	return(result);
}


let userId = 0;
let firstName = "";
let lastName = "";

function doLogin()
{
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

				window.location.href = "color.html";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}

}

function doRegistration(){
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
				window.location.href = "color.html";
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
		document.getElementById("userName").innerHTML = "Logged in as " + firstName + " " + lastName;
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

function addColor()
{
	let newColor = document.getElementById("colorText").value;
	document.getElementById("colorAddResult").innerHTML = "";

	let tmp = {color:newColor,userId,userId};
	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/AddColor.' + extension;
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("colorAddResult").innerHTML = "Color has been added";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("colorAddResult").innerHTML = err.message;
	}
	
}

function searchColor()
{
	let srch = document.getElementById("searchText").value;
	document.getElementById("colorSearchResult").innerHTML = "";
	
	let colorList = "";

	let tmp = {search:srch,userId:userId};
	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/SearchColors.' + extension;
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("colorSearchResult").innerHTML = "Color(s) has been retrieved";
				let jsonObject = JSON.parse( xhr.responseText );
				
				for( let i=0; i<jsonObject.results.length; i++ )
				{
					colorList += jsonObject.results[i];
					if( i < jsonObject.results.length - 1 )
					{
						colorList += "<br />\r\n";
					}
				}
				
				document.getElementsByTagName("p")[0].innerHTML = colorList;
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("colorSearchResult").innerHTML = err.message;
	}
	
}
