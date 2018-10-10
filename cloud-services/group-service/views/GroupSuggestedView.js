import Group from './Group'

export default class GroupSuggestedView extends Group {
  static init({ conn, id, dao, Models, requester }) {
    const that = Group.init.bind(this)({ conn, id, dao, Models })
    that.requester = requester
    return that
  }

  async like() {
    const suggested = await this.dao.getListElement('suggested', 'group', this.requester.id())
    this.requester.like(this, suggested ? suggested.status : null)
  }

  async dislike() {
    this.requester.dislike(this)
  }
}
