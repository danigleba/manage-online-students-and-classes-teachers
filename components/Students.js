import { useEffect, useState } from 'react'
import Image from 'next/image'
import { BsArrowRight } from 'react-icons/bs'
import AddStudentButton from './AddStudentsButtons'

export default function Students(props) {
    const [students, setStudents] = useState([])

  useEffect(() => {
    const url = "/api/students/get_students?tutor_email=" + props?.user?.email
    fetch(url)
        .then(response => response.json())
        .then(data => setStudents(data.data))

    console.log(students)
  }, [props?.user])

  return (
    <main id="students" className="py-8 overflow-hidden">
      <div className='mb-6 flex items-center gap-4 px-8'>
        <div className='rounded-md flex items-center'>
          <h2 className='flex items-center'>Tus alumnos</h2>
        </div>
        <AddStudentButton user={props?.user}/>
      </div>
      <div className="flex w-screen items-center">
        <div className="px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {students.map((item) => (
            <a href={`/s/${item.id}`} key={item.id}>
              <div className='flex justify-between px-12 hover:shadow-[0_0px_30px_rgb(0,0,0,0.14)] duration-200 items-center w-full bg-white shadow-[0_0px_30px_rgb(0,0,0,0.1)] rounded-xl p-6 text-[#252422]'>
                <div className='flex gap-6'>
                  <div>
                    <Image className='rounded-full' alt="Student's profile picture" height={50} width={59} src={item?.profile_url}/>
                  </div>
                  <div className='space-y-1'>
                    <p className='font-bold text-lg'>{item?.username}</p>
                    {item && props?.user.email && item.paid_classes && (
                      <p className='bg-[#f4f4f4] px-4 py-1 text-center rounded-md font-semibold text-[#252422] text-sm'>Le quedan {item.paid_classes[props.user.email] || 0} clases</p>
                    )}
                  </div>
                    </div>
                  <div>
                    <BsArrowRight size={22}/>
                  </div>
            </div>
            </a>
          ))}
        </div>
        </div>
    </main>
  )
}
