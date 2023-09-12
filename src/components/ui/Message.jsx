import { useEffect, useState } from "react"

export default function Message ({ state , error , message , icon }) {
     const [showMessage , setShowMessage] = useState(false)
         
     useEffect(() => {
        if (state) {
          const timeout = setTimeout(() => {
            setShowMessage(false);
          }, 2000);
    
          setShowMessage(true); // Update showMessage state before setting the timeout
    
          return () => clearTimeout(timeout);
        } else {
          setShowMessage(false); // Reset showMessage state if state is false
        }
      }, [state]);    
    
      return (
        <>
          {showMessage ?
            <div className={`fixed flex items-center justify-center shadow-lg z-20 w-5/6 md:w-1/3 rounded-l-lg overflow-hidden right-0 top-10 ${error ? 'bg-red-600' : 'bg-lime-500'} py-4 px-6 text-center text-white`}>
              <div className="absolute w-full h-1.5 bg-white bottom-0 left-0 origin-left animate-message_line__animation"></div>
              <span className="capitalize font-bold space-x-2 flex flex-row items-center justify-center w-fit">{icon}<p>{message}</p></span>
            </div> : null
          }
        </>
    );
}