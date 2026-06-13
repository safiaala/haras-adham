import PageRenderer from '@/components/sections/PageRenderer'
import JobsList from '@/components/JobsList'
export const dynamic = 'force-dynamic'
export default function JobsPage() {
  return <PageRenderer page="jobs" extra={<JobsList/>}/>
}
