import PageRenderer from '@/components/sections/PageRenderer'
import EvenementsList from '@/components/EvenementsList'
export const dynamic = 'force-dynamic'
export default function EvenementsPage() {
  return <PageRenderer page="evenements" extra={<EvenementsList/>}/>
}
