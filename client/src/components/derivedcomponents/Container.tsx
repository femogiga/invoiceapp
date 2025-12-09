import React from 'react'

const Container = ({children}) => {
  return (
    <div
      className='md:grid md:grid-cols-12 relative max-h-dvh overflow-scroll p-2
'>
      {children}
    </div>
  );
}

export default Container
