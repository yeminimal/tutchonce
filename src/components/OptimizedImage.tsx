
import React, { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: string;
  height?: string;
  className?: string;
  loading?: 'eager' | 'lazy';
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  loading = 'lazy'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      onLoad={() => setIsLoaded(true)}
      className={`lazy-image ${isLoaded ? 'loaded' : ''} ${className}`}
    />
  );
};

export default OptimizedImage;
