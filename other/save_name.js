function check() {
	if ( getCookie("name") != "undefined" ) {
		window.open(".\other\home.html", "_self");
	}
}

function saveName(cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires = "expires=" + d.toUTCString();
	document.cookie = "name" + "=" + cvalue + "; " + expires;
	// open organiser - window.open("home.html", "_self"); - does not work
	//
	window.close("_self");
	window.open("./other/home.html");
}

function getCookie(cookieToFind) {
	// Split the cookie string as before
	var individualCookies = document.cookie.split(';');

	for (var i = 0; i < individualCookies.length; i++) {
	// Loop through all cookies and split them on the equals sign
		var oneCookie = individualCookies[i].split("=");

		// Get the name of the cookie
		var name =  oneCookie[0];

		// This is standard code for removing excess white space
		name = name.replace(/^\s+|\s+$/g, '') ;

		// Get the value of the cookie
		var value = oneCookie[1];

		// If the name is the one you want, return this value☺
		if(name == cookieToFind) {
			return value;
		}
	}
}
