import React from 'react'

export function Table({ children, className = '' }) {
  return (
    <div className="overflow-x-auto">
      <table className={`w-full border-collapse ${className}`}>
        {children}
      </table>
    </div>
  )
}

export function Thead({ children }) {
  return (
    <thead>
      {children}
    </thead>
  )
}

export function Tbody({ children }) {
  return (
    <tbody className="divide-y divide-gray-100">
      {children}
    </tbody>
  )
}

export function Tfoot({ children }) {
  return (
    <tfoot className="border-t border-gray-200 font-medium">
      {children}
    </tfoot>
  )
}

export function Tr({ children, className = '', isHeader = false, isEven = false }) {
  return (
    <tr className={`
      transition-colors duration-100
      ${isHeader ? 'bg-[#2b4072] text-white' : isEven ? 'bg-gray-50/50' : 'bg-white'}
      ${!isHeader && 'hover:bg-blue-50/50'}
      ${className}
    `}>
      {children}
    </tr>
  )
}

export function Th({ children, className = '', align = 'left' }) {
  return (
    <th className={`
      px-6 py-4 text-sm font-semibold
      text-${align}
      ${className}
    `}>
      {children}
    </th>
  )
}

export function Td({ children, className = '', align = 'left' }) {
  return (
    <td className={`
      px-6 py-4 text-sm
      text-${align} text-gray-600
      ${className}
    `}>
      {children}
    </td>
  )
}
