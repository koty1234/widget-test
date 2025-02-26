import React, { useState, useEffect } from 'react';
import { FaPaperPlane } from 'react-icons/fa';

const ChatComponent = ({ newMessage, isMaximized, setIsMaximized, sendMessage, existingMessages }) => {
  const [messages, setMessages] = useState(() => {
    console.log('existingMessages', existingMessages);
    return existingMessages.length ? existingMessages : [{ content: '', role: 'assistant' }];
  });

  const [newMessageState, setNewMessageState] = useState('');
  const [typingComplete, setTypingComplete] = useState(false);
  const starterQuestions = [
    "Ask about our services",
    "Are you open on Sunday?",
    "Do you take insurance?",
    "How can I book an appointment?"
  ];

  useEffect(() => {
    if(messages.length === 1) {
    const textToType = "Hi There, I can help you find what you're looking for, just let me know...";
    let index = 0;

    // Type one character every 30ms
    const interval = setInterval(() => {
      setMessages((prevMessages) => {
        // Clone the array
        const updated = [...prevMessages];
        // The last message is the one we're "typing" into
        const lastMsg = updated[updated.length - 1];

        // Add the next character if index is within bounds
        if (index < textToType.length) {
          lastMsg.text += textToType[index];
          updated[updated.length - 1] = lastMsg;
        }

        return updated;
      });

      index++;
      if (index >= textToType.length) {
        clearInterval(interval);
        setTypingComplete(true);
      }
    }, 30);

    return () => clearInterval(interval);
}
  }, []);

  useEffect(() => {
    if (newMessage) {
      setMessages((prev) => [...prev, { content: newMessage.content, role: newMessage.role }]);
    }
  }, [newMessage]);

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
    localStorage.setItem('chatTimestamp', new Date().getTime());
  }, [messages]);

  // Send user message
  const handleSendMessage = () => {
    if (newMessageState.trim()) {
      const userMessage = { content: newMessageState, role: 'user' };
      setMessages((prev) => [...prev, userMessage]);
      setNewMessageState('');
      
        sendMessage(newMessageState);
      
      if(messages.length > 4) {
        setIsMaximized(true);
      }
    }
  };

  const handleInputChange = (e) => {
    setNewMessageState(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleStarterClick = (question) => {
    setMessages((prev) => [...prev, { content: question, role: 'user' }]);
    
    // Send starter question to medium widget
    sendMessage(question);
  };

  // Styles
  const chatContainerStyle = {
    height: isMaximized ? '600px' : '400px',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '8px',
    overflow: 'hidden',
    fontFamily: 'sans-serif',
  };

  const chatMessagesContainerStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
    overflowY: 'auto',
  };

  const starterButtonStyle = {
    margin: '5px',
    padding: '10px 15px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    display: 'inline-block',
  };

  const messageStyle = (sender) => ({
    alignSelf: sender === 'user' ? 'flex-end' : 'flex-start',
    backgroundColor: sender === 'user' ? '#007BFF' : '#e7edf2',
    color: sender === 'user' ? '#fff' : '#333',
    padding: '10px',
    borderRadius: '10px',
    margin: '5px 0',
    maxWidth: '70%',
    fontSize: '13px', // smaller text
  });

  const inputContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    borderTop: '1px solid #ccc',
    padding: '8px 12px',
    backgroundColor: '#fff',
  };

  const inputStyle = {
    flex: 1,
    padding: '8px',
    borderRadius: '4px',
    border: 'none',
    outline: 'none',
    marginRight: '8px',
    fontSize: '14px',
    boxSizing: 'border-box',
  };

  const iconStyle = (isActive) => ({
    color: isActive ? '#007BFF' : '#ccc',
    cursor: isActive ? 'pointer' : 'not-allowed',
    fontSize: '18px',
  });

  return (
    <div style={chatContainerStyle}>
      {/* Messages */}
      <div style={chatMessagesContainerStyle}>
        {messages.map((message, index) => (
          <div key={index} style={messageStyle(message.role)}>
            {message.content}
          </div>
        ))}

        {typingComplete && messages.filter(msg => msg.role === 'user').length === 0 && (
          <>
            {starterQuestions.map((question, index) => (
              <button
                key={index}
                style={starterButtonStyle}
                onClick={() => handleStarterClick(question)}
              >
                {question}
              </button>
            ))}
          </>
        )}
      </div>

      {/* Input area */}
      <div style={inputContainerStyle}>
        <input
          type="text"
          value={newMessageState}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          style={inputStyle}
          placeholder="Type your message..."
        />
        <FaPaperPlane
          style={iconStyle(!!newMessageState.trim())}
          onClick={newMessageState.trim() ? handleSendMessage : null}
        />
      </div>
    </div>
  );
};

export default ChatComponent;