import React, { useState, useRef, useEffect } from "react"
import './App.css';
import axios from "axios"
function App() {
  const ref = useRef();
  const [message, setMessage] = useState("");
  const [currentMsgId,setCurrentMsgId] = useState("")
  const [receiverState, setReceiverState]  =useState(true);

  const formSubmit = (e) => {
    e.preventDefault();
    axios.post(
      `https://graph.facebook.com/v14.0/106183675617980/messages `,
      {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: "923156566058",
        type: "text",
        text: {
          preview_url: false,
          body: message
        }
      }, {
      headers: {
        Authorization: 'Bearer EAALy5OfzdYwBAOtpiDLHsZAs2zZBtj5l4TL2TwvJYuAHndLXR0GdXTIbi5apyH49DB4SdIQWVgYDaWhnDkBFUeZAZATzFV8papOoHHWZBlLhLT6Y5zkBNtkVa9YguRNFaX2isT1aJNQHvwHnr9yoRLYpQqmzShEY6N5ExLnzZACCV7C1KJUbEusMB49Gb0QqQwSqO6jfdtvQZDZD',
        ContentType: "application/json"
      }
    })
      .then(res => {
        let li = document.createElement("li");
        li.style.backgroundColor = 'lightgray';
        li.textContent = message;
        ref.current.append(li);
      })
  }
  useEffect(()=>{
    if(receiverState === true){
      setInterval(() => {
        axios.get("https://different-tan-pocketbook.cyclic.app/api/message").then(resp=>{
          if(resp.result.message.entry[0].changes[0].value.messages[0] && resp.result.message.entry[0].changes[0].value.messages[0].id !== currentMsgId ){
            setCurrentMsgId(resp.result.message.entry[0].changes[0].value.messages[0].id);
            let li = document.createElement("li");
            li.style.backgroundColor = 'lightgray';
            li.textContent = resp.result.message.entry[0].changes[0].value.messages[0].text.body;
            ref.current.append(li);
          }
        })
      }, 1000);
      setReceiverState(false)
    }
  },[currentMsgId, receiverState])
  return (
    <>
      
      <form onSubmit={formSubmit} id="form" action="">
        <input id="input" onChange={(e) => setMessage(e.target.value)} value={message} type="text" name="Text" />
        <button type="submit">Send by </button>
      </form>
      <ul id="messages" ref={ref}></ul>
    </>
  );
}

export default App;
