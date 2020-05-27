export default function Reducer (state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        items: [...state.items, action.payload]
      }
    case 'DELETE_ITEM':
      return {
        ...state,
        items: state.items.filter((item, index) => index != action.payload)
      }
    case 'UPDATE_ITEM':
      return {
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
    case 'UPDATE_HYPER':
      return {
        ...state,
        hyper: action.payload
      }
    case 'KNAPSACK_EVENT':
      return {
        ...state,
        knapsack_events: [...state.knapsack_events, action.payload]
      }
    default:
      return state;
  }
}