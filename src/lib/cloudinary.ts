export async function uploadImage(file: File): Promise<string> {
  const folder = 'haras-adham'

  // Get signature from server (keeps API secret server-side)
  const signRes = await fetch('/api/admin/cloudinary-sign', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ folder }),
  })
  const { timestamp, signature } = await signRes.json()

  const formData = new FormData()
  formData.append('file', file)
  formData.append('folder', folder)
  formData.append('timestamp', timestamp)
  formData.append('signature', signature)
  formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!)

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
    { method: 'POST', body: formData }
  )
  const data = await res.json()
  if (!data.secure_url) throw new Error(data.error?.message || 'Upload échoué')
  return data.secure_url
}
