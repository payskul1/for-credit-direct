import React from 'react'

const Header = () => {
  return (
    <div>
      <header className="sticky top-0 left-0 z-10 w-full border-b bg-primary px-6 py-6 sm:px-8 sm:py-6 lg:px-10 lg:py-6">
        <nav className="flex items-center justify-between">
          {/* Left Side */}
          <div className="flex items-center gap-4">
            <img 
              src="icon.png" 
              alt="Icon Logo" 
              className="h-10 w-10 sm:h-12 sm:w-12 object-contain"
            />
            <span className="text-white text-base sm:text-lg font-semibold">Credit Direct</span>
          </div>

          {/* Right Side */}
          <div>
            <img 
              src="creditDirect.png" 
              alt="Credit Direct Logo" 
              className="h-10 w-auto sm:h-12 object-contain"
            />
          </div>
        </nav>
      </header>
    </div>
  )
}

export default Header
