"use client"
import React from 'react'
import { signIn } from "next-auth/react"
import { Button } from '../../../../components/ui/button'


export default function Connect() {
  return (
    <div className='max-w-[500px] h-screen mx-auto flex justufy-center items-center
    flex-col gap-2'>
        <Button onClick={()=>signIn('google')}>
            Se connecter avec Google
        </Button>
      
    </div>
  )
}
