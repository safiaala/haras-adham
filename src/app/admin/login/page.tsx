'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [pw, setPw] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const res = await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: pw }),
    })
    if (res.ok) {
      router.push('/admin')
    } else {
      setError('Mot de passe incorrect')
    }
  }

  return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#13201A' }}>
      <div style={{ background:'#fbf9f5', padding:40, width:360 }}>
        <div style={{ textAlign:'center', marginBottom:28 }}>
          <div style={{ fontSize:32, marginBottom:8 }}>🐴</div>
          <div style={{ fontFamily:'Noto Serif,serif', fontSize:20, color:'#13201A' }}>Haras <span style={{ color:'#B8943A' }}>Adham</span></div>
          <div style={{ fontSize:10, letterSpacing:'.2em', textTransform:'uppercase', color:'#888', marginTop:4 }}>Administration</div>
        </div>
        <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:14 }}>
          <div>
            <label style={{ display:'block', fontSize:9, letterSpacing:'.1em', textTransform:'uppercase', color:'#6b6b6b', marginBottom:4 }}>Mot de passe</label>
            <input type="password" value={pw} onChange={e => setPw(e.target.value)} required autoFocus
              style={{ width:'100%', padding:'10px 12px', border:'.5px solid rgba(195,200,195,.6)', fontSize:13, fontFamily:'Plus Jakarta Sans,sans-serif', outline:'none' }}/>
          </div>
          {error && <p style={{ fontSize:12, color:'#A32D2D', textAlign:'center' }}>{error}</p>}
          <button type="submit" className="btn-dark" style={{ width:'100%', textAlign:'center' }}>Accéder</button>
        </form>
      </div>
    </div>
  )
}
