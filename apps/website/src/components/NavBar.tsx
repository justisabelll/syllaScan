import {signOut} from "next-auth/react"
import Link from "next/link";
import { useRouter } from "next/router";


export default function NavBar() {
  const router = useRouter();

  if (router.pathname === "/Dashboard") {
    return (
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
          </div>
          <a className="btn btn-ghost normal-case text-xl">SyllaScan</a>
        </div>
        <div className="navbar-end">
          <Link href="/Upload" className="btn btn-sm mr-3">Upload Another</Link>
          <button onClick={() => void signOut()} className="btn btn-sm">Log Out</button>
        </div>
      </div>
    );
  }
  else {
  return (
<div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">      
    </div>
    <a className="btn btn-ghost normal-case text-xl">SyllaScan</a>
    <button className="btn btn-square btn-ghost" onClick={router.back}>Back</button>
  </div>

  <div className="navbar-end">
    {router.pathname !== "/Upload" && <Link href="/Upload" className="btn btn-sm mr-3">Upload</Link>}
    <button onClick={() => void signOut({callbackUrl: "/"})} className="btn btn-sm">Log Out</button>
  </div>
</div>
  )
}
}
