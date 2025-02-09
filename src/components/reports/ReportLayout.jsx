import { useState } from 'react'

export default function ReportLayout({ 
  title,
  description,
  icon: Icon,
  children
}) {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        {Icon && <Icon className="w-6 h-6 text-navy-600" />}
        <h1 className="text-2xl font-semibold text-navy-900">{title}</h1>
      </div>
      {description && <p className="text-navy-600">{description}</p>}
      {/* Content */}
      {children}
    </div>
  )
}
