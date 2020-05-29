export default function Reducer (state, action) {
  let need_save = false
  let next_state;
  switch (action.type) {
    case 'ADD_ITEM':
      next_state = {
        ...state,
        items: [...state.items, action.payload]
      }
      need_save = true
      break
    case 'DELETE_ITEM':
      next_state = {
        ...state,
        items: state.items.filter((item, index) => index != action.payload)
      }
      need_save = true
      break
    case 'UPDATE_ITEM':
      next_state = {
        ...state,
        items: state.items.map((item, index) => {
          if (index == action.payload.index) {
            return {
              ...item,
              ...action.payload.item
            }
          }
          return item
        })
      }
      need_save = true
      break
    case 'UPDATE_HYPER':
      next_state = {
        ...state,
        hyper: action.payload
      }
      need_save = true
      break
    case 'KP_GEN':
      next_state = {
        ...state,
        knapsack_convs: [...state.knapsack_convs, action.payload]
      }
      break
    case 'NEW_KNAP_RESULT':
      next_state = {
        ...state,
        knap_results: [...state.knap_results, action.payload]
      }
      break
    case 'CLEAR_KNAP_RESULT':
      next_state = {
        ...state,
        knap_results: []
      }
      break
    case 'KNAP_RUNNING':
      next_state = {
        ...state,
        running: true
      }
      break
    case 'KNAP_DONE':
      next_state = {
        ...state,
        running: false
      }
      break
    default:
      next_state = state;
      break;
  }
  if (need_save) {
    localStorage.setItem('mich.state', JSON.stringify({
      hyper: next_state.hyper,
      items: next_state.items
    }))
  }
  return next_state
}