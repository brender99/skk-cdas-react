import React from 'react'

export function Table({ children, className = '', ...props }) {
  return (
    <div className="overflow-x-auto">
      <table className={`w-full border-collapse ${className}`} {...props}>
        {children}
      </table>
    </div>
  )
}

export function Thead({ children, className = '', ...props }) {
  return (
    <thead className={`bg-gray-50 text-xs uppercase text-navy-700 ${className}`} {...props}>
      {children}
    </thead>
  )
}

export function Tbody({ children, className = '', ...props }) {
  return (
    <tbody className={`text-sm text-navy-600 ${className}`} {...props}>
      {children}
    </tbody>
  )
}

export function Tfoot({ children, className = '', ...props }) {
  return (
    <tfoot className={`bg-gray-50 text-xs uppercase text-navy-700 ${className}`} {...props}>
      {children}
    </tfoot>
  )
}

export function Tr({ children, className = '', isHeader = false, isEven = false, ...props }) {
  const classes = [
    'border-b border-navy-200',
    isHeader && 'bg-navy-50 font-medium text-navy-900',
    isEven && 'bg-navy-50/50',
    className
  ].filter(Boolean).join(' ')

  // แยก isHeader และ isEven ออกจาก props ที่จะส่งไปให้ tr element
  const { isHeader: _, isEven: __, ...restProps } = props

  return (
    <tr className={classes} {...restProps}>
      {children}
    </tr>
  )
}

export function Th({ children, className = '', align = 'left', ...props }) {
  const classes = [
    'px-4 py-3 font-medium text-navy-900 whitespace-nowrap',
    align === 'center' && 'text-center',
    align === 'right' && 'text-right',
    className
  ].filter(Boolean).join(' ')

  return (
    <th className={classes} {...props}>
      {children}
    </th>
  )
}

export function Td({ children, className = '', align = 'left', ...props }) {
  const classes = [
    'px-4 py-3 whitespace-nowrap',
    align === 'center' && 'text-center',
    align === 'right' && 'text-right',
    className
  ].filter(Boolean).join(' ')

  return (
    <td className={classes} {...props}>
      {children}
    </td>
  )
}
