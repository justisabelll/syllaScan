import NavBar from "../components/NavBar"
import SyllabiGrid from "../components/SyllabiGrid"
import { getSession } from "next-auth/react"
import { prisma } from "../server/db"
import { requireAuth } from "../utils/requireAuth"

interface DashboardProps {
    syllabi: any[]
}



function Dashboard({syllabi}: DashboardProps){
    return (
        <>
            <NavBar/>
            <div className="flex justify-center">
                <SyllabiGrid syllabi={syllabi}/>
            </div>
        </>
    )

}

export default Dashboard 


export async function getServerSideProps(context: any) {
    return requireAuth(context, async (session: any) => {
        session = await getSession(context)
        const syllabi = await prisma.syllabi.findMany({
            where: {
                owningUserID: session.user.id
            },
            select: {
                name: true,
                corpus: true,
                Syllabi_ID: true
            }
        })
        return {
            props: {
                syllabi
            }
        }
    })
}

