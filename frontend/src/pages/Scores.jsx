import React, { useState, useEffect } from 'react';
import {
  Trophy,
  Activity,
  Clock,
  Edit3,
  LogOut,
  Shield,
  Calendar,
  Users,
  ChevronUp,
  ChevronDown,
  Zap,
  Award,
  Trash2,
  MessageCircle,
  Send,
  Sun,
  Moon,
  X,
  Flag,
  Menu,
} from 'lucide-react';

import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInAnonymously,
  signInWithCustomToken,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  arrayUnion,
} from 'firebase/firestore';

import './Scores.css';

const firebaseConfig = {
  apiKey: 'AIzaSyDfVEF4OnbYEXZCkjg0957WDMQF_Ms0zeg',
  authDomain: 'sports-live-hub.firebaseapp.com',
  projectId: 'sports-live-hub',
  storageBucket: 'sports-live-hub.firebasestorage.app',
  messagingSenderId: '898208210644',
  appId: '1:898208210644:web:8188f740a07f021dbb6541',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const APP_ID = 'zest-live-ultimate';

const StatusBadge = ({ status }) => {
  const normalized = (status || '').toLowerCase();

  let label = 'Upcoming';
  let className = 'status-badge status-upcoming';

  if (normalized === 'live') {
    label = 'Live';
    className = 'status-badge status-live';
  } else if (normalized === 'finished') {
    label = 'Full Time';
    className = 'status-badge status-finished';
  } else if (normalized === 'break') {
    label = 'Break';
    className = 'status-badge status-break';
  }

  return (
    <span className={className}>
      {normalized === 'live' && (
        <span className="live-indicator">
          <span className="dot" />
          <span className="ping" />
        </span>
      )}
      {label}
    </span>
  );
};

const EditMatchModal = ({ match, onClose, onSave, onDelete, onComment }) => {
  const [form, setForm] = useState({
    teamA: match.teamA || '',
    teamB: match.teamB || '',
    scoreA: match.scoreA ?? 0,
    scoreB: match.scoreB ?? 0,
    detail: match.detail || '00:00',
    status: match.status || 'upcoming',
    playersA: match.playersA || '',
    playersB: match.playersB || '',
  });
  const [commentText, setCommentText] = useState('');

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const quickUpdate = (teamKey, delta) => {
    const key = teamKey === 'A' ? 'scoreA' : 'scoreB';
    setForm((prev) => ({
      ...prev,
      [key]: Math.max(0, (parseInt(prev[key]) || 0) + delta),
    }));
  };

  const handleSave = async () => {
    await onSave({
      teamA: form.teamA.trim(),
      teamB: form.teamB.trim(),
      scoreA: Number(form.scoreA) || 0,
      scoreB: Number(form.scoreB) || 0,
      detail: form.detail || '00:00',
      status: form.status,
      playersA: form.playersA,
      playersB: form.playersB,
    });
    onClose();
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    await onComment(commentText.trim());
    setCommentText('');
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>
            <Edit3 size={18} />
            Edit Match
          </h3>
          <button className="btn-icon" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <div className="status-selector">
            {['upcoming', 'live', 'break', 'finished'].map((s) => (
              <button
                key={s}
                type="button"
                className={`status-btn ${form.status === s ? 'active' : ''}`}
                onClick={() => setForm((prev) => ({ ...prev, status: s }))}
              >
                {s.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="editor-scoreboard">
            <div className="team-col">
              <input
                className="input-transparent"
                value={form.teamA}
                onChange={handleChange('teamA')}
                placeholder="Team A"
              />
              <input
                className="input-score"
                type="number"
                value={form.scoreA}
                onChange={handleChange('scoreA')}
              />
              <div className="quick-actions">
                <button
                  type="button"
                  className="btn-mini"
                  onClick={() => quickUpdate('A', 1)}
                >
                  +1
                </button>
                <button
                  type="button"
                  className="btn-mini"
                  onClick={() => quickUpdate('A', -1)}
                >
                  -1
                </button>
              </div>
            </div>

            <div className="vs-col">
              <div className="vs">VS</div>
              <input
                className="input-detail"
                value={form.detail}
                onChange={handleChange('detail')}
                placeholder="Time / Set / Quarter"
              />
            </div>

            <div className="team-col">
              <input
                className="input-transparent"
                value={form.teamB}
                onChange={handleChange('teamB')}
                placeholder="Team B"
              />
              <input
                className="input-score"
                type="number"
                value={form.scoreB}
                onChange={handleChange('scoreB')}
              />
              <div className="quick-actions">
                <button
                  type="button"
                  className="btn-mini"
                  onClick={() => quickUpdate('B', 1)}
                >
                  +1
                </button>
                <button
                  type="button"
                  className="btn-mini"
                  onClick={() => quickUpdate('B', -1)}
                >
                  -1
                </button>
              </div>
            </div>
          </div>

          <div className="modal-section">
            <h4>
              <Users size={16} />
              Squads
            </h4>
            <div className="row-2">
              <div className="form-group">
                <label>{form.teamA || 'Team A'} Squad</label>
                <textarea
                  className="input-area"
                  rows={4}
                  placeholder="Player 1&#10;Player 2&#10;Player 3..."
                  value={form.playersA}
                  onChange={handleChange('playersA')}
                />
              </div>
              <div className="form-group">
                <label>{form.teamB || 'Team B'} Squad</label>
                <textarea
                  className="input-area"
                  rows={4}
                  placeholder="Player 1&#10;Player 2&#10;Player 3..."
                  value={form.playersB}
                  onChange={handleChange('playersB')}
                />
              </div>
            </div>
          </div>

          <div className="modal-section">
            <h4>
              <MessageCircle size={16} />
              Quick Commentary
            </h4>
            <form className="comment-form" onSubmit={handleCommentSubmit}>
              <input
                type="text"
                className="input-text"
                placeholder="Short update (e.g., Goal by XYZ)..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <button type="submit" className="btn btn-primary">
                <Send size={16} />
                Post
              </button>
            </form>
          </div>
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => onDelete()}
          >
            <Trash2 size={16} />
            Delete Match
          </button>
          <button type="button" className="btn btn-primary" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Scores() {
  const [user, setUser] = useState(null);
  const [matches, setMatches] = useState([]);
  const [sports, setSports] = useState([]);
  const [loading, setLoading] = useState(true);

  // Default to dark theme
  const [theme, setTheme] = useState('dark');
  const [isCoordinator, setIsCoordinator] = useState(false);
  const [activeTab, setActiveTab] = useState('matches');
  const [loginPin, setLoginPin] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMatchId, setExpandedMatchId] = useState(null);
  const [editingMatch, setEditingMatch] = useState(null);

  const [newSportName, setNewSportName] = useState('');
  const [newMatch, setNewMatch] = useState({
    sportId: '',
    teamA: '',
    teamB: '',
    playersA: '',
    playersB: '',
    status: 'upcoming',
  });

  useEffect(() => {
    const body = document.body;
    body.classList.remove('light', 'dark');
    body.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    const initAuth = async () => {
      try {
        if (typeof window !== 'undefined' && window.__initial_auth_token) {
          await signInWithCustomToken(auth, window.__initial_auth_token);
        } else {
          await signInAnonymously(auth);
        }
      } catch {
        // ignore for spectators
      }
    };
    initAuth();
    return onAuthStateChanged(auth, (u) => setUser(u));
  }, []);

  useEffect(() => {
    if (!user) return;

    const matchesRef = collection(db, 'artifacts', APP_ID, 'matches');
    const sportsRef = collection(db, 'artifacts', APP_ID, 'sports');

    const unsubMatches = onSnapshot(matchesRef, (snap) => {
      const data = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));
      const statusOrder = {
        live: 0,
        break: 1,
        upcoming: 2,
        finished: 3,
      };
      data.sort((a, b) => {
        const sa = statusOrder[(a.status || '').toLowerCase()] ?? 99;
        const sb = statusOrder[(b.status || '').toLowerCase()] ?? 99;
        if (sa !== sb) return sa - sb;
        return (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0);
      });
      setMatches(data);
      setLoading(false);
    });

    const unsubSports = onSnapshot(sportsRef, (snap) => {
      setSports(
        snap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        })),
      );
    });

    return () => {
      unsubMatches();
      unsubSports();
    };
  }, [user]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginPin === '1213') {
      setIsCoordinator(true);
      setShowLoginModal(false);
      setActiveTab('matches');
    } else {
      alert('Incorrect PIN');
    }
    setLoginPin('');
  };

  const handleCreateSport = async () => {
    const name = newSportName.trim();
    if (!name) return;
    await addDoc(collection(db, 'artifacts', APP_ID, 'sports'), {
      name,
      createdAt: serverTimestamp(),
    });
    setNewSportName('');
  };

  const handleDeleteSport = async (sportId) => {
    if (!window.confirm('Delete this sport category?')) return;
    await deleteDoc(doc(db, 'artifacts', APP_ID, 'sports', sportId));
  };

  const handleCreateMatch = async (e) => {
    e.preventDefault();
    if (!newMatch.teamA.trim() || !newMatch.teamB.trim()) return;
    await addDoc(collection(db, 'artifacts', APP_ID, 'matches'), {
      sportId: newMatch.sportId || '',
      teamA: newMatch.teamA.trim(),
      teamB: newMatch.teamB.trim(),
      playersA: newMatch.playersA.trim(),
      playersB: newMatch.playersB.trim(),
      status: newMatch.status || 'upcoming',
      scoreA: 0,
      scoreB: 0,
      detail: '00:00',
      commentary: [],
      createdAt: serverTimestamp(),
      lastUpdated: serverTimestamp(),
    });
    setNewMatch({
      ...newMatch,
      teamA: '',
      teamB: '',
      playersA: '',
      playersB: '',
      sportId: newMatch.sportId,
    });
    setActiveTab('matches');
  };

  const handleDeleteMatch = async (matchId) => {
    if (!window.confirm('Are you sure you want to delete this match?')) return;
    await deleteDoc(doc(db, 'artifacts', APP_ID, 'matches', matchId));
    setEditingMatch(null);
  };

  const handleUpdateMatch = async (matchId, updates) => {
    await updateDoc(doc(db, 'artifacts', APP_ID, 'matches', matchId), {
      ...updates,
      lastUpdated: serverTimestamp(),
    });
  };

  const handleAddCommentary = async (matchId, text) => {
    if (!text.trim()) return;
    const newComment = {
      id: Date.now(),
      text,
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    await updateDoc(doc(db, 'artifacts', APP_ID, 'matches', matchId), {
      commentary: arrayUnion(newComment),
      lastUpdated: serverTimestamp(),
    });
  };

  const getSportName = (sportId) =>
    sports.find((s) => s.id === sportId)?.name || 'General';

  const renderMatchCard = (match) => {
    const isExpanded = expandedMatchId === match.id;
    const sportName = getSportName(match.sportId);
    const scoreA = match.scoreA ?? 0;
    const scoreB = match.scoreB ?? 0;
    const status = (match.status || '').toLowerCase();

    let winning = '';
    if (scoreA > scoreB) winning = 'A';
    else if (scoreB > scoreA) winning = 'B';

    const isFinished = status === 'finished';
    const hasWinner = winning === 'A' || winning === 'B';
    const winnerName =
      winning === 'A' ? match.teamA : winning === 'B' ? match.teamB : 'Draw';

    return (
      <div
        key={match.id}
        className={`card match-card ${isFinished ? 'match-finished' : ''}`}
      >
        <div
          className={`card-header-strip ${
            status === 'live' ? 'strip-live' : ''
          }`}
        >
          <div className="strip-left">
            <div className="sport-tag">
              <Trophy size={14} />
              {sportName}
            </div>
            <StatusBadge status={match.status} />
          </div>
          <div className="strip-right">
            <div className="time-pill">
              <Clock size={12} />
              {match.detail || (isFinished ? 'FT' : '00:00')}
            </div>
            {isCoordinator && (
              <button
                type="button"
                className="btn-edit"
                onClick={() => setEditingMatch(match)}
              >
                <Edit3 size={14} />
                Edit
              </button>
            )}
          </div>
        </div>

        <div className="card-body">
          {isFinished && (
            <div className="winner-banner">
              <span className="winner-flag">
                <Flag size={14} />
              </span>
              {hasWinner ? (
                <span className="winner-text">{winnerName} WIN</span>
              ) : (
                <span className="winner-text">Match Drawn</span>
              )}
            </div>
          )}

          <div className="score-display">
            <div className={`team-block ${winning === 'A' ? 'winning' : ''}`}>
              <p className="team-name">{match.teamA}</p>
              <div className="team-score score-pop">{scoreA}</div>
              {isFinished && winning === 'A' && (
                <div className="team-result-chip">Winner</div>
              )}
            </div>

            <div className="match-meta">
              <div className="vs">VS</div>
              {match.lastUpdated && (
                <div className="last-updated">
                  <Clock size={12} />
                  Updated recently
                </div>
              )}
            </div>

            <div className={`team-block ${winning === 'B' ? 'winning' : ''}`}>
              <p className="team-name">{match.teamB}</p>
              <div className="team-score score-pop">{scoreB}</div>
              {isFinished && winning === 'B' && (
                <div className="team-result-chip">Winner</div>
              )}
            </div>
          </div>

          <button
            type="button"
            className="toggle-details-btn"
            onClick={() =>
              setExpandedMatchId(isExpanded ? null : match.id)
            }
          >
            {isExpanded ? (
              <>
                Hide details
                <ChevronUp size={16} />
              </>
            ) : (
              <>
                Match details & squads
                <ChevronDown size={16} />
              </>
            )}
          </button>

          <div className={`details-accordion ${isExpanded ? 'open' : ''}`}>
            {isExpanded && (
              <div className="accordion-content">
                <div className="commentary-section">
                  <h5>Live Commentary</h5>
                  <div className="commentary-feed">
                    {match.commentary && match.commentary.length > 0 ? (
                      match.commentary
                        .slice()
                        .sort((a, b) => a.id - b.id)
                        .map((c) => (
                          <div key={c.id} className="comment-bubble">
                            <span className="comment-time">{c.time}</span>
                            <span className="comment-text">{c.text}</span>
                          </div>
                        ))
                    ) : (
                      <p className="empty-text">No updates yet.</p>
                    )}
                  </div>
                </div>

                <div className="squads-row">
                  <div className="squad-col">
                    <h6>{match.teamA} Squad</h6>
                    <p>{match.playersA ? match.playersA : 'TBA'}</p>
                  </div>
                  <div className="squad-col">
                    <h6>{match.teamB} Squad</h6>
                    <p>{match.playersB ? match.playersB : 'TBA'}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="app-container !bg-gradient-to-b !from-blue-1000 !via-orange-900 !to-blue-1000">
      <div className="hero-gradient-bg " />
      <header className="header">
        <div className="header-content container">
          {/* Mobile hamburger on the opposite side of ZEST LIVE */}
          <button
            type="button"
            className="btn-icon show-mobile header-menu-left"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={18} />
          </button>

          <div
            className="logo-section"
            onClick={() => setActiveTab('matches')}
          >
            <div className="logo-icon-zest logo-bounce">
              <Zap size={20} />
            </div>
            <div>
              <h1>
                ZEST
                <span className="accent-text">&nbsp;LIVE</span>
              </h1>
              <p className="tagline hide-mobile">
                Bold. Fast. Live scores for Asia&apos;s 4th largest college
                sports fest.
              </p>
            </div>
          </div>
          <div className="header-actions">
            <button
              type="button"
              className="btn-icon theme-toggle-btn"
              onClick={() =>
                setTheme(theme === 'light' ? 'dark' : 'light')
              }
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            {!isCoordinator ? (
              <button
                type="button"
                className="btn btn-outline hide-mobile"
                onClick={() => setShowLoginModal(true)}
              >
                <Shield size={16} />
                Coordinator
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-outline hide-mobile"
                onClick={() => setIsCoordinator(false)}
              >
                <LogOut size={16} />
                Exit Admin
              </button>
            )}
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div
          className="mobile-menu-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="mobile-menu-panel"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mobile-menu-header">
              <span className="mobile-menu-title">Menu</span>
              <button
                type="button"
                className="btn-icon"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mobile-menu-section">
              <p className="mobile-menu-label">Appearance</p>
              <button
                type="button"
                className="mobile-menu-item"
                onClick={() =>
                  setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
                }
              >
                {theme === 'light' ? (
                  <>
                    <Moon size={16} />
                    <span>Switch to dark</span>
                  </>
                ) : (
                  <>
                    <Sun size={16} />
                    <span>Switch to light</span>
                  </>
                )}
              </button>
            </div>

            <div className="mobile-menu-section">
              <p className="mobile-menu-label">Coordinator</p>
              {!isCoordinator ? (
                <button
                  type="button"
                  className="mobile-menu-item"
                  onClick={() => {
                    setShowLoginModal(true);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <Shield size={16} />
                  <span>Login as coordinator</span>
                </button>
              ) : (
                <button
                  type="button"
                  className="mobile-menu-item"
                  onClick={() => {
                    setIsCoordinator(false);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <LogOut size={16} />
                  <span>Exit admin</span>
                </button>
              )}
            </div>

            {isCoordinator && (
              <div className="mobile-menu-section">
                <p className="mobile-menu-label">Admin</p>
                <button
                  type="button"
                  className={`mobile-menu-item ${
                    activeTab === 'matches' ? 'active' : ''
                  }`}
                  onClick={() => {
                    setActiveTab('matches');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <Activity size={16} />
                  <span>Live matches</span>
                </button>
                <button
                  type="button"
                  className={`mobile-menu-item ${
                    activeTab === 'create' ? 'active' : ''
                  }`}
                  onClick={() => {
                    setActiveTab('create');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <Calendar size={16} />
                  <span>Create match</span>
                </button>
                <button
                  type="button"
                  className={`mobile-menu-item ${
                    activeTab === 'sports' ? 'active' : ''
                  }`}
                  onClick={() => {
                    setActiveTab('sports');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <Award size={16} />
                  <span>Sports</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {isCoordinator && (
        <div className="container">
          <div className="nav-tabs">
            <button
              type="button"
              className={`nav-tab ${
                activeTab === 'matches' ? 'active' : ''
              }`}
              onClick={() => setActiveTab('matches')}
            >
              <Activity size={16} />
              Live Matches
            </button>
            <button
              type="button"
              className={`nav-tab ${
                activeTab === 'create' ? 'active' : ''
              }`}
              onClick={() => setActiveTab('create')}
            >
              <Calendar size={16} />
              Create Match
            </button>
            <button
              type="button"
              className={`nav-tab ${
                activeTab === 'sports' ? 'active' : ''
              }`}
              onClick={() => setActiveTab('sports')}
            >
              <Award size={16} />
              Sports
            </button>
          </div>
        </div>
      )}

      <main className="container main-content">
        {activeTab === 'matches' && (
          <>
            {loading ? (
              <div className="card loading-card">
                <div className="card-body loading-body">
                  <div className="spinner spin" />
                  <p>Warming up the scoreboard…</p>
                </div>
              </div>
            ) : matches.length === 0 ? (
              <div className="card">
                <div className="card-body empty-state">
                  <Trophy size={28} />
                  <h3>No matches yet</h3>
                  <p>Once matches go live, they&apos;ll appear here.</p>
                  {isCoordinator && (
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => setActiveTab('create')}
                    >
                      <Calendar size={16} />
                      Create your first match
                    </button>
                  )}
                </div>
              </div>
            ) : (
              matches.map(renderMatchCard)
            )}
          </>
        )}
        {activeTab === 'create' && isCoordinator && (
          <div className="card form-card">
            <h2>
              <Calendar size={22} />
              &nbsp;Create New Match
            </h2>
            <form onSubmit={handleCreateMatch}>
              <div className="form-group">
                <label>Sport</label>
                <select
                  className="input-select"
                  value={newMatch.sportId}
                  onChange={(e) =>
                    setNewMatch((prev) => ({
                      ...prev,
                      sportId: e.target.value,
                    }))
                  }
                >
                  <option value="">Select sport</option>
                  {sports.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="row-2">
                <div className="form-group">
                  <label>Team A</label>
                  <input
                    className="input-text"
                    value={newMatch.teamA}
                    onChange={(e) =>
                      setNewMatch((prev) => ({
                        ...prev,
                        teamA: e.target.value,
                      }))
                    }
                    placeholder="College / Team Name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Team B</label>
                  <input
                    className="input-text"
                    value={newMatch.teamB}
                    onChange={(e) =>
                      setNewMatch((prev) => ({
                        ...prev,
                        teamB: e.target.value,
                      }))
                    }
                    placeholder="College / Team Name"
                    required
                  />
                </div>
              </div>
              <div className="row-2">
                <div className="form-group">
                  <label>Team A Squad (optional)</label>
                  <textarea
                    className="input-area"
                    rows={4}
                    placeholder="One player per line"
                    value={newMatch.playersA}
                    onChange={(e) =>
                      setNewMatch((prev) => ({
                        ...prev,
                        playersA: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Team B Squad (optional)</label>
                  <textarea
                    className="input-area"
                    rows={4}
                    placeholder="One player per line"
                    value={newMatch.playersB}
                    onChange={(e) =>
                      setNewMatch((prev) => ({
                        ...prev,
                        playersB: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-primary btn-block">
                <Zap size={18} />
                Create Match
              </button>
            </form>
          </div>
        )}
        {activeTab === 'sports' && isCoordinator && (
          <div className="card form-card">
            <h2>
              <Award size={22} />
              &nbsp;Sports Categories
            </h2>
            <div className="add-sport-row">
              <input
                type="text"
                className="input-text"
                placeholder="Add new sport (e.g., Football)"
                value={newSportName}
                onChange={(e) => setNewSportName(e.target.value)}
              />
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleCreateSport}
              >
                Add
              </button>
            </div>
            <div className="tags-cloud">
              {sports.length === 0 && (
                <p className="empty-text">
                  No sports added yet. Create your first category.
                </p>
              )}
              {sports.map((s) => (
                <span key={s.id} className="sport-tag-removable">
                  {s.name}
                  <button
                    type="button"
                    onClick={() => handleDeleteSport(s.id)}
                    aria-label="Delete sport"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}
      </main>
      {showLoginModal && !isCoordinator && (
        <div className="modal-overlay">
          <div className="modal-content modal-tiny">
            <h3>
              <Shield size={18} />
              Coordinator Access
            </h3>
            <p className="modal-subtitle">
              Enter the PIN provided by the ZEST tech team to manage matches.
            </p>
            <form onSubmit={handleLogin}>
              <input
                type="password"
                className="input-pin"
                placeholder="PIN"
                value={loginPin}
                onChange={(e) => setLoginPin(e.target.value)}
              />
              <button type="submit" className="btn btn-primary btn-block">
                Login
              </button>
            </form>
            <button
              type="button"
              className="btn btn-text btn-block"
              onClick={() => setShowLoginModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {editingMatch && (
        <EditMatchModal
          match={editingMatch}
          onClose={() => setEditingMatch(null)}
          onSave={(updates) => handleUpdateMatch(editingMatch.id, updates)}
          onDelete={() => handleDeleteMatch(editingMatch.id)}
          onComment={(text) => handleAddCommentary(editingMatch.id, text)}
        />
      )}
    </div>
  );
}