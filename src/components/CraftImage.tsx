import React, { useState } from 'react';
import { Award, Sparkles } from 'lucide-react';

interface CraftImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackCategory?: string;
  badgeText?: string;
}

export const CraftImage: React.FC<CraftImageProps> = ({
  src,
  alt = 'Heritage Craft',
  className = '',
  fallbackCategory = 'Heritage Craft',
  badgeText,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // If image fails, render an authentic, handcrafted visual container
  if (hasError || !src) {
    return (
      <div 
        className={`bg-gradient-to-br from-amber-950 via-stone-900 to-amber-900 text-amber-100 flex flex-col items-center justify-center p-4 relative overflow-hidden select-none ${className}`}
      >
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:12px_12px]" />
        
        <div className="relative z-10 flex flex-col items-center text-center space-y-1.5">
          <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shadow-inner">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="text-xs font-serif-heritage font-bold text-amber-200 line-clamp-1 max-w-[90%]">
            {alt}
          </span>
          <span className="text-[10px] uppercase font-mono tracking-wider text-amber-400/80 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/20">
            {fallbackCategory}
          </span>
        </div>

        {badgeText && (
          <div className="absolute top-2 right-2 bg-amber-500/30 text-amber-200 text-[9px] font-mono px-1.5 py-0.5 rounded border border-amber-400/30 flex items-center gap-1">
            <Award className="w-2.5 h-2.5" /> {badgeText}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-stone-200 animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onError={() => setHasError(true)}
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        {...props}
      />
    </div>
  );
};
