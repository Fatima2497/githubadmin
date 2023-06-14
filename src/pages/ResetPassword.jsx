import React from 'react'
import CustomInput from '../components/CustomInput'

const ResetPassword = () => {
  return (
    <>
    <div className="py-5" style={{ minHeight: "100vh" }}>
      <br />
      <br />
      <br />
      <br />
      <br />
     <div className="main-div">
     <div className="my-5 main-form bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center title">Reset Password</h3>
        <p className="text-center">
          Please Enter your new Password.
        </p>
        <form action="">
          <CustomInput type="password" label="Password" id="pass" />
          <CustomInput type="password" label="Confirm password" id="pass" />

          <button
            className="border-0 px-3 py-2 text-white fw-bold w-100"
            style={{ background: "#ffd333" }}
            type="submit"
          >
            Reset Password
          </button>
        </form>
      </div>
     </div>
    </div>
    </>
  )
}

export default ResetPassword