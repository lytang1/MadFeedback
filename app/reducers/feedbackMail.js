import * as types from '../constant/actionTypes';
import { Record, fromJS } from 'immutable';

const Data = Record({
  isSuccess: false,
  isFetching: false,
  errors: new (Record({
    message: null,
  })),
});
let initialState = new Data;


export default function sendMail(state = initialState, action) {
  switch (action.type) {
    case types.SEND_MAIL_SUCCESS:
      return state.set('isSuccess', true)
      			  		.set('isFetching', false)
                  .setIn(['errors','message'], null)
    case types.SEND_MAIL_REQUEST:
    	return state.set('isFetching',true)
    case types.SEND_MAIL_FAILURE:
    	return state.setIn(['errors', 'message'], action.error)
					.set('isFetching', false)
    default:
      return state
  }
}

