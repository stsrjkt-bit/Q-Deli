import React, { useState } from 'react';
import { FiSend, FiCamera, FiPaperclip } from 'react-icons/fi';
import Card from '../components/Card.jsx';
import ChatBubble from '../components/ChatBubble.jsx';

export default function ChatPage(){
  const [messages, setMessages] = useState([
    { id: 1, role: 'ai', text: 'Hi! I am the Q-Deli bunny. What would you like to learn today?' },
    { id: 2, role: 'user', text: 'Teach me trigonometry basics.' },
    { id: 3, role: 'ai', text: 'Great! We can start with sine, cosine, tangent, and unit circle.' },
  ]);
  const [text, setText] = useState('');
  const [topic, setTopic] = useState('teach');

  function send(){
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { id: Date.now(), role: 'user', text }]);
    setText('');
    setTimeout(() => {
      setMessages((prev) => [...prev, { id: Date.now()+1, role: 'ai', text: 'Thanks! I will prepare resources for: ' + topic }]);
    }, 300);
  }

  return (
    <div className="chat-container">
      <Card>
        <div className="row" style={{ gap: 8, alignItems:'center' }}>
          <span className="tag">Teach me this</span>
          <select value={topic} onChange={(e)=>setTopic(e.target.value)} className="input" style={{ maxWidth: 220 }}>
            <option value="teach">Teach me this</option>
            <option value="video">Find Video</option>
            <option value="quiz">Make a Quiz</option>
          </select>
        </div>
      </Card>
      {messages.map((m) => (
        <ChatBubble key={m.id} role={m.role} text={m.text} />
      ))}

      <div className="chat-input-bar">
        <div className="chat-input-inner">
          <button className="button" style={{ padding: 10, background:'#2a2a2a' }} aria-label="Attach image">
            <FiCamera />
          </button>
          <button className="button" style={{ padding: 10, background:'#2a2a2a' }} aria-label="Attach document">
            <FiPaperclip />
          </button>
          <input className="input" placeholder="Message Q-Deli" value={text} onChange={(e)=>setText(e.target.value)} onKeyDown={(e)=>{ if(e.key==='Enter') send(); }} />
          <button className="button" aria-label="Send" onClick={send}>
            <FiSend />
          </button>
        </div>
      </div>
    </div>
  );
}
