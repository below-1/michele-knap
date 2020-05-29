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
    case 'KP_GEN':
      return {
        ...state,
        knapsack_convs: [...state.knapsack_convs, action.payload]
      }
    case 'NEW_KNAP_RESULT':
      return {
        ...state,
        knap_results: [...state.knap_results, action.payload]
      }
    case 'CLEAR_KNAP_RESULT':
      return {
        ...state,
        knap_results: []
      }
    default:
      return state;
  }
}