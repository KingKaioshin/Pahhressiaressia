const thoughtsList = document.querySelector('#thoughts-list ul');
const thoughtsInput = document.querySelector('#thoughts');
const submitButton = document.querySelector('#submit');
const storedThoughts = JSON.parse(localStorage.getItem('thoughts')) || [];

// Populate the list with stored thoughts
storedThoughts.forEach((thought) => {
  const listItem = document.createElement('li');
  const thoughtIcon = document.createElement('img');
  thoughtIcon.src = 'path/to/icon.png';
  const thoughtText = document.createElement('div');
  thoughtText.textContent = thought.text;
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
  listItem.appendChild(thoughtIcon);
  listItem.appendChild(thoughtText);
  listItem.appendChild(replyList);
  listItem.appendChild(replyForm);
  thoughtsList.appendChild(listItem);
});

// Handle form submission
submitButton.addEventListener('click', function() {
  const thoughtText = thoughtsInput.value;
  if (thoughtText === '') {
    return;
  }
  const thought = {
    text: thoughtText,
    replies: []
  };
  const listItem = document.createElement('li');
  const thoughtIcon = document.createElement('img');
  thoughtIcon.src = 'path/to/icon.png';
  const thoughtTextElem = document.createElement('div');
  thoughtTextElem.textContent = thoughtText;
  const replyList = document.createElement('ul');
  const replyForm = document.createElement('form');
  const replyInput = document.createElement('input');
  replyInput.setAttribute('type', 'text');
  replyInput.setAttribute('placeholder', 'Reply');
  const replyButton = document.createElement('button');
  replyButton.textContent = 'Submit';
  replyForm.appendChild(replyInput);
  replyForm.appendChild(replyButton);
  listItem.appendChild(thoughtIcon);
  listItem.appendChild(thoughtTextElem);
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

    // Update the corresponding thought's array of replies and save to local storage
    const thoughtIndex = storedThoughts.findIndex((t) => t.text === thought.text);
    if (thoughtIndex !== -1) {
      storedThoughts[thoughtIndex].replies.push(replyText);
      localStorage.setItem('thoughts', JSON.stringify(storedThoughts));
    }
  });
});

