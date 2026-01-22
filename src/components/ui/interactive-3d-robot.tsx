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
    let directionalLightCount = 0;
    let pointLightCount = 0;

    allObjects.forEach((obj: any) => {
      // Maximum ambient light for even illumination
      if (obj.type === 'AmbientLight') {
        if (obj.intensity !== undefined) {
          obj.intensity = 4.0; // Very strong ambient light for face visibility
        }
      }

      // Position directional lights - first one front, second one right side
      if (obj.type === 'DirectionalLight') {
        directionalLightCount++;
        if (obj.intensity !== undefined) {
          obj.intensity = 2.5; // Strong light
        }

        if (directionalLightCount === 1) {
          // First light: directly in front
          obj.position.set(0, 50, 800);
        } else {
          // Second light: from the right side
          obj.position.set(400, 100, 400);
        }

        if (obj.lookAt) {
          obj.lookAt(0, 0, 0);
        }
      }

      // Position point lights - alternate between front-right and right
      if (obj.type === 'PointLight') {
        pointLightCount++;
        if (obj.intensity !== undefined) {
          obj.intensity = 3.5;
        }

        if (obj.position) {
          if (pointLightCount === 1) {
            // First point light: front-right
            obj.position.set(300, 50, 500);
          } else if (pointLightCount === 2) {
            // Second point light: right side
            obj.position.set(500, 0, 200);
          } else {
            // Additional lights: push forward
            obj.position.z = Math.max(obj.position.z, 200);
          }
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
              filter: 'brightness(1.8) contrast(0.9) saturate(1.2) drop-shadow(0 0 20px rgba(255,255,255,0.4))',
            }}
          />
        </div>
      </div>
    </Suspense>
  );
}
