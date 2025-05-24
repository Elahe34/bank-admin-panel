import React, { useEffect, useState } from 'react'
import { X } from 'lucide-react';

const EditClaimModal = ({isOpen,onClose,claimData,onSave}) => {
    if(!isOpen) return null

    const[formData,setFormData]=useState({
      id:'',
      nationalId:'',
      username:'',
      firstName:'',
      lastName:'',
      status:''
    })
    useEffect(()=>{
      if(isOpen && claimData ){
        setFormData({
          id:claimData.id,
          nationalId:claimData.nationalId,
          username:claimData.username,
          firstName:claimData.firstName,
          lastName:claimData.lastName,
          status:Boolean(claimData.status ||false),
        })
      }
    },[isOpen,claimData])
    const handleChange =(e)=>{
      const{name,type,value,checked}=e.target
      setFormData((prev)=>({
        ...prev,
        [name]:type === 'checkbox' ? checked :value
  
      }))

    }
    const handleSave=()=>{
      onSave(formData),
      onClose()
    }
  return (
    <div dir='rtl'>
        <div onClick={onClose} className='fixed inset-0 bg-black/90 z-10'/>
      <div className='fixed top-1/2 left-1/2 bg-white z-20 w-full transform -translate-x-1/2 -translate-y-1/2 p-6 max-w-md rounded-lg shadow-sm'>
      <div className='flex justify-between items-center mb-10'> 
        <h1 className='text-black font-bold text-2xl'>ویرایش Claim</h1>
        <button onClick={onClose} className=' rounded cursor-pointer hover:scale-110'><X className='w-5 h-5' />
        </button>
      </div>
        <form action="">
            <input onChange={handleChange} name='nationalId' value={formData.nationalId} id='claim-input' className='w-full border rounded p-2 my-2 text-black' type="text" placeholder='کدملی'/>
            <input onChange={handleChange} name='username' value={formData.username} id='claim-value' className='w-full border rounded p-2 my-2 text-black' type="text" placeholder='نام کاربری'/>
            <input onChange={handleChange} name='firstName' value={formData.firstName} id='claim-value' className='w-full border rounded p-2 my-2 text-black' type="text" placeholder='نام'/>
            <input onChange={handleChange} name='lastName' value={formData.lastName} id='claim-value' className='w-full border rounded p-2 my-2 text-black' type="text" placeholder='نام خانوادگی'/>
            <label for="" className='my-3 flex items-center'>فعال باشد<input  onChange={handleChange} name='status' checked={formData.status} className='border rounded  text-black mr-1' type="checkbox"/></label>

            <div className='mt-11' >
                <button onClick={handleSave} className='border border-green-600 ml-5 py-0.5 px-4 w-20 bg-green-500 text-white hover:bg-green-600 rounded hover:scale-110 transition-all
'>ذخیره</button>
                <button className='ml-5 w-20 rounded hover:scale-110 transition-all px-4 py-0.5 border border-gray-400 bg-gray-300 hover:bg-gray-400
'>لغو</button>

            </div>
        </form>
      </div>
    </div>
  )
}

export default EditClaimModal
