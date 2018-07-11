import _ from 'lodash';
import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions';

export default function(state = {}, action) {
  switch(action.type) {
  case DELETE_POST:
    return _.omit(state, action.payload) // it looks to the object > if it is has the key of the second argument > delete it

  case FETCH_POST:
    // with the ... state you don't want to throw away the previous posts that you have fetched
    return { ...state, [action.payload.data.id]: action.payload.data } // with the square notation you createa new key equal to the value included in the brackets
  case FETCH_POSTS:
    const arrayToObject = (array, keyField) =>
     array.reduce((obj, item) => {
       obj[item[keyField]] = item
       return obj
     }, {})
     return arrayToObject(action.payload.data, 'id')
  default:
    return state;
  }
}
