export function PageHeader({ 
  title,
  description,
  icon: Icon,
  children,
  actions
}) {
  return (
    <div className="mb-6">
      <div className="bg-white rounded-lg">
        <div className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              {Icon && (
                <div className="flex-shrink-0 p-2 bg-blue-50 rounded-lg">
                  <Icon className="h-6 w-6 text-blue-600" />
                </div>
              )}
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                {description && (
                  <p className="mt-1 text-sm text-gray-600">{description}</p>
                )}
              </div>
            </div>
            {actions}
          </div>
          {children && <div className="mt-4">{children}</div>}
        </div>
      </div>
    </div>
  )
}
