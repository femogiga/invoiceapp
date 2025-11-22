import React from 'react'

const Container = ({children}) => {
  return (
      <div className="md:grid md:grid-cols-12">{ children}</div>
  )
}

export default Container
