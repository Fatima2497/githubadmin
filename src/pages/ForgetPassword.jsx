import React from 'react'
import CustomInput from '../components/CustomInput'

const ForgetPassword = () => {
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
        <h3 className="text-center title">Forgot Password</h3>
        <p className="text-center">
          Please Enter your email to get the reset password mail.
        </p>
        <form action="">
          <CustomInput type="email" label="Email Address" id="email" />

          <button
            className="border-0 px-3 py-2 text-white fw-bold w-100"
            style={{ background: "#ffd333" }}
            type="submit"
          >
            Forgot Password
          </button>
        </form>
      </div>
     </div>
    </div>
    </>
  )
}

export default ForgetPassword