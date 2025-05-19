document.getElementById('subscribeForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const city = document.getElementById('city').value.trim();
  const frequency = document.getElementById('freq').value;

  const formData = new FormData();
  formData.append('email', email);
  formData.append('city', city);
  formData.append('frequency', frequency);


  const resultDiv = document.getElementById('formResponse');

  fetch(`/subscription/subscribe`, {
    method: 'POST',
    body: formData,
  })
    .then(res => {
      if (!res.ok){
        return res.json().then(errData => {
          throw new Error(`${errData.statusCode}: ${errData.message}`);
        });
      }
      return res.json()
    })
    .then(data => {
      resultDiv.innerHTML = `
        <div class="success">
          <h3>${data.statusCode}: ${data.message}</h3>
        </div>
      `;
    })
    .catch(err => {
      resultDiv.innerHTML = `
        <div class="error">
          <h3>${err}</h3>
        </div>
      `;
    });

  this.reset();
});


document.getElementById('checkWeatherBtn').addEventListener('click', function(e) {

  const city = document.getElementById('cityWeather').value.trim();

  const resultDiv = document.getElementById('weatherResponse');

  fetch(`/weather?city=${city}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => {
      if (!res.ok){
        return res.json().then(errData => {
          throw new Error(`${errData.statusCode}: ${errData.message}`);
        });
      }
      return res.json()
    })
    .then(data => {
      resultDiv.innerHTML = `
        <div class="success">
          <h3>Temperature: ${data.temperature}</h3>
          <h3>Humidity: ${data.humidity}</h3>
          <h3>Description: ${data.description}</h3>
        </div>
      `;
    })
    .catch(err => {
      resultDiv.innerHTML = `
        <div class="error">
          <h3>${err}</h3>
        </div>
      `;
    });

})


document.getElementById('confirmTokenBtn').addEventListener('click', function(e) {

  const token = document.getElementById('token').value.trim();

  window.location.href=`/subscription/confirm/${token}`;

})

document.getElementById('unsubscribeBtn').addEventListener('click', function(e) {

  const token = document.getElementById('token').value.trim();

  window.location.href=`/subscription/unsubscribe/${token}`;

})