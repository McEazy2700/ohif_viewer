import React from 'react';

export const OHIFLogo = () => (
  <img
    src={`${(window as any).PUBLIC_URL || ''}nnpc-logo.png`}
    alt="NNPC Logo"
    style={{ height: '36px', width: 'auto', objectFit: 'contain' }}
  />
);

export default OHIFLogo;
