import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

export const PrivateOutlet = (props) => {
  const { children } = props;
  const location = useLocation();
  const { authenticated } = useSelector((state) => state.authentication);

  if (!authenticated) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return children;
};
