import PageRenderer from '@/components/sections/PageRenderer'
import ChevauxVedette from '@/components/ChevauxVedette'
import EvenementsHome from '@/components/EvenementsHome'
import GalerieVedette from '@/components/GalerieVedette'

export const dynamic = 'force-dynamic'

export default function HomePage() {
  return <PageRenderer page="accueil" extra={
    <>
      <ChevauxVedette/>
      <EvenementsHome/>
    </>
  }/>
}
