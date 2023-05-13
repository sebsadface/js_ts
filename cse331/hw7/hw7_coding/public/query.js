const textElem = document.getElementById('query-text');
const minElem = document.getElementById('range-min');
const maxElem = document.getElementById('range-max');


function HandleQuery(evt) {
  evt.preventDefault();

  if (textElem.value.trim() === "")
    return;  // they didn't type anything...

  const url = "/find?text=" + encodeURIComponent(textElem.value) +
      '&min=' + encodeURIComponent(minElem.value) +
      '&max=' + encodeURIComponent(maxElem.value);
  fetch(url).then((val) => {
    if (val.status === 200) {
      return val.json();
    } else {
      return val.text();
    }
  }).then((val) => {
    if (typeof val === 'string') {
      ShowAnswer(`Server Error: ${val}`);
    } else if (!val.results || !Array.isArray(val.results)) {
      ShowAnswer("Error: response did not include 'results' or it was not an array");
    } else {
      ShowAnswer(`Answer: ${val.results.join(", ")}`);
    }
  }).catch((reason) => {
    ShowAnswer("Error: " + reason);
  });
}

function ShowAnswer(text) {
  const elem = document.getElementById("answer");
  elem.innerText = text;
}