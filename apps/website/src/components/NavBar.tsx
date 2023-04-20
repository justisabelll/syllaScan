import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

interface NavBarProps {
  canDelete?: () => void;
}

export default function NavBar({ canDelete }: NavBarProps) {
  const router = useRouter();

  if (router.pathname === "/Dashboard") {
    return (
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown"></div>
          <a className="btn-ghost btn text-xl normal-case">SyllaScan</a>
        </div>
        <div className="navbar-end">
          <Link href="/Upload" className="btn-sm btn mr-3">
            Upload Another
          </Link>
          <button onClick={() => void signOut()} className="btn-sm btn">
            Log Out
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown"></div>
          <a className="btn-ghost btn text-xl normal-case">SyllaScan</a>
          <button className="btn-ghost btn-square btn" onClick={router.back}>
            Back
          </button>
        </div>

        <div className="navbar-end">
          {/* ... (other code) */}
          {canDelete && (
            <button
              onClick={canDelete}
              className="btn-sm btn mr-3 rounded bg-red-500 py-2 px-4 font-bold text-white hover:bg-red-700"
            >
              Delete Syllabus
            </button>
          )}
          {router.pathname !== "/Upload" && (
            <Link href="/Upload" className="btn-sm btn mr-3">
              Upload
            </Link>
          )}
          <button
            onClick={() => void signOut({ callbackUrl: "/" })}
            className="btn-sm btn"
          >
            Log Out
          </button>
        </div>
      </div>
    );
  }
}
