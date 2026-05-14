import { Send, Sparkles, User } from 'lucide-react'
import { ReactNode, useState } from 'react'

export interface ChatMessage {
  id: string
  role: 'user' | 'ai'
  text: string | ReactNode
  meta?: string
}

export default function ChatPanel({
  messages,
  suggestions,
  onSend,
  placeholder,
}: {
  messages: ChatMessage[]
  suggestions?: string[]
  onSend?: (text: string) => void
  placeholder?: string
}) {
  const [text, setText] = useState('')
  return (
    <div className="card flex flex-col h-[640px]">
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {messages.map((m) => (
          <div key={m.id} className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${m.role === 'ai' ? 'bg-accent-100 text-accent-700' : 'bg-navy-700 text-white'}`}>
              {m.role === 'ai' ? <Sparkles size={14} /> : <User size={14} />}
            </div>
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${m.role === 'ai' ? 'bg-graphite-100 text-graphite-900 rounded-tl-sm' : 'bg-navy-700 text-white rounded-tr-sm'}`}>
              {typeof m.text === 'string' ? <p className="whitespace-pre-line">{m.text}</p> : m.text}
              {m.meta && <div className={`text-[11px] mt-1.5 ${m.role === 'ai' ? 'text-graphite-500' : 'text-navy-200'}`}>{m.meta}</div>}
            </div>
          </div>
        ))}
      </div>

      {suggestions && (
        <div className="border-t border-graphite-200 p-3 flex flex-wrap gap-2">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => onSend?.(s)}
              className="text-xs px-3 py-1.5 rounded-full bg-brand-50 text-brand-700 hover:bg-brand-100"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <div className="border-t border-graphite-200 p-3 flex items-center gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' && text) { onSend?.(text); setText('') } }}
          className="input flex-1"
          placeholder={placeholder || 'Digite sua pergunta...'}
        />
        <button
          onClick={() => { if (text) { onSend?.(text); setText('') } }}
          className="btn-primary"
        >
          <Send size={14} />
          Enviar
        </button>
      </div>
    </div>
  )
}
