import type { CSSProperties } from 'react'

export const S = {
  page: { padding: 40 } as CSSProperties,
  wrap: (maxWidth = 1000) => ({ maxWidth, margin: '0 auto' }) as CSSProperties,

  card: { background:'#fff', border:'.5px solid rgba(195,200,195,.3)', overflow:'hidden' } as CSSProperties,
  cardPad: { background:'#fff', border:'.5px solid rgba(195,200,195,.3)', padding:'18px 22px' } as CSSProperties,

  label: { display:'block', fontSize:9, letterSpacing:'.1em', textTransform:'uppercase', color:'#6b6b6b', marginBottom:4 } as CSSProperties,
  input: { width:'100%', padding:'9px 11px', border:'.5px solid rgba(195,200,195,.6)', fontSize:13, fontFamily:'Plus Jakarta Sans,sans-serif', outline:'none', background:'#fff', boxSizing:'border-box' } as CSSProperties,
  select: { width:'100%', padding:'9px 11px', border:'.5px solid rgba(195,200,195,.6)', fontSize:13, fontFamily:'Plus Jakarta Sans,sans-serif', outline:'none', background:'#fff' } as CSSProperties,
  textarea: { width:'100%', padding:'9px 11px', border:'.5px solid rgba(195,200,195,.6)', fontSize:13, fontFamily:'Plus Jakarta Sans,sans-serif', outline:'none', background:'#fff', resize:'vertical' as const },

  thCell: { padding:'10px 12px', textAlign:'left' as const, fontSize:9, fontWeight:600, letterSpacing:'.1em', textTransform:'uppercase' as const, color:'#6b6b6b', borderBottom:'.5px solid rgba(195,200,195,.4)' } as CSSProperties,
  tdCell: { padding:'10px 12px' } as CSSProperties,

  btnEdit: { fontSize:10, padding:'4px 10px', border:'.5px solid rgba(195,200,195,.5)', background:'transparent', cursor:'pointer', fontFamily:'Plus Jakarta Sans,sans-serif' } as CSSProperties,
  btnDel:  { fontSize:10, padding:'4px 10px', border:'.5px solid #FCEBEB', background:'#FCEBEB', color:'#A32D2D', cursor:'pointer', fontFamily:'Plus Jakarta Sans,sans-serif' } as CSSProperties,

  modal: { position:'fixed', inset:0, background:'rgba(0,0,0,.5)', zIndex:100, display:'flex', alignItems:'center', justifyContent:'center', padding:16 } as CSSProperties,
  modalBox: { background:'#fbf9f5', padding:28, width:'100%', maxWidth:600, maxHeight:'90vh', overflowY:'auto' as const } as CSSProperties,
  modalTitle: { display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 } as CSSProperties,

  form: { display:'flex', flexDirection:'column' as const, gap:12 } as CSSProperties,
  grid2: { display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 } as CSSProperties,
  actions: { display:'flex', gap:10, justifyContent:'flex-end', marginTop:8 } as CSSProperties,

  emptyState: { textAlign:'center' as const, padding:40, color:'#888', fontSize:13, fontStyle:'italic' as const } as CSSProperties,
}
