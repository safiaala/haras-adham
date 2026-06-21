async function call(method: string, body: object) {
  const res = await fetch('/api/admin/data', {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.error || 'Erreur serveur')
  return json
}

export const adminDb = {
  insert: (table: string, data: object) => call('POST', { table, data }),
  update: (table: string, id: string, data: object) => call('PATCH', { table, id, data }),
  delete: (table: string, id: string) => call('DELETE', { table, id }),
  upsert: (table: string, data: object, onConflict?: string) => call('PUT', { table, data, onConflict }),
  updateBy: (table: string, field: string, value: string, data: object) => call('PATCH', { table, id: value, field, data }),
}
