"use client";

import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, User, Bot, Loader2, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Message {
    role: "user" | "assistant";
    content: string;
    type?: "string" | "choose";
    options?: string[];
}

export function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Persistence: Load messages from localStorage on mount
    useEffect(() => {
        const savedMessages = localStorage.getItem("carl_chat_history");
        if (savedMessages) {
            try {
                setMessages(JSON.parse(savedMessages));
            } catch (e) {
                console.error("Failed to load chat history:", e);
            }
        } else {
            // Initial greeting
            const initialGreeting: Message[] = [{
                role: "assistant",
                content: "Hello! I'm Carl, your assistant for Al Tamimi Designing. How can I help you today?",
                type: "choose",
                options: ["Our Services", "Shop Location", "Get a Quote", "Contact Us", "Other"]
            }];
            setMessages(initialGreeting);
        }
    }, []);

    // Scroll to bottom whenever messages change
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
        if (messages.length > 0) {
            localStorage.setItem("carl_chat_history", JSON.stringify(messages));
        }
    }, [messages]);

    const sendMessage = async (content: string) => {
        if (!content.trim() || isLoading) return;

        const newUserMessage: Message = { role: "user", content };
        const updatedMessages = [...messages, newUserMessage];
        setMessages(updatedMessages);
        setInput("");
        setIsLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: updatedMessages.map(m => ({
                        role: m.role,
                        content: m.content
                    }))
                }),
            });

            const data = await response.json();

            if (data.error) throw new Error(data.error);

            setMessages(prev => [...prev, {
                role: "assistant",
                content: data.message,
                type: data.type || "string",
                options: data.options || []
            }]);
        } catch (error) {
            console.error("Chat Error:", error);
            setMessages(prev => [...prev, {
                role: "assistant",
                content: "Sorry, I had a bit of trouble. Could you try again or contact us directly?",
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const resetChat = () => {
        const initial: Message[] = [{
            role: "assistant",
            content: "Hello! I'm Carl, your assistant for Al Tamimi Designing. How can I help you today?",
            type: "choose",
            options: ["Our Services", "Shop Location", "Get a Quote", "Contact Us", "Other"]
        }];
        setMessages(initial);
        localStorage.removeItem("carl_chat_history");
    };

    const lastMessage = messages[messages.length - 1];
    const isChooseType = lastMessage?.role === "assistant" && lastMessage?.type === "choose";

    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="mb-4 w-[350px] sm:w-[400px] h-[500px] bg-white rounded-3xl shadow-2xl border border-neutral-100 flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-4 bg-brand-primary text-white flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                                    <Bot className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold leading-tight">Carl</h3>
                                    <p className="text-[10px] text-white/70">Al Tamimi Assistant</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={resetChat}
                                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                                    title="Reset Conversation"
                                >
                                    <RotateCcw className="h-5 w-5" />
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>
                        </div>

                        {/* Chat Body */}
                        <div
                            ref={scrollRef}
                            className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-50/50"
                        >
                            {messages.map((m, i) => (
                                <div
                                    key={i}
                                    className={cn(
                                        "flex gap-3 max-w-[85%]",
                                        m.role === "user" ? "ml-auto flex-row-reverse" : ""
                                    )}
                                >
                                    <div className={cn(
                                        "h-8 w-8 rounded-full flex-none flex items-center justify-center text-white",
                                        m.role === "user" ? "bg-brand-accent" : "bg-brand-primary"
                                    )}>
                                        {m.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                                    </div>
                                    <div className={cn(
                                        "p-3 rounded-2xl text-sm leading-relaxed",
                                        m.role === "user"
                                            ? "bg-brand-accent text-white rounded-tr-none shadow-sm"
                                            : "bg-white border border-neutral-100 text-neutral-800 rounded-tl-none shadow-sm"
                                    )}>
                                        {m.role === "assistant" ? (
                                            <div className="prose prose-sm max-w-none prose-p:leading-relaxed prose-pre:bg-neutral-100 prose-pre:p-2 prose-pre:rounded-lg prose-strong:text-brand-primary prose-ul:list-disc prose-ul:ml-4 text-neutral-800">
                                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                                    {m.content}
                                                </ReactMarkdown>
                                            </div>
                                        ) : (
                                            m.content
                                        )}
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex gap-3">
                                    <div className="h-8 w-8 rounded-full bg-brand-primary flex items-center justify-center text-white">
                                        <Bot className="h-4 w-4 animate-pulse" />
                                    </div>
                                    <div className="bg-white border border-neutral-100 p-3 rounded-2xl rounded-tl-none shadow-sm">
                                        <Loader2 className="h-4 w-4 animate-spin text-neutral-400" />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Options / Input Footer */}
                        <div className="p-4 bg-white border-t border-neutral-100">
                            {isChooseType ? (
                                <div className="flex flex-wrap gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                    {lastMessage.options?.map((opt, i) => (
                                        <button
                                            key={i}
                                            onClick={() => sendMessage(opt)}
                                            className="px-4 py-2 text-xs font-medium border border-brand-primary/30 text-brand-primary rounded-full hover:bg-brand-primary hover:text-white transition-all duration-300 shadow-sm"
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        sendMessage(input);
                                    }}
                                    className="flex gap-2"
                                >
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder="Type your message..."
                                        className="flex-1 bg-neutral-100 text-neutral-800 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-brand-primary/50 transition-all outline-none"
                                    />
                                    <Button
                                        type="submit"
                                        size="icon"
                                        disabled={!input.trim() || isLoading}
                                        className="rounded-xl h-10 w-10 bg-brand-primary"
                                    >
                                        <Send className="h-4 w-4" />
                                    </Button>
                                </form>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "h-16 w-16 rounded-full flex items-center justify-center shadow-xl transition-all duration-300",
                    isOpen ? "bg-brand-primary rotate-90" : "bg-brand-primary hover:bg-brand-primary/90"
                )}
            >
                {isOpen ? <X className="h-8 w-8 text-white" /> : <MessageCircle className="h-8 w-8 text-white" />}
            </motion.button>
        </div>
    );
}
