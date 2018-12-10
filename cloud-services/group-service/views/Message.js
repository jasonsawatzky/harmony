export default class Message {
  constructor({ sender, text, time }) {
    this.sender = sender
    this.messageText = text
    this.time = time
  }

  text() {
    return this.messageText
  }
}
