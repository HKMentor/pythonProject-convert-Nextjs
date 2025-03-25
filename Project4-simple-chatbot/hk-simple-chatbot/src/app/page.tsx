'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, Moon, Sun } from 'lucide-react';

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { text: "👋 Assalamu Alaikum! Welcome to **HK Chatbot**! 😊", sender: 'bot' },
    { text: "💡 Aap mujh se in topics par baat kar sakte hain:\n- Salam aur greetings 🤝\n- Aap ki hal chal / How are you? 😊\n- Mujhe kisne banaya? 👩‍💻\n- Alvida kehna (Goodbye) 👋", sender: 'bot' },
  ]);
  const [input, setInput] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 100);
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { text: input, sender: 'user' };
    setMessages([...messages, userMessage]);
    setInput('');
    
    setTimeout(() => {
      const botResponse = getBotResponse(input);
      setMessages((prev) => [...prev, { text: botResponse, sender: 'bot' }]);
    }, 1000);
  };

  const getBotResponse = (userInput: string) => {
    userInput = userInput.toLowerCase();
    if (["salam", "hello", "hi", "assalamu alaikum"].some(word => userInput.includes(word))) {
      return "🤗 Walaikum Assalam! Aap kaise hain? / How are you?";
    }
    if (["kase ho", "kesi ho", "ap kese ho", "ap kese hain"].some(word => userInput.includes(word))) {
      return "Main theek hoon, aap batao? 😊";
    }
    if (["yes i am fine", "me bhi thik hun","me thik hun", "me thk","shukar hai allah ka", "thik hun yr", "han thik", "i am fine", "thik hun"].some(word => userInput.includes(word))) {
      return "Oh that's great to hear! 😊";
    }
    if (["how are you", "how r u"].some(word => userInput.includes(word))) {
      return "I am fine! What about you? 😊";
    }
    if (["tumhe kisne banaya", "apko kisne banaya", "who created you"].some(word => userInput.includes(word))) {
      return "Mujhe **Hooria Khan** ne develop kiya hai! 😊";
    }
    if (["bye", "allah hafiz", "goodbye","dafa hojao","dafa"].some(word => userInput.includes(word))) {
      return "👋 Allah Hafiz! Phir milenge. / Goodbye! See you soon!";
    }
    if (["I love you", "i love hk ", "i hate you"," i love you more","kia ho tum"].some(word => userInput.includes(word))) {
      return "👋 shukiya, Tysm Jan";
    }
    if (["gali", "badtameezi", "abuse","Dafa", "Dafa hoja", "bakwas","Jahil","niklo", "jahil", "Chaly jao"].some(word => userInput.includes(word))) {
      return "🚫 Maaf kijiye, lekin yahan tameez aur izzat zaroori hai. 😊";
    }
    return "🤔 Hmm... Yeh samajh nahi aya! Kya aap kuch aur kehna chahtay hain? 😊";
  };

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} max-w-md mx-auto p-4 shadow-lg rounded-lg mt-10 border border-gray-200 transition-all`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">HK Chatbot 🤖</h2>
        <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-md bg-gray-300 dark:bg-gray-700">
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
      <div className="h-64 overflow-y-auto p-2 border border-gray-300 rounded-md bg-gray-100 dark:bg-gray-800">
        {messages.map((msg, index) => (
          <motion.div 
            key={index} 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            className={`p-2 my-1 max-w-xs rounded-lg ${msg.sender === 'bot' ? 'bg-blue-500 text-white' : 'bg-green-500 text-white self-end'}`}
          >
            {msg.text}
          </motion.div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex mt-3 gap-2">
        <input 
          type="text" 
          className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white" 
          placeholder="Type your message..." 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend} className="bg-blue-500 text-white p-2 rounded-md">
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
