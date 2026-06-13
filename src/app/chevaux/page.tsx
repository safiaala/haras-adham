import PageRenderer from '@/components/sections/PageRenderer'
import ChevauxListe from '@/components/ChevauxListe'
export const dynamic = 'force-dynamic'
export default function ChevauxPage() {
  return <PageRenderer page="chevaux" extra={<ChevauxListe/>}/>
}
