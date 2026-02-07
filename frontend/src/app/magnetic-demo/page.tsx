"use client";

import React from 'react';
import MagneticCursor from '../../components/ui/magnetic-cursor';
import './page.css';

export default function MagneticDemoPage() {
  return (
    <MagneticCursor cursorSize={28} magneticFactor={0.5} blendMode="exclusion">
      <div className="magnetic-demo-root">
        <header className="magnetic-demo-header">
          <h1>Magnetic Cursor Demo (No Tailwind)</h1>
        </header>

        <main className="magnetic-demo-main">
          <section className="demo-grid">
            <div data-magnetic className="magnetic-box">Hover me</div>
            <div data-magnetic data-magnetic-color="#FF8A00" className="magnetic-box">Primary</div>
            <div data-magnetic className="magnetic-box">Demo</div>
            <div data-magnetic className="magnetic-box">Buttons</div>
          </section>

          <p style={{ maxWidth: 720, margin: '28px auto', textAlign: 'center' }}>
            This demo uses plain CSS and the MagneticCursor component. Elements with the
            <code>data-magnetic</code> attribute become magnetic targets.
          </p>
        </main>

        <footer className="magnetic-demo-footer">GSAP-based Magnetic Cursor</footer>
      </div>
    </MagneticCursor>
  );
}
