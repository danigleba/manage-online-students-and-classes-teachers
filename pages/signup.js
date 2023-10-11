import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import { auth } from '@/utils/firebase'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useState } from 'react'
import { useRouter } from 'next/router'
import HeaderAuth from '@/components/HeaderAuth'
import Footer from '@/components/Footer'
import {BsGoogle} from 'react-icons/bs'
import Image from 'next/image'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    const router = useRouter()
    const [authState, setAuthState] = useState("Google signup")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [price1, setPrice1] = useState(0)
    const [price10, setPrice10] = useState(0)
    const [price25, setPrice25] = useState(0)
    const [vc_platform, setVCPlatform] = useState("")


    const googleProvider = new GoogleAuthProvider()

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider)
            const url = "/api/auth/signup?profile_url=" + auth.currentUser.photoURL + "&email=" + auth.currentUser.email + "&username=" + auth.currentUser.displayName
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            const data = await response.json()
            if (data.tutorCreated == true) {
                setAuthState("Extra_info")
            }
            // User signed in successfully using Google
          } catch (error) {
                console.error("Google login error:", error);
          }    
    }

    function setGoogleMeet() {
        setVCPlatform("Google Meet")
    }

    function setZoom() {
        setVCPlatform("Zoom")
    }

    const submitTutorsInfo = async () => {
        if (phoneNumber != ""  && price1 > 0 && price10 > 0 && price25 > 0 && vc_platform != "") {
            const url = "/api/auth/set_tutor_info?phoneNumber=" + phoneNumber + "&price1=" + price1 + "&price10=" + price10 + "&price25=" + price25 + "&vc_platform=" + vc_platform + "&email=" + auth.currentUser.email
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            const data = await response.json()
            if (data.tutorUpdated  == true) {
                router.push("/")
            }
        }
    }
    return (
        <main className="bg-[#f4f4f4]">
            <HeaderAuth />
            {authState == "Google signup" ? (
                
                <div className='flex justify-center grid grid-cols-2 w-full'>
      <div>
        <Image alt="Women working remotely" width={1000} height={300} src="https://firebasestorage.googleapis.com/v0/b/cornelio-9f37a.appspot.com/o/stock_pictures%2Fauth_bg.webp?alt=media&token=d2fd8cde-eb2e-4f53-99ed-c281af97c971&_gl=1*e83cqw*_ga*Njg1NzExNjYxLjE2OTA2MzY3Mjk.*_ga_CW55HF8NVT*MTY5NzA0MTYyMi4xODQuMS4xNjk3MDQyODEwLjQ3LjAuMA.." />
      </div>
      <div className="rounded-xl w-full flex p-12 flex-col space-y-3 justify-center text-center items-center">
            <p className='font-bold text-2xl'>Crea tu cuenta</p>
            <div className='border-t-2 w-full flex justify-center border-[#252422]'></div>
            <div className='flex justify-center w-full'>
              <button onClick={handleGoogleSignIn} className="gap-4 w-full md:px-16 py-2 bg-[#eb4c60] hover:bg-[#d63c4f] flex items-center justify-center rounded-lg text-white font-bold">
                  <BsGoogle color={"white"} />
                  <p>
                    Entrar con Google
                  </p>
              </button>
            </div>
            <p className='pt-2'>¿Ya tienes una cuenta? <a href="/login" className='text-blue-400 underline'>Inicia sesión</a></p>
        </div>
      </div>
                 ) 
            : 
            (
                <div className="flex flex-col">
                    <div className=''>
                        <label className="block mb-2 text-sm font-medium">Número de teléfono</label>
                        <input onChange={(e) => setPhoneNumber(e.target.value)} placeholder="(+34) 999 999 999" className="placeholder-[#c9c9c9] border border-[#333533] text-gray-900 sm:text-sm rounded-xl block w-full p-2.5"/>
                    </div>   
                    <div>
                        <label className="block mb-2 text-sm font-medium">Plataforma preferida</label>
                        <div className='grid grid-cols-2'>
                            <button onClick={setGoogleMeet} className='w-full h-12 bg-green-200'>Google Meet</button>
                            <button onClick={setZoom} className='w-full h-12 bg-blue-200'>Zoom</button>
                       </div> 
                    </div>  
                    <div>
                        <label className="block mb-2 text-sm font-medium">Selecciona tus precio por clases al comprar (en €)</label>
                        <div className=''>
                            <label className="block mb-2 text-sm font-medium">1 clase</label>
                            <input onChange={(e) => setPrice1(e.target.value)} type="number" placeholder="(+34) 999 999 999" className="placeholder-[#c9c9c9] border border-[#333533] text-gray-900 sm:text-sm rounded-xl block w-full p-2.5"/>
                        </div>   
                        <div className=''>
                            <label className="block mb-2 text-sm font-medium">10 clase</label>
                            <input onChange={(e) => setPrice10(e.target.value)} type="number" placeholder="(+34) 999 999 999" className="placeholder-[#c9c9c9] border border-[#333533] text-gray-900 sm:text-sm rounded-xl block w-full p-2.5"/>
                        </div>   
                        <div className=''>
                            <label className="block mb-2 text-sm font-medium">25 clase</label>
                            <input onChange={(e) => setPrice25(e.target.value)} type="number" placeholder="(+34) 999 999 999" className="placeholder-[#c9c9c9] border border-[#333533] text-gray-900 sm:text-sm rounded-xl block w-full p-2.5"/>
                        </div>   
                        <button onClick={submitTutorsInfo} className='w-full bg-black text-white'>Enviar</button>
                    </div>
                </div>
            )}
             <Footer />
        </main>
    )
}
