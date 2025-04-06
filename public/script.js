document.getElementById('get-horoscope').addEventListener('click', () => {
    const sign = document.getElementById('sign-select').value;
  
    fetch('/get-horoscope', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sign: sign })
    })
    .then(response => response.json())
    .then(data => {
      document.getElementById('output').innerHTML = `
        <p><strong>Date Range:</strong> ${data.date_range}</p>
        <p><strong>Description:</strong> ${data.description}</p>
        <p><strong>Compatibility:</strong> ${data.compatibility}</p>
        <p><strong>Mood:</strong> ${data.mood}</p>
        <p><strong>Color:</strong> ${data.color}</p>
        <p><strong>Lucky Number:</strong> ${data.lucky_number}</p>
      `;
    })
    .catch(err => {
      document.getElementById('output').innerText = 'Error fetching horoscope.';
      console.error(err);
    });
  });
  