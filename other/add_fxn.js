// date of session
var Day = getCookie("dayClicked");
var Month = getCookie("monthClicked");
var length = "" + Day + "" + Month + "_" + 0;

var canvas;
var context;
var dragok;
var x = Array();
var y = Array();
var i = 0; // index or number of tasks before any cookies are loaded
var current_i;

// bin initials start
var startX = 1200;
var startY = 400;
var height = 100;
var width  = 100;
var error = 30;



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

function setup() {
	canvas = document.getElementById("myCanvas");
	context = canvas.getContext("2d");

	// set title to date displayed
	//
	document.getElementById("title").innerHTML = "" + Day + " " + Month + " 2016";

	canvas.onmousedown = mouseIsDown;
	canvas.onmouseup = mouseIsUp;

	for (var j = 0; j <= getCookie(length); j++) {
		x[j] = 40;
	};

	drawScreen();
	listTasks();
}

function drawScreen() {
	//draw canvas
	//
	context.fillStyle = "#bfbfbf";
	context.fillRect(0, 0, canvas.width, canvas.height);

	// draw bin
	//
	context.fillStyle = "#000033";
	
	context.beginPath();
	context.moveTo(startX, startY);
	context.lineTo(startX+20, startY+height);
	context.lineTo(startX+width-20, startY+height);
	context.lineTo(startX+width, startY);
	context.lineTo(startX, startY);
	context.strokeStyle = "#000033";
	context.stroke();
	context.closePath();

	context.fill();
}


var x_length = 100; // length of string - 60 per 4 characters
var y_length = 15;  // height of letters

function mouseIsDown(e) {
	for (var j = 1; j <= i; j++) {
		if (e.pageX < x[j] + x_length + canvas.offsetLeft && e.pageX > x[j] - 15 + canvas.offsetLeft && e.pageY < y[j] + y_length + canvas.offsetTop && e.pageY > y[j] - y_length + canvas.offsetTop){
			dragok = true;
			canvas.onmousemove = mouseIsMoving;
			current_i = j;
		};
	};
}


function mouseIsUp() {
	dragok = false;
	canvas.onmousemove = null;
	
	// check if over bin
	if (x[current_i] > startX - error && x[current_i] < startX + width + error && y[current_i] > startY - error && y[current_i] < startY + height + error)
	{
		var cookieName = "" + Day + "" + Month + "_" + current_i;
		createCookie(cookieName, "", 360);
	};
	reDraw();
}



function mouseIsMoving(e) {
	x[current_i] = e.pageX - canvas.offsetLeft;
	y[current_i] = e.pageY - canvas.offsetTop;
	document.getElementById("new").innerHTML = "x["+current_i+"] = "+x[current_i]+" and y["+current_i+"] = "+y[current_i];
	reDraw();
}


// onclick - this happens
//
function fromInput() {
	//get the new task added
	var task = document.getElementById("new").value;
	
	if (task != "") // then text box is NOT empty
	{
		//save task as cookie (i+1)
		var cookieName = "" + Day + "" + Month + "_" + (++i);
		createCookie(cookieName, task, 365);

		// cookie for index (date_0)
		createCookie(length, i, 365);

		// add task
		addTask(task);
		// reload page
		location.reload();
	};

}

function createCookie(name, value, expiredays) {
	var todayDate = new Date();
	todayDate.setDate(todayDate.getDate() + expiredays);
	document.cookie = name + "=" + value + "; expires=" + todayDate.toGMTString() + ";"
}

function listTasks() {
	var cookieName;
	for (var j = 1; j <= getCookie(length); j++) {
		i++;
		cookieName = "" + Day + "" + Month + "_" + j;
		addTask( getCookie(cookieName) );
	}
}

function addTask(newTask) {
	// y[i] is the start y position of the new task
	y[i] = (i * 40);
	context.font = "25px Verdana";
	context.fillStyle = "#444444";
	context.fillText(newTask, x[0]-10, y[i]+10);
}

function reDraw() {
	drawScreen();
	var cookieName;
	//list tasks
	for (var j = 0; j <= getCookie(length); j++) {
		// y[i] and x[i] are the start positions of tasks
		context.font = "25px Verdana";
		context.fillStyle = "#444444";
		cookieName = "" + Day + "" + Month + "_" + j;
		context.fillText(getCookie(cookieName), x[j]-10, y[j]+10);
	};
}