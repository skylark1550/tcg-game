const baseUrl = 'http://localhost:3000/api'; // Update to your server's API URL

function showCreateAccount() {
  document.getElementById('login-container').style.display = 'none';
  document.getElementById('create-account-container').style.display = 'block';
}

function showLogin() {
  document.getElementById('create-account-container').style.display = 'none';
  document.getElementById('login-container').style.display = 'block';
}

function login() {
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;

  fetch(`${baseUrl}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })
  .then(response => response.json())
  .then(data => {
    if (data.user) {
      alert(data.message);
      showDeck(data.user);
    } else {
      alert('Login failed');
    }
  })
  .catch(error => alert('Error:', error));
}

function createAccount() {
  const username = document.getElementById('create-username').value;
  const password = document.getElementById('create-password').value;

  fetch(`${baseUrl}/create-account`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })
  .then(response => response.json())
  .then(data => {
    if (data.message === 'Account created successfully') {
      alert(data.message);
      showLogin();
    } else {
      alert('Error:', data.message);
    }
  })
  .catch(error => alert('Error:', error));
}

function showDeck(user) {
  document.getElementById('deck-container').style.display = 'block';
  document.getElementById('cards-container').innerHTML = '';
  user.deck.forEach(card => {
    const cardDiv = document.createElement('div');
    cardDiv.textContent = card.name;
    document.getElementById('cards-container').appendChild(cardDiv);
  });
}

function buyPack() {
  const username = 'exampleUser'; // Get from session/localStorage or login data
  const newCard = { name: 'Monster Card' }; // Replace with actual card generation logic

  fetch(`${baseUrl}/update-deck`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, newCard })
  })
  .then(response => response.json())
  .then(data => {
    alert(data.message);
    showDeck(data.deck);
  })
  .catch(error => alert('Error:', error));
}