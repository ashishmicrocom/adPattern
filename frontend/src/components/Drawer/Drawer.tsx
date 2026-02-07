"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Drawer.css";
import dynamic from "next/dynamic";

const LoginScreen = dynamic(() => import("../LoginScreen/LoginScreen").then((mod) => mod.default), { ssr: false });

type DrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Drawer({ isOpen, onClose }: DrawerProps) {
  const [showLogin, setShowLogin] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(() => {
    try {
      return localStorage.getItem('adpatterns_user_email');
    } catch (err) {
      return null;
    }
  });
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    // update from storage or custom event
    const onAuth = (ev: Event) => {
      const ce = ev as CustomEvent;
      if (ce?.detail?.email) setUserEmail(ce.detail.email);
      else setUserEmail(() => localStorage.getItem('adpatterns_user_email'));
    };

    const onStorage = (e: StorageEvent) => {
      if (e.key === 'adpatterns_user_email') setUserEmail(e.newValue);
    };

    window.addEventListener('adpatterns:auth-changed', onAuth as EventListener);
    window.addEventListener('storage', onStorage);

    return () => {
      window.removeEventListener('adpatterns:auth-changed', onAuth as EventListener);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  function handleLogout() {
    try {
      localStorage.removeItem('adpatterns_auth_token');
      localStorage.removeItem('adpatterns_user_email');
    } catch (err) {
      // ignore
    }
    try {
      window.dispatchEvent(new CustomEvent('adpatterns:auth-changed', { detail: { loggedIn: false } }));
    } catch (err) {
      // ignore
    }
    setUserEmail(null);
    setShowLogin(false);
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="ap-drawer__backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.45 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="ap-drawer"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{
              // softer spring for a smooth upward motion
              y: { type: 'spring', stiffness: 80, damping: 20, mass: 0.7 },
            }}
          >
            <div className="ap-drawer__content">
              <motion.div className="ap-drawer__media" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.45 }} />

              <div className="ap-drawer__panel">
                {/* topbar: fixed over the drawer, contains Need Help, Log in and the close button positioned over the navbar/menu */}
                <div className="ap-drawer__topbar">
                  <div className="ap-drawer__help">Need Help?</div>
                  {userEmail ? (
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <button className="ap-drawer__login">{`Hi, ${userEmail}`}</button>
                      <button className="ap-drawer__login" onClick={handleLogout}>Logout</button>
                    </div>
                  ) : (
                    <button className="ap-drawer__login" onClick={() => setShowLogin(true)}>Log in</button>
                  )}
                  <button className="ap-drawer__close" onClick={onClose} aria-label="Close menu">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>

                {/* Login screen overlay (opened from login button) */}
                <LoginScreen isOpen={showLogin} onClose={() => setShowLogin(false)} />

                <motion.nav className="ap-drawer__nav" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 1.45 }}>
                  {/* <a href="#" className="ap-drawer__link">Products</a> */}
                  <a href="#" className="ap-drawer__link">About Us</a>
                  <a href="#" className="ap-drawer__link">Services</a>
                  <a href="#" className="ap-drawer__link">For Business</a>
                  <a href="#" className="ap-drawer__link">Careers</a>
                  <a href="#" className="ap-drawer__link">Contacts</a>
                </motion.nav>

                <div className="ap-drawer__footer">
                  <div className="ap-drawer__legal">
                    <div>Terms of Use</div>
                    <div>Privacy policy</div>
                    <div>e-Privacy Settings</div>
                  </div>
                  <div className="ap-drawer__legal-right">
                    <div>Subscription terms</div>
                    <div>Money-back policy</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
