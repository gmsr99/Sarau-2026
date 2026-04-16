import { useState } from 'react'
import { acts, mapaDeСenas, spectacle } from './data.js'

function ChevronIcon({ open }) {
  return (
    <svg
      width="20" height="20" viewBox="0 0 20 20" fill="none"
      style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.25s ease', flexShrink: 0 }}
    >
      <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function MicIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      <path d="M12 1a4 4 0 0 0-4 4v7a4 4 0 0 0 8 0V5a4 4 0 0 0-4-4z" fill="currentColor" opacity="0.9"/>
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="12" y1="19" x2="12" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="8" y1="23" x2="16" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}

function NoteIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      <path d="M9 18V5l12-2v13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="6" cy="18" r="3" fill="currentColor" opacity="0.9"/>
      <circle cx="18" cy="16" r="3" fill="currentColor" opacity="0.9"/>
    </svg>
  )
}

function SceneCard({ scene, accentColor }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="scene-card">
      <button className="scene-header" onClick={() => setOpen(o => !o)}>
        <div className="scene-header-left">
          <span className="scene-number" style={{ backgroundColor: accentColor }}>
            {scene.number}
          </span>
          <div>
            <div className="scene-title">{scene.title}</div>
            <div className="scene-turma">{scene.turma}</div>
          </div>
        </div>
        <ChevronIcon open={open} />
      </button>

      {open && (
        <div className="scene-body">
          <p className="scene-descricao">{scene.descricao}</p>

          <div className="info-block narracao-block">
            <div className="info-block-header">
              <MicIcon />
              <span>Narração Gravada</span>
            </div>
            <blockquote className="narracao-text">{scene.narracao}</blockquote>
            {scene.narracaoNota && (
              <p className="narracao-nota">[ {scene.narracaoNota} ]</p>
            )}
          </div>

          <div className="info-block musica-block">
            <div className="info-block-header">
              <NoteIcon />
              <span>Referência Musical</span>
            </div>
            <p className="musica-principal">{scene.musica}</p>
            {scene.musicaAlt && (
              <p className="musica-alt">Alternativa: {scene.musicaAlt}</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function ActAccordion({ act, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen || false)

  return (
    <div className="act-accordion" style={{ '--act-color': act.color }}>
      <button className="act-header" onClick={() => setOpen(o => !o)}>
        <div className="act-header-left">
          <span className="act-number">{act.number}</span>
          <div>
            <div className="act-title">{act.title}</div>
            <div className="act-subtitle">{act.subtitle}</div>
          </div>
        </div>
        <ChevronIcon open={open} />
      </button>

      {open && (
        <div className="act-body">
          <p className="act-intro">{act.intro}</p>
          <div className="scenes-list">
            {act.scenes.map(scene => (
              <SceneCard key={scene.number} scene={scene} accentColor={act.color} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function MapaCenas() {
  const [open, setOpen] = useState(false)

  const atColors = {
    'ATO I':   '#e53e3e',
    'ATO II':  '#3182ce',
    'ATO III': '#38a169',
    'ATO IV':  '#d69e2e',
    'ATO V':   '#805ad5',
  }

  return (
    <div className="mapa-accordion">
      <button className="mapa-header" onClick={() => setOpen(o => !o)}>
        <span className="mapa-title">Mapa de Cenas</span>
        <ChevronIcon open={open} />
      </button>
      {open && (
        <div className="mapa-body">
          <div className="mapa-table">
            <div className="mapa-row mapa-row--head">
              <span>#</span>
              <span>Título</span>
              <span>Turma</span>
            </div>
            {mapaDeСenas.map(row => (
              <div key={row.cena} className="mapa-row" style={{ borderLeftColor: atColors[row.ato] }}>
                <span className="mapa-cena-num" style={{ color: atColors[row.ato] }}>{row.cena}</span>
                <div>
                  <div className="mapa-titulo">{row.titulo}</div>
                  <div className="mapa-ato-tag" style={{ color: atColors[row.ato] }}>{row.ato}</div>
                </div>
                <span className="mapa-turma">{row.turma}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function App() {
  return (
    <div className="app">
      <header className="app-header">
        <div className="header-badge">Sarau 2026</div>
        <h1 className="header-title">UTOPIA</h1>
        <p className="header-tagline">{spectacle.tagline}</p>
        <p className="header-desc">{spectacle.description}</p>
        <div className="arco-container">
          {spectacle.arco.map((item, i) => (
            <span key={i} className="arco-item">
              {item}
              {i < spectacle.arco.length - 1 && <span className="arco-sep">→</span>}
            </span>
          ))}
        </div>
      </header>

      <main className="app-main">
        {acts.map((act, i) => (
          <ActAccordion key={act.id} act={act} defaultOpen={i === 0} />
        ))}
        <MapaCenas />
      </main>

      <footer className="app-footer">
        <p>{spectacle.clube}</p>
      </footer>
    </div>
  )
}
