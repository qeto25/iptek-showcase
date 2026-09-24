import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

// Authentic Microsoft Word 365 Official Image
export const WordBrandIcon: React.FC<IconProps> = ({ className = 'w-16 h-16', size }) => (
  <img
    src="/images/word.png"
    alt="Microsoft Word 365"
    className={`${className} object-contain`}
    style={size ? { width: size, height: size } : undefined}
    loading="eager"
    decoding="async"
    draggable={false}
  />
);

// Authentic Microsoft Excel 365 Official Image
export const ExcelBrandIcon: React.FC<IconProps> = ({ className = 'w-16 h-16', size }) => (
  <img
    src="/images/excel.png"
    alt="Microsoft Excel 365"
    className={`${className} object-contain`}
    style={size ? { width: size, height: size } : undefined}
    loading="eager"
    decoding="async"
    draggable={false}
  />
);

// Authentic Canva Official Logo Image
export const CanvaBrandIcon: React.FC<IconProps> = ({ className = 'w-16 h-16', size }) => (
  <img
    src="/images/canva.png?v=2"
    alt="Canva"
    className={`${className} rounded-full object-contain`}
    style={size ? { width: size, height: size } : undefined}
    loading="eager"
    decoding="async"
    draggable={false}
  />
);
