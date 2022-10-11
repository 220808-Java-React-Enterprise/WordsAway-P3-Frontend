export default class Chat {
  id: string
  messages: string[]

  constructor(id: string) {
    this.id = id
    this.messages = []
  }
}
