declare module 'react-owl-carousel2' {
    import React from 'react';
  
    export interface Options {
      items?: number;
      loop?: boolean;
      margin?: number;
      nav?: boolean;
      dots?: boolean;
      autoplay?: boolean;
      responsive?: {
        [breakpoint: number]: {
          items: number;
        };
      };
    }
  
    export interface OwlCarouselProps {
      options: Options;
      className?: string;
      children: React.ReactNode;
    }
  
    const OwlCarousel: React.FC<OwlCarouselProps>;
  
    export default OwlCarousel;
  }
  