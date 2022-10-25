import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import axios from "axios";
function App() {
  const ref = useRef();
  const [message, setMessage] = useState("");
  const [currentMsgId, setCurrentMsgId] = useState("");
  const [receiverState, setReceiverState] = useState(true);

  // const formSubmit = (e) => {
  //   e.preventDefault();
  //   axios
  //     .post(
  //       `https://graph.facebook.com/v14.0/106183675617980/messages`,
  //       {
  //         messaging_product: "whatsapp",
  //         recipient_type: "individual",
  //         to: "923156566058",
  //         type: "text",
  //         text: {
  //           preview_url: false,
  //           body: message,
  //         },
  //       },
  //       {
  //         headers: {
  //           Authorization:
  //             "Bearer EAALy5OfzdYwBAMZARHd9K2IZBXOxW7ZCoBJsmiCMgeaSHI1VO039IJ34CKWgaNIZBT4ryXEs0vLJvOpfjdXNpGuQd8DNjFgZCladDoKmd407LmHg5e4WtdfbUInQmmk8aSkakOBus969yfg1KL7HEQpnUSXnS4ZBdtiuz4jyGIiMiSqOf7iFtixrog39tscSqkumxz8AAYawZDZD",
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       let li = document.createElement("li");
  //       li.style.backgroundColor = "yellow";
  //       li.textContent = message;
  //       ref.current.append(li);
  //     });
  // };

  // const getMessage = () => {
  //   axios.get(process.env.REACT_APP_API_URL + "/message").then((resp) => {
  //     if (
  //       resp.data.result[0].message.entry[0].changes[0].value.messages[0].id !==
  //       localStorage.getItem("prevId")
  //     ) {
  //       localStorage.setItem(
  //         "prevId",
  //         resp?.data?.result[0]?.message?.entry[0]?.changes[0]?.value
  //           ?.messages[0]?.id
  //       );
  //       let li = document.createElement("li");
  //       li.style.backgroundColor = "lightgray";
  //       li.textContent =
  //         resp.data.result[0].message.entry[0].changes[0].value.messages[0].text.body;
  //       ref.current.append(li);
  //     }
  //   });
  // };

  // useEffect(() => {
  //   localStorage.clear();
  //   const timer = setInterval(() => {
  //     getMessage();
  //   }, 1000);
  // }, []);

  const downloadFile = async (evt) => {
    evt.preventDefault();
    await axios({
      url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      method: "GET",
      responseType: "blob",
      headers: { 
        'Authorization': 'Bearer EAALy5OfzdYwBAFAsLMy8yd9hd7AyotOau8DEtagNWCimsHtbGOZCkpCqWwm1kG1K36DUzlUt3VlmGb1TQ8ONZCyZABmfxLMc81TlMnwDbpv5cn0E7FMwf9giZBvvwNFYRAsfe4ZANWZBmtqQtBjrSLVnESeLwxfqsYj59ZCRg1UOMRoPhNVeU6pqNTPbtDPqxApIZBJ8t4T8wQZDZD'
      }
    }).then((response) => {
      console.log(response);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "file.pdf");
      document.body.appendChild(link);
      link.click();
    });
  };
  return (
    <>
      {/* 
      <form onSubmit={formSubmit} id="form" action="">
        <input id="input" onChange={(e) => setMessage(e.target.value)} value={message} type="text" name="Text" />
        <button type="submit">Send by </button>
      </form>  
      <ul style={{listStyle:"none"}} id="messages" ref={ref}></ul> */}
      <div>
        <button onClick={(evt) => downloadFile(evt)}>Download</button>
      </div>
    </>
  );
}

export default App;
