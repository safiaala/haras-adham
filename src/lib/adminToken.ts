// Token de session dérivé du mot de passe via SHA-256.
// Le cookie ne contient jamais le mot de passe brut.
export async function deriveToken(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode('haras-adham:admin:' + password)
  const hash = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2,'0')).join('')
}
