import React from 'react'

const Navbar = () => {
  return (
    <div className='w-full h-[40px] bg-slate-900 text-cyan-50 shadow-2xl flex items-center justify-between'>
        <span className="font-bold uppercase px-4">Toolist</span>
        <div className="others mr-6">
            <ul className='flex gap-3 font-semibold m-3'>
                <li className='hover:scale-[01.05] cursor-pointer'>Home</li>
                <li className='hover:scale-[01.05] cursor-pointer'>About</li>
            </ul>
        </div>
    </div>
  )
}

export default Navbar