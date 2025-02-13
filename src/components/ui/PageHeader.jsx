export function PageHeader({ 
  title,
  description,
  icon: Icon,
  children,
  actions,
  tabs,
  selectedTab,
  onTabChange
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
          {tabs && tabs.length > 0 && (
            <div className="mt-4 border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.value}
                    onClick={() => onTabChange?.(tab.value)}
                    className={`
                      whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm
                      ${selectedTab === tab.value
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }
                    `}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          )}
          {children && <div className="mt-4">{children}</div>}
        </div>
      </div>
    </div>
  )
}
