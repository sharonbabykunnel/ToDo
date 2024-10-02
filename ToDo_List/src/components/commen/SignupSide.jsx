import React from 'react'
import { Link } from 'react-router-dom'

const SignupSide = () => {
  return (
  <div className="flex items-center justify-center px-4 py-10 sm:py-16 lg:py-24 bg-gray-50 sm:px-6 lg:px-8">
    <div>
      <img
        className="w-full mx-auto"
        src="https://cdn.rareblocks.xyz/collection/celebration/images/signup/1/cards.png"
        alt="Sign up illustration"
      />

      <div className="w-full max-w-md mx-auto xl:max-w-xl">
        {/* <h3 className="text-2xl font-bold text-center text-black">Make fly your article</h3>
        <p className="leading-relaxed text-center text-gray-500 mt-2.5">
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis.
        </p> */}
        <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">Sign up to Celebration</h2>
        <p className="mt-2 text-base text-gray-600">
            Already have an account?{' '}
            <Link
            to='/signin'
            className="font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 hover:underline focus:text-blue-700"
            >
            Login
            </Link>
        </p>

        {/* <div className="flex items-center justify-center mt-10 space-x-3">
          <div className="bg-orange-500 rounded-full w-20 h-1.5"></div>

          <div className="bg-gray-200 rounded-full w-12 h-1.5"></div>

          <div className="bg-gray-200 rounded-full w-12 h-1.5"></div>
        </div> */}
      </div>
    </div>
  </div>
  )
}

export default SignupSide
