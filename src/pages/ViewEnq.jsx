import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { getAEnquriry,resetState,updateEnquriry } from '../features/enquiry/enquirySlice'
import {BiArrowBack} from 'react-icons/bi'
const ViewEnq = () => {
    const local = useLocation()
    const getEnqId = local.pathname.split("/")[3]

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const enqState = useSelector((state)=> state.enquiry)
    const {enqName, enqMobile, enqEmail, enqComment, enqStatus} = enqState
    useEffect(()=>{
        dispatch(getAEnquriry(getEnqId))
    },[getEnqId])

    const goBack = () => {
        navigate(-1)
    }

    const setEnq = (e,i) => {
        const data = {id: i, enqData: e}
        dispatch(updateEnquriry(data))
        dispatch(resetState())
        setTimeout(()=>{
            dispatch(getAEnquriry(getEnqId))
        },100)
      }
  return (
    <div>
        <div className="d-flex align-items-center justify-content-between">
        <h3 className="mb-4 title">View Enquiry</h3>
        <button
         onClick={goBack} 
         className=' btn btn-light border-0 fs-5 mb-0 d-flex align-items-center gap-2'>
            <BiArrowBack className='fs-5' /> Go Back
        </button>
        </div>
        <div className="bg-white rounded-3 mt-5 p-4 d-flex flex-column gap-3">
            <div className="d-flex align-items-center gap-3">
                <h6 className='mb-0'>Name:</h6>
                <p className='mb-0'>{enqName}</p>
            </div>
            <div className="d-flex align-items-center gap-3">
                <h6 className='mb-0'>Email:</h6>
                <p className='mb-0'>
                    <a href={`mailto:${enqEmail}`}>{enqEmail}</a>
                </p>
            </div>
            <div className="d-flex align-items-center gap-3">
                <h6 className='mb-0'>Mobile:</h6>
                <p className='mb-0'>
                    <a href={`tel:+92${enqMobile}`}>{enqMobile}</a>
                </p>
            </div>
            <div className="d-flex align-items-center gap-3">
                <h6 className='mb-0'>Comment:</h6>
                <p className='mb-0'>{enqComment}</p>
            </div>
            <div className="d-flex align-items-center gap-3">
                <h6 className='mb-0'>Status:</h6>
                <p className='mb-0'>{enqStatus}</p>
            </div>
            <div className="d-flex align-items-center gap-3">
                <h6 className='mb-0'>Status:</h6>
                <div>
                    <select name="" id="" 
                    defaulValue={enqStatus ? enqStatus : "Submitted"} 
                    className='form-control form-select '
                    onChange={(e)=>setEnq(e.target.value, getEnqId)}
                    >
                        <option value="Submitted">Submitted</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Progress">Progress</option>
                        <option value="Resolved">Resolved</option>
                    </select>
                </div>
            </div>
        </div>
        </div>
  )
}

export default ViewEnq