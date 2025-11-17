// Hearts reveal messages
function toggleMessage(element) {
  let msg = element.querySelector(".hidden-message");
  msg.style.display = msg.style.display === "block" ? "none" : "block";
}

// Open When letters
function openLetter(box) {
  let body = box.querySelector(".letter-body");
  body.style.display = body.style.display === "block" ? "none" : "block";
}
