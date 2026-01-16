import React from 'react';
import { Trophy, MapPin, Calendar, Edit, Clock } from 'lucide-react';

const ScoreCard = ({ match, isAdmin, onEdit }) => {
    const isCricket = ['Cricket', 'Box Cricket'].includes(match.sport_name);
    const isChess = ['Chess'].includes(match.sport_name);
    const isSetBased = ['Badminton', 'Table Tennis', 'Volleyball'].includes(match.sport_name);

    // Parse scores from game_details
    const details = typeof match.game_details === 'string' ? JSON.parse(match.game_details || '{}') : (match.game_details || {});
    const mScoreA = details.score_a || '0';
    const mScoreB = details.score_b || '0';
    const mWicketsA = details.wickets_a || '0';
    const mWicketsB = details.wickets_b || '0';
    const mOversA = details.overs_a || '0.0';
    const mOversB = details.overs_b || '0.0';


    const formatDate = (dateString) => {
        if (!dateString) return '';
        const d = new Date(dateString);
        return d.toLocaleDateString('en-US', { day: 'numeric', month: 'short' }) +
            " • " +
            d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    };

    const getTeamInitials = (teamName) => {
        if (!teamName) return '??';
        const words = teamName.trim().split(' ');
        if (words.length === 1) return teamName.substring(0, 2).toUpperCase();
        return words.slice(0, 2).map(w => w[0]).join('').toUpperCase();
    };

    const getScoreDisplay = (score, wickets, overs) => {
        if (match.status?.toLowerCase() === 'upcoming') return '—';

        // Handle null/undefined scores
        const scoreValue = score !== null && score !== undefined ? score : '0';

        if (isCricket && wickets !== null && wickets !== undefined) {
            return `${scoreValue}/${wickets}`;
        }
        return scoreValue;
    };



    const getHighlightClass = (teamSide) => {
        if (match.status?.toLowerCase() === 'upcoming') return 'text-white';

        // Check explicit result text for recent matches first
        if (match.status?.toLowerCase() === 'recent' && match.score_details) {
            const teamName = teamSide === 'a' ? match.team_a : match.team_b;
            if (match.score_details.includes(`${teamName} Won`)) return 'text-orange-500';
        }

        // Compare scores for Live (or Recent if no details found)
        const scoreA = parseFloat(mScoreA) || 0;
        const scoreB = parseFloat(mScoreB) || 0;

        if (teamSide === 'a' && scoreA > scoreB) return 'text-orange-500';
        if (teamSide === 'b' && scoreB > scoreA) return 'text-orange-500';

        return 'text-white';
    };

    // Parse game details
    let setScoreString = "";
    if (isSetBased && match.game_details) {
        try {
            const det = typeof match.game_details === 'string' ? JSON.parse(match.game_details) : match.game_details;
            if (det.sets && Array.isArray(det.sets)) {
                // Filter out empty sets
                const validSets = det.sets.filter(s => s.a && s.b);
                setScoreString = validSets.map(s => `${s.a}-${s.b}`).join(', ');
            }
        } catch (e) { }
    }

    return (
        <div className="group bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-orange-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/5 hover:-translate-y-1 relative overflow-hidden min-h-[200px] flex flex-col">
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-500/0 group-hover:from-orange-500/3 group-hover:to-transparent transition-all duration-500"></div>

            <div className="relative z-10 flex-1 flex flex-col">
                {/* Status Badge - Top Left */}
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-bold uppercase tracking-wide text-orange-400/80">{match.sport_name}</span>
                        {match.match_type && match.match_type !== 'League Stage' && (
                            <span className="text-[10px] bg-orange-500/10 text-orange-400 px-1.5 py-0.5 rounded border border-orange-500/20">{match.match_type}</span>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        {isAdmin && (
                            <button onClick={() => onEdit(match)} className="p-1.5 hover:bg-orange-500 hover:text-white rounded-full transition-colors border border-white/10">
                                <Edit size={14} />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Teams with Badges & Scores */}
            <div className="flex-1 space-y-4 mb-4">
                {/* Team A */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                        <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-gray-300 font-black text-xs shadow-md">
                            {getTeamInitials(match.team_a)}
                        </div>
                        <span className="font-bold text-white text-base">{match.team_a}</span>
                    </div>
                    <div className="text-right">
                        {!isChess && (
                            <>
                                <span className={`text-3xl font-black ${getHighlightClass('a')} ${match.status === 'live' ? 'animate-pulse' : ''}`}>
                                    {getScoreDisplay(mScoreA, mWicketsA, mOversA)}
                                </span>
                                {isSetBased && <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Sets</div>}
                            </>
                        )}
                        {isCricket && mOversA && match.status !== 'upcoming' && (
                            <div className="text-xs text-gray-400 mt-1">({mOversA} ov)</div>
                        )}
                    </div>
                </div>

                {/* Team B */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                        <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-gray-300 font-black text-xs shadow-md">
                            {getTeamInitials(match.team_b)}
                        </div>
                        <span className="font-bold text-white text-base">{match.team_b}</span>
                    </div>
                    <div className="text-right">
                        {!isChess && (
                            <>
                                <span className={`text-3xl font-black ${getHighlightClass('b')} ${match.status === 'live' ? 'animate-pulse' : ''}`}>
                                    {getScoreDisplay(mScoreB, mWicketsB, mOversB)}
                                </span>
                                {isSetBased && <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Sets</div>}
                            </>
                        )}
                        {isCricket && mOversB && match.status !== 'upcoming' && (
                            <div className="text-xs text-gray-400 mt-1">({mOversB} ov)</div>
                        )}
                    </div>
                </div>
            </div>

            {/* Detailed Set Scores */}
            {setScoreString && (
                <div className="text-center mb-3">
                    <div className="inline-block px-3 py-1 bg-white/5 rounded border border-white/10 text-xs font-mono text-gray-300 tracking-wider">
                        {setScoreString}
                    </div>
                </div>
            )}

            {/* Match Result/Details */}
            {match.score_details && (
                <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg px-3 py-2 mb-3">
                    <p className="text-xs font-bold text-orange-300 text-center">{match.score_details}</p>
                </div>
            )}

            {/* Footer - Time & Venue */}
            <div className="flex items-center justify-between text-sm text-gray-300 pt-3 border-t border-white/5 mt-auto">
                <div className="flex items-center gap-2">
                    <Clock size={14} className="text-gray-400" />
                    <span className="font-medium">{formatDate(match.start_time)}</span>
                </div>
                {(match.venue || match.default_venue) && (
                    <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-orange-400/70" />
                        <span className="truncate max-w-[140px] font-medium">{match.venue || match.default_venue}</span>
                    </div>
                )}
            </div>
        </div>

    );
};

export default ScoreCard;
