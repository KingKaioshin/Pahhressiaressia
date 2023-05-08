const thoughtsList = document.querySelector('#thoughts-list ul');
const thoughtsInput = document.querySelector('#thoughts');
const submitButton = document.querySelector('#submit');
const storedThoughts = JSON.parse(localStorage.getItem('thoughts')) || [];

// Populate the list with stored thoughts
storedThoughts.forEach((thought) => {
  const listItem = document.createElement('li');
  const thoughtText = document.createElement('div');
  thoughtText.textContent = thought.text;
  const timestamp = document.createElement('span');
  timestamp.textContent = new Date(thought.timestamp).toLocaleString();
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  const replyList = document.createElement('ul');
  thought.replies.forEach((reply) => {
    const replyItem = document.createElement('li');
    replyItem.textContent = reply;
    replyList.appendChild(replyItem);
  });
  const replyForm = document.createElement('form');
  const replyInput = document.createElement('input');
  replyInput.setAttribute('type', 'text');
  replyInput.setAttribute('placeholder', 'Reply');
  const replyButton = document.createElement('button');
  replyButton.textContent = 'Submit';
  replyForm.appendChild(replyInput);
  replyForm.appendChild(replyButton);
  listItem.appendChild(thoughtText);
  listItem.appendChild(timestamp);
  listItem.appendChild(deleteButton);
  listItem.appendChild(replyList);
  listItem.appendChild(replyForm);
  thoughtsList.appendChild(listItem);

  // Delete thought when delete button is clicked
  deleteButton.addEventListener('click', function() {
    const thoughtIndex = storedThoughts.findIndex((t) => t.timestamp === thought.timestamp);
    if (thoughtIndex !== -1) {
      storedThoughts.splice(thoughtIndex, 1);
      localStorage.setItem('thoughts', JSON.stringify(storedThoughts));
      listItem.remove();
    }
  });
});

// Handle form submission
submitButton.addEventListener('click', function() {
  const thoughtText = thoughtsInput.value;
  if (thoughtText === '') {
    return;
  }
  const thought = {
    text: thoughtText,
    timestamp: Date.now(),
    replies: []
  };
  const listItem = document.createElement('li');
  const thoughtTextElem = document.createElement('div');
  thoughtTextElem.textContent = thoughtText;
  const timestamp = document.createElement('span');
  timestamp.textContent = new Date(thought.timestamp).toLocaleString();
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  const replyList = document.createElement('ul');
  const replyForm = document.createElement('form');
  const replyInput = document.createElement('input');
  replyInput.setAttribute('type', 'text');
  replyInput.setAttribute('placeholder', 'Reply');
  const replyButton = document.createElement('button');
  replyButton.textContent = 'Submit';
  replyForm.appendChild(replyInput);
  replyForm.appendChild(replyButton);
  listItem.appendChild(thoughtTextElem);
  listItem.appendChild(timestamp);
  listItem.appendChild(deleteButton);
  listItem.appendChild(replyList);
  listItem.appendChild(replyForm);
  thoughtsList.appendChild(listItem);
  thoughtsInput.value = '';

  // Add the thought to stored thoughts and update local storage
  storedThoughts.push(thought);
  localStorage.setItem('thoughts', JSON.stringify(storedThoughts));

  // Handle reply submission for this thought
  replyForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const replyText = replyInput.value;
    if (replyText === '') {
      return;
    }
    const replyItem = document.createElement('li');
    replyItem.textContent = replyText;
    replyList.appendChild(replyItem);
    replyInput.value = '';
