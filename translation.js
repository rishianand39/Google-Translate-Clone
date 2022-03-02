function sourcelan() {
    let source = document.querySelector("#source-lan").value;
    return source;
}

function targetlan() {
    let target = document.querySelector("#target-lan").value;

    return target;
}

function record() {
    var recognition = new webkitSpeechRecognition();
    recognition.lang = "en-GB";
    recognition.onresult = function(event) {
        // console.log(event);
        document.getElementById("input-text").value = event.results[0][0].transcript;
        translateText();
    };
    recognition.start();
}

async function translateText() {
    let input = document.getElementById("input-text").value;
    if (input == "") {
        document.getElementById("translated-text").innerHTML = "Enter Something first!";
        return;
    }

    try {
        let res = await fetch("https://libretranslate.de/translate", {
            method: "POST",
            body: JSON.stringify({
                q: input,
                source: sourcelan(),
                target: targetlan(),
                format: "text",
            }),

            headers: {
                "Content-Type": "application/json",
                // "Content-Type": "application/x-www-form-urlencoded"
            },
        });

        let data = await res.json();
        document.getElementById("translated-text").innerHTML = "";
        document.getElementById("translated-text").innerHTML = data.translatedText;
    } catch (error) {
        console.log("error", error);
    }
}

// Handling debouncing
let timerId;

function debounce(func, delay) {
    if (timerId) {
        clearTimeout(timerId);
    }

    timerId = setTimeout(function() {
        func();
    }, delay);
}