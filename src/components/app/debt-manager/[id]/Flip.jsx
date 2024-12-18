import React, { useState } from "react";

export default function FlipCard() {
  const [flip, setFlip] = useState(false);

  return (
    <>
      <div class="[perspective:1000px] w-40 h-6 group bg-red-500">
        <div class="h-full w-full preserve-3d group-hover:rotate-y-180 relative transition-transform duration-500 font-bold">
          <div class="backface-hidden absolute top-0 bottom-0 right-0 left-0 flex items-center justify-center">
            <h2>Lend</h2>
          </div>
          <div class="backface-hidden rotate-y-180 absolute top-0 bottom-0 right-0 left-0 flex items-center justify-center">
            <h2>Borrowed From</h2>
          </div>
        </div>
      </div>
      {/* <div class="perspective w-40 group">
        <div class="preserve-3d group-hover:rotate-y-180 text-center relative p-20 transition-transform duration-1000 text-white font-bold">
          <div class="backface-hidden absolute top-0 bottom-0 right-0 left-0 p-8 bg-pink-600 flex items-center justify-center">
            <h2>Front</h2>
          </div>
          <div class="backface-hidden rotate-y-180 absolute top-0 bottom-0 right-0 left-0 p-8 bg-teal-500 flex items-center justify-center">
            <h2>Back</h2>
          </div>
        </div>
      </div> */}
    </>
  );
}
