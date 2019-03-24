console.log(`Connected to JS`)


const queryForm = document.querySelector(".queryForm");
const input = document.querySelector(".queryInput");
const forecast = document.querySelector(".forecast");

queryForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = input.value;
  forecast.textContent = `Loading...`

  fetch(`http://localhost:8080/weather?address=${location}`).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        // Forecast obtained through get route in app.js 
        forecast.textContent = data.Forecast;

      }

    })
  })

})