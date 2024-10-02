import React from 'react';
import Signup from '../commen/Signup';
import SignupSide from '../commen/SignupSide';

const SignUpPage = () => {



  return (
    <section className="bg-white">
      <div className="grid grid-cols-2">
        <Signup/>
        <SignupSide/>
      </div>
    </section>
  );
};

export default SignUpPage;
