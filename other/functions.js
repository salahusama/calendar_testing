// static variable
var z = new Date().getMonth();

function setup() {
	// load xml file of current
	load("months.xml");

	getName();
	display_month(z);
	shade_today();
	listToday();
}

function listToday() {
	var month = getSimpleText("/all/month[@number="+ z +"]/name");
	var day = new Date().getDate();
	var length = "" + day + "" + month + "_" + 0;
	
	for (var i = 1; i <= getCookie(length); i++) {
		var name = "" + day + "" + month + "_" + i;
		var task = getCookie(name);
		
		if ( task != "") {
			var item = document.createElement("li");
			var node = document.createTextNode(task);
			item.appendChild(node);

			var element = document.getElementById("today");
			element.appendChild(item);
		};
	};
}

function getName() {
	var name = getCookie("name");
	document.getElementById("hello").innerHTML = name;
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
function add_page() {
	window.open("add.html");
}

//for XML
// This is a DOM node which represents the XML document
var xmlDoc;

// This function downloads an XML document from the server,
// parses it, and presents the parsed document as a DOM tree
function load(url) { 
	var xmlHTTP;
	if (window.XMLHttpRequest) {
		xmlHTTP = new XMLHttpRequest();
	}
	else {
		xmlHTTP = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlHTTP.open("GET", url, false);
	xmlHTTP.send(null);
	parser = new DOMParser();
	xmlDoc = parser.parseFromString(xmlHTTP.responseText, "application/xml");
}

// This function evaluates an XPath expression against the DOM tree of the
// XML document and returns a text result. It is useful for getting attributes
// and text values.
function getSimpleText(path) {
	// For Internet Explorer, use the following...
	if (window.ActiveXObject) { 
		var node = xmlDoc.selectSingleNode(path);
		return node.childNodes[0].nodeValue;
	}
	// For all other browsers, use the following...
	else {
		var snapshot = xmlDoc.evaluate(path, xmlDoc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		return snapshot.snapshotItem(0).textContent;
	}
}

function prev() {
	if (z === 0){
		alert("This is the end of the Year!");
	}
	else{
		z--;
		display_month(z);
	}
}

function next() {
	if (z === 11){
		alert("This is the end of the Year!");
	}
	else{
		z++;
		display_month(z);
	}
}

function saveMonth(cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires = "expires=" + d.toUTCString();
	document.cookie = "monthClicked" + "=" + cvalue + "; " + expires;
}

function display_month(month) {
	// display month name
	var month_name = getSimpleText("/all/month[@number="+ month +"]/name");
	document.getElementById("month_display").innerHTML = month_name;
	saveMonth(month_name);
	
	// get start of the month
	var start = getSimpleText("/all/month[@number="+ month +"]/start");
	// transfer text to int
	start = parseInt(start);
	// get length of month
	var length = getSimpleText("/all/month[@number="+ month +"]/days");
	// transfer text to int
	length = parseInt(length);

	// clear all cells in table
	for (var i = 1; i <= 37; i++) {
		document.getElementById(i).innerHTML = "";
	};

	// loop to display month dates in table
	var num = 1;
	for (var i = start; i < (length+start); i++) {
		document.getElementById(i).innerHTML = num;

		// insert button in td
		var b = document.createElement("button");
		var node = document.createTextNode("+");
		b.appendChild(node);
		var att = document.createAttribute("onclick");
		att.value = "process(" + num + ")";
		b.setAttributeNode(att);

		var element = document.getElementById(i);
		element.appendChild(b);
		num++;
	};
	shade_today();
}

function process(date) {
	// save date clicked in a cookie
	saveToday(date, 1);
	// add canvas page in new tab
	window.open("add.html");
}

function saveToday(cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires = "expires=" + d.toUTCString();
	document.cookie = "dayClicked" + "=" + cvalue + "; " + expires;
}

function shade_today() {
	var month = z;
	// get current month
	thisMonth = new Date().getMonth();

	// if month displayed is current month..
	if (z === thisMonth ) {
		var date = new Date().getDate();
		var start = getSimpleText("/all/month[@number="+ month +"]/start");
		// transfer text to int
		start = parseInt(start);
		var change = start + date - 1;
		// change bgcolor of cell
		document.getElementById(change).style.backgroundColor = "#b3b3cc";
	}

	// if not current month..
	else {
		var date = new Date().getDate();
		var start = getSimpleText("/all/month[@number="+ thisMonth +"]/start");
		// transfer text to int
		start = parseInt(start);
		var change = start + date - 1;
		// change bgcolor of cell
		document.getElementById(change).style.backgroundColor = "#bfbfbf";
	}
}

// current date
var d = new Date();

function day_setup() {
	// set title to today date
	var day = d.getDate();
	var months = ["Jan","Feb","March","April","May","Jun","July","Aug","Sep","Oct","Nov","Dec"];
	var m   = months[d.getMonth()];
	document.getElementById("day_date").innerHTML = day + " " + m;
	listDay(day, m);
}

//called for day
function listDay(day, month) {
	// clear list of prev day
	document.getElementById("list").innerHTML = "";

	var length = "" + day + "" + month + "_" + 0;
	
	for (var i = 1; i <= getCookie(length); i++) {
		var name = "" + day + "" + month + "_" + i;
		var task = getCookie(name);
		
		if ( task != "") {
			var item = document.createElement("li");
			var node = document.createTextNode(task);
			item.appendChild(node);

			var element = document.getElementById("list");
			element.appendChild(item);
		};
	};
}

function day_next() {
	d.setDate(d.getDate() + 1);
	day_setup();
}

function day_prev() {
	d.setDate(d.getDate() - 1);
	day_setup();
}

function day_today() {
	d = new Date();
	day_setup();
}

function edit_name() {
	var name = prompt("Please Enter your name");
	saveName(name, 366);
}

function saveName(cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires = "expires=" + d.toUTCString();
	document.cookie = "name" + "=" + cvalue + "; " + expires;
	
	// refresh name
	getName();
}