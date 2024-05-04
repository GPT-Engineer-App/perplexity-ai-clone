import React, { useState, useRef } from 'react';
import { Button, Input, ScrollArea } from '@/components/ui';
import { useGroqLlama3, useTavilySearch } from '@/hooks';

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messageEndRef = useRef(null);
  const { sendMessage } = useGroqLlama3();
  const { search } = useTavilySearch();

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { text: input, sender: 'user' };
    setMessages([...messages, userMessage]);
    setInput('');

    const botResponse = await sendMessage(input);
    setMessages((prevMessages) => [...prevMessages, { text: botResponse, sender: 'bot' }]);
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInput = (event) => {
    setInput(event.target.value);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col h-screen bg-black p-4">
      <div className="flex-1 overflow-hidden rounded-lg border-4 border-purple-500 bg-gray-800 p-2">
        <ScrollArea>
          {messages.map((msg, index) => (
            <div key={index} className={`p-2 rounded-lg ${msg.sender === 'user' ? 'bg-purple-500' : 'bg-gray-700'}`}>
              {msg.text}
            </div>
          ))}
          <div ref={messageEndRef} />
        </ScrollArea>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Input
          className="flex-1 rounded-full bg-gray-700 text-white"
          value={input}
          onChange={handleInput}
          placeholder="Type your message..."
        />
        <Button className="bg-purple-500 hover:bg-purple-600" onClick={handleSend}>
          Send
        </Button>
      </div>
      <Button className="absolute bottom-4 right-4 rounded-full bg-purple-500 p-2" onClick={scrollToTop}>
        ↑
      </Button>
    </div>
  );
};

export default ChatInterface;