import { useEffect, useRef, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";
const CHAT_URL = `${API_BASE_URL.replace(/\/$/, "")}/api/v1/chat/`;

const initialMessage = {
  role: "assistant",
  content: "Hi, I’m Sage. Ask me about Sagar’s projects, skills, experience, or how to get in touch.",
};

const suggestions = [
  "Tell me about Sagar",
  "What projects has he built?",
  "Which technologies does he use?",
];

function SageChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([initialMessage]);
  const [question, setQuestion] = useState("");
  const [isSending, setIsSending] = useState(false);
  const inputRef = useRef(null);
  const launcherRef = useRef(null);
  const messageListRef = useRef(null);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    messageListRef.current?.scrollTo({
      top: messageListRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isOpen]);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setIsOpen(false);
        launcherRef.current?.focus();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  async function sendMessage(text = question) {
    const content = text.trim();
    if (!content || isSending) return;

    const conversation = [...messages, { role: "user", content }];
    setMessages(conversation);
    setQuestion("");
    setIsSending(true);

    try {
      const response = await fetch(CHAT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: conversation.slice(-12) }),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok) {
        const detail = result?.error?.message || result?.detail;
        throw new Error(
          typeof detail === "string"
            ? detail
            : `Sage is unavailable right now (${response.status}).`,
        );
      }
      if (typeof result?.reply !== "string" || !result.reply.trim()) {
        throw new Error("Sage returned an empty response. Please try again.");
      }

      setMessages((currentMessages) => [
        ...currentMessages,
        { role: "assistant", content: result.reply.trim() },
      ]);
    } catch (error) {
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          role: "assistant",
          content: `Sorry, I couldn’t get a response just now. ${error.message}`,
        },
      ]);
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className="sage-chat">
      {isOpen && (
        <section className="sage-panel glass-panel" aria-label="Chat with Sage">
          <header className="sage-header">
            <div className="sage-avatar" aria-hidden="true">S</div>
            <div className="sage-heading">
              <strong>Sage</strong>
              <span><span className="sage-online-dot" /> Portfolio assistant</span>
            </div>
            <button
              className="sage-close"
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close Sage chat"
            >
              ×
            </button>
          </header>

          <div className="sage-messages" ref={messageListRef} role="log" aria-live="polite">
            {messages.map((message, index) => (
              <p className={`sage-message ${message.role}`} key={`${message.role}-${index}`}>
                {message.content}
              </p>
            ))}
            {isSending && <p className="sage-message assistant" role="status">Sage is thinking…</p>}
            {messages.length === 1 && (
              <div className="sage-suggestions" aria-label="Suggested questions">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    disabled={isSending}
                    onClick={() => sendMessage(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form
            className="sage-form"
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage();
            }}
          >
            <input
              ref={inputRef}
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="Ask Sage a question…"
              aria-label="Your question for Sage"
              maxLength={500}
            />
            <button type="submit" disabled={isSending || !question.trim()} aria-label="Send message">
              ↑
            </button>
          </form>
          <p className="sage-disclaimer">Answers are based on the information on this portfolio.</p>
        </section>
      )}

      <button
        className={`sage-launcher${isOpen ? " is-open" : ""}`}
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close Sage chat" : "Chat with Sage"}
        ref={launcherRef}
      >
        {isOpen ? <span aria-hidden="true">×</span> : <><span aria-hidden="true">✦</span><span>Ask Sage</span></>}
      </button>
    </div>
  );
}

export default SageChat;
