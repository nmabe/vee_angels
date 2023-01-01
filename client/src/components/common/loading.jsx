import React from 'react';
import { Skeleton } from '../ui/skeleton';

export const LoadingSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
      <div className="w-full max-w-md px-4">
        {/* Logo SVG */}
        <div className="flex justify-center mb-12">
          <svg
            className="w-24 h-24 animate-pulse"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Angel wings */}
            <path
              d="M50 20 L35 45 Q30 50 35 55 L50 40 Z"
              fill="url(#gradient1)"
              opacity="0.9"
            />
            <path
              d="M50 20 L65 45 Q70 50 65 55 L50 40 Z"
              fill="url(#gradient2)"
              opacity="0.9"
            />

            {/* Halo */}
            <circle
              cx="50"
              cy="18"
              r="12"
              fill="none"
              stroke="url(#gradient1)"
              strokeWidth="1.5"
              opacity="0.7"
            />

            {/* Angel body/head */}
            <circle cx="50" cy="50" r="8" fill="url(#gradient1)" />

            {/* Dress/gown */}
            <path
              d="M42 58 Q50 70 58 58"
              fill="url(#gradient2)"
              opacity="0.8"
            />

            {/* Gradients */}
            <defs>
              <linearGradient
                id="gradient1"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#6366f1" />
              </linearGradient>
              <linearGradient
                id="gradient2"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
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
              <span
                className="inline-block w-2 h-2 bg-indigo-500 rounded-full animate-bounce"
                style={{ animationDelay: '0s' }}
              ></span>
              <span
                className="inline-block w-2 h-2 bg-indigo-500 rounded-full animate-bounce ml-1"
                style={{ animationDelay: '0.2s' }}
              ></span>
              <span
                className="inline-block w-2 h-2 bg-indigo-500 rounded-full animate-bounce ml-1"
                style={{ animationDelay: '0.4s' }}
              ></span>
            </span>
          </h2>
          <p className="text-slate-500 text-sm">Getting things ready for you</p>
        </div>

        {/* Skeleton placeholders */}
        <div className="space-y-4">
          <Skeleton className="h-4 w-full bg-slate-300 rounded-lg" />
          <Skeleton className="h-4 w-5/6 bg-slate-300 rounded-lg" />
          <Skeleton className="h-4 w-4/5 bg-slate-300 rounded-lg" />
        </div>
      </div>
    </div>
  )
}