// get dom elements
const cardContainer = document.querySelector(".card-container");
const output = document.getElementById("output");
const tarotTitle = document.getElementById("tarot-title");
const tarotContent = document.getElementById("tarot-content");

// active card
let activeCard = null;

// Fetch 3 random tarot cards from the Tarot API
fetch("https://tarotapi.dev/api/v1/cards/random?n=3")
  .then(response => response.json())
  .then(data => displayTarotCards(data.cards));

// Function to display tarot cards
function displayTarotCards(cards) {
  cardContainer.innerHTML = ""; // Clear existing content

  cards.forEach(card => {
    const cardElement = document.createElement("div");
    cardElement.className = "atvImg tarot-card";
    cardElement.dataset.name = card.name_short;

    // Blank card (no title or content inside)
    cardContainer.appendChild(cardElement);
  });

  atvImg(); // Initialize 3D effect
}

// Handle card clicks
document.querySelector(".card-container").addEventListener("click", e => {
  const target = e.target.closest(".tarot-card");
  if (!target) return;

  document.querySelectorAll(".atvImg").forEach(card => card.classList.remove("active"));
  target.classList.add("active");

  fetchTarotCardDetails(target.dataset.name);
});

// Fetch details for a specific tarot card
function fetchTarotCardDetails(cardName) {
  fetch(`https://tarotapi.dev/api/v1/cards/${cardName}`)
    .then(response => response.json())
    .then(data => {
      const card = data.card;
      document.getElementById("output").classList.remove("hidden");
      document.getElementById("tarot-title").textContent = card.name;
      document.getElementById("tarot-content").innerHTML = `
        <p><strong>Meaning:</strong> ${card.meaning_up}</p>
        <p><strong>Reversed Meaning:</strong> ${card.meaning_rev || "N/A"}</p>
        <p><strong>Description:</strong> ${card.desc}</p>
      `;
    });
}

// Handle touch events for mobile
function updateAtvForMobile() {
  document.querySelectorAll('.atvImg').forEach(card => {
    card.addEventListener('touchstart', () => card.style.transform = 'scale(0.97)');
    card.addEventListener('touchend', () => card.style.transform = '');
  });
}

updateAtvForMobile(); // Initialize touch events