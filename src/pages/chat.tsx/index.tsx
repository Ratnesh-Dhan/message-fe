import React from "react";

interface Message {
  text: string;
  sender: "me" | "other";
}

const Chat = () => {
  const messages: Message[] = [];

  return (
    <React.Fragment>
      <div className="text-green-400 text-xl text-center font-semibold">
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
            name="my input"
            className="w-full border h-20 text-slate-600 p-5 text-lg rounded-bl-lg overflow-y-auto resize-none whitespace-pre-wrap
            scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 
            hover:scrollbar-thumb-gray-500"
          />
          <button className="border rounded-br-lg bg-green-500 p-4 text-sm font-bold hover:bg-green-300 active:bg-blue-300">
            Send !
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Chat;
