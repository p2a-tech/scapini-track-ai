import { ArrowLeft, Mail } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function RecoverPasswordPage() {
  const [sent, setSent] = useState(false)
  return (
    <div className="min-h-screen flex items-center justify-center bg-graphite-50 p-6">
      <div className="card-elevated w-full max-w-md p-8">
        <Link to="/login" className="inline-flex items-center gap-1 text-sm text-graphite-500 hover:text-graphite-800">
          <ArrowLeft size={14} /> Voltar para o login
        </Link>
        <h2 className="mt-4 text-2xl font-bold text-graphite-900">Recuperar senha</h2>
        <p className="text-sm text-graphite-500 mt-1">
          Enviaremos um link de recuperação para seu e-mail corporativo.
        </p>

        {!sent ? (
          <form className="mt-6 space-y-4" onSubmit={(e) => { e.preventDefault(); setSent(true) }}>
            <div>
              <label className="label">E-mail</label>
              <input type="email" defaultValue="marina@scapini.com.br" className="input" />
            </div>
            <button className="btn-primary w-full">
              <Mail size={16} /> Enviar link de recuperação
            </button>
          </form>
        ) : (
          <div className="mt-6 bg-success-50 border border-success-100 text-success-700 rounded-lg p-4 text-sm">
            Link enviado! Verifique sua caixa de entrada e siga as instruções.
          </div>
        )}
      </div>
    </div>
  )
}
