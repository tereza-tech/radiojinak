import React, { ReactNode } from 'react'

import Header from './header'
//import PartitionTest from './partitionTest'
import Footer from './footer'

interface LayoutProps {
  children?: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen justify-between font-content antialiased">
      <Header />
    {/*  <PartitionTest data={[
      { value: 1, key: '1' },
      { value: 2, key: '2' },
      {
        value: 0,
        key: '3',
        children: [
          { value: 1, key: 'a1' },
          { value: 2, key: 'a2' },
          {
            value: 0,
            key: 'a3',
            children: [
              { value: 1, key: 'b1' },
              { value: 2, key: 'b2' },
              {
                value: 3,
                key: 'b3',
              },
            ],
          },
        ],
      },
    ]
  }></PartitionTest> */}
      <main className="mb-auto">{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
