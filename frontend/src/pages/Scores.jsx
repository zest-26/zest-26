import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '@/components/SEO';
import { api } from '../api/client';
import ScoreCard from '../components/ScoreCard';
import Tabs from '../components/Tabs';
import SportFilter from '../components/SportFilter';
import { RefreshCw, Lock, Unlock, Plus, X, Save, LogOut, Map, MapPin } from 'lucide-react';

const Scores = () => {
  const navigate = useNavigate();
  // --- Public State ---
  const [activeTab, setActiveTab] = useState('live');
  const [selectedSport, setSelectedSport] = useState('');
  const [venueFilter, setVenueFilter] = useState('');
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allMatches, setAllMatches] = useState({ upcoming: [], live: [], recent: [] });

  // --- Admin State ---
  const [adminPassword, setAdminPassword] = useState(null);
  const [sports, setSports] = useState([]); // For dropdowns
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingMatch, setEditingMatch] = useState(null);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [addForm, setAddForm] = useState({ sport_id: '', team_a: '', team_b: '', venue: '', start_time: '' });

  // --- Fetch Logic ---
  const [lastRefresh, setLastRefresh] = useState(0);
  const [updatedAt, setUpdatedAt] = useState(null);
  const [refreshMessage, setRefreshMessage] = useState('');

  const fetchMatches = async (force = false) => {
    const now = Date.now();
    if (!force && lastRefresh > 0 && now - lastRefresh < 15000) {
      const remaining = Math.ceil((15000 - (now - lastRefresh)) / 1000);
      setRefreshMessage(`Wait ${remaining}s`);
      setTimeout(() => setRefreshMessage(''), 2000);
      return;
    }

    setLoading(true);
    const data = await api.getMatches(activeTab);
    setMatches(data);
    setLoading(false);
    setLastRefresh(now);
    setUpdatedAt(new Date());
  };

  const fetchAllCounts = async () => {
    const [up, liv, rec] = await Promise.all([
      api.getMatches('upcoming'),
      api.getMatches('live'),
      api.getMatches('recent')
    ]);
    setAllMatches({ upcoming: up, live: liv, recent: rec });
  };

  const loadSports = async () => {
    const s = await api.getSports();
    setSports(s.sort((a, b) => a.name.localeCompare(b.name)));
  };

  // --- Safe Storage Helpers ---
  const getStorage = (key) => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        return window.localStorage.getItem(key);
      }
    } catch (e) { console.warn('Storage error', e); }
    return null;
  };
  const setStorage = (key, val) => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(key, val);
      }
    } catch (e) { console.warn('Storage error', e); }
  };
  const removeStorage = (key) => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(key);
      }
    } catch (e) { console.warn('Storage error', e); }
  };

  // --- Effects ---
  useEffect(() => {
    fetchMatches(true);
  }, [activeTab]);

  useEffect(() => {
    fetchAllCounts();
    loadSports();

    // Check for existing password
    const storedPass = getStorage('admin_password');
    if (storedPass) {
      // Verify if it's still good
      api.verifySession(storedPass).then(res => {
        if (res.success) setAdminPassword(storedPass);
        else {
          removeStorage('admin_password');
          setAdminPassword(null);
        }
      });
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await api.login(loginForm.username, loginForm.password);
    if (res.success) {
      setAdminPassword(loginForm.password);
      setStorage('admin_password', loginForm.password);
      setShowLoginModal(false);
      setLoginForm({ username: '', password: '' });
    } else {
      alert('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setAdminPassword(null);
    removeStorage('admin_password');
  };

  const handleAddMatch = async (e) => {
    e.preventDefault();
    const res = await api.addMatch(addForm, adminPassword);
    if (res.success) {
      setShowAddModal(false);
      fetchMatches();
      fetchAllCounts();
      setAddForm({ sport_id: '', team_a: '', team_b: '', venue: '', start_time: '' });
    } else {
      alert('Failed: ' + (res.error || 'Unknown error'));
    }
  };

  const handleUpdateScore = async (e) => {
    e.preventDefault();

    // Auto-calc winner details if marking as recent/finished and details are empty
    let finalDetails = editingMatch.score_details;
    if ((editingMatch.status === 'recent' || editingMatch.status === 'finished') && !finalDetails) {
      const sa = parseFloat(editingMatch.score_a || 0);
      const sb = parseFloat(editingMatch.score_b || 0);
      if (sa > sb) finalDetails = `${editingMatch.team_a} Won`;
      else if (sb > sa) finalDetails = `${editingMatch.team_b} Won`;
      else finalDetails = "Draw";
    }

    const res = await api.updateScore({
      ...editingMatch,
      score_details: finalDetails,
      overs_a: editingMatch.overs_a || '0.0',
      overs_b: editingMatch.overs_b || '0.0',
      sets: editingMatch.sets
    }, adminPassword);

    if (res.success) {
      setEditingMatch(null);
      fetchMatches();
    } else {
      alert('Failed to update score: ' + (res.error || res.message || 'Unknown error'));
    }
  };

  const handleDeleteMatch = async () => {
    if (!confirm("Are you sure you want to delete this match?")) return;
    const pin = prompt("Enter Security PIN to delete:");
    if (!pin) return;

    const res = await api.deleteMatch(editingMatch.id, adminPassword, pin);
    if (res.success) {
      setEditingMatch(null);
      fetchMatches();
      fetchAllCounts();
    } else {
      alert("Failed to delete: " + (res.error || "Error"));
    }
  };

  const handleSportChange = (sport) => {
    setSelectedSport(sport);
    setVenueFilter('');
  };

  const handleVenueChange = (venue) => {
    setVenueFilter(venue);
    setSelectedSport('');
  };

  const handleEditClick = (match) => {
    let details = {};
    try {
      details = typeof match.game_details === 'string'
        ? JSON.parse(match.game_details || '{}')
        : (match.game_details || {});
    } catch (e) {
      console.error("Failed to parse game_details", e);
    }

    setEditingMatch({
      ...match,
      score_a: details.score_a || '0',
      score_b: details.score_b || '0',
      wickets_a: details.wickets_a || '0',
      wickets_b: details.wickets_b || '0',
      overs_a: details.overs_a || '0.0',
      overs_b: details.overs_b || '0.0',
      score_details: match.score_details,
      sets: details.sets || { set_1: { a: '', b: '' }, set_2: { a: '', b: '' }, set_3: { a: '', b: '' } }, // Default 3 sets structure
      game_details: details
    });
  };

  const filteredMatches = matches.filter(match => {
    if (selectedSport && match.sport_name !== selectedSport) return false;
    if (venueFilter) {
      const v = (match.venue || '').toLowerCase();
      return v.includes(venueFilter.toLowerCase());
    }
    return true;
  });

  const matchCounts = {
    upcoming: allMatches.upcoming.length,
    live: allMatches.live.length,
    recent: allMatches.recent.length
  };

  // --- Render Helpers ---
  const renderScoreInputs = () => {
    const sport = editingMatch.sport_name;
    const isCricket = ['Cricket', 'Box Cricket'].includes(sport);
    const isSetBased = ['Badminton', 'Table Tennis', 'Volleyball'].includes(sport);
    const isChess = ['Chess'].includes(sport);

    // Helpers for dropdown generation
    const range = (start, end, step = 1) => {
      const arr = [];
      for (let i = start; i <= end; i += step) arr.push(i);
      return arr;
    };
    const rangeOvers = () => {
      const overs = [];
      for (let o = 0; o < 20; o++) {
        for (let b = 0; b < 6; b++) overs.push(`${o}.${b}`);
      }
      overs.push('20.0');
      return overs;
    };

    if (isChess) {
      return (
        <div className="mb-4">
          <label className="text-xs text-gray-400 mb-1 block">Result</label>
          <select className="w-full p-3 bg-black rounded border border-gray-700 font-bold"
            value={editingMatch.score_details || ''}
            onChange={e => setEditingMatch({ ...editingMatch, score_details: e.target.value, status: 'recent' })}>
            <option value="">Select Result</option>
            <option value={`${editingMatch.team_a} Won`}>{editingMatch.team_a} Won</option>
            <option value={`${editingMatch.team_b} Won`}>{editingMatch.team_b} Won</option>
            <option value="Draw">Draw</option>
          </select>
        </div>
      );
    }

    if (isCricket) {
      return (
        <div className="space-y-4">
          {/* Team A Cricket */}
          <div className="bg-white/5 p-3 rounded border border-white/10">
            <div className="text-sm font-bold text-orange-400 mb-2">{editingMatch.team_a} (Batting)</div>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-[10px] text-gray-500 block mb-1">Runs</label>
                <select className="w-full bg-black border border-gray-700 rounded p-2 text-white"
                  value={editingMatch.score_a || '0'}
                  onChange={e => setEditingMatch({ ...editingMatch, score_a: e.target.value })}>
                  {range(0, 300).map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[10px] text-gray-500 block mb-1">Wickets</label>
                <select className="w-full bg-black border border-gray-700 rounded p-2 text-white"
                  value={editingMatch.wickets_a || '0'}
                  onChange={e => setEditingMatch({ ...editingMatch, wickets_a: e.target.value })}>
                  {range(0, 10).map(w => <option key={w} value={w}>{w}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[10px] text-gray-500 block mb-1">Overs</label>
                <select className="w-full bg-black border border-gray-700 rounded p-2 text-white"
                  value={editingMatch.overs_a || '0.0'}
                  onChange={e => setEditingMatch({ ...editingMatch, overs_a: e.target.value })}>
                  {rangeOvers().map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Team B Cricket */}
          <div className="bg-white/5 p-3 rounded border border-white/10">
            <div className="text-sm font-bold text-orange-400 mb-2">{editingMatch.team_b} (Batting)</div>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-[10px] text-gray-500 block mb-1">Runs</label>
                <select className="w-full bg-black border border-gray-700 rounded p-2 text-white"
                  value={editingMatch.score_b || '0'}
                  onChange={e => setEditingMatch({ ...editingMatch, score_b: e.target.value })}>
                  {range(0, 300).map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[10px] text-gray-500 block mb-1">Wickets</label>
                <select className="w-full bg-black border border-gray-700 rounded p-2 text-white"
                  value={editingMatch.wickets_b || '0'}
                  onChange={e => setEditingMatch({ ...editingMatch, wickets_b: e.target.value })}>
                  {range(0, 10).map(w => <option key={w} value={w}>{w}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[10px] text-gray-500 block mb-1">Overs</label>
                <select className="w-full bg-black border border-gray-700 rounded p-2 text-white"
                  value={editingMatch.overs_b || '0.0'}
                  onChange={e => setEditingMatch({ ...editingMatch, overs_b: e.target.value })}>
                  {rangeOvers().map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (isSetBased || ['Basketball'].includes(sport)) {
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Sets Won A</label>
              <select className="w-full bg-black border border-gray-700 rounded p-2 text-white font-bold text-lg"
                value={editingMatch.score_a || '0'}
                onChange={e => setEditingMatch({ ...editingMatch, score_a: e.target.value })}>
                {range(0, 5).map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Sets Won B</label>
              <select className="w-full bg-black border border-gray-700 rounded p-2 text-white font-bold text-lg"
                value={editingMatch.score_b || '0'}
                onChange={e => setEditingMatch({ ...editingMatch, score_b: e.target.value })}>
                {range(0, 5).map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <div className="bg-white/5 p-3 rounded border border-white/10">
            <h4 className="text-xs font-bold text-gray-400 mb-2 uppercase">Set Scores (Points)</h4>
            {['set_1', 'set_2', 'set_3'].map((setKey, idx) => (
              <div key={setKey} className="grid grid-cols-3 gap-2 items-center mb-2 last:mb-0">
                <span className="text-xs text-gray-500 font-mono">Set {idx + 1}</span>
                <select className="bg-black rounded border border-gray-700 text-center text-white p-2"
                  value={editingMatch.sets?.[setKey]?.a || '0'}
                  onChange={e => {
                    const newSets = { ...editingMatch.sets, [setKey]: { ...editingMatch.sets?.[setKey], a: e.target.value } };
                    setEditingMatch({ ...editingMatch, sets: newSets });
                  }}>
                  {range(0, 100).map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <select className="bg-black rounded border border-gray-700 text-center text-white p-2"
                  value={editingMatch.sets?.[setKey]?.b || '0'}
                  onChange={e => {
                    const newSets = { ...editingMatch.sets, [setKey]: { ...editingMatch.sets?.[setKey], b: e.target.value } };
                    setEditingMatch({ ...editingMatch, sets: newSets });
                  }}>
                  {range(0, 100).map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Default (Football and others)
    return (
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-gray-400 mb-1 block">Score A (Goals/Points)</label>
          <select className="w-full bg-black border border-gray-700 rounded p-2 text-white font-bold text-lg"
            value={editingMatch.score_a || '0'}
            onChange={e => setEditingMatch({ ...editingMatch, score_a: e.target.value })}>
            {range(0, 200).map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs text-gray-400 mb-1 block">Score B (Goals/Points)</label>
          <select className="w-full bg-black border border-gray-700 rounded p-2 text-white font-bold text-lg"
            value={editingMatch.score_b || '0'}
            onChange={e => setEditingMatch({ ...editingMatch, score_b: e.target.value })}>
            {range(0, 200).map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans selection:bg-yellow-500/30 pt-6">
      <SEO
        title="Live Scores"
        description="Check live scores, results, and upcoming matches for all sports events at COEP ZEST 2026."
        url="https://coeptechzest.org/Scores"
      />
      {/* Header */}
      <div className="sticky top-0 z-40 bg-black/95 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto max-w-4xl px-4 py-2.5 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img onClick={() => navigate('/')} src="/CoepLogo.png" alt="COEP" className="h-9 w-auto object-contain cursor-pointer" />
            <div className="h-7 w-px bg-white/20"></div>
            <img src="/ZEST-26.png" alt="Zest 26" className="h-10 w-auto object-contain" />
          </div>

          <div className="flex gap-3">
            {adminPassword && (
              <button onClick={() => setShowAddModal(true)} className="p-2.5 rounded-full bg-orange-500/20 text-orange-500 border border-orange-500/50 hover:bg-orange-500 hover:text-white transition-all" title="Add Match">
                <Plus size={18} />
              </button>
            )}
            <div className="relative">
              {refreshMessage && (
                <div className="absolute top-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-red-500/90 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg animate-in fade-in slide-in-from-top-1 z-50">
                  {refreshMessage}
                </div>
              )}
              <button onClick={() => fetchMatches(false)} className={`p-2.5 rounded-full bg-white/5 hover:bg-orange-500 hover:text-white border border-white/10 text-gray-400 transition-all duration-300 ${loading ? 'animate-spin' : 'hover:rotate-180'}`} title="Refresh">
                <RefreshCw size={18} />
              </button>
            </div>
            <button
              onClick={() => adminPassword ? handleLogout() : setShowLoginModal(true)}
              className={`p-2.5 rounded-full border transition-all ${adminPassword ? 'bg-red-500/10 text-red-500 border-red-500/50 hover:bg-red-500 hover:text-white' : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/20 hover:text-white'}`}
              title={adminPassword ? "Logout Admin" : "Admin Login"}
            >
              {adminPassword ? <LogOut size={18} /> : <Lock size={18} />}
            </button>
          </div>
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent"></div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 py-8 mt-12">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-300 tracking-widest uppercase">Updates from the ground</h1>
          {updatedAt && (
            <p className="text-[10px] uppercase tracking-widest text-orange-500/80 font-mono mt-2 animate-pulse">
              Last Updated: {updatedAt.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit' })}
            </p>
          )}
        </div>

        <div className="mb-8 flex justify-center">
          <div className="w-full max-w-md">
            <Tabs activeTab={activeTab} onTabChange={setActiveTab} counts={matchCounts} />
          </div>
        </div>

        <SportFilter selectedSport={selectedSport} onSelectSport={handleSportChange} onSearchVenue={handleVenueChange} selectedVenue={venueFilter} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {loading && matches.length === 0 ? (
            <div className="col-span-full py-32 text-center text-yellow-500/50">Fetching Data...</div>
          ) : filteredMatches.length === 0 ? (
            <div className="col-span-full py-20 text-center border dashed border-white/10 bg-white/5 text-gray-500">No matches found</div>
          ) : (
            filteredMatches.map(match => (
              <ScoreCard key={match.id} match={match} isAdmin={!!adminPassword} onEdit={handleEditClick} />
            ))
          )}
        </div>
      </div>

      <div className="text-center py-6 text-[10px] text-gray-700 font-mono uppercase tracking-[0.2em] opacity-50">© Zest '26</div>

      {/* --- MODALS --- */}

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 w-full max-w-sm rounded-2xl p-6 border border-white/10 relative">
            <button onClick={() => setShowLoginModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X size={20} /></button>
            <h2 className="text-xl font-bold mb-6 text-center text-white">Admin Access</h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <input type="text" placeholder="Username" className="w-full p-3 bg-black rounded border border-gray-700 text-white" value={loginForm.username} onChange={e => setLoginForm({ ...loginForm, username: e.target.value })} />
              <input type="password" placeholder="Password" className="w-full p-3 bg-black rounded border border-gray-700 text-white" value={loginForm.password} onChange={e => setLoginForm({ ...loginForm, password: e.target.value })} />
              <button className="w-full bg-orange-600 py-3 rounded font-bold hover:bg-orange-500 text-white">Unlock Controls</button>
            </form>
          </div>
        </div>
      )}

      {/* Add Match Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 w-full max-w-lg rounded-2xl p-6 border border-white/10 max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="flex justify-between mb-4">
              <h3 className="font-bold text-white">Add New Match</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-white"><X /></button>
            </div>
            <form onSubmit={handleAddMatch} className="space-y-4">
              <select className="w-full p-3 bg-black rounded border border-gray-700 text-white" value={addForm.sport_id} onChange={e => {
                const sId = e.target.value;
                const s = sports.find(sp => sp.id == sId);
                setAddForm({ ...addForm, sport_id: sId, venue: s ? s.venue : '' });
              }} required>
                <option value="">Select Sport</option>
                {sports.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
              {/* Dynamic Team Inputs Simplified for brevity - assumes standard */}
              <div className="grid grid-cols-2 gap-4">
                <input placeholder="Team A / Player 1" className="p-3 bg-black rounded border border-gray-700 text-white" value={addForm.team_a} onChange={e => setAddForm({ ...addForm, team_a: e.target.value })} required />
                <input placeholder="Team B / Player 2" className="p-3 bg-black rounded border border-gray-700 text-white" value={addForm.team_b} onChange={e => setAddForm({ ...addForm, team_b: e.target.value })} required />
              </div>
              <div className="flex items-center gap-2 bg-gray-800/50 p-3 rounded border border-gray-700 text-gray-400 text-sm">
                <MapPin size={16} />
                <span>{addForm.venue || ''}</span>
              </div>
              <select className="w-full p-3 bg-black rounded border border-gray-700 text-white" value={addForm.match_type} onChange={e => setAddForm({ ...addForm, match_type: e.target.value })}>
                <option value="League Stage">League Stage</option>
                <option value="Quarter Final">Quarter Final</option>
                <option value="Semi Final">Semi Final</option>
                <option value="Final">Final</option>
              </select>
              <input type="datetime-local" className="w-full p-3 bg-black rounded border border-gray-700 text-white" value={addForm.start_time} onChange={e => setAddForm({ ...addForm, start_time: e.target.value })} required />
              <button className="w-full bg-blue-600 py-3 rounded font-bold text-white hover:bg-blue-500">Create Match</button>
            </form>
          </div>
        </div>
      )}

      {/* Edit Match Modal */}
      {editingMatch && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 w-full max-w-lg rounded-2xl p-6 border border-white/10 max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="flex justify-between mb-4">
              <h3 className="font-bold text-white">Update Score</h3>
              <button onClick={() => setEditingMatch(null)} className="text-gray-400 hover:text-white"><X /></button>
            </div>
            <form onSubmit={handleUpdateScore} className="space-y-4">
              <div className="flex justify-between text-sm text-gray-400 mb-2"><span>{editingMatch.team_a}</span><span>{editingMatch.team_b}</span></div>
              {renderScoreInputs()}
              {/* Cricket Extras - REMOVED (Handled in renderScoreInputs) */}
              <input placeholder="Score Details / Result" className="w-full p-3 bg-black rounded border border-gray-700 font-bold text-white" value={editingMatch.score_details || ''} onChange={e => setEditingMatch({ ...editingMatch, score_details: e.target.value })} />
              <select className="w-full p-3 bg-black rounded border border-gray-700 text-white font-bold" value={editingMatch.match_type || 'League Stage'} onChange={e => setEditingMatch({ ...editingMatch, match_type: e.target.value })}>
                <option value="League Stage">League Stage</option>
                <option value="Quarter Final">Quarter Final</option>
                <option value="Semi Final">Semi Final</option>
                <option value="Final">Final</option>
              </select>
              <div className="grid grid-cols-3 gap-2">
                {['upcoming', 'live', 'recent'].map(s => (
                  <button type="button" key={s} onClick={() => setEditingMatch({ ...editingMatch, status: s })} className={`p-2 rounded capitalize text-sm ${editingMatch.status === s ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400'}`}>{s}</button>
                ))}
              </div>
              <button className="w-full bg-green-600 py-3 rounded font-bold text-white hover:bg-green-500 flex items-center justify-center gap-2"><Save size={18} /> Update Match</button>
              <button type="button" onClick={handleDeleteMatch} className="w-full bg-red-900/30 text-red-500 py-2 rounded text-sm hover:bg-red-900/50">Delete Match</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Scores;
