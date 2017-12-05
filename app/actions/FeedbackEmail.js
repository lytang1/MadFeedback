import * as types from '../constant/actionTypes';

export function sendMail(mail, email=[]){
  return (dispatch, getState) => {
    const ENDPOINT = 'https://api.sendgrid.com/v3/mail/send';
    let body = {};
    body = {
      personalizations:[
      {to:[{email:"erika@workwithmad.com"},{email:'manny@workwithmad.com'},
          {email:"kit@workwithmad.com"},{email:'parker@workwithmad.com'}]}] ,
      from: {email:'feedbackmad@gmail.com'},
      subject: 'Feedback mail',
      content: [{type:"text/plain",value:`${mail}`}]};

    const config   = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ {YOUR_API_KEY},// go to link https://app.sendgrid.com/ and register a free account
      },
      body: JSON.stringify(body)
    }
    dispatch(sendMailRequest());
    return fetch(ENDPOINT, config)
    .then(response => {
      let json = response.json();
      if(response.status >= 200 && response.status < 300) {
        dispatch(sendMailSuccess())
      } else {
        return json.then(err => Promise.reject(err));
      }
      return json;
    })
    .catch((err) => {
      // alert('error message'+ JSON.stringify(err))
      dispatch(sendMailFailure(err))
    })
  }
}
  
export function sendMailRequest(){
  return {
    type:types.SEND_MAIL_REQUEST
  }
}
export function sendMailSuccess() {
  return {
    type: types.SEND_MAIL_SUCCESS,
  }
}
export function sendMailFailure(error) {
  return {
    type: types.SENT_MAIL_FAILURE,
    error
  }
}

