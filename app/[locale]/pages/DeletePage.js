'use client'
import React from 'react'
import DeleteForm from '../delete/DeleteForm'

const DeletePage = () => {
  return (
       <>
            <div className='hero-section bg-gradient-to-r from-[#24358b] via-[#242c75] to-[#141b43] border-y border-gray-200 py-10'>
                <div className='container'>
                    <div className='flex flex-row justify-between gap-4 items-center'>
                        <div className={`content-side text-center md:text-left ltr:text-left rtl:text-right`}>
                            <h2 className='bg-gradient-to-r from-secondary via-secondary to-secondary inline-block text-transparent bg-clip-text  text-xl  md:text-3xl xl:text-4xl mb-3 font-medium'>Delete Your GTCFX Trading Account</h2>
                            <p className='text-[#fff]'>Verify your identity with OTP and securely delete your GTCFX trading account.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" mx-auto max-w-xl py-10">
                <DeleteForm />
            </div>
        </>
  )
}

export default DeletePage