import React, {useState, useEffect} from 'react'

const ToastMessage = ({ type, message, duration = 2000 }) => {

  const [ showToast, setShowToast ] = useState(false)
  useEffect(() => {
    setShowToast(true)
    setTimeout(() => setShowToast(false), duration)
 }, [])

    return (
      <>
      {showToast &&
       <div className="fixed-top d-flex justify-content-center" style={{zIndex: "11"}}>
       <div className={`toast p-3  bg-${type}`} style={{display:"block", justifyContent:"center"}}>
        {message}
       </div>
     </div>
      }  
      </>
    )
}

export default ToastMessage
