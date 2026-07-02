'use client'

import { useState, useEffect } from 'react'
import { HiPlus, HiPencil, HiTrash, HiX, HiEye } from 'react-icons/hi'

export default function SurveysPage() {
  const [surveys, setSurveys] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [form, setForm] = useState({ title: '', questions: '', active: true })
  const [viewResponses, setViewResponses] = useState<any[] | null>(null)
  const [viewSurveyTitle, setViewSurveyTitle] = useState('')
  const [responsesLoading, setResponsesLoading] = useState(false)

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/surveys?all=true')
      const data = await res.json()
      setSurveys(data.surveys ?? [])
    } catch { console.error('Failed to fetch') }
    finally { setLoading(false) }
  }

  useEffect(() => { fetchData() }, [])

  const resetForm = () => {
    setForm({ title: '', questions: '', active: true })
    setEditingId(null)
    setShowForm(false)
  }

  const openEdit = (s: any) => {
    setForm({ title: s.title || '', questions: s.questions || '', active: s.active })
    setEditingId(s.id)
    setShowForm(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      let res
      if (editingId) {
        res = await fetch(`/api/surveys/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
      } else {
        res = await fetch('/api/surveys', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
      }
      if (res.ok) { resetForm(); fetchData() }
    } catch { console.error('Failed to save') }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this survey and all its responses?')) return
    try {
      const res = await fetch(`/api/surveys/${id}`, { method: 'DELETE' })
      if (res.ok) setSurveys((prev) => prev.filter((s) => s.id !== id))
    } catch { console.error('Failed to delete') }
  }

  const viewResponsesHandler = async (survey: any) => {
    setViewSurveyTitle(survey.title)
    setResponsesLoading(true)
    try {
      const res = await fetch(`/api/survey-responses?surveyId=${survey.id}`)
      const data = await res.json()
      setViewResponses(data.responses ?? [])
    } catch { setViewResponses([]) }
    finally { setResponsesLoading(false) }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '10px 12px', background: '#0A0E1B',
    border: '1px solid rgba(255,255,255,0.12)', borderRadius: '6px',
    color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box',
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, margin: 0 }}>Surveys</h1>
        <button onClick={() => { resetForm(); setShowForm(true) }} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '10px 20px', background: '#f8941e', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 700, fontSize: '14px' }}>
          <HiPlus /> Add Survey
        </button>
      </div>

      {showForm && (
        <div style={{ background: '#1a1f35', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)', padding: '20px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '16px' }}>{editingId ? 'Edit Survey' : 'Add New Survey'}</h3>
            <button onClick={resetForm} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', fontSize: '18px' }}><HiX /></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', color: '#ccc', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Title *</label>
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required style={inputStyle} />
            </div>
            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', color: '#ccc', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Questions (JSON)</label>
              <textarea value={form.questions} onChange={(e) => setForm({ ...form, questions: e.target.value })} rows={5} style={{ ...inputStyle, resize: 'vertical', fontFamily: 'monospace', fontSize: '13px' }} />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#ccc', fontSize: '13px', fontWeight: 600 }}>
                <input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} style={{ accentColor: '#f8941e' }} />
                Active
              </label>
            </div>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button type="button" onClick={resetForm} style={{ padding: '8px 20px', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '6px', color: '#ccc', cursor: 'pointer', fontSize: '14px' }}>Cancel</button>
              <button type="submit" style={{ padding: '8px 20px', background: '#f8941e', border: 'none', borderRadius: '6px', color: '#fff', cursor: 'pointer', fontWeight: 700, fontSize: '14px' }}>
                {editingId ? 'Update' : 'Add'} Survey
              </button>
            </div>
          </form>
        </div>
      )}

      <div style={{ background: '#1a1f35', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#888' }}>Loading...</div>
        ) : surveys.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#888' }}>No surveys found.</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ color: '#888', textTransform: 'uppercase', fontSize: '11px', letterSpacing: '0.5px' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Title</th>
                  <th style={{ padding: '12px 16px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Active</th>
                  <th style={{ padding: '12px 16px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Responses</th>
                  <th style={{ padding: '12px 16px', textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {surveys.map((s, i) => (
                  <tr key={s.id} style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)', color: '#ccc' }}>
                    <td style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)', color: '#fff', fontWeight: 600 }}>{s.title}</td>
                    <td style={{ padding: '12px 16px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <span style={{ color: s.active ? '#22c55e' : '#888', fontWeight: 600, fontSize: '12px' }}>{s.active ? 'Yes' : 'No'}</span>
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <span style={{ color: '#f8941e', fontWeight: 700 }}>{s.responses?.length ?? 0}</span>
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                        <button onClick={() => viewResponsesHandler(s)} style={{ padding: '6px 10px', background: 'rgba(59,130,246,0.15)', color: '#3b82f6', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}>
                          <HiEye style={{ marginRight: '4px' }} /> Responses
                        </button>
                        <button onClick={() => openEdit(s)} style={{ padding: '6px 10px', background: 'rgba(255,255,255,0.1)', color: '#ccc', border: 'none', borderRadius: '4px', cursor: 'pointer' }}><HiPencil /></button>
                        <button onClick={() => handleDelete(s.id)} style={{ padding: '6px 10px', background: 'rgba(235,46,37,0.15)', color: '#EB2E25', border: 'none', borderRadius: '4px', cursor: 'pointer' }}><HiTrash /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {viewResponses !== null && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}
          onClick={() => setViewResponses(null)}
        >
          <div style={{ background: '#1a1f35', borderRadius: '10px', padding: '24px', maxWidth: '600px', width: '90%', maxHeight: '80vh', overflow: 'auto', border: '1px solid rgba(255,255,255,0.1)' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '18px', color: '#fff' }}>Responses: {viewSurveyTitle}</h3>
              <button onClick={() => setViewResponses(null)} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', fontSize: '20px' }}><HiX /></button>
            </div>
            {responsesLoading ? (
              <div style={{ padding: '20px', textAlign: 'center', color: '#888' }}>Loading responses...</div>
            ) : viewResponses.length === 0 ? (
              <div style={{ padding: '20px', textAlign: 'center', color: '#888' }}>No responses yet.</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {viewResponses.map((r: any) => (
                  <div key={r.id} style={{ background: '#0A0E1B', borderRadius: '8px', padding: '14px' }}>
                    <div style={{ color: '#888', fontSize: '11px', marginBottom: '6px' }}>
                      {r.email && <span>{r.email} — </span>}
                      {new Date(r.createdAt).toLocaleString()}
                    </div>
                    <div style={{ color: '#ccc', fontSize: '13px', whiteSpace: 'pre-wrap' }}>{r.answers || 'No answers'}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
