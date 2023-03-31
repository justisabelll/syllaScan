import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/router"

export default function Component() {
  const { data: session } = useSession()
  const router = useRouter()
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