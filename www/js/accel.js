// The watch id variable is set as a
// reference to the current 'watchAcceleration'
var accelWatchID = null;
var before_axisX = 0;
var before_axisY = 0;
var before_axisZ = 0;
var after_axisX = 0;
var after_axisY = 0;
var after_axisZ = 0;

var totalSteps = 0;

// Watch the acceleration at regular
// intervals as set by the frequency
function startWatchAccel() {

    // Set the frequency of updates
    // from the acceleration
    var options = {
        frequency : 500
    };

    // Assign watchAcceleration to the accelWatchID variable
    // and pass through the options array
    accelWatchID = navigator.accelerometer.watchAcceleration(onSuccessAccel, onErrorAccel,
            options);
}

// Stop watching the acceleration
function stopWatchAccel() {

    if (accelWatchID) {
        navigator.accelerometer.clearWatch(accelWatchID);
        accelWatchID = null;

        var element = document.getElementById('info');

        element.innerHTML = 'No longer watching your acceleration.';

    }

}

// Run after successful transaction
function onSuccessAccel(acceleration) {
    var element = document.getElementById('axisInfo');
    
    //updatePedometer();
    
    var stepForce = ((acceleration.x * acceleration.x) + (acceleration.y * acceleration.y) + (acceleration.z * acceleration.z)) / (9.78 * 9.78);

    element.innerHTML = 'Información de los ejes:'
            +'Acceleration X: ' + acceleration.x + '<br />'
            + 'Acceleration Y: ' + acceleration.y + '<br />'
            + 'Acceleration Z: ' + acceleration.z + '<br />'
            + '<br><br>'
            + 'Step Force: ' + stepForce;

    if (stepForce < 0.7 || stepForce > 1.3){
        totalSteps++;
    }

    var stepsDiv = document.getElementById('steps');
    stepsDiv.innerHTML = "pasos: " + totalSteps;

}

function updatePedometer(){
    /*
    var differenceAxisX = Math.abs(after_axisX - before_axisX);
    var differenceText = document.getElementById("difference");
    differenceText.innerHTML = "Difference X: " + differenceAxisX;

    var stepText = document.getElementById("step");
    
    if ( differenceAxisX > 1.5 ) {
        totalSteps++;
    }
    stepText.innerHTML = "pasos: " + totalSteps;
    */
}

// Run if we face an error
// obtaining the accelerometer data
function onErrorAccel() {

    // Handle any errors we may face
    var element = document.getElementById('info');
    element.innerHTML = 'Sorry, I was unable to access the acceleration data.';
}

//Function to restart the pedometer
function restartAccel(){
    if ( !accelWatchID ) {
        var options = {
            frequency : 500
        };

        accelWatchID = navigator.accelerometer.watchAcceleration(onSuccessAccel, onErrorAccel,
            options);
    }

    totalSteps = 0;
}