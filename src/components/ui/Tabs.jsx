import React, { useState } from 'react';
import PropTypes from 'prop-types';

const TabsContext = React.createContext({
  value: '',
  onValueChange: () => {},
});

export const Tabs = ({ defaultValue, value, onValueChange, children }) => {
  const [localValue, setLocalValue] = useState(defaultValue);
  const currentValue = value !== undefined ? value : localValue;

  const handleValueChange = (newValue) => {
    setLocalValue(newValue);
    onValueChange?.(newValue);
  };

  return (
    <TabsContext.Provider value={{ value: currentValue, onValueChange: handleValueChange }}>
      <div className="w-full">{children}</div>
    </TabsContext.Provider>
  );
};

Tabs.propTypes = {
  defaultValue: PropTypes.string,
  value: PropTypes.string,
  onValueChange: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export const TabsList = ({ children }) => {
  return (
    <div className="inline-flex h-10 items-center justify-center rounded-lg bg-gray-100 p-1 mb-4">
      {children}
    </div>
  );
};

TabsList.propTypes = {
  children: PropTypes.node.isRequired,
};

export const TabsTrigger = ({ value, children }) => {
  const { value: currentValue, onValueChange } = React.useContext(TabsContext);
  const isSelected = currentValue === value;

  return (
    <button
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50
        ${isSelected 
          ? 'bg-white text-gray-900 shadow-sm'
          : 'text-gray-600 hover:text-gray-900'
        }`}
      onClick={() => onValueChange(value)}
    >
      {children}
    </button>
  );
};

TabsTrigger.propTypes = {
  value: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export const TabsContent = ({ value, children }) => {
  const { value: currentValue } = React.useContext(TabsContext);

  if (currentValue !== value) {
    return null;
  }

  return (
    <div className="mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2">
      {children}
    </div>
  );
};

TabsContent.propTypes = {
  value: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
