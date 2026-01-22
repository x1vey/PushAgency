'use client'

import React from 'react'

export default function CubeLoader() {
    return (
        <div className='flex flex-col items-center justify-center gap-12 p-12 min-h-[400px]' style={{ perspective: '1200px' }}>

            {/* 3D Scene Wrapper */}
            <div className='relative w-24 h-24 flex items-center justify-center' style={{ transformStyle: 'preserve-3d' }}>

                {/* THE SPINNING CUBE CONTAINER */}
                <div
                    className='relative w-full h-full'
                    style={{
                        transformStyle: 'preserve-3d',
                        animation: 'cubeSpin 8s linear infinite'
                    }}
                >

                    {/* Internal Core (The energy source) */}
                    <div
                        className='absolute inset-0 m-auto w-8 h-8 bg-black rounded-full blur-md'
                        style={{
                            boxShadow: '0 0 40px rgba(0,0,0,0.6)',
                            animation: 'pulseFast 2s ease-in-out infinite'
                        }}
                    />

                    {/* CUBE FACES */}
                    {/* Front */}
                    <div className='absolute inset-0 flex items-center justify-center' style={{ transformStyle: 'preserve-3d', transform: 'rotateY(0deg)' }}>
                        <div
                            className='w-full h-full absolute bg-gray-100/20 border-2 border-gray-400 backdrop-blur-sm'
                            style={{
                                boxShadow: '0 0 15px rgba(0,0,0,0.2)',
                                animation: 'breathe 3s ease-in-out infinite'
                            }}
                        />
                    </div>

                    {/* Back */}
                    <div className='absolute inset-0 flex items-center justify-center' style={{ transformStyle: 'preserve-3d', transform: 'rotateY(180deg)' }}>
                        <div
                            className='w-full h-full absolute bg-gray-100/20 border-2 border-gray-400 backdrop-blur-sm'
                            style={{
                                boxShadow: '0 0 15px rgba(0,0,0,0.2)',
                                animation: 'breathe 3s ease-in-out infinite'
                            }}
                        />
                    </div>

                    {/* Right */}
                    <div className='absolute inset-0 flex items-center justify-center' style={{ transformStyle: 'preserve-3d', transform: 'rotateY(90deg)' }}>
                        <div
                            className='w-full h-full absolute bg-gray-200/20 border-2 border-gray-500 backdrop-blur-sm'
                            style={{
                                boxShadow: '0 0 15px rgba(0,0,0,0.25)',
                                animation: 'breathe 3s ease-in-out infinite'
                            }}
                        />
                    </div>

                    {/* Left */}
                    <div className='absolute inset-0 flex items-center justify-center' style={{ transformStyle: 'preserve-3d', transform: 'rotateY(-90deg)' }}>
                        <div
                            className='w-full h-full absolute bg-gray-200/20 border-2 border-gray-500 backdrop-blur-sm'
                            style={{
                                boxShadow: '0 0 15px rgba(0,0,0,0.25)',
                                animation: 'breathe 3s ease-in-out infinite'
                            }}
                        />
                    </div>

                    {/* Top */}
                    <div className='absolute inset-0 flex items-center justify-center' style={{ transformStyle: 'preserve-3d', transform: 'rotateX(90deg)' }}>
                        <div
                            className='w-full h-full absolute bg-gray-300/20 border-2 border-gray-600 backdrop-blur-sm'
                            style={{
                                boxShadow: '0 0 15px rgba(0,0,0,0.3)',
                                animation: 'breathe 3s ease-in-out infinite'
                            }}
                        />
                    </div>

                    {/* Bottom */}
                    <div className='absolute inset-0 flex items-center justify-center' style={{ transformStyle: 'preserve-3d', transform: 'rotateX(-90deg)' }}>
                        <div
                            className='w-full h-full absolute bg-gray-300/20 border-2 border-gray-600 backdrop-blur-sm'
                            style={{
                                boxShadow: '0 0 15px rgba(0,0,0,0.3)',
                                animation: 'breathe 3s ease-in-out infinite'
                            }}
                        />
                    </div>
                </div>

                {/* Floor Shadow */}
                <div
                    className='absolute -bottom-20 w-24 h-8 bg-black/30 blur-xl rounded-[100%]'
                    style={{ animation: 'shadowBreathe 3s ease-in-out infinite' }}
                />
            </div>

            {/* Loading Text */}
            <div className='flex flex-col items-center gap-1 mt-2'>
                <h3 className='text-sm font-semibold tracking-[0.3em] text-gray-800 uppercase'>
                    Loading
                </h3>
                <p className='text-xs text-gray-500'>
                    Preparing your experience, please wait…
                </p>
            </div>

            {/* CSS Keyframes */}
            <style>{`
        @keyframes cubeSpin {
          0% { transform: rotateX(0deg) rotateY(0deg); }
          100% { transform: rotateX(360deg) rotateY(360deg); }
        }

        @keyframes breathe {
          0%, 100% { transform: translateZ(48px); opacity: 0.8; }
          50% { transform: translateZ(80px); opacity: 0.4; border-color: rgba(0,0,0,0.6); }
        }

        @keyframes pulseFast {
          0%, 100% { transform: scale(0.8); opacity: 0.5; }
          50% { transform: scale(1.2); opacity: 1; }
        }

        @keyframes shadowBreathe {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.5); opacity: 0.2; }
        }
      `}</style>
        </div>
    )
}
