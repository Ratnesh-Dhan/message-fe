"use client";
import socket from "@/socket";
import axios from "axios";
import React, { useEffect, useState } from "react";
// import { io } from "socket.io-client";

interface Message {
  text: string;
  sender: "me" | string;
}

const Chat = () => {
  // const socket = io("http://localhost:8080/");
  const [friend, setFriend] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [inputuser, setInputuser] = useState<string>("");
  const [inputText, setInputText] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>();

  //   const messages: Message[] = [];
  const test = async () => {
    try {
      const text = await axios.get("http://localhost:8080/funny");
      console.log(text.data);
    } catch (error) {
      console.log(error);
    }
  };

  const msgSend = () => {
    if (inputText !== "") {
      const newMessage: Message = {
        text: inputText,
        sender: "me",
      };
      setMessages((prev) => [...(prev || []), newMessage]);
      socket.emit("message", inputText);
      setInputText("");
    }
  };
  const handleEnterKey = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      msgSend();
    }
  };

  const connect = async (friend: string) => {
    try {
      const status = await axios.get(
        `http://localhost/status-check?friend=${friend}`
      );
      alert(status);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("useEffect running");
  }, []);

  useEffect(() => {
    setInputText("");
    setMessages([]);
    socket.emit("register_user", userId);
  }, [userId]);

  return (
    <React.Fragment>
      <div className="text-green-400 text-xl text-center font-semibold">
        <div>
          <button
            onClick={test}
            className="p-2 m-3 bg-red-500 text-white font-bold size-[15] text-center border border-whtie"
          >
            test button
          </button>
        </div>
        <div>
          <div>
            <input
              value={inputuser}
              onChange={(event) => {
                setInputuser(event.target.value);
              }}
            />
            <button
              onClick={() => {
                if (inputuser !== "") {
                  setUserId(inputuser);
                } else {
                  alert("Please enter a user ID");
                }
              }}
              className="p-2 m-3 bg-blue-500 text-white font-bold hover:bg-blue-400"
            >
              setYourId
            </button>
          </div>
          <div>
            <input
              value={friend}
              onChange={(event) => {
                setFriend(event.target.value);
              }}
            />
            <button
              onClick={() => {
                if (friend !== "") {
                  connect(friend);
                } else {
                  alert("Please enter a user ID");
                }
              }}
              className="p-2 m-3 bg-blue-500 text-white font-bold hover:bg-blue-400"
            >
              Connect
            </button>
          </div>
        </div>
        Person ur chatting
      </div>
      <div id="message-text-area" className="flex flex-col items-center mb-10">
        <div className="border border-white rounded-t-lg bg-[#202329] mt-10 mx-10 h-[600px] w-[800px] p-4 overflow-y-auto flex flex-col gap-4">
          {messages?.map((message, index) => (
            <div
              key={index}
              className={`max-w-[80%] p-3 rounded-lg ${
                message.sender === "me"
                  ? "bg-blue-500 text-white self-end"
                  : "bg-gray-200 text-black self-start"
              }`}
            >
              {message.text}
            </div>
          ))}
        </div>
        <div className="w-[800px] flex">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleEnterKey}
            className="w-full border h-20 text-slate-600 p-5 text-lg rounded-bl-lg overflow-y-auto resize-none whitespace-pre-wrap
                scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 
                hover:scrollbar-thumb-gray-500"
          />
          <button
            className="border rounded-br-lg bg-green-500 p-4 text-sm font-bold hover:bg-green-300 active:bg-blue-300"
            onClick={msgSend}
          >
            Send !
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Chat;
