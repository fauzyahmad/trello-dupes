import React from 'react'

type Props = {
  children: React.ReactNode
}

const BgScreen = ({children}: Props) => {
  return (
    <div className="w-full h-screen bg-page-background bg-cover bg-center ">
      <div className="backdrop-blur-sm backdrop-brightness-75 h-screen ">
        <div className=" max-w-7xl my-0 mx-auto p-8 ">
          {children}
        </div>
      </div>
    </div>
  )
}

export default BgScreen
