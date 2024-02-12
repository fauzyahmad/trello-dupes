import clsx from "clsx";
import React from 'react'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  secondary?: boolean;
  className?: string;
}

export default function Button({ children, className, ...props}: Props) {
  return (
    <button
      className={
        clsx(className, "px-4 py-2 rounded-sm")
      }
      {...props}
    >
      {children}
    </button>
  )
}
