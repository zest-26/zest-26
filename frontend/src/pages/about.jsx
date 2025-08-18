import React from 'react'

const about = () => {
  return (
    <div>
      <div className="animate2 fixed lg:left-16 left-16 top-20 lg:top-48 animate2 z-20 opacity-0 text-white">
            <h2 className="text-3xl lg:text-5xl font-bold text-center">
              ZEST BY NUMBERS
            </h2>
            <div className="flex flex-col pt-10 gap-10 justify-center items-center">
              <div className="flex gap-10 text-xl font-semibold">
                <div>
                  <div className="text-center">200+</div>Colleges
                </div>
                <div>
                  <div className="text-center">30K+</div>FOOTFALL
                </div>
              </div>
              <div className="flex gap-10 text-xl font-semibold">
                <div>
                  <div className="text-center">25K+</div>EYEBALLS
                </div>
                <div>
                  <div className="text-center">5K+</div>PARTICIPANTS
                </div>
              </div>
            </div>
          </div>
    </div>
  )
}

export default about
