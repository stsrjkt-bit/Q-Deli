import React from 'react';

export default function ChatBubble({ role = 'ai', text, avatar }){
  const isUser = role === 'user';
  return (
    <div className={isUser ? 'chat-row user' : 'chat-row'}>
      {!isUser && (
        <div className="avatar" aria-hidden>
          {avatar || '🐰'}
        </div>
      )}
      <div className={isUser ? 'bubble user' : 'bubble ai'}>
        {text}
      </div>
      {isUser && <div style={{ width: 40 }} />}
    </div>
  );
}
