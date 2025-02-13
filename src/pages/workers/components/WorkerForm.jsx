import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getUserGroups } from '../../../services/userGroupService'

// Worker types by company
const WORKER_TYPES = {
  SKK: [
    { value: 'BAG', label: 'คนยกปูน' },
    { value: 'EMPLOYEE', label: 'พนักงาน' },
    { value: 'STAFF', label: 'เสมียรจ่าย' }
  ],
  SMK: [
    { value: 'BAG', label: 'คนยกปูน' },
    { value: 'CLAMP', label: 'คนขับรถ Clamp' }
  ]
}

export default function WorkerForm({ onSubmit, defaultValues, isEdit }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setFocus,
    watch,
    setValue
  } = useForm({
    defaultValues: {
      cardid: '',
      operid: '',
      firstname: '',
      lastname: '',
      type: '',  // ไม่มี default
      ugroup: '', 
      company: defaultValues?.company || 'SKK', 
      ...defaultValues
    },
  })

  const company = watch('company')
  const type = watch('type')
  const workerTypes = WORKER_TYPES[company] || []
  const showUserGroup = company === 'SKK' && type === 'BAG'

  // Reset ugroup when type changes
  useEffect(() => {
    if (!showUserGroup) {
      setValue('ugroup', '')
    }
  }, [showUserGroup, setValue])

  // Fetch user groups for SKK BAG type
  const { data: userGroups = [] } = useQuery({
    queryKey: ['userGroups', company],
    queryFn: () => getUserGroups(company),
    enabled: showUserGroup, // Only fetch when showing user group field
  })

  useEffect(() => {
    if (!isEdit) {
      setFocus('cardid')
    }
  }, [setFocus, isEdit])

  // Set initial ugroup value if editing and type is BAG
  useEffect(() => {
    if (isEdit && defaultValues?.ugroup && type === 'BAG') {
      setValue('ugroup', defaultValues.ugroup)
    }
  }, [isEdit, defaultValues, type, setValue])

  const handleCardIdKeyPress = (e) => {
    if (!/[0-9]/.test(e.key) && e.key !== 'Enter') {
      e.preventDefault()
      return
    }
    
    if (e.key === 'Enter') {
      e.preventDefault()
      setFocus('operid')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" autoComplete="off">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">
          รหัสบัตร
        </label>
        <input
          type="text"
          className="block w-full rounded-lg border-gray-700 bg-gray-800 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-3 caret-white"
          maxLength={10}
          autoComplete="off"
          {...register('cardid', { 
            required: 'กรุณากรอกรหัสบัตร',
            pattern: {
              value: /^\d{10}$/,
              message: 'รหัสบัตรต้องเป็นตัวเลข 10 หลักเท่านั้น'
            }
          })}
          onKeyPress={handleCardIdKeyPress}
        />
        {errors.cardid && (
          <p className="text-sm text-red-400">{errors.cardid.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">
          รหัสพนักงาน
        </label>
        <input
          type="text"
          className="block w-full rounded-lg border-gray-700 bg-gray-800 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-3"
          maxLength={10}
          autoComplete="off"
          {...register('operid', { 
            required: 'กรุณากรอกรหัสพนักงาน',
            pattern: {
              value: /^\d{1,10}$/,
              message: 'รหัสพนักงานต้องเป็นตัวเลขไม่เกิน 10 หลัก'
            }
          })}
          onKeyPress={(e) => {
            if (!/[0-9]/.test(e.key) && e.key !== 'Enter') {
              e.preventDefault()
              return
            }
            
            if (e.key === 'Enter') {
              e.preventDefault()
              setFocus('firstname')
            }
          }}
        />
        {errors.operid && (
          <p className="text-sm text-red-400">{errors.operid.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            ชื่อ
          </label>
          <input
            type="text"
            className="block w-full rounded-lg border-gray-700 bg-gray-800 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-3"
            {...register('firstname', { required: 'กรุณากรอกชื่อ' })}
          />
          {errors.firstname && (
            <p className="text-sm text-red-400">{errors.firstname.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            นามสกุล
          </label>
          <input
            type="text"
            className="block w-full rounded-lg border-gray-700 bg-gray-800 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-3"
            {...register('lastname', { required: 'กรุณากรอกนามสกุล' })}
          />
          {errors.lastname && (
            <p className="text-sm text-red-400">{errors.lastname.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">
          ประเภท <span className="text-red-400">*</span>
        </label>
        <select
          className="block w-full rounded-lg border-gray-700 bg-gray-800 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-3"
          {...register('type', { required: 'กรุณาเลือกประเภท' })}
        >
          <option value="">-- เลือกประเภท --</option>
          {workerTypes.map(type => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
        {errors.type && (
          <p className="text-sm text-red-400">{errors.type.message}</p>
        )}
      </div>

      {/* Show user group dropdown only for SKK BAG type */}
      {showUserGroup && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            กลุ่มผู้ใช้ <span className="text-red-400">*</span>
          </label>
          <select
            className="block w-full rounded-lg border-gray-700 bg-gray-800 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-3"
            {...register('ugroup', { 
              required: showUserGroup ? 'กรุณาเลือกกลุ่มผู้ใช้' : false 
            })}
          >
            <option value="">-- เลือกกลุ่มผู้ใช้ --</option>
            {userGroups.map(group => (
              <option key={group.groupname} value={group.groupname}>
                {group.groupname}
              </option>
            ))}
          </select>
          {errors.ugroup && (
            <p className="text-sm text-red-400">{errors.ugroup.message}</p>
          )}
        </div>
      )}

      {/* Hidden field for company */}
      <input type="hidden" {...register('company')} />

      <div className="flex justify-end space-x-4 mt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex justify-center rounded-lg border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50"
        >
          {isEdit ? 'บันทึกการแก้ไข' : 'เพิ่มข้อมูล'}
        </button>
      </div>
    </form>
  )
}
