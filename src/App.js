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
      `https://graph.facebook.com/v14.0/106183675617980/messages`,
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
        Authorization: 'Bearer EAALy5OfzdYwBAA5ZCmMueSBnijkz7aYHNLfZCizwLXerVRHX7FNvsbwxVZCg9DTMtJBep4G0f2CDE6zjEMZCvzQiElwpoQwoK6axjhoTucDXcITLQyMINGoRit3EjXMLUFG8JrpYY3qK2qffxWorgUdBCVYxkybiOuLD1RRHz1yhbu6liNZBpqvTXJ4ej6K0E5lZAhFaFpLQZDZD',
      }
    })
      .then(res => {
        let li = document.createElement("li");
        li.style.backgroundColor = 'yellow';
        li.textContent = message;
        ref.current.append(li);
      })



  }

  const getMessage = () => {
      axios.get(process.env.REACT_APP_API_URL + "/message").then(resp => {
     
      if ( resp.data.result[0].message.entry[0].changes[0].value.messages[0].id !== localStorage.getItem("prevId")) {
        localStorage.setItem("prevId" , resp?.data?.result[0]?.message?.entry[0]?.changes[0]?.value?.messages[0]?.id)
        let li = document.createElement("li");
        li.style.backgroundColor = 'lightgray';
        li.textContent = resp.data.result[0].message.entry[0].changes[0].value.messages[0].text.body;
        ref.current.append(li);
      }
    })

  }

  useEffect(() => {
    localStorage.clear()
    const timer =  setInterval(() => {
      getMessage();
    }, 1000);

  }, [])
  return (
    <>

      <form onSubmit={formSubmit} id="form" action="">
        <input id="input" onChange={(e) => setMessage(e.target.value)} value={message} type="text" name="Text" />
        <button type="submit">Send by </button>
      </form>
      <ul style={{listStyle:"none"}} id="messages" ref={ref}></ul>
    </>
  );
}

export default App;
