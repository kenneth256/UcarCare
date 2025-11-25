"use client";

import { useState, useEffect, useRef } from "react";
import { Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const chatNotVisibleVariants = {
  hidden: { opacity: 0, scale: 0.1, x: 50 },
  visible: { opacity: 1, scale: 1, x: 0 },
};

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatVisible, setChatVisible] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await response.json();

      const assistantMessage: Message = {
        role: "assistant",
        content: data.messages[0]?.content || "No response",
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Collapsed Bubble */}
      {!chatVisible && (
        <motion.div
          variants={chatNotVisibleVariants}
          initial="hidden"
          animate="visible"
          transition={{
            duration: 0.4,
            ease: "easeOut",
            repeat: Infinity,
            repeatType: "mirror",
            repeatDelay: 2,
          }}
          className="fixed bottom-7 right-5 z-50 bg-blue-600 text-white px-4 py-3 rounded-full shadow-lg cursor-pointer flex items-center gap-2 hover:bg-blue-700 transition-colors"
          onClick={() => setChatVisible(true)}
        >
          <Bot className="w-5 h-5" />
          <span className="text-sm font-medium">
            Hello, how may I assist you today?
          </span>
        </motion.div>
      )}

      {/* Expanded Chat */}
      {chatVisible && (
        <div className="fixed bottom-7 right-5 w-[360px] max-h-[500px] z-50 flex flex-col shadow-lg rounded-3xl overflow-hidden bg-white transition-all duration-300">
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
            <div>
              <p className="text-sm opacity-90">Ask me anything about cars!</p>
            </div>
            <button
              onClick={() => setChatVisible(false)}
              className="text-white text-xl font-bold"
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 bg-gray-50 overflow-y-auto space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 mt-10">
                <Bot className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Start a conversation about cars!</p>
              </div>
            )}

            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-2 ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.role === "assistant" && (
                  <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[70%] p-3 rounded-2xl ${
                    message.role === "user"
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-white text-gray-800 shadow-md rounded-bl-none"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
                {message.role === "user" && (
                  <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center shrink-0">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex gap-2 justify-start">
                <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white p-3 rounded-2xl rounded-bl-none shadow-md">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-400" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="bg-white p-3 flex gap-2 border-t border-gray-200"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about cars..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
            <Button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="rounded-full px-4 bg-blue-500 hover:bg-blue-600 disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
            </Button>
          </form>
        </div>
      )}
    </>
  );
}
