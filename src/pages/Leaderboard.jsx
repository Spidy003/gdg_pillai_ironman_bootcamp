import { useState, useEffect } from 'react';
import { api } from '../api/client';
import { Trophy, Medal, Award, AlertCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchLeaderboard();
    }, []);

    const fetchLeaderboard = async () => {
        try {
            setLoading(true);
            const data = await api.getLeaderboard();
            // Data is seemingly pre-sorted by score in backend, but we can double check
            const sortedData = [...data].sort((a, b) => b.team_score - a.team_score);
            setLeaderboard(sortedData);
            setError(null);
        } catch (err) {
            console.error('Error fetching leaderboard:', err);
            setError('Failed to load leaderboard data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const getRankIcon = (index) => {
        switch (index) {
            case 0:
                return <Trophy size={28} style={{ color: '#FFD700' }} />; // Gold
            case 1:
                return <Medal size={28} style={{ color: '#E3E4E5' }} />; // Silver
            case 2:
                return <Award size={28} style={{ color: '#CD7F32' }} />; // Bronze
            default:
                return <span className="rank-number">#{index + 1}</span>;
        }
    };

    if (loading) {
        return (
            <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                <div className="loading-spinner"></div>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="page-header" style={{ position: 'relative' }}>
                <Link to="/" className="back-link" style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)' }}>
                    <ArrowLeft size={20} />
                    <span>Back to Dashboard</span>
                </Link>
                <h1 className="page-title" style={{ textAlign: 'center', width: '100%' }}>
                    <Trophy size={32} style={{ color: 'var(--primary-color)', marginRight: '12px', verticalAlign: 'middle' }} />
                    Team Leaderboard
                </h1>
                <p className="page-subtitle" style={{ textAlign: 'center' }}>Live rankings and scores of all participating teams</p>
            </div>

            {error && (
                <div className="error-message">
                    <AlertCircle size={20} />
                    <span>{error}</span>
                </div>
            )}

            {!error && leaderboard.length === 0 ? (
                <div className="empty-state">
                    <Trophy size={48} style={{ color: 'var(--border-color)' }} />
                    <h2>No Teams Yet</h2>
                    <p>Leaderboard is currently empty.</p>
                </div>
            ) : (
                <div className="leaderboard-container glass-panel" style={{ padding: '24px', borderRadius: '16px', marginTop: '20px' }}>
                    <div className="table-wrapper">
                        <table className="data-table" style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 12px' }}>
                            <thead>
                                <tr>
                                    <th style={{ width: '100px', textAlign: 'center', paddingBottom: '16px', color: 'var(--text-secondary)' }}>Rank</th>
                                    <th style={{ paddingBottom: '16px', color: 'var(--text-secondary)' }}>Team Name</th>
                                    <th style={{ width: '150px', textAlign: 'center', paddingBottom: '16px', color: 'var(--text-secondary)' }}>Total Points</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leaderboard.map((team, index) => (
                                    <tr
                                        key={team.Team_Name}
                                        style={{
                                            background: index < 3 ? 'rgba(88, 166, 255, 0.05)' : 'var(--bg-secondary)',
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                            transition: 'transform 0.2s ease',
                                        }}
                                        className="leaderboard-row"
                                    >
                                        <td style={{ textAlign: 'center', padding: '16px', borderRadius: '12px 0 0 12px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', fontSize: '1.2rem' }}>
                                                {getRankIcon(index)}
                                            </div>
                                        </td>
                                        <td style={{ padding: '16px', fontWeight: index < 3 ? 'bold' : 'normal', fontSize: '1.1rem' }}>
                                            {team.Team_Name}
                                        </td>
                                        <td style={{ textAlign: 'center', padding: '16px', borderRadius: '0 12px 12px 0' }}>
                                            <div style={{
                                                display: 'inline-block',
                                                padding: '6px 16px',
                                                background: 'var(--primary-color)',
                                                color: '#fff',
                                                borderRadius: '20px',
                                                fontWeight: 'bold',
                                                fontSize: '1.1rem'
                                            }}>
                                                {team.team_score} pts
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
            <style>{`
                .leaderboard-row:hover {
                    transform: translateY(-2px);
                    background: var(--border-color) !important;
                }
                .rank-number {
                    color: var(--text-secondary);
                }
            `}</style>
        </div>
    );
};

export default Leaderboard;
