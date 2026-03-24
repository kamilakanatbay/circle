'use client'

import dynamic from 'next/dynamic'

// dynamic with ssr:false must live in a Client Component
const MapClientShell = dynamic(
  () => import('@/components/MapClientShell'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-void">
        <div className="space-y-4 text-center">
          <div
            className="w-10 h-10 rounded-full border-2 border-mist mx-auto"
            style={{
              borderTopColor: 'rgba(245,240,232,0.6)',
              animation: 'spin 0.9s linear infinite',
            }}
          />
          <p className="text-sm text-ash">Finding your people&hellip;</p>
        </div>
      </div>
    ),
  }
)

export function MapPageClient() {
  return (
    // Fixed below the 64px Navbar — escapes layout's flex-1 main
    <div className="fixed inset-0" style={{ top: '64px' }}>
      <MapClientShell />
    </div>
  )
}
