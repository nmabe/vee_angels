import React, { useState, useEffect, useId } from 'react';
import { Skeleton } from '../ui/skeleton';

// Mock Skeleton component wrapper if using custom components, 
// otherwise import your standard UI Skeleton component
export const LoadingSkeletonGrid = () => {
  const [isMounted, setIsMounted] = useState(false);
  const baseId = useId(); // Guarantees identical unique IDs across Server & Client

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      <div className={`xs:h-[390px] max-w-sm h-[340px] bg-white relative my-auto overflow-hidden rounded-xl shadow-xl shadow-purple-300/10 hover:shadow-2xl hover:shadow-purple-400/40 transition-all duration-500 hover:-translate-y-2 scale-[0.98] hover:scale-[1.02] ${!isMounted ? 'pointer-events-none' : ''}`}>
        
        {/* FIX: Removed the outer <Skeleton> tag nesting around the container */}
        <div className={`h-48 w-full bg-slate-300 rounded-lg mb-4 flex justify-center items-center ${!isMounted ? '' : 'animate-pulse'}`}>
          <svg
            className="w-24 h-24"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Angel wings using safe unique IDs */}
            <path
              d="M50 20 L35 45 Q30 50 35 55 L50 40 Z"
              fill={`url(#${baseId}-g1)`}
              opacity="0.9"
            />
            <path
              d="M50 20 L65 45 Q70 50 65 55 L50 40 Z"
              fill={`url(#${baseId}-g2)`}
              opacity="0.9"
            />

            {/* Halo */}
            <circle
              cx="50"
              cy="18"
              r="12"
              fill="none"
              stroke={`url(#${baseId}-g1)`}
              strokeWidth="1.5"
              opacity="0.7"
            />

            {/* Angel body/head */}
            <circle cx="50" cy="50" r="8" fill={`url(#${baseId}-g1)`} />

            {/* Dress/gown */}
            <path
              d="M42 58 Q50 70 58 58"
              fill={`url(#${baseId}-g2)`}
              opacity="0.8"
            />

            {/* Unique Gradients */}
            <defs>
              <linearGradient id={`${baseId}-g1`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#6366f1" />
              </linearGradient>
              <linearGradient id={`${baseId}-g2`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Regular standalone placeholders remain safe */}
        <div className={`h-4 w-3/4 bg-slate-300 rounded-lg mb-2 ${!isMounted ? 'animate-none' : 'animate-pulse'}`} />
        <div className={`h-4 w-full bg-slate-300 rounded-lg mb-2 ${!isMounted ? 'animate-none' : 'animate-pulse'}`} />
        <div className={`h-4 w-1/2 bg-slate-300 rounded-lg ${!isMounted ? 'animate-none' : 'animate-pulse'}`} />
      </div>
    </>
  );
};

export const LoadingSkeleton = () => {
  const [isMounted, setIsMounted] = useState(false);
  const baseId = useId(); 

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // FIX 1: If the app hasn't mounted on the client browser yet, 
  // return a matching static layout to guarantee identical HTML trees.
  const bounceClass = isMounted ? 'animate-bounce' : '';
  const pulseClass = isMounted ? 'animate-pulse' : '';
  const skeletonPulse = isMounted ? '' : 'animate-none';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
      <div className="w-full max-w-md px-4">
        
        {/* Logo SVG */}
        <div className="flex justify-center mb-12">
          <svg
            className={`w-24 h-24 ${pulseClass}`}
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M50 20 L35 45 Q30 50 35 55 L50 40 Z"
              fill={`url(#${baseId}-g1)`}
              opacity="0.9"
            />
            <path
              d="M50 20 L65 45 Q70 50 65 55 L50 40 Z"
              fill={`url(#${baseId}-g2)`}
              opacity="0.9"
            />
            <circle
              cx="50"
              cy="18"
              r="12"
              fill="none"
              stroke={`url(#${baseId}-g1)`}
              strokeWidth="1.5"
              opacity="0.7"
            />
            <circle cx="50" cy="50" r="8" fill={`url(#${baseId}-g1)`} />
            <path
              d="M42 58 Q50 70 58 58"
              fill={`url(#${baseId}-g2)`}
              opacity="0.8"
            />
            <defs>
              <linearGradient id={`${baseId}-g1`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#6366f1" />
              </linearGradient>
              <linearGradient id={`${baseId}-g2`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Loading text */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-slate-800 mb-2">
            Loading
            <span className="inline-block ml-2">
              {/* FIX 2: Variables evaluated neatly to keep structural tags safe */}
              <span
                className={`inline-block w-2 h-2 bg-indigo-500 rounded-full ${bounceClass}`}
                style={{ animationDelay: '0s' }}
                suppressHydrationWarning
              ></span>
              <span
                className={`inline-block w-2 h-2 bg-indigo-500 rounded-full ml-1 ${bounceClass}`}
                style={{ animationDelay: '0.2s' }}
                suppressHydrationWarning
              ></span>
              <span
                className={`inline-block w-2 h-2 bg-indigo-500 rounded-full ml-1 ${bounceClass}`}
                style={{ animationDelay: '0.4s' }}
                suppressHydrationWarning
              ></span>
            </span>
          </h2>
          <p className="text-slate-500 text-sm">Getting things ready for you</p>
        </div>

        {/* Skeleton placeholders */}
        {/* FIX 3: Removed suppressHydrationWarning wrapper, clean class strings applied straight to Shadcn */}
        <div className="space-y-4">
          <Skeleton className={`h-4 w-full bg-slate-300 rounded-lg ${skeletonPulse}`} />
          <Skeleton className={`h-4 w-5/6 bg-slate-300 rounded-lg ${skeletonPulse}`} />
          <Skeleton className={`h-4 w-4/5 bg-slate-300 rounded-lg ${skeletonPulse}`} />
          <Skeleton className={`h-4 w-3/4 bg-slate-300 rounded-lg ${skeletonPulse}`} />  
        </div>
      </div>
    </div>
  );
};

