import PageRenderer from '@/components/sections/PageRenderer'
import ChevauxVedette from '@/components/ChevauxVedette'

export const dynamic = 'force-dynamic'

export default function HomePage() {
  return <PageRenderer page="accueil" extra={<ChevauxVedette/>}/>
}
