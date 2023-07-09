import React from 'react'
import { Image } from 'react-bootstrap'

export default function Background() {
  {/* background image  */ }
  return (
    <div className="bg-img-holder">
      <Image
        src="/background.png"
        alt="background"
        width="1550"
        height="960"
      />
    </div>
  )
}
