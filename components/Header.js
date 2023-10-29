import { useEffect } from "react"
import { useRouter } from "next/router"
import Image from "next/image"
import { auth } from "@/utils/firebase"
import { onAuthStateChanged } from "firebase/auth"
import AddStudentButton from "./AddStudentsButtons"

export default function Headers(props) {
    const router = useRouter()

    const checkUserRegistration = async () => {
        const url = "/api/auth/check_tutor_info?email=" + auth.currentUser.email
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const data = await response.json()
        
        if (data.tutorRegistered == false) {
           router.push("/signup")
        }
    }
    
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
          if (!user) {
            router.push("/login")
          } else {
            checkUserRegistration()
          }
        })    
    }, [])
    return (
        <main className="pb-20 w-full">
            <div className="fixed top-0 px-6 md:px-10 py-3 flex justify-between items-center bg-white w-screen">
                <div>
                    <button onClick={() => router.push("/")}>
                        <Image alt="Cornelio's logo" height={100} width={100} src="https://firebasestorage.googleapis.com/v0/b/cornelio-9f37a.appspot.com/o/logo.png?alt=media&token=fd0b5137-1d16-47c1-9d56-bfdfc46c844f&_gl=1*1r1t70m*_ga*Njg1NzExNjYxLjE2OTA2MzY3Mjk.*_ga_CW55HF8NVT*MTY5ODYwMjYxMS4xOTUuMS4xNjk4NjAzNzA3LjE2LjAuMA.." />
                    </button>
                </div>
                <div className='hidden md:flex font-semibold text-lg gap-12 text-[#222222]'>
                    <a href="/">Clases</a>
                    <a href="/#students">Alumnos</a>
                    <a href="/calendar">Calendario</a>
                </div>
                <div className="flex items-center gap-4 text-[#222222]">
                    <div className="hidden md:block">
                    <AddStudentButton user={props?.user} />
                    </div>
                    <div>
                        <p className="hidden md:flex font-semibold text-lg">{props?.user?.displayName}</p>
                    </div>
                    <Image className='rounded-full' alt="Tutor's profile picture" height={50} width={50} src={props?.user?.photoURL}/>
                </div>
            </div>
        </main>
    )
}