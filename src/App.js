import React, { useState, useRef, useEffect } from "react"
import './App.css';
import axios from "axios"
function App() {
  const ref = useRef();
  const [message, setMessage] = useState("");
  const [currentMsgId, setCurrentMsgId] = useState("")
  const [receiverState, setReceiverState] = useState(true);

  const formSubmit = (e) => {
    e.preventDefault();
    axios.post(
      `${process.env.REACT_APP_API_FACEBOOK_API}/messages `,
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
        Authorization: process.env.FACEBOOK_API_KEY,
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
  useEffect(() => {
    if (receiverState === true) {
      setInterval(() => {
        axios.get(process.env.REACT_APP_API_URL + "/message").then(resp => {
          if (resp.result.message.entry[0].changes[0].value.messages[0] && resp.result.message.entry[0].changes[0].value.messages[0].id !== currentMsgId) {
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
  }, [currentMsgId, receiverState])
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
