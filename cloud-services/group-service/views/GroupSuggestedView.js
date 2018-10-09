import Group from './Group'

export default class GroupSuggestedView extends Group {
  static init({ conn, id, dao, Models, requester }) {
    const that = Group.init.bind(this)({ conn, id, dao, Models })
    that.requester = requester
    return that
  }

  async like() {
    this.requester.setSuggestedStatus(this, 'like')
  }

  async dislike() {
    this.requester.setSuggestedStatus(this, 'dislike')
  }
}
