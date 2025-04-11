// DOM
const cardContainer = document.querySelector('.card-container');
const output = document.getElementById('output');
const tarotTitle = document.getElementById('tarot-title');
const tarotContent = document.getElementById('tarot-content');

// Initialize Tarot
fetch('https://tarotapi.dev/api/v1/cards/random?n=3')
  .then(response => response.json())
  .then(data => displayTarotCards(data.cards))
  .catch(error => console.error('Error fetching cards:', error));

function displayTarotCards(cards) {
  cardContainer.innerHTML = '';
  
  cards.forEach(card => {
    const cardElement = document.createElement('div');
    cardElement.className = 'atvImg tarot-card';
    cardElement.dataset.name = card.name_short;
    cardContainer.appendChild(cardElement);
  });

  atvImg();
}

// Card Click
cardContainer.addEventListener('click', e => {
  const target = e.target.closest('.tarot-card');
  if (!target) return;

  document.querySelectorAll('.atvImg')
    .forEach(card => card.classList.remove('active'));
  target.classList.add('active');

  fetchTarotCardDetails(target.dataset.name);
});

// Fetch Card
function fetchTarotCardDetails(cardName) {
  fetch(`https://tarotapi.dev/api/v1/cards/${cardName}`)
    .then(response => response.json())
    .then(data => {
      const card = data.card;
      output.classList.remove('hidden');
      tarotTitle.textContent = card.name;
      tarotContent.innerHTML = `
        <p><span class="highlight">Meaning:</span> ${card.meaning_up}</p>
        <p><span class="highlight">Reversed Meaning:</span> ${card.meaning_rev || 'N/A'}</p>
        <p><span class="highlight">Description:</span> ${card.desc}</p>
      `;
    })
    .catch(error => console.error('Error fetching card details:', error));
}

// Mobile
function initializeMobileSupport() {
  document.querySelectorAll('.atvImg').forEach(card => {
    card.addEventListener('touchstart', () => card.style.transform = 'scale(0.97)');
    card.addEventListener('touchend', () => card.style.transform = '');
  });
}

// Initialize Mobile
initializeMobileSupport();