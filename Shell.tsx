import React from 'react';
import {AbsoluteFill} from 'remotion';
import {loadFont} from '@remotion/google-fonts/Poppins';
import {C} from './palette';

const {fontFamily} = loadFont('normal', {weights: ['500', '800', '900'], subsets: ['latin']});
export const FONT = `${fontFamily}, Helvetica, Arial, sans-serif`;

// Background + paper-grain overlay. The camera lives inside this.
export const SceneShell: React.FC<{bg?: string; children: React.ReactNode}> = ({
  bg = C.cream,
  children,
}) => (
  <AbsoluteFill style={{backgroundColor: bg, overflow: 'hidden'}}>
    {children}
    <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0}}>
      <filter id="grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="1080" height="1920" filter="url(#grain)" opacity="0.08" style={{mixBlendMode: 'multiply'}} />
    </svg>
  </AbsoluteFill>
);

// The drawing surface. overflow: visible so the camera can zoom far out.
export const World: React.FC<{children: React.ReactNode}> = ({children}) => (
  <svg
    width={1080}
    height={1920}
    viewBox="0 0 1080 1920"
    style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}}
  >
    {children}
  </svg>
);

export const Backdrop: React.FC<{fill: string}> = ({fill}) => (
  <rect x={-9000} y={-9000} width={18000} height={18000} fill={fill} />
);
