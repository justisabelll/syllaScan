import { useSession, signIn, signOut } from "next-auth/react"

export default function Component() {
  const { data: session } = useSession()
  if (session) {
    return (
      <div>
        <button className="btn btn-primary" onClick={() => void signOut()}>Sign out</button>
      </div>
    )
  }
  return (
    <div>
      <button className="btn btn-primary" onClick={() => void signIn()}>Sign in</button>
    </div>
  )
}