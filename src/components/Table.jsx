import { forwardRef } from 'react'

export const Table = forwardRef(({ children, className = '', ...props }, ref) => (
  <div className="overflow-x-auto">
    <table ref={ref} className={`min-w-full divide-y divide-gray-200 ${className}`} {...props}>
      {children}
    </table>
  </div>
))

export const Thead = forwardRef(({ children, className = '', ...props }, ref) => (
  <thead ref={ref} className={`bg-gray-50 ${className}`} {...props}>
    {children}
  </thead>
))

export const Tbody = forwardRef(({ children, className = '', ...props }, ref) => (
  <tbody ref={ref} className={`bg-white divide-y divide-gray-200 ${className}`} {...props}>
    {children}
  </tbody>
))

export const Tfoot = forwardRef(({ children, className = '', ...props }, ref) => (
  <tfoot ref={ref} className={`bg-gray-50 ${className}`} {...props}>
    {children}
  </tfoot>
))

export const Tr = forwardRef(({ children, className = '', ...props }, ref) => (
  <tr ref={ref} className={`${className}`} {...props}>
    {children}
  </tr>
))

export const Th = forwardRef(({ children, className = '', ...props }, ref) => (
  <th
    ref={ref}
    className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${className}`}
    {...props}
  >
    {children}
  </th>
))

export const Td = forwardRef(({ children, className = '', ...props }, ref) => (
  <td
    ref={ref}
    className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${className}`}
    {...props}
  >
    {children}
  </td>
))

Table.displayName = 'Table'
Thead.displayName = 'Thead'
Tbody.displayName = 'Tbody'
Tfoot.displayName = 'Tfoot'
Tr.displayName = 'Tr'
Th.displayName = 'Th'
Td.displayName = 'Td'
