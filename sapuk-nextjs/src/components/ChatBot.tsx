"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Loader2,
  MessageSquare,
  X,
  AlertCircle,
  RefreshCw,
  Send,
  Info,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { TextStreamChatTransport } from "ai";
import { ChatDialog } from "@/components/ChatDialog";

// --- message text extractor (fixed for step-start junk) ---
const stripLeadingJSON = (s: string) => {
  if (!s || typeof s !== "string") return s;
  const trimmed = s.trim();
  if (!trimmed.startsWith("{")) return s;
  const endIdx = trimmed.indexOf("}");
  if (endIdx === -1) return s;
  const maybeJSON = trimmed.slice(0, endIdx + 1);
  try {
    JSON.parse(maybeJSON);
    return trimmed.slice(endIdx + 1).trim();
  } catch {
    return s;
  }
};

const getMessageText = (message: any): string => {
  if (!message) return "";
  try {
    if (Array.isArray(message.parts)) {
      return message.parts
        .map((p: any) => {
          if (!p) return "";
          const raw = p.text ?? p.content ?? (typeof p === "string" ? p : "");
          return raw ? stripLeadingJSON(String(raw)) : "";
        })
        .filter(Boolean)
        .join("");
    }
    if (typeof message.content === "string")
      return stripLeadingJSON(message.content);
    if (Array.isArray(message.content)) {
      return message.content
        .map((c: any) =>
          typeof c === "string" ? stripLeadingJSON(c) : String(c)
        )
        .join("");
    }
    if (message.text) return stripLeadingJSON(message.text);
    if (message.output && typeof message.output === "string")
      return stripLeadingJSON(message.output);
  } catch (err) {
    console.error("getMessageText error:", err, message);
  }
  return "";
};

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { messages, sendMessage, regenerate, stop, error } = useChat({
    transport: new TextStreamChatTransport({ api: "/api/chat" }),
  });

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const messagesLengthRef = useRef(messages.length);

  useEffect(() => {
    if (messages.length > 0) {
      console.log("useChat messages (last 3):", messages.slice(-3));
    }
  }, [messages]);

  useEffect(() => {
    if (messages.length > messagesLengthRef.current) {
      setIsLoading(false);
    }
    messagesLengthRef.current = messages.length;
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleChatSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;
    setIsLoading(true);
    try {
      await sendMessage({ text: input });
      setInput("");
    } catch (err) {
      console.error("sendMessage error:", err);
      setIsLoading(false);
    }
  };

  const handleStop = () => {
    stop();
    setIsLoading(false);
  };

  return (
    <>
      {/* Floating button (stays in place, fades in/out) */}
      <div className="fixed bottom-16 right-6 z-40">
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <Button
                onClick={() => setIsOpen(true)}
                className="p-6 border border-zinc-500 rounded-full shadow-lg bg-zinc-100 hover:bg-zinc-200 shadow-zinc-500"
              >
                <MessageSquare className="h-6 w-6 sm:h-8 sm:w-8 text-zinc-900" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Chat Window */}
      <div className="fixed bottom-16 right-6 z-40">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col bg-white rounded-2xl shadow-xl w-[350px] sm:w-[400px] h-[500px] sm:h-[600px] overflow-hidden border"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 border-b">
                <div className="flex items-center gap-2">
                  <h2 className="text-sm sm:text-base font-semibold">
                    Support Chat
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 sm:h-8 sm:w-8 hover:bg-gray-100 hover:text-gray-900"
                    onClick={() => setIsDialogOpen(true)}
                    aria-label="About support chat"
                  >
                    <Info className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="h-6 w-6 sm:h-8 sm:w-8 hover:bg-gray-100 hover:text-gray-900"
                  >
                    <X className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-grow p-3 sm:p-4 overflow-y-auto">
                <div className="space-y-3 sm:space-y-4">
                  {messages.length === 0 && (
                    <div className="text-xs sm:text-sm text-muted-foreground text-center py-6 sm:py-8">
                      How can I help you today?
                    </div>
                  )}

                  {messages.map((message: any) => {
                    const text = getMessageText(message) ?? "";
                    const isUser = message.role === "user";

                    return (
                      <div
                        key={message.id ?? Math.random()}
                        className={`flex ${
                          isUser ? "justify-end" : "justify-start"
                        }`}
                      >
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                          className={`max-w-[85%] sm:max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                            isUser
                              ? "bg-primary text-primary-foreground"
                              : "bg-gray-100 text-gray-900"
                          }`}
                        >
                          {isUser ? (
                            text || "(no text)"
                          ) : (
                            <ReactMarkdown>{text || "(no text)"}</ReactMarkdown>
                          )}
                        </motion.div>
                      </div>
                    );
                  })}

                  {isLoading && (
                    <div className="flex justify-start items-start gap-2">
                      <div className="max-w-[85%] sm:max-w-[80%] rounded-2xl px-3 py-2 text-sm bg-gray-100 text-gray-500">
                        <div className="flex space-x-1">
                          <div className="animate-bounce">•</div>
                          <div className="animate-bounce delay-75">•</div>
                          <div className="animate-bounce delay-150">•</div>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6 sm:h-8 sm:w-8 flex-shrink-0"
                        onClick={handleStop}
                      >
                        <X className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                    </div>
                  )}

                  {error && (
                    <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 p-2">
                      <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-500 flex-shrink-0" />
                      <p className="text-xs sm:text-sm text-red-500 text-center">
                        An error occurred. Please try again.
                      </p>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => regenerate()}
                        className="h-6 w-6 sm:h-8 sm:w-8 flex-shrink-0"
                      >
                        <RefreshCw className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Input */}
              <div className="border-t p-2 sm:p-3 mt-auto">
                <form onSubmit={handleChatSubmit} className="flex w-full gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 text-sm h-10"
                    disabled={isLoading}
                  />
                  <Button
                    type="submit"
                    size="sm"
                    className="px-3 py-2 min-w-[60px] h-10 bg-gray-100 hover:bg-gray-200 hover:text-gray-900"
                    disabled={isLoading || !input.trim()}
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4 text-gray-900" />
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <ChatDialog isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} />
    </>
  );
}
