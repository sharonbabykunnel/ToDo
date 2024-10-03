import { useFormik } from 'formik';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { signinApi } from '../../apis/auth';
import { loginSchema } from '../../schemas';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/userSlice';
import ForgotPassword from './ForgotPassword';

const Signin = () => {
        const navigate = useNavigate();
        const dispatch = useDispatch();
        const [isOpen, setIsOpen] = useState(false)

        const openForgot = ()=>{
          setIsOpen(true)
        }

        const onClose = ()=>{
          setIsOpen(false);
        }
    
        const formik = useFormik({
            initialValues: {
              credential: '',
              password: '',
            },
            validationSchema: loginSchema,
            onSubmit: async (values, action) => {
                try {
                    const response = await signinApi(values);
                    if(response.success){
                        dispatch(setUser(response.data));
                        navigate('/home');
                    }
              } catch (err) {
                err;
              } finally {
              }
            },
          });
  return (
    <div className="relative max-w-lg  px-4 mx-auto sm:px-0">
    <div className="overflow-hidden bg-white rounded-md shadow-md">
      <div className="px-4 py-6 sm:px-8 sm:py-7">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
          <p className="mt-2 text-base text-gray-600">
            Don’t have one?{' '}
            <Link
              to='/signup'
              className="text-blue-600 transition-all duration-200 hover:underline hover:text-blue-700"
            >
              Create a free account
            </Link>
          </p>
        </div>

        <form onSubmit={formik.handleSubmit} className="mt-8">
          <div className="space-y-5">
            <div>
              <label htmlFor="email" className="text-base font-medium text-gray-900">
                Email address or Phone number
              </label>
              <div className="mt-2.5">
                <input
                  type="string"
                  name="credential"
                  id="credential"
                  {...formik.getFieldProps('credential')}
                  placeholder="Enter email or number to get started"
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
                  Password
                </label>

                <div onClick={openForgot}
                  className="text-sm font-medium transition-all duration-200 text-rose-500 hover:text-rose-600 focus:text-rose-600 hover:underline"
                >
                  Forgot password?
                </div>
              </div>
              <div className="mt-2.5">
                <input
                  type="password"
                  name="password"
                  id="password"
                  {...formik.getFieldProps('password')}
                  placeholder="Enter your password"
                  className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                />
              </div>
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-500 text-sm">{formik.errors.password}</div>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700"
              >
                Log in
              </button>
            </div>

            {/* <div>
              <button
                type="button"
                className="relative inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-gray-700 transition-all duration-200 bg-white border-2 border-gray-200 rounded-md hover:bg-gray-100 focus:bg-gray-100 hover:text-black focus:text-black focus:outline-none"
              >
                <div className="absolute inset-y-0 left-0 p-4">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                  </svg>
                </div>
                Sign in with Google
              </button>
            </div> */}
          </div>
        </form>
        {isOpen && <ForgotPassword onClose={onClose} />}
      </div>
    </div>
  </div>
  )
}

export default Signin
