"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { API_ENDPOINTS } from "@/lib/api";
import "./LoginScreen.css";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

type Mode = "login" | "signup" | "success";

export default function LoginScreen({ isOpen, onClose }: Props) {
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const emailRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      // reset when closed
      setMode("login");
      setEmail("");
      setPassword("");
      setFullName("");
      setPhoneNumber("");
      setMessage(null);
    }
  }, [isOpen]);

  useEffect(() => {
    // focus email field when mode changes
    if (mode === "login" || mode === "signup") emailRef.current?.focus();
  }, [mode]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  async function submitLogin(e?: React.FormEvent) {
    e?.preventDefault();
    setMessage(null);
    if (!email || !password) {
      setMessage("Please enter both email and password.");
      return;
    }
    
    setSending(true);
    try {
      const response = await fetch(API_ENDPOINTS.auth.login, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      if (!response.ok) {
        const error = await response.json().catch(() => ({ detail: 'Login failed' }));
        setMessage(error.detail || 'Invalid email or password.');
        setSending(false);
        return;
      }
      
      const data = await response.json();
      // Store the auth token
      localStorage.setItem('adpatterns_auth_token', data.access_token);
      localStorage.setItem('adpatterns_user_email', email);
      // notify other parts of the app that auth state changed
      try {
        window.dispatchEvent(new CustomEvent('adpatterns:auth-changed', { detail: { loggedIn: true, email } }));
      } catch (err) {
        // ignore (older browsers)
      }
      
      setSending(false);
      setMode("success");
      setMessage("Logged in successfully!");
      setTimeout(() => onClose(), 900);
    } catch (error) {
      setSending(false);
      setMessage("Network error. Please try again.");
    }
  }

  async function submitSignup(e?: React.FormEvent) {
    e?.preventDefault();
    setMessage(null);
    
    if (!fullName || !email || !phoneNumber || !password) {
      setMessage("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters.");
      return;
    }
    
    setSending(true);
    try {
      const response = await fetch(API_ENDPOINTS.auth.register, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          full_name: fullName,
          email, 
          phone_number: phoneNumber,
          password 
        })
      });
      
      if (!response.ok) {
        const error = await response.json().catch(() => ({ detail: 'Registration failed' }));
        setMessage(error.detail || 'Failed to create account.');
        setSending(false);
        return;
      }
      
      const data = await response.json();
      // Store the auth token
      localStorage.setItem('adpatterns_auth_token', data.access_token);
      localStorage.setItem('adpatterns_user_email', email);
      // notify other parts of the app that auth state changed
      try {
        window.dispatchEvent(new CustomEvent('adpatterns:auth-changed', { detail: { loggedIn: true, email } }));
      } catch (err) {
        // ignore (older browsers)
      }
      
      setSending(false);
      setMode("success");
      setMessage("Account created successfully!");
      setTimeout(() => onClose(), 900);
    } catch (error) {
      setSending(false);
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="ap-login__overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
        >
          <div className="ap-login__center">
            <motion.div
              className="ap-login__card"
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 12, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="ap-login__left">
                <div className="ap-login__art" />
              </div>

              <div className="ap-login__right">
                <button className="ap-login__close" onClick={onClose} aria-label="Close">
                  ✕
                </button>

                {mode === "login" && (
                  <form className="ap-form" onSubmit={submitLogin}>
                    <h2 className="ap-login__title">Sign in to your account</h2>
                    <p className="ap-login__subtitle">Enter your credentials to continue</p>
                    
                    <label className="ap-label">
                      Email
                      <input 
                        ref={emailRef} 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        className="ap-input" 
                        placeholder="you@company.com" 
                      />
                    </label>
                    <label className="ap-label">
                      Password
                      <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        className="ap-input" 
                        placeholder="Enter your password" 
                      />
                    </label>

                    <button type="submit" className="ap-login__primary" disabled={sending}>
                      {sending ? "Signing in..." : "Sign in"}
                    </button>
                    
                    {message && <div className="ap-message">{message}</div>}
                    
                    <div className="ap-login__foot">
                      Don't have an account? <a onClick={() => setMode("signup")} style={{ cursor: 'pointer', color: '#eb723a' }}>Sign up</a>
                    </div>
                  </form>
                )}

                {mode === "signup" && (
                  <form className="ap-form" onSubmit={submitSignup}>
                    <h2 className="ap-login__title">Create your account</h2>
                    <p className="ap-login__subtitle">Fill in your details to get started</p>
                    
                    <label className="ap-label">
                      Full Name
                      <input 
                        type="text" 
                        value={fullName} 
                        onChange={(e) => setFullName(e.target.value)} 
                        className="ap-input" 
                        placeholder="John Doe" 
                      />
                    </label>
                    <label className="ap-label">
                      Email
                      <input 
                        ref={emailRef} 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        className="ap-input" 
                        placeholder="you@company.com" 
                      />
                    </label>
                    <label className="ap-label">
                      Phone Number
                      <input 
                        type="tel" 
                        value={phoneNumber} 
                        onChange={(e) => setPhoneNumber(e.target.value)} 
                        className="ap-input" 
                        placeholder="+91 98765 43210" 
                      />
                    </label>
                    <label className="ap-label">
                      Password
                      <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        className="ap-input" 
                        placeholder="Minimum 6 characters" 
                      />
                    </label>

                    <button type="submit" className="ap-login__primary" disabled={sending}>
                      {sending ? "Creating account..." : "Sign up"}
                    </button>
                    
                    {message && <div className="ap-message">{message}</div>}
                    
                    <div className="ap-login__foot">
                      Already have an account? <a onClick={() => setMode("login")} style={{ cursor: 'pointer', color: '#eb723a' }}>Sign in</a>
                    </div>
                    
                    <div className="ap-login__foot" style={{ marginTop: '10px', fontSize: '11px' }}>
                      By signing up, you agree to our <a>Terms & Conditions</a> and <a>Privacy Policy</a>.
                    </div>
                  </form>
                )}

                {mode === "success" && (
                  <div className="ap-success">
                    <h2 className="ap-login__title">Welcome</h2>
                    <p className="ap-login__subtitle">You're signed in. Closing shortly…</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
