import store from '../store'
const utils = {
  hasTask: (task) => {
    if(store.state.user.obj.permissions.hasOwnProperty("*") && store.state.user.obj.permissions["*"]["*"]) {
      return true
    }
    return store.state.user.obj.permissions && store.state.user.obj.permissions.special && store.state.user.obj.permissions.special.special && store.state.user.obj.permissions.special.special.id && store.state.user.obj.permissions.special.special.id[task]
  }
}
export default utils