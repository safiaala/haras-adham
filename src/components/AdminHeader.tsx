'use client'
import Link from 'next/link'

interface Props {
  title: string
  action?: React.ReactNode
}

export default function AdminHeader({ title, action }: Props) {
  return (
    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:28 }}>
      <div>
        <Link href="/admin" style={{ fontSize:10, color:'#888', textDecoration:'none', letterSpacing:'.08em' }}>← Tableau de bord</Link>
        <h1 style={{ fontFamily:'Noto Serif,serif', fontSize:22, color:'#13201A', marginTop:4, marginBottom:0 }}>{title}</h1>
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}
