var highlighted = {};
var currentUrl = window.location.href;

console.log("Loaded");

var url = window.location.href;
var urlArray = Array.from(url);

var urlPart1 = url.substring(8, 12);
var urlMinusPart1 = url.replace(urlPart1, "");

var urlPart2 = url.substring(19, 23);
var urlMinusPart2 = urlMinusPart1.replace(urlPart2, "");

var urlPart3 = url.substring(24, 32);
var urlFinalPart = urlMinusPart2.replace(urlPart3, "");

function addStr(str, index, stringToAdd) {
  var real = str.substring(0, index) + stringToAdd + str.substring(index, str.length);
  console.log(real);
}

addStr(urlFinalPart, 13, ".");

function handleDoubleClick(e) {
  var x = event.clientX;
  var y = event.clientY;

  var scrollY = window.scrollY; // Value of scroll Y in px
  var popupTopPosition = +y + scrollY;

  if (window.getSelection) {
    var selectedText = window.getSelection();
    var query = selectedText;

    var apiBaseUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/";
    var fullApiUrl = apiBaseUrl.concat(query);
    console.log(fullApiUrl);

    async function fetchAndDisplayMeaning() {
      const res = await fetch(fullApiUrl);
      const data = await res.json();
      console.log(data);

      let definitionsText = "";
      for (i = 0; i < data[0].meanings.length; i++) {
        definitionsText += +i + 1 + ":-" + " " + data[0].meanings[i].definitions[0].definition + '\r\n' + '\r\n';
        console.log(definitionsText);
        console.log(data[0].meanings.length);
      }

      var meaningPopup = document.createElement("div");
      meaningPopup.setAttribute("class", "displayzx");

      var contentArray = [query,
        "meaning:", definitionsText,
      ];

      if (!data.length) {
        meaningPopup.innerText = ' No result found. Please search for another word';
      }

      meaningPopup.innerText = contentArray.join('\r\n') + '\r\n';
      meaningPopup.style.display = "block";
      document.body.appendChild(meaningPopup);
      meaningPopup.style.position = "absolute";
      meaningPopup.style.left = x - 100 + 'px';
      meaningPopup.style.top = popupTopPosition + 20 + 'px';
      meaningPopup.style.height = 'min(100px)';
      meaningPopup.style.height = 'max(100%)';
      meaningPopup.style.height = 'auto';
      meaningPopup.style.width = '500px';
      meaningPopup.style.background = "rgba(255,221,170,1)";
      meaningPopup.style.color = "#000";
      meaningPopup.style.fontSize = '15px';
      meaningPopup.style.borderRadius = "3%";

      document.addEventListener("dblclick", (e) => {
        if (e.target.offsetParent != meaningPopup) {
          meaningPopup.style.display = "none";
        }
      });
    }
    fetchAndDisplayMeaning()
  }
}

document.addEventListener("dblclick", handleDoubleClick);
