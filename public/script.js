// Zodiac signs data
const signs = [
  "aries", "taurus", "gemini", "cancer", "leo", "virgo",
  "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces"
];

// Get DOM elements
const cardContainer = document.querySelector(".card-container");
const output = document.getElementById("output");
const horoscopeTitle = document.getElementById("horoscope-title");
const horoscopeContent = document.getElementById("horoscope-content");

// Current active sign
let activeSign = null;

// Create cards for each sign
signs.forEach(sign => {
  const card = document.createElement("div");
  card.className = `atvImg ${sign}`;
  card.dataset.sign = sign;
  
  // Title of the sign
  const title = document.createElement("h3");
  title.className = "sign-title";
  title.textContent = sign.charAt(0).toUpperCase() + sign.slice(1);
  
  // Add zodiac symbol (you can use appropriate unicode characters)
  const symbol = document.createElement("div");
  symbol.className = "sign-symbol";
  
  // Choose symbol based on sign
  switch(sign) {
    case "aries": symbol.innerHTML = "♈"; break;
    case "taurus": symbol.innerHTML = "♉"; break;
    case "gemini": symbol.innerHTML = "♊"; break;
    case "cancer": symbol.innerHTML = "♋"; break;
    case "leo": symbol.innerHTML = "♌"; break;
    case "virgo": symbol.innerHTML = "♍"; break;
    case "libra": symbol.innerHTML = "♎"; break;
    case "scorpio": symbol.innerHTML = "♏"; break;
    case "sagittarius": symbol.innerHTML = "♐"; break;
    case "capricorn": symbol.innerHTML = "♑"; break;
    case "aquarius": symbol.innerHTML = "♒"; break;
    case "pisces": symbol.innerHTML = "♓"; break;
  }
  
  card.appendChild(symbol);
  card.appendChild(title);
  cardContainer.appendChild(card);
});

// Initialize 3D effect
atvImg();

// Handle card clicks
cardContainer.addEventListener("click", (e) => {
  const target = e.target.closest(".atvImg");
  if (!target) return;
  
  // Update active card
  document.querySelectorAll(".atvImg").forEach(card => {
    card.classList.remove("active");
  });
  target.classList.add("active");
  
  const sign = target.dataset.sign;
  activeSign = sign;
  
  // Fetch horoscope data
  fetchHoroscope(sign);
});

// Fetch horoscope data from API
function fetchHoroscope(sign) {
  output.classList.remove("hidden");
  horoscopeTitle.textContent = `${sign.charAt(0).toUpperCase() + sign.slice(1)} - Loading...`;
  horoscopeContent.innerHTML = `<div class="loading"></div>`;
  
  const capitalizedSign = sign.charAt(0).toUpperCase() + sign.slice(1);
  
  fetch(`/api/horoscope?sign=${capitalizedSign}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Received data:', data); // Debug log
      
      let title = `${capitalizedSign} Horoscope`;
      horoscopeTitle.textContent = title;
      
      let content = '';
      if (data.description) {
        content += `<p>${data.description}</p>`;
      }
      if (data.current_date) {
        content += `<p><strong>Date:</strong> ${data.current_date}</p>`;
      }
      if (data.compatibility) {
        content += `<p><strong>Compatibility:</strong> ${data.compatibility}</p>`;
      }
      if (data.mood) {
        content += `<p><strong>Mood:</strong> ${data.mood}</p>`;
      }
      if (data.color) {
        content += `<p><strong>Color:</strong> ${data.color}</p>`;
      }
      if (data.lucky_number) {
        content += `<p><strong>Lucky Number:</strong> ${data.lucky_number}</p>`;
      }
      if (data.lucky_time) {
        content += `<p><strong>Lucky Time:</strong> ${data.lucky_time}</p>`;
      }
      
      horoscopeContent.innerHTML = content || 'No horoscope data available';
    })
    .catch(error => {
      console.error('Error:', error);
      horoscopeTitle.textContent = `${capitalizedSign} - Error`;
      horoscopeContent.innerHTML = `
        <p>Sorry, we couldn't retrieve the horoscope data at this time.</p>
        <p>Error: ${error.message}</p>
      `;
    });
}

// Update the atvImg function to handle touch events for mobile
function updateAtvForMobile() {
  const cards = document.querySelectorAll('.atvImg');
  
  cards.forEach(card => {
    // Add touch events for mobile
    card.addEventListener('touchstart', () => {
      card.style.transform = 'scale(0.97)';
    });
    
    card.addEventListener('touchend', () => {
      card.style.transform = '';
    });
  });
}

// Call this after the page loads
updateAtvForMobile();