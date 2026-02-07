"use client";

import React, { useState } from "react";
import ConnectedAccountCard from "../ConnectedAccountCard/ConnectedAccountCard";
import ConnectAccountCard from "../ConnectAccountCard/ConnectAccountCard";
import AccountPermissions from "../AccountPermissions/AccountPermissions";
import "./AdAccounts.css";

type Account = {
  id: string;
  name: string;
  connectedAt: string;
  platform: string;
};

export default function AdAccounts() {
  const [accounts, setAccounts] = useState<Account[]>(() => {
    // try load from localStorage for a pleasant demo experience
    try {
      const raw = localStorage.getItem('adpatterns_accounts_demo');
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return [
      { id: "1234567890", name: "AdPatterns - Main", connectedAt: "2025-11-02", platform: "Meta" }
    ];
  });

  const [selected, setSelected] = useState<Account | null>(accounts[0] || null);

  function disconnect(id: string) {
    const filtered = accounts.filter(a => a.id !== id);
    setAccounts(filtered);
    try { localStorage.setItem('adpatterns_accounts_demo', JSON.stringify(filtered)); } catch(e){}
    if (selected && selected.id === id) setSelected(filtered[0] || null);
  }

  function connectDemoAccount() {
    const newAcc = { id: String(Date.now()).slice(-10), name: "Meta Business - Demo", connectedAt: new Date().toISOString().slice(0,10), platform: "Meta" };
    const next = [newAcc, ...accounts];
    setAccounts(next);
    try { localStorage.setItem('adpatterns_accounts_demo', JSON.stringify(next)); } catch(e){}
    setSelected(newAcc);
  }

  return (
    <div className="aa-grid">
      <div className="aa-left">
        <section className="aa-section">
          <h2 className="aa-section__title">Connected Accounts</h2>
          <p className="aa-section__desc">Accounts you have connected to AdPatterns. You can view permissions or disconnect safely.</p>

          <div className="aa-list">
            {accounts.length === 0 && <div className="aa-empty">No accounts connected yet.</div>}
            {accounts.map((a) => (
              <ConnectedAccountCard key={a.id} account={a} onView={() => setSelected(a)} onDisconnect={() => disconnect(a.id)} />
            ))}
          </div>
        </section>

        <section className="aa-section">
          <h2 className="aa-section__title">Connect New Account</h2>
          <p className="aa-section__desc">Connect your Meta Ad Account to run campaigns. We explain every permission we request.</p>
          <ConnectAccountCard onConnect={connectDemoAccount} />
        </section>
      </div>

      <aside className="aa-right">
        <AccountPermissions account={selected} />
      </aside>
    </div>
  );
}
