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
    <div className="flex flex-col h-full bg-dark-grey border-4 border-purple-500 rounded-lg p-4">
      <ScrollArea className="flex-grow overflow-auto mb-4">
        <div className="space-y-2">
          {messages.map((msg, index) => (
            <div key={index} className={`p-2 rounded-lg ${msg.sender === 'user' ? 'bg-purple-300' : 'bg-grey-700'}`}>
              {msg.text}
            </div>
          ))}
          <div ref={messageEndRef} />
        </div>
      </ScrollArea>
      <div className="flex space-x-2">
        <Input className="flex-grow rounded-full bg-transparent border-purple-500 text-white" value={input} onChange={handleInput} />
        <Button className="bg-purple-500 rounded-full" onClick={handleSend}>Send</Button>
      </div>
      <Button className="absolute bottom-4 right-4 rounded-full bg-purple-500" onClick={scrollToTop}>
        Top
      </Button>
    </div>
  );
};

export default ChatInterface;