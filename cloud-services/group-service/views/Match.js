import { AbstractView, Dao } from 'service-components'
import MatchModel from '../match-model'
import Message from './Message'
import GroupMemberView from './GroupMemberView'

let dao
let conn

const Models = MatchModel

export default class Match extends AbstractView {
  constructor({ conn, id, dao }) {
    super({ conn, id, dao, Models })
  }
  async conversation() {
    const conversation = await this.dao.get('conversation')

    if (!conversation) return []

    return conversation.map(message => new Message({ text: message.text}))
  }

  async message(text) {
    const message = {
      // sender: this.requester.id(),
      text,
      time: 'temp'
    }
    await this.dao.set('conversation', messages => messages.push(message))
    return new Message({ text })
  }

  async groups() {
    const groups = await this.dao.get('groups')

    return !groups ? [] : groups.map(id => GroupMemberView.init({ conn: this.conn, id }))
  }
}
