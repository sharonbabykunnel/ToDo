import React from 'react';
import Signin from '../commen/Signin';

const SignInPage = () => {
  return (
    <section className="relative py-10 bg-gray-900 sm:py-16 h-[100vh] lg:py-24">
      <div className="absolute inset-0">
        <img
          className="object-cover w-full h-full"
          src="https://cdn.rareblocks.xyz/collection/celebration/images/signin/2/man-eating-noodles.jpg"
          alt=""
        />
      </div>
      <div className="absolute inset-0 bg-gray-900/20"></div>
      <Signin/>
    </section>
  );
};

export default SignInPage;
