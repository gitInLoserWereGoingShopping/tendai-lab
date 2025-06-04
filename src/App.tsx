import React from 'react';
import SentienceConsole from './SentienceConsole';
import Tendai from './Tendai';
import './CRTScanlines.css';

export default function App() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ fontFamily: 'VT323, monospace' }}>WhimWeld Dev Shell</h1>
      <SentienceConsole />
      <Tendai />
    </div>
  );
}
