'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
<<<<<<< HEAD
import { buildSvlProtectedPrompt } from '@/lib/svl-kpa-engine';
=======
import { buildSvlAgentSystemPrompt } from '@/lib/svl-kpa-engine';
>>>>>>> 3d5804cf919a4203b6d2ef62f0e011b4b7f9862b
import { useSiteCopy } from '@/app/components/SiteLanguageControl';
import { getSiteCopy } from '@/lib/site-copy';

interface FormData {
  agentName: string;
  agentRole: string;
  description: string;
  personality: string[];
  tone: string;
  communicationStyle: string;
  useCase: string;
  knowledgeFocus: string[];
  targetAudience: string;
  specialization: string;
  additionalInstructions: string;
}

const INITIAL_FORM: FormData = {
  agentName: '',
  agentRole: '',
  description: '',
  personality: [],
  tone: '',
  communicationStyle: '',
  useCase: '',
  knowledgeFocus: [],
  targetAudience: '',
  specialization: '',
  additionalInstructions: '',
};

export default function TokBuilding() {
  const copy = useSiteCopy();
  const englishCopy = getSiteCopy('en');
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('tokbuilding_draft');
        if (saved) return JSON.parse(saved);
      } catch {
        // ignore
      }
    }
    return INITIAL_FORM;
  });
  const [copied, setCopied] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const personalityOptions = englishCopy.tokbuilding.traits.map((value, index) => ({
    value,
    label: copy.tokbuilding.traits[index] ?? value,
  }));
  const toneOptions = englishCopy.tokbuilding.tones.map((value, index) => ({
    value,
    label: copy.tokbuilding.tones[index] ?? value,
  }));
  const communicationStyleOptions = englishCopy.tokbuilding.communicationStyles.map((value, index) => ({
    value,
    label: copy.tokbuilding.communicationStyles[index] ?? value,
  }));
  const knowledgeOptions = englishCopy.tokbuilding.knowledgeAreas.map((value, index) => ({
    value,
    label: copy.tokbuilding.knowledgeAreas[index] ?? value,
  }));
  const optionLabel = (value: string, options: Array<{ value: string; label: string }>) => {
    return options.find((option) => option.value === value)?.label ?? value;
  };

  // Save draft to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem('tokbuilding_draft', JSON.stringify(form));
    } catch {}
  }, [form]);

  const updateForm = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const toggleArray = (key: keyof FormData, value: string) => {
    setForm(prev => {
      const arr = prev[key] as string[];
      if (arr.includes(value)) {
        return { ...prev, [key]: arr.filter(i => i !== value) };
      } else {
        return { ...prev, [key]: [...arr, value] };
      }
    });
  };

  // Generate system prompt from form
  const generateSystemPrompt = (): string => {
    const { agentName, agentRole, description, personality, tone, communicationStyle, knowledgeFocus, targetAudience, specialization, additionalInstructions } = form;

    if (!agentName || !agentRole) {
      return 'Please fill in at least Agent Name and Role.';
    }

    const personalityStr = personality.length > 0 ? personality.join(', ') : 'professional and helpful';
    const focusStr = knowledgeFocus.length > 0 ? knowledgeFocus.join(', ') : 'general knowledge';

    return `You are ${agentName} — ${agentRole}.

YOUR IDENTITY:
- Name: ${agentName}
- Role: ${agentRole}
- Description: ${description || 'Specialized AI assistant'}
- Personality: ${personalityStr}
- Tone: ${tone || 'professional and friendly'}
- Communication Style: ${communicationStyle || 'clear and concise'}

YOUR EXPERTISE:
- Knowledge Focus: ${focusStr}
- Specialization: ${specialization || 'general assistance'}
- Target Audience: ${targetAudience || 'general users'}

OPERATING PRINCIPLES:
- Provide accurate, helpful, and timely assistance
- Maintain consistent personality and tone throughout interactions
- Tailor responses to the target audience expertise level
- Be clear about limitations and when to escalate to humans
${additionalInstructions ? `\nADDITIONAL INSTRUCTIONS:\n${additionalInstructions}` : ''}

You are ${agentName}. Ready to assist.`;
  };

  const agentSpec = {
    name: form.agentName,
    role: form.agentRole,
    description: form.description,
    personality: form.personality,
    tone: form.tone,
    communicationStyle: form.communicationStyle,
    useCase: form.useCase,
    knowledgeFocus: form.knowledgeFocus,
    targetAudience: form.targetAudience,
    specialization: form.specialization,
    systemPrompt: form.agentName && form.agentRole
<<<<<<< HEAD
      ? buildSvlProtectedPrompt(generateSystemPrompt())
=======
      ? buildSvlAgentSystemPrompt(generateSystemPrompt())
>>>>>>> 3d5804cf919a4203b6d2ef62f0e011b4b7f9862b
      : generateSystemPrompt(),
    createdAt: new Date().toISOString(),
  };

  const specJSON = JSON.stringify(agentSpec, null, 2);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(specJSON);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadSpec = () => {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(specJSON));
    element.setAttribute('download', `${form.agentName || 'agent'}-spec.json`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const clearDraft = () => {
    if (confirm(copy.tokbuilding.clearDraftConfirm)) {
      setForm(INITIAL_FORM);
      localStorage.removeItem('tokbuilding_draft');
      setStep(1);
    }
  };

  // Progress indicator
  const progressSteps = copy.tokbuilding.progressSteps;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #08080a 0%, #0a050f 100%)',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: '"Barlow", system-ui, sans-serif',
      color: '#e8e8f0',
    }}>
      {/* Header */}
      <div style={{
        padding: '14px 24px',
        borderBottom: '1px solid #2a1f5f',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(8,8,10,0.95)',
        backdropFilter: 'blur(20px)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: '"Bebas Neue", serif',
            fontSize: '14px',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            color: '#08080a',
            fontWeight: 'bold',
          }}>
            TB
          </div>
          <div>
            <div style={{
              fontFamily: '"Bebas Neue", serif',
              fontSize: '20px',
              letterSpacing: '3px',
              background: 'linear-gradient(90deg, #8b5cf6, #6366f1)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              BUILDER
            </div>
            <div style={{ fontSize: '10px', letterSpacing: '1.5px', color: '#5a5a72', textTransform: 'uppercase', marginTop: '2px' }}>
              {copy.tokbuilding.headerSub}
            </div>
          </div>
        </div>
        <Link href="/vcc-hub" style={{
          fontFamily: '"Bebas Neue", serif',
          fontSize: '13px',
          letterSpacing: '2px',
          color: '#5a5a72',
          background: 'transparent',
          border: '1px solid #2a1f5f',
          borderRadius: '2px',
          padding: '6px 14px',
          cursor: 'pointer',
          transition: 'all 0.2s',
          textDecoration: 'none',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.color = '#8b5cf6';
          e.currentTarget.style.borderColor = '#8b5cf6';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.color = '#5a5a72';
          e.currentTarget.style.borderColor = '#2a1f5f';
        }}
        >
          ← {copy.common.hub}
        </Link>
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Main Form */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '32px 24px' }}>
          {/* Progress */}
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '40px', justifyContent: 'center' }}>
              {progressSteps.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setStep(i + 1)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '11px',
                    letterSpacing: '1px',
                    fontWeight: i + 1 === step ? 600 : 400,
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    background: i + 1 === step ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'rgba(99, 102, 241, 0.1)',
                    color: i + 1 === step ? '#08080a' : '#6366f1',
                    textTransform: 'uppercase',
                  }}
                >
                  {i + 1}. {s}
                </button>
              ))}
            </div>

            {/* Step 1: Basic Info */}
            {step === 1 && (
              <div style={{ animation: 'fadeUp 0.3s ease both' }}>
                <h2 style={{ fontFamily: '"Bebas Neue", serif', fontSize: '32px', letterSpacing: '3px', marginBottom: '24px', color: '#8b5cf6' }}>
                  {copy.tokbuilding.stepTitles.basics}
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <label style={{ fontSize: '12px', letterSpacing: '1px', color: '#5a5a72', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                      {copy.tokbuilding.labels.agentName}
                    </label>
                    <input
                      type="text"
                      placeholder={copy.tokbuilding.placeholders.agentName}
                      value={form.agentName}
                      onChange={e => updateForm('agentName', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        background: '#111118',
                        border: '1px solid #2a1f5f',
                        borderRadius: '4px',
                        color: '#e8e8f0',
                        fontFamily: '"Barlow", sans-serif',
                        fontSize: '14px',
                        outline: 'none',
                        transition: 'border-color 0.2s',
                        boxSizing: 'border-box',
                      }}
                      onFocus={e => e.currentTarget.style.borderColor = '#6366f1'}
                      onBlur={e => e.currentTarget.style.borderColor = '#2a1f5f'}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '12px', letterSpacing: '1px', color: '#5a5a72', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                      {copy.tokbuilding.labels.role}
                    </label>
                    <input
                      type="text"
                      placeholder={copy.tokbuilding.placeholders.role}
                      value={form.agentRole}
                      onChange={e => updateForm('agentRole', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        background: '#111118',
                        border: '1px solid #2a1f5f',
                        borderRadius: '4px',
                        color: '#e8e8f0',
                        fontFamily: '"Barlow", sans-serif',
                        fontSize: '14px',
                        outline: 'none',
                        transition: 'border-color 0.2s',
                        boxSizing: 'border-box',
                      }}
                      onFocus={e => e.currentTarget.style.borderColor = '#6366f1'}
                      onBlur={e => e.currentTarget.style.borderColor = '#2a1f5f'}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '12px', letterSpacing: '1px', color: '#5a5a72', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                      {copy.tokbuilding.labels.description}
                    </label>
                    <textarea
                      placeholder={copy.tokbuilding.placeholders.description}
                      value={form.description}
                      onChange={e => updateForm('description', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        background: '#111118',
                        border: '1px solid #2a1f5f',
                        borderRadius: '4px',
                        color: '#e8e8f0',
                        fontFamily: '"Barlow", sans-serif',
                        fontSize: '14px',
                        outline: 'none',
                        transition: 'border-color 0.2s',
                        boxSizing: 'border-box',
                        minHeight: '100px',
                        resize: 'vertical',
                      }}
                      onFocus={e => e.currentTarget.style.borderColor = '#6366f1'}
                      onBlur={e => e.currentTarget.style.borderColor = '#2a1f5f'}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Personality */}
            {step === 2 && (
              <div style={{ animation: 'fadeUp 0.3s ease both' }}>
                <h2 style={{ fontFamily: '"Bebas Neue", serif', fontSize: '32px', letterSpacing: '3px', marginBottom: '24px', color: '#8b5cf6' }}>
                  {copy.tokbuilding.stepTitles.personality}
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <label style={{ fontSize: '12px', letterSpacing: '1px', color: '#5a5a72', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>
                      {copy.tokbuilding.labels.personalityTraits}
                    </label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                      {personalityOptions.map((trait) => (
                        <button
                          key={trait.value}
                          onClick={() => toggleArray('personality', trait.value)}
                          style={{
                            padding: '8px 16px',
                            borderRadius: '20px',
                            fontSize: '12px',
                            border: form.personality.includes(trait.value) ? '2px solid #6366f1' : '1px solid #2a1f5f',
                            background: form.personality.includes(trait.value) ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                            color: form.personality.includes(trait.value) ? '#8b5cf6' : '#5a5a72',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                          }}
                        >
                          {trait.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="tone" style={{ fontSize: '12px', letterSpacing: '1px', color: '#5a5a72', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                      {copy.tokbuilding.labels.primaryTone}
                    </label>
                    <select
                      id="tone"
                      value={form.tone}
                      onChange={e => updateForm('tone', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        background: '#111118',
                        border: '1px solid #2a1f5f',
                        borderRadius: '4px',
                        color: '#e8e8f0',
                        fontFamily: '"Barlow", sans-serif',
                        fontSize: '14px',
                        outline: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      <option value="">{copy.tokbuilding.selectTone}</option>
                      {toneOptions.map((tone) => (
                        <option key={tone.value} value={tone.value}>{tone.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="communicationStyle" style={{ fontSize: '12px', letterSpacing: '1px', color: '#5a5a72', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                      {copy.tokbuilding.labels.communicationStyle}
                    </label>
                    <select
                      id="communicationStyle"
                      value={form.communicationStyle}
                      onChange={e => updateForm('communicationStyle', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        background: '#111118',
                        border: '1px solid #2a1f5f',
                        borderRadius: '4px',
                        color: '#e8e8f0',
                        fontFamily: '"Barlow", sans-serif',
                        fontSize: '14px',
                        outline: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      <option value="">{copy.tokbuilding.selectStyle}</option>
                      {communicationStyleOptions.map((styleOption) => (
                        <option key={styleOption.value} value={styleOption.value}>{styleOption.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Specialization */}
            {step === 3 && (
              <div style={{ animation: 'fadeUp 0.3s ease both' }}>
                <h2 style={{ fontFamily: '"Bebas Neue", serif', fontSize: '32px', letterSpacing: '3px', marginBottom: '24px', color: '#8b5cf6' }}>
                  {copy.tokbuilding.stepTitles.specialization}
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <label style={{ fontSize: '12px', letterSpacing: '1px', color: '#5a5a72', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                      {copy.tokbuilding.labels.useCase}
                    </label>
                    <input
                      type="text"
                      placeholder={copy.tokbuilding.placeholders.useCase}
                      value={form.useCase}
                      onChange={e => updateForm('useCase', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        background: '#111118',
                        border: '1px solid #2a1f5f',
                        borderRadius: '4px',
                        color: '#e8e8f0',
                        fontFamily: '"Barlow", sans-serif',
                        fontSize: '14px',
                        outline: 'none',
                        transition: 'border-color 0.2s',
                        boxSizing: 'border-box',
                      }}
                      onFocus={e => e.currentTarget.style.borderColor = '#6366f1'}
                      onBlur={e => e.currentTarget.style.borderColor = '#2a1f5f'}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '12px', letterSpacing: '1px', color: '#5a5a72', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>
                      {copy.tokbuilding.labels.knowledgeFocus}
                    </label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                      {knowledgeOptions.map((area) => (
                        <button
                          key={area.value}
                          onClick={() => toggleArray('knowledgeFocus', area.value)}
                          style={{
                            padding: '8px 16px',
                            borderRadius: '20px',
                            fontSize: '12px',
                            border: form.knowledgeFocus.includes(area.value) ? '2px solid #6366f1' : '1px solid #2a1f5f',
                            background: form.knowledgeFocus.includes(area.value) ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                            color: form.knowledgeFocus.includes(area.value) ? '#8b5cf6' : '#5a5a72',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                          }}
                        >
                          {area.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '12px', letterSpacing: '1px', color: '#5a5a72', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                      {copy.tokbuilding.labels.targetAudience}
                    </label>
                    <input
                      type="text"
                      placeholder={copy.tokbuilding.placeholders.targetAudience}
                      value={form.targetAudience}
                      onChange={e => updateForm('targetAudience', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        background: '#111118',
                        border: '1px solid #2a1f5f',
                        borderRadius: '4px',
                        color: '#e8e8f0',
                        fontFamily: '"Barlow", sans-serif',
                        fontSize: '14px',
                        outline: 'none',
                        transition: 'border-color 0.2s',
                        boxSizing: 'border-box',
                      }}
                      onFocus={e => e.currentTarget.style.borderColor = '#6366f1'}
                      onBlur={e => e.currentTarget.style.borderColor = '#2a1f5f'}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Details */}
            {step === 4 && (
              <div style={{ animation: 'fadeUp 0.3s ease both' }}>
                <h2 style={{ fontFamily: '"Bebas Neue", serif', fontSize: '32px', letterSpacing: '3px', marginBottom: '24px', color: '#8b5cf6' }}>
                  {copy.tokbuilding.stepTitles.details}
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <label style={{ fontSize: '12px', letterSpacing: '1px', color: '#5a5a72', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                      {copy.tokbuilding.labels.specialization}
                    </label>
                    <input
                      type="text"
                      placeholder={copy.tokbuilding.placeholders.specialization}
                      value={form.specialization}
                      onChange={e => updateForm('specialization', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        background: '#111118',
                        border: '1px solid #2a1f5f',
                        borderRadius: '4px',
                        color: '#e8e8f0',
                        fontFamily: '"Barlow", sans-serif',
                        fontSize: '14px',
                        outline: 'none',
                        transition: 'border-color 0.2s',
                        boxSizing: 'border-box',
                      }}
                      onFocus={e => e.currentTarget.style.borderColor = '#6366f1'}
                      onBlur={e => e.currentTarget.style.borderColor = '#2a1f5f'}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '12px', letterSpacing: '1px', color: '#5a5a72', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                      {copy.tokbuilding.labels.additionalInstructions}
                    </label>
                    <textarea
                      placeholder={copy.tokbuilding.placeholders.additionalInstructions}
                      value={form.additionalInstructions}
                      onChange={e => updateForm('additionalInstructions', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        background: '#111118',
                        border: '1px solid #2a1f5f',
                        borderRadius: '4px',
                        color: '#e8e8f0',
                        fontFamily: '"Barlow", sans-serif',
                        fontSize: '14px',
                        outline: 'none',
                        transition: 'border-color 0.2s',
                        boxSizing: 'border-box',
                        minHeight: '120px',
                        resize: 'vertical',
                      }}
                      onFocus={e => e.currentTarget.style.borderColor = '#6366f1'}
                      onBlur={e => e.currentTarget.style.borderColor = '#2a1f5f'}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Review */}
            {step === 5 && (
              <div style={{ animation: 'fadeUp 0.3s ease both' }}>
                <h2 style={{ fontFamily: '"Bebas Neue", serif', fontSize: '32px', letterSpacing: '3px', marginBottom: '24px', color: '#8b5cf6' }}>
                  {copy.tokbuilding.stepTitles.review}
                </h2>

                {!form.agentName || !form.agentRole ? (
                  <div style={{
                    padding: '20px',
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: '4px',
                    color: '#fca5a5',
                  }}>
                    ⚠️ {copy.tokbuilding.reviewRequired}
                  </div>
                ) : (
                  <>
                    <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
                      <button
                        onClick={() => setShowPreview(!showPreview)}
                        style={{
                          padding: '10px 16px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          fontFamily: '"Bebas Neue", serif',
                          letterSpacing: '1px',
                          border: 'none',
                          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                          color: '#08080a',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                      >
                        {showPreview ? `📋 ${copy.tokbuilding.previewHide}` : `👁 ${copy.tokbuilding.previewShow}`}
                      </button>
                      <button
                        onClick={copyToClipboard}
                        style={{
                          padding: '10px 16px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          fontFamily: '"Bebas Neue", serif',
                          letterSpacing: '1px',
                          border: '1px solid #6366f1',
                          background: copied ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
                          color: copied ? '#8b5cf6' : '#6366f1',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                        }}
                      >
                        {copied ? `✓ ${copy.tokbuilding.copied}` : `📋 ${copy.tokbuilding.copyJson}`}
                      </button>
                      <button
                        onClick={downloadSpec}
                        style={{
                          padding: '10px 16px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          fontFamily: '"Bebas Neue", serif',
                          letterSpacing: '1px',
                          border: '1px solid #6366f1',
                          background: 'transparent',
                          color: '#6366f1',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.background = 'rgba(99, 102, 241, 0.1)';
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.background = 'transparent';
                        }}
                      >
                        ⬇ {copy.tokbuilding.download}
                      </button>
                    </div>

                    {showPreview && (
                      <div style={{
                        padding: '16px',
                        background: '#111118',
                        border: '1px solid #2a1f5f',
                        borderRadius: '4px',
                        marginBottom: '20px',
                        maxHeight: '400px',
                        overflowY: 'auto',
                      }}>
                        <pre style={{
                          fontSize: '11px',
                          color: '#a5b4fc',
                          margin: 0,
                          fontFamily: 'Menlo, monospace',
                          lineHeight: '1.4',
                        }}>
                          {specJSON}
                        </pre>
                      </div>
                    )}

                    <div style={{
                      padding: '20px',
                      background: 'rgba(99, 102, 241, 0.05)',
                      border: '1px solid #2a1f5f',
                      borderRadius: '4px',
                      marginBottom: '20px',
                    }}>
                      <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#8b5cf6', marginBottom: '12px' }}>{copy.tokbuilding.labels.agentSummary}</h3>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '12px' }}>
                        <div>
                          <div style={{ color: '#5a5a72', marginBottom: '4px' }}>{copy.tokbuilding.labels.name}</div>
                          <div style={{ color: '#e8e8f0', fontWeight: 600 }}>{form.agentName}</div>
                        </div>
                        <div>
                          <div style={{ color: '#5a5a72', marginBottom: '4px' }}>{copy.tokbuilding.labels.roleShort}</div>
                          <div style={{ color: '#e8e8f0', fontWeight: 600 }}>{form.agentRole}</div>
                        </div>
                        <div>
                          <div style={{ color: '#5a5a72', marginBottom: '4px' }}>{copy.tokbuilding.labels.tone}</div>
                          <div style={{ color: '#e8e8f0' }}>{form.tone ? optionLabel(form.tone, toneOptions) : copy.common.notSpecified}</div>
                        </div>
                        <div>
                          <div style={{ color: '#5a5a72', marginBottom: '4px' }}>{copy.tokbuilding.labels.useCaseShort}</div>
                          <div style={{ color: '#e8e8f0' }}>{form.useCase || copy.common.notSpecified}</div>
                        </div>
                        <div style={{ gridColumn: '1 / -1' }}>
                          <div style={{ color: '#5a5a72', marginBottom: '4px' }}>{copy.tokbuilding.labels.knowledgeFocusShort}</div>
                          <div style={{ color: '#e8e8f0' }}>
                            {form.knowledgeFocus.length > 0 ? form.knowledgeFocus.map((value) => optionLabel(value, knowledgeOptions)).join(', ') : copy.common.notSpecified}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div style={{ padding: '16px', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '4px', fontSize: '12px', color: '#93c5fd', lineHeight: '1.6' }}>
                      ℹ️ {copy.tokbuilding.ready}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Navigation Buttons */}
            <div style={{ display: 'flex', gap: '12px', marginTop: '40px', justifyContent: 'space-between', maxWidth: '900px' }}>
              <button
                onClick={() => setStep(Math.max(1, step - 1))}
                disabled={step === 1}
                style={{
                  padding: '10px 24px',
                  borderRadius: '4px',
                  fontFamily: '"Bebas Neue", serif',
                  fontSize: '13px',
                  letterSpacing: '2px',
                  border: '1px solid #2a1f5f',
                  background: step === 1 ? 'rgba(99, 102, 241, 0.05)' : 'transparent',
                  color: step === 1 ? '#3a3a4a' : '#6366f1',
                  cursor: step === 1 ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                ← {copy.common.previous}
              </button>

              <button
                onClick={clearDraft}
                style={{
                  padding: '10px 16px',
                  borderRadius: '4px',
                  fontSize: '11px',
                  letterSpacing: '1px',
                  border: '1px solid #5a3535',
                  background: 'transparent',
                  color: '#ef4444',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
                  e.currentTarget.style.borderColor = '#ef4444';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderColor = '#5a3535';
                }}
              >
                🗑 {copy.tokbuilding.clearDraft}
              </button>

              <button
                onClick={() => setStep(Math.min(5, step + 1))}
                disabled={step === 5}
                style={{
                  padding: '10px 24px',
                  borderRadius: '4px',
                  fontFamily: '"Bebas Neue", serif',
                  fontSize: '13px',
                  letterSpacing: '2px',
                  border: 'none',
                  background: step === 5 ? 'rgba(99, 102, 241, 0.3)' : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  color: '#08080a',
                  cursor: step === 5 ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s',
                  fontWeight: 'bold',
                }}
                onMouseEnter={e => step < 5 && (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseLeave={e => step < 5 && (e.currentTarget.style.transform = 'scale(1)')}
              >
                {copy.common.next} →
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
