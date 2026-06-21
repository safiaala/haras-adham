import Link from 'next/link'
import { PAGES } from '@/lib/sections'

export default function EditeurPage() {
  return (
    <div style={{ padding:40 }}>
      <div style={{ maxWidth:900, margin:'0 auto' }}>
        <div style={{ marginBottom:28 }}>
          <a href="/admin" style={{ fontSize:10, color:'#888', textDecoration:'none' }}>← Admin</a>
          <h1 style={{ fontFamily:'Noto Serif,serif', fontSize:22, color:'#13201A', marginTop:4 }}>Éditeur de pages</h1>
          <p style={{ fontSize:12, color:'#888', marginTop:4 }}>Sélectionnez une page pour modifier ses sections, textes, images et liens.</p>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap:14 }}>
          {PAGES.map(p => (
            <Link key={p.slug} href={`/admin/editeur/${p.slug}`} style={{ textDecoration:'none' }}>
              <div style={{ background:'#fff', border:'.5px solid rgba(195,200,195,.3)', padding:24, cursor:'pointer', transition:'box-shadow .2s' }}>
                <div style={{ fontSize:28, marginBottom:10 }}>{p.emoji}</div>
                <div style={{ fontFamily:'Noto Serif,serif', fontSize:16, color:'#13201A', marginBottom:4 }}>{p.label}</div>
                <div style={{ fontSize:11, color:'#888' }}>Modifier les sections →</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
