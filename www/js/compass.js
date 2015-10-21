// Global variable
var img = null,
	needle = null,
	ctx = null,
	gWatchID = null;
	document.addEventListener("deviceready", onDeviceReady, false);

function clearCanvas() {
	ctx.clearRect(0, 0, 200, 200); // clear canvas
}

function draw(value) {
	clearCanvas(); //Clean the canvas
	ctx.drawImage(img, 0, 0); // Draw the compass onto the canvas
	ctx.save(); // Save the current drawing state
	ctx.translate(100, 100); // Now move across and down half the 
	ctx.rotate(value * (Math.PI / 180)); // Rotate around this point
	ctx.drawImage(needle, -100, -100); // Draw the image back and up
	ctx.restore(); // Restore the previous drawing state
}

function init() {
	// Grab the compass element
	var canvas = document.getElementById('compass');

	// Canvas supported?
	if (canvas.getContext('2d')) {
		ctx = canvas.getContext('2d');

		// Load the needle image
		needle = new Image();
		needle.src = 'img/needle.png';

		// Load the compass image
		img = new Image();
		img.src = 'img/compass.png';

	} else {
		alert("Canvas not supported!");
	}
}

function onError(compassError) {
	alert('Compass error: ' + compassError.code);
}

function stopWatch() {
    if (gWatchID) {
        navigator.compass.clearWatch(watchID);
        gWatchID = null;
    }
}

function startWatch() {
    var options = { frequency: 10 };
    if (!gWatchID) {
        gWatchID = navigator.compass.watchHeading(onSuccess, onError, options);
    }
}

function onDeviceReady() {
	init();
    startWatch();
}

function onSuccess(heading) {
    var value = Math.round(heading.magneticHeading);
    var element = document.getElementById("infoCompass");
    element.innerHTML = "Valor: " + value +"°";
    draw(value);
}