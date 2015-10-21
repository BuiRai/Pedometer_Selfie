// Global variable
var img = null,
	needle = null,
	ctx = null,
	compassWatchID = null;
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

function onErrorCompass(compassError) {
	alert('Compass error: ' + compassError.code);
}

function stopWatchCompass() {
    if (compassWatchID) {
        navigator.compass.clearWatch(watchID);
        compassWatchID = null;
    }
}

function startCompass() {
    var options = { frequency: 100 };
    if (!compassWatchID) {
        compassWatchID = navigator.compass.watchHeading(onSuccessCompass, onErrorCompass, options);
    }
}

function onDeviceReady() {
	init();
    startCompass();
}

function onSuccessCompass(heading) {
    var value = Math.round(heading.magneticHeading);
    var element = document.getElementById("infoCompass");
    element.innerHTML = "Valor: " + value +"°";
    draw(value);
}