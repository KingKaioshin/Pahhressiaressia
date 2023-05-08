const thoughtsList = document.querySelector('#thoughts-list ul');
const thoughtsInput = document.querySelector('#thoughts');
const submitButton = document.querySelector('#submit');
const storedThoughts = JSON.parse(localStorage.getItem('thoughts')) || [];

// Populate the list with stored thoughts
storedThoughts.forEach((thought) => {
  const listItem = document.createElement('li');
  const thoughtText = document.createElement('div');
  thoughtText.textContent = thought.text;
  listItem.appendChild(thoughtText);
  thoughtsList.appendChild(listItem);
});

// Handle form submission
submitButton.addEventListener('click', function() {
  const thoughtText = thoughtsInput.value;
  if (thoughtText === '') {
    return;
  }
  const thought = {
    text: thoughtText
  };
  const listItem = document.createElement('li');
  const thoughtTextElem = document.createElement('div');
  thoughtTextElem.textContent = thoughtText;
  listItem.appendChild(thoughtTextElem);
  thoughtsList.appendChild(listItem);
  thoughtsInput.value = '';

  // Add the thought to stored thoughts and update local storage
  storedThoughts.push(thought);
  localStorage.setItem('thoughts', JSON.stringify(storedThoughts));
});

