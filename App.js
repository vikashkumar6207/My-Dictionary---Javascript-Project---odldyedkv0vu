
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const historyButton = document.getElementById('historyButton');
const card = document.getElementById('card');

let dictionaryHistory = [];

searchButton.addEventListener('click', searchWord);
historyButton.addEventListener('click', showHistory);

async function searchWord() {
  const word = searchInput.value.trim();
  
  if (word === '') {
    cardItem.innerHTML ='Please enter a word to search.';
    return;
  }
  
  const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
  const data = await response.json();
  console.log(data);
  if (data.title === 'No Definitions Found') {
    cardItem.innerHTML = 'No definitions found for the word.';
    return;
  }
  
  const definition = data[0].meanings[0].definitions[0].definition;
  
  dictionaryHistory.push({ word, definition });
  
  displayDefinition(word, definition);
}

function displayDefinition(word, definition) {
  card.innerHTML = '';
  
    const cardItem = document.createElement('div');
    cardItem.classList.add('card-item');
    cardItem.innerHTML = `<strong>${word}</strong>: ${definition} <br>
                          <button class="delete-btn" onclick="deleteEntry(${word})">Delete</button>`;
    
    card.appendChild(cardItem);
}

function showHistory() {
  card.innerHTML = '';
  
  dictionaryHistory.forEach((item, index) => {
    const cardItem = document.createElement('div');
    cardItem.classList.add('card-item');
    cardItem.innerHTML = `<strong>${item.word}</strong>: ${item.definition}
    <button class="delete-btn" onclick="deleteEntry(${index})">Delete</button>`;
    
    card.appendChild(cardItem);
  });
}

function deleteEntry(index) {
  dictionaryHistory.splice(index, 1);
  showHistory();
}
