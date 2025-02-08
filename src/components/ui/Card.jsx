import React from 'react';
import PropTypes from 'prop-types';

export const Card = ({ className = '', children, ...props }) => {
  return (
    <div
      className={`rounded-lg border border-gray-200 bg-white text-gray-950 shadow-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

Card.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export const CardHeader = ({ className = '', children, ...props }) => {
  return (
    <div
      className={`flex flex-col space-y-1.5 p-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

CardHeader.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export const CardTitle = ({ className = '', children, ...props }) => {
  return (
    <h3
      className={`text-lg font-semibold leading-none tracking-tight ${className}`}
      {...props}
    >
      {children}
    </h3>
  );
};

CardTitle.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export const CardDescription = ({ className = '', children, ...props }) => {
  return (
    <p
      className={`text-sm text-gray-500 ${className}`}
      {...props}
    >
      {children}
    </p>
  );
};

CardDescription.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export const CardContent = ({ className = '', children, ...props }) => {
  return (
    <div className={`p-6 pt-0 ${className}`} {...props}>
      {children}
    </div>
  );
};

CardContent.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export const CardFooter = ({ className = '', children, ...props }) => {
  return (
    <div
      className={`flex items-center p-6 pt-0 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

CardFooter.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Card;
