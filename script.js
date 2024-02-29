$(document).ready(function () {
  function sendMessage(message, sender) {
    var messages = JSON.parse(localStorage.getItem("messages")) || [];
    messages.push({
      text: message,
      timestamp: moment().format("MMMM Do YYYY, h:mm:ss a"),
      sender: sender,
    });
    localStorage.setItem("messages", JSON.stringify(messages));
  }

  function displayMessages() {
    var messages = JSON.parse(localStorage.getItem("messages")) || [];
    messages.forEach(function (message) {
      if (message.sender === "user") {
        $("#chat-panel").append(
          '<div class="row no-gutters"><div class="col-md-3 offset-md-9 "><div class="chat-bubble user"></span>' +
            message.text +
            "<span></div></div></div>"
        );
      } else {
        $("#chat-panel").append(
          '<div class="row no-gutters"><div class="col-md-3"><div class="chat-bubble reply"><span>' + message.text +
            "</span></div></div></div>"
        );
      }
    });
  

    $("#chat-panel").append(
      '<div class="row justify-content-center"><div class="col-md-3"><div class="chat-bubble user text-center"><span class="message-new">Leatest</span></div></div></div>'
    );
  }
  
  
  var startTime =
    localStorage.getItem("startTime") ||
    moment().format("MMMM Do YYYY, h:mm: a");
  $("#startTimeDisplay").text("started at: " + startTime);

  $("#restart-session").click(function () {
    localStorage.removeItem("startTime");
    localStorage.removeItem("messages");
    location.reload();
  });

  displayMessages();

  function handleUserMessage(message) {
    var sendTime = moment().format("h:mm a");
    var receiveTime = moment().format("h:mm a");

    $("#chat-panel").append(
      '<div class="row no-gutters"><div class="col-md-3 offset-md-9"><div class="chat-bubble user"><span class=message>' +
        message +
        '</span><div class="message-time">' + sendTime + '</div></div></div></div>'
    );

    sendMessage(message, "user");

    var replyMessage = " " + message;

    $("#chat-panel").append(
      '<div class="row no-gutters"><div class="col-md-3"><div class="chat-bubble reply"><span class="message-alt">' +
        replyMessage +
        '</span><div class="message-time">' + receiveTime + '</div></div></div></div>'
    );

    sendMessage(replyMessage, "reply");
  }

  $("#send-button").click(function () {
    var message = $("#message-input").val().trim();
    if (message !== "") {
      handleUserMessage(message);
      $("#message-input").val("");
    }
  });

  $("#message-input").keypress(function (e) {
    if (e.which === 13) {
      var message = $("#message-input").val().trim();
      if (message !== "") {
        handleUserMessage(message);
        $("#message-input").val("");
      }
    }
  });
});

function scrollToBottom() {
  var chatPanelContainer = document.getElementById("chat-panel-container");
  chatPanelContainer.scrollTop = chatPanelContainer.scrollHeight;
}
