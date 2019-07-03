const defaultState = {
  focused: false,
  mouseIn: false,
  list: [],
  currentPage: 1,
  totalPage: 1,
};

export default (state = defaultState, action) => {
  switch(action.type) {
    case "search_focus":
      return state.set('focused', true)
    case "search_blur":
      return state.set('focused', false)
    case "change_list":
      return state.merge({
        'list': action.payload,
        'totalPage': Math.ceil(action.payload.length/10)
      })
    case "mouse_enter":
      return state.set('mouseIn', true)
    case "mouse_leave":
      return state.set('mouseIn', false)
    case "change_page":
      return state.set('currentPage', action.payload)
    default:
      return state
  }
}