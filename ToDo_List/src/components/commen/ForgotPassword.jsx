import { useFormik } from 'formik'
import React from 'react'
import { forgotSchema } from '../../schemas';
import { passwordChangeApi } from '../../apis/auth';

const ForgotPassword = ({onClose}) => {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword:''
          },
          validationSchema: forgotSchema,
          onSubmit: async (values, action) => {
              try {
                await passwordChangeApi(values);
                onClose()
            } catch (err) {
              err;
            } 
          },
    })
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
      <div className="bg-white p-6 rounded-xl   w-full max-w-3xl">
        <div className='flex justify-between'>
        <h2 className="text-xl font-bold mb-4">Change password</h2>
        <img onClick={onClose} className='w-4 h-4' src="https://cdn-icons-png.flaticon.com/128/2976/2976286.png" alt="" />

        </div>
        <form onSubmit={formik.handleSubmit} >
        <div className="flex flex-col w-full  rounded mb-4 border-b">
        <div>
              <label htmlFor="email" className="text-base font-medium text-gray-900">
                Email address
              </label>
              <div className="mt-2.5">
                <input
                  type="string"
                  name="email"
                  id="email"
                  {...formik.getFieldProps('email')}
                  placeholder="Enter email "
                  className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                />
              </div>
              {formik.touched.credential && formik.errors.credential && (
                <div className="text-red-500 text-sm">{formik.errors.credential}</div>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-base font-medium text-gray-900">
                  New Password
                </label>
              </div>
              <div className="mt-2.5">
                <input
                  type="password"
                  name="password"
                  id="password"
                  {...formik.getFieldProps('password')}
                  placeholder="Enter your new password"
                  className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                />
              </div>
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-500 text-sm">{formik.errors.password}</div>
              )}
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-base font-medium text-gray-900">
                  Confirm Password
                </label>
              </div>
              <div className="mt-2.5">
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  {...formik.getFieldProps('confirmPassword')}
                  placeholder="Confirm Password"
                  className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                />
              </div>
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <div className="text-red-500 text-sm">{formik.errors.confirmPassword}</div>
              )}
            </div>
        </div>
        <div className='flex justify-between items-center'>
          <button type='submit' className="bg-blue-500 text-white px-4 py-2 rounded">
            Post
          </button>
          </div>
          </form>
      </div>

    </div>
  )
}

export default ForgotPassword
