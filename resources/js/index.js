const serverURL = "https://it3049c-chat.fly.dev/messages";

const nameInput = document.getElementById("my-name-input");
const messageInput = document.getElementById("my-message");
const sendButton = document.getElementById("send-button");
const chatBox = document.getElementById("chat");

function formatMessage(message) {
  const time = new Date(message.timestamp);
  const formattedTime = `${time.getHours()}:${time.getMinutes()}`;

  if (myName === message.sender) {
      return `
          <div class="mine messages">
              <div class="message">${message.text}</div>
              <div class="sender-info">${formattedTime}</div>
          </div>
      `;
  } else {
      return `
          <div class="yours messages">
              <div class="message">${message.text}</div>
              <div class="sender-info">${message.sender} ${formattedTime}</div>
          </div>
      `;
  }
}

async function fetchMessages() {
    const response = await fetch(serverURL);
    return response.json();
  }

async function updateMessagesInChatBox() {
  const messages = await fetchMessages();
  let formattedMessages = messages.map(formatMessage).join("");
  chatBox.innerHTML = formattedMessages;
}

async function sendMessages(username, text) {
  const newMessage = {
      sender: username,
      text: text,
      timestamp: new Date()
  };

      await fetch(serverURL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newMessage)
      });
}

sendButton.addEventListener("click", function(event) {
  event.preventDefault();
  const sender = nameInput.value;
  const message = myMessage.value;
  if (sender && message) {
    sendMessages(sender, message);
    myMessage.value = "";
  }
});

updateMessages();
const MILLISECONDS_IN_TEN_SECONDS = 10000;
setInterval(updateMessagesInChatBox, MILLISECONDS_IN_TEN_SECONDS);