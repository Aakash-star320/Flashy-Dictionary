async function fetchData() {
  var searchButton = document.getElementById("button-addon2");

  function handleSearch() {
    var formControls = document.getElementsByClassName("form-control");

    var resultContainer = document.getElementById("date");
    var searchTerm = formControls[0].value;
    var apiBaseUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/";
    var fullApiUrl = apiBaseUrl.concat(searchTerm);

    async function fetchMeaning() {
      const res = await fetch(fullApiUrl);

      const data = await res.json();
      if (!data.length) {

        document.getElementById("date").innerHTML = ' No result found.Please search for another word';

      }

      let audioHtml = `<audio controls><source src="${data[0].phonetics[0].audio}"> </audio>`;
      /*if (!aud.length){
        document.getElementById("date").innerHTML = ' No audios found.';
  
      }*/
      console.log(audioHtml);

      let definitionsText = "";
      for (i = 0; i < data[0].meanings.length; i++) {

        definitionsText += +i + 1 + ":-" + " " + data[0].meanings[i].definitions[0].definition + '\r\n' + '\r\n';

        console.log(definitionsText);

      }

      var contentArray = [searchTerm,
        "meaning:", definitionsText,

      ];
      document.getElementById("date").innerText = contentArray.join('\r\n') + '\r\n';
      document.getElementById("date").innerHTML += audioHtml;

    }
    fetchMeaning();

  }

  searchButton.addEventListener("click", handleSearch);

}
fetchData();
