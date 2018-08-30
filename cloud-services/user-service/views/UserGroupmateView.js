import User from './User'

export default class UserGroupmateView extends User {
  setDetail() {
    console.log(`You aren't authorized to edit Groupmates`)
    return null
  }

  groups() {
    console.log(`You aren't authorized to access your Groupmate's groups`)
    return null
  }

  group() {
    console.log(`You aren't authorized to access your Groupmate's groups`)
    return null
  }

  startGroup() {
    console.log(`You aren't authorized to edit your Groupmates`)
    return null
  }
}
