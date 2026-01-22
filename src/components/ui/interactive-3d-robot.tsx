'use client';

import { Suspense, lazy } from 'react';
import type { Application } from '@splinetool/runtime';
const Spline = lazy(() => import('@splinetool/react-spline'));

interface InteractiveRobotSplineProps {
  scene: string;
  className?: string;
}

export function InteractiveRobotSpline({ scene, className }: InteractiveRobotSplineProps) {
  const onLoad = (spline: Application) => {
    const allObjects = spline.getAllObjects();

    allObjects.forEach((obj: any) => {
      // Maximum ambient light to kill all shadows
      if (obj.type === 'AmbientLight') {
        if (obj.intensity !== undefined) {
          obj.intensity = 3.0; // Extremely strong ambient light
        }
      }

      // Also boost all other lights and reposition them for even coverage
      if (obj.type === 'DirectionalLight') {
        if (obj.intensity !== undefined) {
          obj.intensity = 1.2; // Strong directional lights too
        }
        // Position from front to minimize shadows
        obj.position.set(0, 100, 500);
        if (obj.lookAt) {
          obj.lookAt(0, 0, 0);
        }
      }

      // Boost point lights if they exist
      if (obj.type === 'PointLight') {
        if (obj.intensity !== undefined) {
          obj.intensity = 2.0;
        }
      }
    });
  };

  return (
    <Suspense
      fallback={
        <div className={`w-full h-full flex items-center justify-center bg-transparent text-white ${className}`}>
          <svg className="animate-spin h-5 w-5 text-white mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l2-2.647z"></path>
          </svg>
        </div>
      }
    >
      {/* Outer container matches className dimensions */}
      <div className={`relative ${className}`} style={{ overflow: 'hidden' }}>
        {/* Inner container is larger to push watermark outside visible area */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: '-50px',
            overflow: 'hidden',
          }}
        >
          <Spline
            scene={scene}
            onLoad={onLoad}
            style={{
              width: '100%',
              height: 'calc(100% + 50px)',
              filter: 'brightness(1.6) contrast(0.95) saturate(1.2) drop-shadow(0 0 20px rgba(255,255,255,0.3))', // Lower contrast to reduce shadow depth
            }}
          />
        </div>
      </div>
    </Suspense>
  );
}
