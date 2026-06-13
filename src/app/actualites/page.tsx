import PageRenderer from '@/components/sections/PageRenderer'
import ActualitesList from '@/components/ActualitesList'
export const dynamic = 'force-dynamic'
export default function ActualitesPage() {
  return <PageRenderer page="actualites" extra={<ActualitesList/>}/>
}
