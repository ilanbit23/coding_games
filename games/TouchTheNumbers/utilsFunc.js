/**
 * Created by Ofir Nadav on 10/27/2015.
 */

var gCurrIntervalID = null;
var gCurrTime;

// Check if the given value is numeric
function isNumeric(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
}

// Generate random umber between given range
function randomNum(minRange, MaxRange){
    return (Math.floor(Math.random() * MaxRange) + minRange);
}

function stopTimer(){
    clearInterval(gCurrIntervalID);
}

// Set count-up timer
function timer() {
    stopTimer();
    var minutesLabel = document.getElementById("seconds");
    var secondsLabel = document.getElementById("miliSeconds");
    var totalSeconds = 0;

    gCurrIntervalID = setInterval(setTime, 10);

    function setTime()
    {
        ++totalSeconds;
        secondsLabel.innerHTML = pad(totalSeconds%60);
        minutesLabel.innerHTML = pad(parseInt(totalSeconds/60));
        gCurrTime = (minutesLabel.innerHTML +':'+ secondsLabel.innerHTML);
    }

    function pad(val)
    {
        var valString = val + "";
        if(valString.length < 2)
        {
            return "0" + valString;
        }
        else
        {
            return valString;
        }
    }
    return gCurrTime;
}

// fade out
function fadeOut(el){
    el.style.opacity = 1;

    (function fade() {
        if ((el.style.opacity -= .1) < 0) {
            el.style.display = "none";
        } else {
            requestAnimationFrame(fade);
        }
    })();
}

// fade in
function fadeIn(el, display){
    el.style.opacity = 0;
    el.style.display = display || "block";

    (function fade() {
        var val = parseFloat(el.style.opacity);
        if (!((val += .1) > 1)) {
            el.style.opacity = val;
            requestAnimationFrame(fade);
        }
    })();
}





