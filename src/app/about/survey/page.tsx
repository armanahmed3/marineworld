'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Survey {
  id: string
  title: string
  description?: string
  questions?: { id: string; text: string; type: string }[]
}

export default function SurveyPage() {
  const [surveys, setSurveys] = useState<Survey[]>([])
  const [loading, setLoading] = useState(true)
  const [activeSurvey, setActiveSurvey] = useState<string | null>(null)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState({ name: '', email: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  useEffect(() => {
    fetch('/api/surveys?active=true')
      .then((r) => r.json())
      .then((data) => {
        setSurveys(Array.isArray(data) ? data : data.surveys || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/survey-responses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          surveyId: activeSurvey,
          respondentName: formData.name,
          respondentEmail: formData.email,
          answers,
        }),
      })
      if (res.ok) {
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const inputStyle = {
    width: '100%', padding: '12px 16px', borderRadius: '4px', border: '1px solid #333',
    background: '#0A0E1B', color: '#fff', fontSize: '15px', fontFamily: "'Roboto Condensed', sans-serif",
  }
  const labelStyle = { display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: 600, color: '#ccc' }

  return (
    <div style={{ padding: '60px 20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '42px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Customer Survey</h1>
      <p style={{ color: '#999', fontSize: '16px', marginBottom: '30px' }}>We value your feedback. Help us improve.</p>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: '#999' }}>Loading surveys...</div>
      ) : surveys.length === 0 ? (
        <div style={{ background: '#0B1325', padding: '40px', borderRadius: '8px', border: '1px solid #1a2040', textAlign: 'center' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#EB2E25', marginBottom: '12px' }}>No Active Surveys</h2>
          <p style={{ color: '#ccc', fontSize: '14px' }}>There are no active surveys at this time. Please check back later.</p>
          <Link href="/" style={{ display: 'inline-block', marginTop: '16px', padding: '10px 24px', background: '#EB2E25', color: '#fff', textDecoration: 'none', borderRadius: '4px', fontWeight: 700 }}>Back to Home</Link>
        </div>
      ) : status === 'success' ? (
        <div style={{ background: '#0B1325', padding: '40px', borderRadius: '8px', border: '1px solid #1a2040', textAlign: 'center' }}>
          <h2 style={{ color: '#EB2E25', fontSize: '24px', marginBottom: '12px' }}>Survey Complete!</h2>
          <p style={{ color: '#ccc', fontSize: '14px' }}>Thank you for your feedback. We appreciate your input.</p>
          <Link href="/" style={{ display: 'inline-block', marginTop: '20px', padding: '12px 32px', background: '#EB2E25', color: '#fff', textDecoration: 'none', borderRadius: '4px', fontWeight: 700 }}>Back to Home</Link>
        </div>
      ) : (
        <div>
          {surveys.map((survey) => (
            <div key={survey.id}>
              {!activeSurvey || activeSurvey !== survey.id ? (
                <div
                  style={{ background: '#0B1325', padding: '24px', borderRadius: '8px', border: '1px solid #1a2040', cursor: 'pointer', marginBottom: '16px' }}
                  onClick={() => setActiveSurvey(survey.id)}
                >
                  <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#EB2E25', marginBottom: '8px' }}>{survey.title}</h3>
                  {survey.description && <p style={{ color: '#ccc', fontSize: '14px', margin: 0 }}>{survey.description}</p>}
                  <p style={{ color: '#EB2E25', fontSize: '13px', marginTop: '12px', fontWeight: 600 }}>Click to take survey →</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ background: '#0B1325', padding: '30px', borderRadius: '8px', border: '1px solid #1a2040' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#EB2E25', marginBottom: '20px' }}>{survey.title}</h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                    <div>
                      <label style={labelStyle}>Your Name *</label>
                      <input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Email *</label>
                      <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required style={inputStyle} />
                    </div>
                  </div>

                  {survey.questions && survey.questions.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '24px' }}>
                      {survey.questions.map((q) => (
                        <div key={q.id}>
                          <label style={labelStyle}>{q.text}</label>
                          {q.type === 'textarea' ? (
                            <textarea
                              value={answers[q.id] || ''}
                              onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
                              rows={3}
              style={inputStyle}
                            />
                          ) : (
                            <input
                              type="text"
                              value={answers[q.id] || ''}
                              onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
                              style={inputStyle}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{ marginBottom: '24px' }}>
                      <label style={labelStyle}>Your Feedback *</label>
                      <textarea
                        value={answers['feedback'] || ''}
                        onChange={(e) => setAnswers({ feedback: e.target.value })}
                        required
                        rows={5}
                        placeholder="Share your thoughts about your experience at Marine World of Texas..."
                        style={inputStyle}
                      />
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button type="submit" disabled={status === 'loading'} style={{
                      padding: '12px 28px', background: status === 'loading' ? '#555' : '#EB2E25', color: '#fff', border: 'none',
                      borderRadius: '4px', fontSize: '15px', fontWeight: 700, textTransform: 'uppercase', cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                      fontFamily: "'Roboto Condensed', sans-serif",
                    }}>
                      {status === 'loading' ? 'Submitting...' : 'Submit Survey'}
                    </button>
                    <button type="button" onClick={() => setActiveSurvey(null)} style={{
                      padding: '12px 28px', background: 'transparent', color: '#fff', border: '2px solid #555',
                      borderRadius: '4px', fontSize: '15px', fontWeight: 700, cursor: 'pointer', fontFamily: "'Roboto Condensed', sans-serif",
                    }}>
                      Cancel
                    </button>
                  </div>
                  {status === 'error' && <p style={{ color: '#EB2E25', fontSize: '14px', marginTop: '12px' }}>Error submitting survey. Please try again.</p>}
                </form>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
