import React from 'react'
import Header from '../header';
function CommonLayout({children}) {
  return (
    <div className='mx-auto max-w-7xl p-6 lg:px-8'>
    {/* Header Component */}
    <Header/>
    {/* Header Component */}



    {/* Main Component */}
    <main>
        {children}
    </main>
    {/* Main Component */}
    </div>
  )
}
export default CommonLayout;
