// if any input is: focused, blured or has been keyed up, then do this
$('.form').find('input').on('keyup blur focus', function (e) {
    
    // create variables to store the element and label
    var $this = $(this),
        label = $this.prev('label');

	if (e.type === 'keyup') { // if the event is a keyup, then do this
		if ($this.val() === '') {
          label.removeClass('active highlight');
        } else {
          label.addClass('active highlight');
        }
    } else if (e.type === 'blur') { // if the event is a blur, then do this
    	if( $this.val() === '' ) {
    		label.removeClass('active highlight'); 
		} else {
		    label.removeClass('highlight');   
		}   
    } else if (e.type === 'focus') { // if the event is a focus, then do this
        if( $this.val() === '' ) {
    		label.removeClass('highlight'); 
		} 
        else if( $this.val() !== '' ) {
		    label.addClass('highlight');
		}
    }
});

// function to change between "Log In" or "Sign Up" Forms 
$('.tab a').on('click', function (e) {
    e.preventDefault();
  	
  	// add and remove classes
	$(this).parent().addClass('active');
	$(this).parent().siblings().removeClass('active');

	// store if the user cliked "Log In" or "Sign Up"
	target = $(this).attr('href');

	// which ever was not selected hide it
	$('.tab-content > div').not(target).hide();

	// Fade in the selected "Log In" or "Sign Up"
	$(target).fadeIn(600);
  
});


// create some exisiting users who can log in
let existingUsers = [
	{
		email: "chris@gmail.com",
		first_name: "Chris",
		last_name: "Brody",
		password: "12345"
	},
	{
		email: "matt@gmail.com", 
		first_name: "Matt",
		last_name: "Brody",
		password: "12345"
	},
	{
		email: "sam@gmail.com",
		first_name: "Sam", 
		last_name: "Brody",
		password: "12345"
	}
];
let currentUser = {
	email: "",
	first_name: "",
	last_name: "",
	password: ""
}

// capture users data for login or sign up
$("#login_form, #signup_form, #forgot_password",).submit(function(e) {
    e.preventDefault();
    // console.log(existingUsers)

    // object to store user data
	let user_info = {};
	


    $(e.target).find('input').each(function(){
    	// store input tag
    	$this = $(this);

    	// check if email is valid
    	if($this[0].type === "email") {
    		validateEmail($this[0]);
    	}

    	// check data is coming through
    	// console.log($this, "VALUE: " + $this[0].value, "TYPE: " + $this[0].type, "NANE: " + $this[0].name)

    	// set the property & value in the user_info object, based on the user input
    	user_info[$this[0].name] = $this[0].value;
	});

	// confirm data added
  	// console.log(user_info);

	// if the login form was submitted, do this
  	if($(this)[0].id === "login_form") {
  		// console.log("login_form", user_info.login_email, user_info.login_password)
  		let user_email    = user_info.login_email
  		let user_password = user_info.login_password

  		// loop through existingUsers array
  		for (var i = 0; i < existingUsers.length; i++) {
  			// if email && password match, log the user in
  			if ( existingUsers[i].email === user_email && 
  				 existingUsers[i].password === user_password ) 
  			{
  				// confirm it is a match
  				// console.log("its a match");

  				// hide all forms
  				$("#user_form").hide()

  				// add content to welcome screen
  				$("#user_loggedin h1").html("Welcome back " + existingUsers[i].first_name + " " + existingUsers[i].last_name);

  				// show welcome screen
  				$("#user_loggedin").fadeIn(600);

  				currentUser = {
  					email: existingUsers[i].email,
					first_name: existingUsers[i].first_name,
					last_name: existingUsers[i].last_name,
					password: existingUsers[i].password
  				}

  				return
  			} else {
  				console.log("no match")
  			}
  			// otherwise there is no match
			$(".novalid_match").fadeIn(600)
			
		}  		
	} else if ($(this)[0].id === "signup_form") {
		// console.log("signup_form", user_info.signup_last_name, user_info.signup_first_name, user_info.signup_email, user_info.signup_password)
		// store user data
		let user_first_name = user_info.signup_first_name,
			user_last_name = user_info.signup_last_name,
			user_email = user_info.signup_email,
			user_password = user_info.signup_password


		// check if user exists - if so stop everything
		for (var i = 0; i < existingUsers.length; i++) {
			if(user_email ===existingUsers[i].email) {
				alert("this email already exists in the system.")
				return;
			}
		}

		// add new data to existingUsers array
		existingUsers.push({
			email: user_email,
			first_name: user_first_name,
			last_name: user_last_name,
			password: user_password
		});

		// update email value on login form
		var y = $("input[name=login_email]");
		y.val(existingUsers[i].email);
		var x = y.prev();
		x[0].className = "active highlight";


		// hide signup form
		$("ul.tab-group li")[1].className = "tab";
		$("#signup").hide();

		// show and update login form
		$("ul.tab-group li")[0].className = "tab active";
		$("#login h1").text("First Login");
		$("#login").fadeIn(600);

	

		return;

		// console.log(existingUsers)
	} else if ($(this)[0].id === "forgot_password") {
		// store user email
		let user_email = user_info.forgot_password;

		// loop through users to check if the email exists
		for (var i = 0; i < existingUsers.length; i++) {
			if(user_email === existingUsers[i].email) {
				alert("An email is on the way to " + existingUsers[i].email);

				// update email value on login form
				var y = $("input[name=login_email]");
				y.val(existingUsers[i].email);
				var x = y.prev();
				x[0].className = "active highlight";

				// hide forgot password form
				$("#forgot").hide();	

				// show login form
				$("#user_form").fadeIn(600);
				$("input[name=login_password]").focus();

				return;
			}
		}
		alert("Your email wasn't found in our system, please try again.")
	}
});

// check if email is valid
validateEmail = (userEmail) => {
	var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/
	
	// store user email
	var userEmail = userEmail
	// console.log(userEmail)

	// if user data passes email validation, do this
	if( userEmail.value.match(mailFormat) ) {
		// show that the email was valid
		$(".valid").fadeIn(600).fadeOut(5000);
		// alert('Great, you email valid and ready to send.')
		return;
	} else {
		// $(".invalid").fadeIn(600).fadeOut(5000);
		alert("You have entered an invalid email address, please try again.");
		// focus email input for user correction
		userEmail.focus();  
		return;  
	}
};

// show forgot password form
forgotPasswordForm = () => {
	$("#user_form").hide();
	$("#forgot").fadeIn(600);
}

// logout user if requested
logoutUser = () => {
	// reset current user info to empty
	currentUser = {
		email: "",
		first_name: "",
		last_name: "",
		password: ""
	}

	// hide loggedin page
	$("#user_loggedin").hide();

	// clear form fields 
	$("input[name=login_email]").val("")
	$("input[name=login_password]").val("")

	// reset labels
	$("label[for=login_email]")[0].className = "";
	$("label[for=login_password]")[0].className = "";

	// show login form
	$("#user_form").fadeIn(600);
}

