import React from 'react'


const Welcome = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-700 text-white px-6 py-12 text-center">
      <div className="max-w-xl space-y-6">
        <h1 className="text-3xl sm:text-4xl font-bold">
          Welcome to Payskul Checkout!
        </h1>
        <p className="text-lg sm:text-xl">
          We're excited to have you here. Enjoy a seamless, secure Buy Now, Pay Later experience.
        </p>
        <p className="text-md sm:text-lg">
          Want to learn more? Visit our partner platform — <br />
          <a 
            href="https://payskul.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-yellow-300 underline hover:text-yellow-200"
          >
            Payskul.com
          </a>
        </p>
      </div>
    </div>
  )
}

export default Welcome

