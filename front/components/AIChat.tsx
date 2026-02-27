import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Loader2 } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { PROFILE } from '../constants';

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'model', content: string}[]>([
    { role: 'model', content: `Hola, soy el asistente virtual de ${PROFILE.name}. ¿En qué puedo ayudarte hoy?` }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMsg = inputValue;
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    const response = await sendMessageToGemini(messages, userMsg);

    setMessages(prev => [...prev, { role: 'model', content: response || "Error de conexión." }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 md:w-96 bg-slate-900 border border-slate-700 rounded-lg shadow-2xl overflow-hidden animate-slide-up flex flex-col h-[500px]">
          {/* Header */}
          <div className="bg-slate-800 p-4 flex items-center justify-between border-b border-slate-700">
            <div className="flex items-center space-x-2">
              <div className="bg-arch-accent p-1.5 rounded-full">
                <Bot size={16} className="text-black" />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">Asistente IA</h3>
                <span className="text-xs text-green-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span> Online
                </span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/95">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-lg text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-arch-accent text-slate-900 font-medium rounded-tr-none' 
                    : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-800 p-3 rounded-lg rounded-tl-none border border-slate-700">
                  <Loader2 size={16} className="animate-spin text-arch-accent" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-3 bg-slate-800 border-t border-slate-700 flex gap-2">
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Pregunta sobre proyectos, costos..." 
              className="flex-1 bg-slate-900 text-white text-sm rounded-md px-3 py-2 border border-slate-700 focus:outline-none focus:border-arch-accent transition-colors"
            />
            <button 
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="bg-arch-accent text-slate-900 p-2 rounded-md hover:bg-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2 bg-arch-accent hover:bg-yellow-600 text-slate-900 font-bold py-3 px-4 rounded-full shadow-lg transition-all transform hover:scale-105"
      >
        <span className={`${isOpen ? 'hidden' : 'hidden md:block'}`}>Preguntar a IA</span>
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>
    </div>
  );
};

export default AIChat;
