import { useState } from 'react';
import Image from 'next/image';

export default function ImageWithFallback({
  src,
  alt,
  fallbackSrc,
  className,
  width,
  height,
  ...props
}: {
  src: string;
  alt: string;
  fallbackSrc: string;
  className: string;
  width: number;
  height: number;
}) {
  const [hasError, setHasError] = useState(false);

  return (
    <Image
      {...props}
      src={hasError ? fallbackSrc : src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      onError={() => !hasError && setHasError(true)}
    />
  );
}
