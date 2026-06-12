"use client";

import { useState, useRef, useCallback, useEffect } from "react";

// ─── CSS ──────────────────────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap');

  .pg-root *, .pg-root *::before, .pg-root *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .pg-root {
    display: flex;
    flex-direction: column;
    height: 100vh;
    background: #080B12;
    font-family: 'Inter', system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
    overflow: hidden;
    color: #C5CDD8;
  }

  /* ── TOP BAR ── */
  .pg-topbar {
    height: 52px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    background: #080B12;
    border-bottom: 1px solid #1C2740;
    gap: 16px;
  }
  .pg-topbar-left {
    display: flex;
    align-items: center;
    gap: 14px;
    min-width: 0;
  }
  .pg-back {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 0.78rem;
    font-weight: 600;
    color: #6B7A99;
    text-decoration: none;
    transition: color 0.15s;
    white-space: nowrap;
    flex-shrink: 0;
  }
  .pg-back:hover { color: #C5CDD8; }
  .pg-divider { width: 1px; height: 18px; background: #1C2740; flex-shrink: 0; }
  .pg-breadcrumb {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.72rem;
    font-weight: 700;
    color: #263354;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .pg-breadcrumb span { color: #6B7A99; }

  .pg-topbar-right {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
  }
  .pg-samples-wrap { position: relative; }
  .pg-samples-btn {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 6px 12px;
    background: #0C1018;
    border: 1px solid #1C2740;
    border-radius: 7px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.68rem;
    font-weight: 700;
    color: #6B7A99;
    cursor: pointer;
    transition: border-color 0.15s, color 0.15s;
    white-space: nowrap;
    line-height: 1;
  }
  .pg-samples-btn:hover { border-color: #263354; color: #C5CDD8; }
  .pg-samples-dropdown {
    position: absolute;
    top: calc(100% + 6px);
    right: 0;
    background: #0C1018;
    border: 1px solid #1C2740;
    border-radius: 10px;
    padding: 5px;
    z-index: 200;
    min-width: 180px;
    box-shadow: 0 16px 40px rgba(0,0,0,0.5);
    animation: pgDrop 0.15s ease-out;
  }
  @keyframes pgDrop { from{opacity:0;transform:translateY(-6px)} to{opacity:1;transform:none} }
  .pg-sample-item {
    display: block; width: 100%;
    padding: 8px 12px;
    background: transparent; border: none;
    border-radius: 7px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.72rem;
    font-weight: 500;
    color: #6B7A99;
    cursor: pointer;
    text-align: left;
    transition: background 0.12s, color 0.12s;
    text-transform: capitalize;
    white-space: nowrap;
  }
  .pg-sample-item:hover { background: #111827; color: #0DFF9A; }
  .pg-sample-item.active { color: #0DFF9A; }

  .pg-run-btn {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 7px 18px;
    background: #0DFF9A;
    color: #000;
    border: none;
    border-radius: 8px;
    font-family: 'Inter', sans-serif;
    font-size: 0.82rem;
    font-weight: 800;
    cursor: pointer;
    transition: opacity 0.15s, transform 0.15s, box-shadow 0.15s;
    white-space: nowrap;
    line-height: 1;
  }
  .pg-run-btn:hover { opacity: 0.88; transform: translateY(-1px); box-shadow: 0 0 20px rgba(13,255,154,0.25); }
  .pg-run-btn:disabled { opacity: 0.45; cursor: not-allowed; transform: none; box-shadow: none; }
  .pg-reset-btn {
    display: inline-flex; align-items: center; justify-content: center;
    width: 32px; height: 32px;
    background: #0C1018;
    border: 1px solid #1C2740;
    border-radius: 7px;
    color: #6B7A99;
    cursor: pointer;
    font-size: 1rem;
    transition: border-color 0.15s, color 0.15s;
  }
  .pg-reset-btn:hover { border-color: #263354; color: #C5CDD8; }

  /* ── MOBILE TAB BAR ── */
  .pg-mobile-tabs {
    display: none;
    flex-shrink: 0;
    border-bottom: 1px solid #1C2740;
    background: #0C1018;
  }
  @media (max-width: 820px) { .pg-mobile-tabs { display: flex; } }
  .pg-mtab {
    flex: 1;
    padding: 10px 0;
    background: transparent; border: none;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #263354;
    cursor: pointer;
    border-bottom: 2px solid transparent;
    transition: color 0.15s, border-color 0.15s;
  }
  .pg-mtab.active { color: #0DFF9A; border-bottom-color: #0DFF9A; }

  /* ── THREE-PANE BODY ── */
  .pg-body {
    flex: 1;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    overflow: hidden;
    min-height: 0;
  }
  @media (max-width: 820px) {
    .pg-body { grid-template-columns: 1fr; }
  }

  /* ── PANE BASE ── */
  .pg-pane {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border-right: 1px solid #1C2740;
    min-width: 0;
  }
  .pg-pane:last-child { border-right: none; }
  @media (max-width: 820px) {
    .pg-pane { display: none; border-right: none; border-bottom: 1px solid #1C2740; }
    .pg-pane.mob-active { display: flex; }
  }

  /* ── PANE TITLEBAR ── */
  .pg-pane-bar {
    height: 40px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    background: #0A0D14;
    border-bottom: 1px solid #1C2740;
  }
  .pg-pane-title {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #263354;
    display: flex;
    align-items: center;
    gap: 7px;
  }
  .pg-pane-title svg { color: #6B7A99; }
  .pg-pane-action {
    padding: 4px 10px;
    background: #0C1018;
    border: 1px solid #1C2740;
    border-radius: 6px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.62rem;
    font-weight: 700;
    color: #6B7A99;
    cursor: pointer;
    transition: border-color 0.15s, color 0.15s;
    letter-spacing: 0.04em;
    line-height: 1.5;
  }
  .pg-pane-action:hover { border-color: #263354; color: #C5CDD8; }

  /* ── YAML EDITOR ── */
  .pg-editor-wrap {
    flex: 1;
    display: flex;
    overflow: hidden;
    min-height: 0;
  }
  .pg-line-nums {
    display: flex;
    flex-direction: column;
    padding: 14px 0;
    background: #080B12;
    border-right: 1px solid #1C2740;
    min-width: 40px;
    user-select: none;
    overflow: hidden;
    flex-shrink: 0;
  }
  .pg-ln {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.7rem;
    line-height: 1.72;
    color: #1E2E4A;
    text-align: right;
    padding: 0 10px;
  }
  .pg-textarea {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    resize: none;
    padding: 14px 16px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.775rem;
    line-height: 1.72;
    color: #8BE9FD;
    caret-color: #0DFF9A;
    overflow-y: auto;
    min-width: 0;
    tab-size: 2;
  }
  .pg-textarea::selection { background: rgba(13,255,154,0.15); }

  /* ── CHAT PANE ── */
  .pg-chat-header {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 16px;
    background: #0A0D14;
    border-bottom: 1px solid #1C2740;
    flex-shrink: 0;
  }
  .pg-agent-icon {
    width: 28px; height: 28px;
    border-radius: 8px;
    background: rgba(13,255,154,0.08);
    border: 1px solid rgba(13,255,154,0.2);
    display: flex; align-items: center; justify-content: center;
    color: #0DFF9A;
    flex-shrink: 0;
  }
  .pg-agent-name { font-size: 0.82rem; font-weight: 700; color: #FFFFFF; }
  .pg-agent-status {
    display: flex; align-items: center; gap: 4px;
    font-size: 0.67rem; color: #6B7A99; margin-top: 1px;
  }
  .pg-status-dot {
    width: 5px; height: 5px; border-radius: 50%;
    background: #263354;
    transition: background 0.3s;
  }
  .pg-status-dot.live { background: #0DFF9A; animation: pgPulse 2s infinite; }
  @keyframes pgPulse { 0%,100%{opacity:1} 50%{opacity:0.4} }

  .pg-turn-badge {
    margin-left: auto;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.62rem;
    font-weight: 700;
    padding: 3px 8px;
    border-radius: 100px;
    background: #0C1018;
    border: 1px solid #1C2740;
    color: #263354;
    letter-spacing: 0.06em;
  }

  .pg-messages {
    flex: 1;
    overflow-y: auto;
    padding: 14px 14px 8px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-height: 0;
  }
  .pg-messages::-webkit-scrollbar { width: 4px; }
  .pg-messages::-webkit-scrollbar-track { background: transparent; }
  .pg-messages::-webkit-scrollbar-thumb { background: #1C2740; border-radius: 4px; }

  /* empty state */
  .pg-empty {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 2rem;
    text-align: center;
  }
  .pg-empty-icon {
    width: 48px; height: 48px;
    border-radius: 12px;
    background: #0C1018;
    border: 1px solid #1C2740;
    display: flex; align-items: center; justify-content: center;
    color: #263354;
  }
  .pg-empty-title { font-size: 0.875rem; font-weight: 600; color: #6B7A99; }
  .pg-empty-sub { font-size: 0.78rem; color: #263354; line-height: 1.6; max-width: 220px; }

  /* message bubbles */
  @keyframes pgSlide {
    from { opacity:0; transform:translateY(8px); }
    to   { opacity:1; transform:none; }
  }
  .pg-msg { display: flex; gap: 7px; animation: pgSlide 0.22s ease-out forwards; }
  .pg-msg.user { flex-direction: row-reverse; }
  .pg-msg-av {
    width: 24px; height: 24px; border-radius: 50%;
    flex-shrink: 0; margin-top: 2px;
    display: flex; align-items: center; justify-content: center;
    font-size: 0.6rem;
  }
  .pg-msg-av.bot  { background: #0DFF9A; color: #000; }
  .pg-msg-av.user { background: #1C2740; color: #6B7A99; }
  .pg-bubble {
    max-width: 84%;
    padding: 8px 12px;
    border-radius: 11px;
    font-size: 0.8rem;
    line-height: 1.6;
  }
  .pg-bubble.bot {
    background: #0E1420;
    border: 1px solid #1C2740;
    border-top-left-radius: 3px;
    color: #C5CDD8;
  }
  .pg-bubble.user {
    background: rgba(13,255,154,0.1);
    border: 1px solid rgba(13,255,154,0.2);
    border-top-right-radius: 3px;
    color: #FFFFFF;
    font-weight: 500;
  }
  .pg-bubble-ts {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.6rem;
    color: #1E2E4A;
    margin-top: 3px;
    display: block;
  }

  /* typing indicator */
  .pg-typing {
    display: inline-flex;
    gap: 4px; align-items: center;
    padding: 9px 13px;
    background: #0E1420;
    border: 1px solid #1C2740;
    border-radius: 11px; border-top-left-radius: 3px;
    animation: pgSlide 0.22s ease-out forwards;
  }
  .pg-typing span {
    width: 5px; height: 5px; border-radius: 50%;
    background: #6B7A99;
    animation: pgBounce 1.2s ease-in-out infinite;
  }
  .pg-typing span:nth-child(2) { animation-delay: 0.15s; }
  .pg-typing span:nth-child(3) { animation-delay: 0.3s; }
  @keyframes pgBounce { 0%,60%,100%{transform:translateY(0)} 30%{transform:translateY(-5px)} }

  /* complete toast */
  .pg-complete-toast {
    display: flex;
    align-items: center;
    gap: 7px;
    align-self: center;
    padding: 6px 14px;
    background: rgba(13,255,154,0.08);
    border: 1px solid rgba(13,255,154,0.25);
    border-radius: 100px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.68rem;
    font-weight: 700;
    color: #0DFF9A;
    letter-spacing: 0.06em;
    animation: pgSlide 0.3s ease-out forwards;
  }

  /* ── CHAT INPUT ── */
  .pg-chat-footer {
    flex-shrink: 0;
    padding: 12px 14px;
    border-top: 1px solid #1C2740;
    background: #080B12;
  }
  .pg-input-row {
    display: flex;
    gap: 8px;
    align-items: flex-end;
  }
  .pg-input {
    flex: 1;
    padding: 9px 12px;
    background: #0C1018;
    border: 1px solid #1C2740;
    border-radius: 9px;
    font-family: 'Inter', sans-serif;
    font-size: 0.82rem;
    color: #FFFFFF;
    resize: none;
    outline: none;
    transition: border-color 0.15s;
    line-height: 1.5;
    min-height: 38px;
    max-height: 100px;
    overflow-y: auto;
    caret-color: #0DFF9A;
  }
  .pg-input::placeholder { color: #263354; }
  .pg-input:focus { border-color: rgba(13,255,154,0.3); }
  .pg-input:disabled { opacity: 0.4; cursor: not-allowed; }
  .pg-send-btn {
    width: 38px; height: 38px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    background: #0DFF9A; color: #000;
    border: none; border-radius: 9px;
    cursor: pointer;
    transition: opacity 0.15s, box-shadow 0.15s;
  }
  .pg-send-btn:hover { opacity: 0.85; box-shadow: 0 0 16px rgba(13,255,154,0.25); }
  .pg-send-btn:disabled { opacity: 0.3; cursor: not-allowed; box-shadow: none; }
  .pg-input-hint {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.6rem;
    color: #1E2E4A;
    margin-top: 6px;
    letter-spacing: 0.04em;
  }

  /* ── JSON OUTPUT PANE ── */
  .pg-json-body {
    flex: 1;
    overflow-y: auto;
    padding: 14px 16px;
    min-height: 0;
  }
  .pg-json-body::-webkit-scrollbar { width: 4px; }
  .pg-json-body::-webkit-scrollbar-track { background: transparent; }
  .pg-json-body::-webkit-scrollbar-thumb { background: #1C2740; border-radius: 4px; }
  .pg-json-pre {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.78rem;
    line-height: 1.75;
    color: #C9D1D9;
  }
  .jk  { color: #8BE9FD; }
  .jv-s{ color: #F1FA8C; }
  .jv-n{ color: #BD93F9; }
  .jv-b{ color: #FF79C6; }
  .jv-null { color: #6B7A99; }
  .jp  { color: #6B7A99; }

  .pg-field-row {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    padding: 7px 0;
    border-bottom: 1px solid #0E1420;
    animation: pgSlide 0.25s ease-out forwards;
  }
  .pg-field-key {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.72rem;
    font-weight: 700;
    color: #8BE9FD;
    min-width: 100px;
    flex-shrink: 0;
    padding-top: 2px;
  }
  .pg-field-val {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.72rem;
    color: #F1FA8C;
    word-break: break-all;
  }
  .pg-field-val.null { color: #6B7A99; font-style: italic; }
  .pg-field-val.num  { color: #BD93F9; }
  .pg-field-val.bool { color: #FF79C6; }

  /* field counter */
  .pg-field-count {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
    padding-bottom: 10px;
    border-bottom: 1px solid #1C2740;
  }
  .pg-field-count-lbl {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.62rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #263354;
  }
  .pg-field-count-val {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.72rem;
    font-weight: 700;
    color: #0DFF9A;
  }

  /* progress bar */
  .pg-progress-wrap {
    margin-bottom: 14px;
  }
  .pg-progress-label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
  }
  .pg-progress-txt {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.62rem;
    color: #263354;
    letter-spacing: 0.06em;
  }
  .pg-progress-pct {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.62rem;
    font-weight: 700;
    color: #0DFF9A;
  }
  .pg-progress-track {
    height: 3px;
    background: #0E1420;
    border-radius: 100px;
    overflow: hidden;
  }
  .pg-progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #0DFF9A, #00C4FF);
    border-radius: 100px;
    transition: width 0.5s cubic-bezier(.16,1,.3,1);
  }

  /* ── STATUS BAR ── */
  .pg-statusbar {
    height: 26px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    padding: 0 16px;
    gap: 20px;
    background: #050810;
    border-top: 1px solid #1C2740;
    overflow: hidden;
  }
  .pg-status-item {
    display: flex;
    align-items: center;
    gap: 5px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.62rem;
    color: #1E2E4A;
    white-space: nowrap;
  }
  .pg-status-item span { color: #4A5A78; }
  .pg-status-item span.hi { color: #C5CDD8; }
  .pg-status-item span.green { color: #0DFF9A; }
`;

// ─── SAMPLE SCHEMAS ───────────────────────────────────────────────────────────
const SAMPLES: Record<string, string> = {
  fitness_plan: `id: fitness_plan
persona: "You are a friendly fitness coach named Alex."

fields:
  - name: full_name
    type: text
    required: true
    question: "What's your full name?"

  - name: age
    type: integer
    range: [16, 90]
    question: "How old are you?"

  - name: goal
    type: enum
    options: [weight_loss, muscle_gain, endurance, flexibility]
    question: "What's your primary fitness goal?"

  - name: weekly_hours
    type: float
    question: "How many hours per week for training?"

  - name: injuries
    type: text
    required: false
    question: "Any injuries I should know about?"

output_template: fitness_plan_v1`,

  medical_intake: `id: medical_intake
persona: "You are a compassionate medical assistant."

fields:
  - name: patient_name
    type: text
    required: true
    question: "What is the patient's full name?"

  - name: dob
    type: date
    question: "What is the patient's date of birth?"

  - name: chief_complaint
    type: text
    question: "What brings you in today?"

  - name: pain_scale
    type: integer
    range: [0, 10]
    question: "On a scale of 0–10, how severe is your pain?"

  - name: allergies
    type: text
    required: false
    question: "Any known allergies?"

output_template: medical_intake_v2`,

  hr_screening: `id: hr_screening
persona: "You are a professional HR coordinator at a tech company."

fields:
  - name: candidate_name
    type: text
    required: true
    question: "What's your full name?"

  - name: current_role
    type: text
    question: "What is your current role and company?"

  - name: experience_years
    type: integer
    question: "How many years of professional experience do you have?"

  - name: skills
    type: text
    question: "What are your top 3 technical skills?"

  - name: salary_expectation
    type: integer
    question: "What is your salary expectation (in LPA)?"

  - name: notice_period
    type: integer
    question: "What is your current notice period in days?"

output_template: hr_screening_v1`,
};

// ─── CHAT SCRIPTS (per schema) ────────────────────────────────────────────────
const SCRIPTS: Record<string, { first: string; responses: string[]; fields: string[] }> = {
  fitness_plan: {
    first: "Hi! I'm Alex, your fitness coach. What's your full name?",
    responses: [
      "Great to meet you! How old are you?",
      "Got it. What's your primary goal — weight loss, muscle gain, endurance, or flexibility?",
      "Nice choice! How many hours per week can you dedicate to training?",
      "Almost done — any injuries I should know about? If none, just say 'none'.",
      "✓ Perfect. I have everything I need. Your fitness plan is ready!",
    ],
    fields: ["full_name", "age", "goal", "weekly_hours", "injuries"],
  },
  medical_intake: {
    first: "Hello, I'm your medical assistant. What is the patient's full name?",
    responses: [
      "Thank you. What is the patient's date of birth?",
      "Noted. What brings you in today?",
      "I understand. On a scale of 0–10, how severe is the pain?",
      "Got it. Any known allergies? Say 'none' if not applicable.",
      "✓ Intake complete. All fields have been recorded.",
    ],
    fields: ["patient_name", "dob", "chief_complaint", "pain_scale", "allergies"],
  },
  hr_screening: {
    first: "Hi there! I'm the HR coordinator. What's your full name?",
    responses: [
      "Thanks! What is your current role and company?",
      "Great. How many years of professional experience do you have?",
      "What are your top 3 technical skills?",
      "What is your salary expectation in LPA?",
      "What is your current notice period in days?",
    ],
    fields: ["candidate_name", "current_role", "experience_years", "skills", "salary_expectation", "notice_period"],
  },
};

type Msg = { role: "bot" | "user"; text: string; ts: string };

const BOT_ICON = (
  <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
    <line x1="12" y1="22.08" x2="12" y2="12"/>
  </svg>
);
const USER_ICON = (
  <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);
const SEND_ICON = (
  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);

// ─── COMPONENT ────────────────────────────────────────────────────────────────
export default function PlaygroundPage() {
  const [yaml,          setYaml]         = useState(SAMPLES.fitness_plan);
  const [activeSchema,  setActiveSchema]  = useState("fitness_plan");
  const [messages,      setMessages]      = useState<Msg[]>([]);
  const [input,         setInput]         = useState("");
  const [output,        setOutput]        = useState<Record<string, unknown>>({});
  const [started,       setStarted]       = useState(false);
  const [running,       setRunning]       = useState(false);
  const [loading,       setLoading]       = useState(false);
  const [complete,      setComplete]      = useState(false);
  const [turn,          setTurn]          = useState(0);
  const [stage,         setStage]         = useState("idle");
  const [cost,          setCost]          = useState(0);
  const [copied,        setCopied]        = useState(false);
  const [samplesOpen,   setSamplesOpen]   = useState(false);
  const [mobileTab,     setMobileTab]     = useState<"yaml" | "chat" | "output">("yaml");

  const chatEndRef    = useRef<HTMLDivElement>(null);
  const sessionRef    = useRef(Math.random().toString(36).slice(2, 10));
  const turnRef       = useRef(0);

  const script = SCRIPTS[activeSchema] ?? SCRIPTS.fitness_plan;
  const totalFields = script.fields.length;
  const filledFields = Object.keys(output).length;
  const pct = totalFields > 0 ? Math.round((filledFields / totalFields) * 100) : 0;

  const scrollChat = useCallback(() => {
    setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 60);
  }, []);

  // Close samples dropdown on outside click
  useEffect(() => {
    if (!samplesOpen) return;
    const h = () => setSamplesOpen(false);
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [samplesOpen]);

  const runAgent = useCallback(() => {
    setRunning(true);
    setStarted(true);
    setMessages([]);
    setOutput({});
    setCost(0);
    setTurn(0);
    turnRef.current = 0;
    setComplete(false);
    setStage("initializing");
    setMobileTab("chat");
    sessionRef.current = Math.random().toString(36).slice(2, 10);

    setTimeout(() => {
      setStage("conversation_planning");
      setTimeout(() => {
        setMessages([{ role: "bot", text: script.first, ts: now() }]);
        setStage("awaiting_input");
        setRunning(false);
        scrollChat();
      }, 400);
    }, 600);
  }, [script, scrollChat]);

  const sendMessage = useCallback(() => {
    if (!input.trim() || loading || complete || !started) return;
    const text = input.trim();
    setInput("");
    const t = turnRef.current;
    turnRef.current += 1;
    setTurn(turnRef.current);
    setMessages(p => [...p, { role: "user", text, ts: now() }]);
    setLoading(true);
    setStage("field_extraction");
    scrollChat();

    setTimeout(() => setStage("confidence_scoring"), 500);

    setTimeout(() => {
      const fieldKey = script.fields[t];
      if (fieldKey) {
        setOutput(prev => {
          const val = isNaN(Number(text)) || text === "" ? text : Number(text);
          return { ...prev, [fieldKey]: val };
        });
      }
      setCost(c => +(c + 0.00018 + Math.random() * 0.00012).toFixed(5));

      const botText = script.responses[Math.min(t, script.responses.length - 1)];
      const isLast  = t >= script.responses.length - 1;

      setMessages(p => [...p, { role: "bot", text: botText, ts: now() }]);
      setLoading(false);
      setStage(isLast ? "complete" : "awaiting_input");
      if (isLast) setComplete(true);
      scrollChat();
    }, 1100 + Math.random() * 400);
  }, [input, loading, complete, started, script, scrollChat]);

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const reset = () => {
    setMessages([]); setOutput({}); setStarted(false);
    setRunning(false); setLoading(false); setComplete(false);
    setTurn(0); turnRef.current = 0; setCost(0); setStage("idle");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(output, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lineCount = yaml.split("\n").length;

  return (
    <>
      <style>{CSS}</style>
      <div className="pg-root">

        {/* ── TOP BAR ── */}
        <div className="pg-topbar">
          <div className="pg-topbar-left">
            <a href="/" className="pg-back">
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 12H5M12 5l-7 7 7 7"/>
              </svg>
              Back
            </a>
            <div className="pg-divider" />
            <div className="pg-breadcrumb">
              truenorth / <span>playground</span>
            </div>
          </div>

          <div className="pg-topbar-right">
            <div
              className="pg-samples-wrap"
              onMouseDown={e => e.stopPropagation()}
            >
              <button
                className="pg-samples-btn"
                onClick={() => setSamplesOpen(o => !o)}
                type="button"
              >
                <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                </svg>
                Load sample
                <svg width="9" height="9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </button>
              {samplesOpen && (
                <div className="pg-samples-dropdown">
                  {Object.keys(SAMPLES).map(k => (
                    <button
                      key={k}
                      className={`pg-sample-item${activeSchema === k ? " active" : ""}`}
                      onClick={() => { setYaml(SAMPLES[k]); setActiveSchema(k); setSamplesOpen(false); reset(); }}
                      type="button"
                    >
                      {k.replace(/_/g, " ")}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button className="pg-reset-btn" onClick={reset} title="Reset session" type="button">
              <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                <polyline points="1 4 1 10 7 10"/>
                <path d="M3.51 15a9 9 0 1 0 .49-4.95"/>
              </svg>
            </button>

            <button
              className="pg-run-btn"
              onClick={runAgent}
              disabled={running}
              type="button"
            >
              <svg width="11" height="11" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <polygon points="5 3 19 12 5 21 5 3"/>
              </svg>
              {running ? "Starting…" : "Run agent"}
            </button>
          </div>
        </div>

        {/* ── MOBILE TABS ── */}
        <div className="pg-mobile-tabs">
          {(["yaml","chat","output"] as const).map(t => (
            <button
              key={t}
              className={`pg-mtab${mobileTab === t ? " active" : ""}`}
              onClick={() => setMobileTab(t)}
              type="button"
            >
              {t === "yaml" ? "Schema" : t === "chat" ? "Chat" : "Output"}
            </button>
          ))}
        </div>

        {/* ── THREE PANES ── */}
        <div className="pg-body">

          {/* PANE 1 — YAML */}
          <div className={`pg-pane${mobileTab === "yaml" ? " mob-active" : ""}`}>
            <div className="pg-pane-bar">
              <span className="pg-pane-title">
                <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z"/><path d="M13 2v7h7"/>
                </svg>
                schema.yaml
              </span>
              <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.6rem", color: "#1E2E4A" }}>
                {lineCount} lines
              </span>
            </div>

            <div className="pg-editor-wrap">
              <div className="pg-line-nums">
                {Array.from({ length: lineCount }, (_, i) => (
                  <div key={i} className="pg-ln">{i + 1}</div>
                ))}
              </div>
              <textarea
                className="pg-textarea"
                value={yaml}
                onChange={e => setYaml(e.target.value)}
                spellCheck={false}
                aria-label="YAML schema editor"
              />
            </div>
          </div>

          {/* PANE 2 — CHAT */}
          <div className={`pg-pane${mobileTab === "chat" ? " mob-active" : ""}`}>
            {/* Agent header */}
            <div className="pg-chat-header">
              <div className="pg-agent-icon">{BOT_ICON}</div>
              <div>
                <div className="pg-agent-name">TrueNorth Agent</div>
                <div className="pg-agent-status">
                  <span className={`pg-status-dot${started ? " live" : ""}`} />
                  {started ? (complete ? "Complete" : "Listening") : "Idle"}
                </div>
              </div>
              {started && (
                <div className="pg-turn-badge">T{turn}</div>
              )}
            </div>

            {/* Messages */}
            <div className="pg-messages">
              {!started ? (
                <div className="pg-empty">
                  <div className="pg-empty-icon">{BOT_ICON}</div>
                  <div className="pg-empty-title">Agent not started</div>
                  <div className="pg-empty-sub">Click "Run agent" to begin a live conversation with your YAML schema.</div>
                </div>
              ) : (
                <>
                  {messages.map((m, i) => (
                    <div key={i} className={`pg-msg ${m.role}`}>
                      <div className={`pg-msg-av ${m.role}`}>
                        {m.role === "bot" ? BOT_ICON : USER_ICON}
                      </div>
                      <div>
                        <div className={`pg-bubble ${m.role}`}>{m.text}</div>
                        <span className="pg-bubble-ts">{m.ts}</span>
                      </div>
                    </div>
                  ))}
                  {loading && (
                    <div className="pg-msg bot">
                      <div className="pg-msg-av bot">{BOT_ICON}</div>
                      <div className="pg-typing"><span/><span/><span/></div>
                    </div>
                  )}
                  {complete && !loading && (
                    <div className="pg-complete-toast">
                      <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      All fields collected
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </>
              )}
            </div>

            {/* Input */}
            <div className="pg-chat-footer">
              <div className="pg-input-row">
                <textarea
                  className="pg-input"
                  rows={1}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder={started && !complete ? "Type a message…" : started && complete ? "Session complete" : "Run the agent first"}
                  disabled={!started || loading || complete}
                  aria-label="Chat message"
                />
                <button
                  className="pg-send-btn"
                  onClick={sendMessage}
                  disabled={!input.trim() || !started || loading || complete}
                  type="button"
                  aria-label="Send message"
                >
                  {SEND_ICON}
                </button>
              </div>
              <div className="pg-input-hint">Enter to send · Shift+Enter for newline</div>
            </div>
          </div>

          {/* PANE 3 — OUTPUT */}
          <div className={`pg-pane${mobileTab === "output" ? " mob-active" : ""}`}>
            <div className="pg-pane-bar">
              <span className="pg-pane-title">
                <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                  <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
                </svg>
                extracted.json
              </span>
              <button className="pg-pane-action" onClick={handleCopy} type="button">
                {copied ? "✓ Copied" : "Copy JSON"}
              </button>
            </div>

            <div className="pg-json-body">
              {filledFields === 0 ? (
                <div className="pg-empty">
                  <div className="pg-empty-icon">
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden="true">
                      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
                    </svg>
                  </div>
                  <div className="pg-empty-title">No data yet</div>
                  <div className="pg-empty-sub">Extracted fields appear here as the conversation progresses in real time.</div>
                </div>
              ) : (
                <>
                  {/* Progress */}
                  <div className="pg-progress-wrap">
                    <div className="pg-progress-label">
                      <span className="pg-progress-txt">FIELDS COLLECTED</span>
                      <span className="pg-progress-pct">{filledFields}/{totalFields} · {pct}%</span>
                    </div>
                    <div className="pg-progress-track">
                      <div className="pg-progress-fill" style={{ width: pct + "%" }} />
                    </div>
                  </div>

                  {/* Fields */}
                  <div>
                    {Object.entries(output).map(([k, v]) => {
                      const isNull   = v === null;
                      const isNum    = !isNull && typeof v === "number";
                      const isBool   = !isNull && typeof v === "boolean";
                      return (
                        <div key={k} className="pg-field-row">
                          <span className="pg-field-key">{k}</span>
                          <span className={`pg-field-val${isNull ? " null" : isNum ? " num" : isBool ? " bool" : ""}`}>
                            {isNull ? "null" : isBool ? String(v) : isNum ? String(v) : `"${v}"`}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>

        </div>{/* /pg-body */}

        {/* ── STATUS BAR ── */}
        <div className="pg-statusbar">
          <div className="pg-status-item">
            stage <span className={stage === "complete" ? "green" : "hi"}>{stage}</span>
          </div>
          <div className="pg-status-item">
            cost <span className="hi">${cost.toFixed(5)}</span>
          </div>
          <div className="pg-status-item">
            turn <span className="hi">{turn}</span>
          </div>
          <div className="pg-status-item">
            session <span>{sessionRef.current}</span>
          </div>
          <div className="pg-status-item" style={{ marginLeft: "auto" }}>
            <span style={{ color: "#1E2E4A" }}>truenorth</span>
            <span>·</span>
            <span className="green">v0.1.5</span>
          </div>
        </div>

      </div>
    </>
  );
}

function now() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}