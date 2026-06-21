'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function ChangePasswordPage() {
  const [form, setForm] = useState({ current: '', next: '', confirm: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle')
  const [msg, setMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (form.next !== form.confirm) {
      setStatus('error')
      setMsg('Les nouveaux mots de passe ne correspondent pas.')
      return
    }
    setStatus('loading')
    try {
      const res = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword: form.current, newPassword: form.next }),
      })
      const json = await res.json()
      if (res.ok) {
        setStatus('ok')
        setMsg('Mot de passe modifié avec succès.')
        setForm({ current: '', next: '', confirm: '' })
      } else {
        setStatus('error')
        setMsg(json.error || 'Erreur serveur')
      }
    } catch {
      setStatus('error')
      setMsg('Erreur réseau')
    }
  }

  return (
    <div style={{ maxWidth: 480, margin: '60px auto', padding: '0 24px' }}>
      <Link href="/admin" style={{ fontSize: 12, color: '#B8943A', textDecoration: 'none', letterSpacing: '.08em' }}>← Retour au dashboard</Link>
      <h1 style={{ fontFamily: 'Noto Serif,serif', fontSize: '1.8rem', color: '#13201A', margin: '20px 0 28px' }}>Changer le mot de passe</h1>

      {status === 'ok' ? (
        <div style={{ background: '#EAF3DE', padding: '16px 20px', color: '#3B6D11', fontSize: 13, marginBottom: 20 }}>
          {msg}
        </div>
      ) : null}
      {status === 'error' ? (
        <div style={{ background: '#FDE8E8', padding: '16px 20px', color: '#A32D2D', fontSize: 13, marginBottom: 20 }}>
          {msg}
        </div>
      ) : null}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {[
          { key: 'current', label: 'Mot de passe actuel' },
          { key: 'next',    label: 'Nouveau mot de passe' },
          { key: 'confirm', label: 'Confirmer le nouveau mot de passe' },
        ].map(({ key, label }) => (
          <div key={key}>
            <label style={{ display: 'block', fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase', color: '#6b6b6b', marginBottom: 6 }}>{label}</label>
            <input
              type="password"
              required
              minLength={key === 'current' ? 1 : 8}
              value={form[key as keyof typeof form]}
              onChange={e => setForm({ ...form, [key]: e.target.value })}
              style={{ width: '100%', padding: '10px 12px', border: '.5px solid rgba(195,200,195,.6)', fontSize: 13, fontFamily: 'Plus Jakarta Sans,sans-serif', outline: 'none', background: '#fff', boxSizing: 'border-box' }}
            />
          </div>
        ))}
        <button type="submit" disabled={status === 'loading'}
          style={{ marginTop: 8, background: '#13201A', color: '#fff', border: 'none', padding: '12px 24px', fontSize: 11, letterSpacing: '.12em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'Plus Jakarta Sans,sans-serif', opacity: status === 'loading' ? .6 : 1 }}>
          {status === 'loading' ? 'Enregistrement...' : 'Changer le mot de passe'}
        </button>
      </form>

      <p style={{ marginTop: 20, fontSize: 11, color: '#aaa', lineHeight: 1.6 }}>
        Le nouveau mot de passe doit contenir au moins 8 caractères. Il sera stocké de façon sécurisée (hash SHA-256).
      </p>
    </div>
  )
}
