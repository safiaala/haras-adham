import PageRenderer from '@/components/sections/PageRenderer'
import EtalonsList from '@/components/EtalonsList'
export const dynamic = 'force-dynamic'
export default function EtalonsPage() {
  return <PageRenderer page="etalons" extra={<EtalonsList/>}/>
}
