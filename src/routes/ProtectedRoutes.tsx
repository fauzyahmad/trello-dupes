import React from 'react'
import { Navigate } from "react-router-dom";

type Props = {
  isAllowed: boolean;
  children: React.ReactNode;
}

const ProtectedRoutes = ({isAllowed, children}: Props) => {
  if(isAllowed) {
    return <>{children}</>
  }
  return <Navigate to="/login" replace />
}

export default ProtectedRoutes
