import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, KeyRound, ShieldAlert } from 'lucide-react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        setTimeout(() => {
            if (username === 'gdgadmin' && password === 'gdgPillai123') {
                localStorage.setItem('isAdminAuthenticated', 'true');
                navigate('/');
            } else {
                setError('Invalid admin credentials. Access Denied.');
            }
            setIsLoading(false);
        }, 800);
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
            background: '#0d1117'
        }}>
            {/* Dynamic Background Elements */}
            <div style={{
                position: 'absolute', width: '50vw', height: '50vw',
                background: 'radial-gradient(circle, rgba(88,166,255,0.15) 0%, rgba(0,0,0,0) 70%)',
                top: '-10%', left: '-10%', zIndex: 0,
                animation: 'pulse 10s infinite alternate',
                borderRadius: '50%',
                filter: 'blur(100px)'
            }} />
            <div style={{
                position: 'absolute', width: '40vw', height: '40vw',
                background: 'radial-gradient(circle, rgba(46,160,67,0.1) 0%, rgba(0,0,0,0) 70%)',
                bottom: '-10%', right: '-10%', zIndex: 0,
                borderRadius: '50%',
                filter: 'blur(100px)'
            }} />

            <style>
                {`
          @keyframes float {
            0% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-10px) rotate(1deg); }
            100% { transform: translateY(0px) rotate(0deg); }
          }
          @keyframes glow {
            0% { box-shadow: 0 0 20px rgba(88, 166, 255, 0.1); }
            50% { box-shadow: 0 0 40px rgba(88, 166, 255, 0.3); }
            100% { box-shadow: 0 0 20px rgba(88, 166, 255, 0.1); }
          }
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
          }
          .login-card {
            background: rgba(22, 27, 34, 0.7);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 24px;
            padding: 3.5rem;
            width: 100%;
            max-width: 480px;
            z-index: 10;
            animation: float 6s ease-in-out infinite, glow 4s infinite alternate;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6);
            margin: 1rem;
          }
          .input-container {
            position: relative;
            margin-bottom: 1.5rem;
          }
          .input-icon {
            position: absolute;
            left: 1.25rem;
            top: 50%;
            transform: translateY(-50%);
            color: #8b949e;
            transition: color 0.3s ease;
          }
          .custom-input {
            width: 100%;
            padding: 1.1rem 1rem 1.1rem 3.5rem;
            background: rgba(0, 0, 0, 0.4);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 14px;
            color: #f0f6fc;
            font-size: 1rem;
            transition: all 0.3s ease;
            box-sizing: border-box;
          }
          .custom-input:focus {
            outline: none;
            border-color: #58a6ff;
            background: rgba(0, 0, 0, 0.6);
            box-shadow: 0 0 0 4px rgba(88, 166, 255, 0.2);
          }
          .custom-input:focus + .input-icon {
            color: #58a6ff;
          }
          .submit-btn {
            width: 100%;
            padding: 1.1rem;
            background: linear-gradient(135deg, #58a6ff 0%, #3182ce 100%);
            color: white;
            border: none;
            border-radius: 14px;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.75rem;
            margin-top: 2rem;
            box-sizing: border-box;
          }
          .submit-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 12px 30px rgba(88, 166, 255, 0.4);
          }
          .submit-btn:active {
            transform: translateY(1px);
          }
          .submit-btn:disabled {
            opacity: 0.7;
            cursor: not-allowed;
            transform: none;
            box-shadow: none;
          }
        `}
            </style>

            <div className="login-card">
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <div style={{
                        display: 'inline-flex',
                        padding: '1.25rem',
                        background: 'rgba(88, 166, 255, 0.12)',
                        borderRadius: '50%',
                        marginBottom: '1.25rem',
                        boxShadow: '0 0 20px rgba(88, 166, 255, 0.2)',
                        border: '1px solid rgba(88, 166, 255, 0.2)'
                    }}>
                        <Lock size={36} color="#58a6ff" />
                    </div>
                    <h1 style={{
                        fontSize: '2.25rem',
                        fontWeight: '800',
                        marginBottom: '0.5rem',
                        background: 'linear-gradient(135deg, #ffffff 0%, #a3b1c6 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        letterSpacing: '-0.5px'
                    }}>
                        Admin Portal
                    </h1>
                    <p style={{ color: '#8b949e', fontSize: '1rem' }}>
                        Secure framework access initialized
                    </p>
                </div>

                {error && (
                    <div style={{
                        background: 'rgba(248, 81, 73, 0.1)',
                        border: '1px solid rgba(248, 81, 73, 0.3)',
                        color: '#f85149',
                        padding: '1rem',
                        borderRadius: '12px',
                        marginBottom: '1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        fontSize: '0.95rem',
                        fontWeight: '500',
                        animation: 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both'
                    }}>
                        <ShieldAlert size={20} style={{ flexShrink: 0 }} />
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin}>
                    <div className="input-container">
                        <input
                            type="text"
                            className="custom-input"
                            placeholder="Administrator ID"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <User size={22} className="input-icon" />
                    </div>

                    <div className="input-container" style={{ marginBottom: '1rem' }}>
                        <input
                            type="password"
                            className="custom-input"
                            placeholder="Authentication Key"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <KeyRound size={22} className="input-icon" />
                    </div>

                    <button type="submit" className="submit-btn" disabled={isLoading}>
                        {isLoading ? (
                            <div className="loader" style={{ width: '22px', height: '22px', borderTopColor: '#fff', borderWidth: '3px' }}></div>
                        ) : (
                            <>
                                Authorize Access
                                <Lock size={20} />
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
