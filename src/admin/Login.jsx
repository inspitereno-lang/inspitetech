import React, { useState } from 'react';
import axios from 'axios';
import { useToast } from '../context/ToastContext';

const Login = ({ onLogin }) => {
    const { toast } = useToast();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5005/api';
            const response = await axios.post(`${baseUrl}/auth/login`, {
                username,
                password
            });

            const { token, user } = response.data;
            localStorage.setItem('adminToken', token);
            localStorage.setItem('adminUser', JSON.stringify(user));
            
            toast.success(`Welcome back, ${user.username || 'Admin'}!`);
            onLogin(token, user);
        } catch (err) {
            if (!err.response) {
                toast.error('Network error: Unable to connect to the server. Please check your internet connection.');
            } else {
                toast.error(err.response?.data?.message || 'Invalid credentials. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="login-page">
            <div className="login-card">
                {/* Logo */}
                <div className="login-logo-area">
                    <img src="/images/logo.png" alt="Almoued Travel" className="login-logo" />
                </div>

                <div className="login-title">
                    <h2>Welcome Back</h2>
                    <p>Sign in to your admin dashboard</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">

                    
                    <div className="login-field">
                        <label><i className="fas fa-user"></i> Username</label>
                        <input 
                            type="text" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            placeholder="Enter your username"
                            autoCapitalize="none"
                            autoCorrect="off"
                            spellCheck="false"
                            required 
                        />
                    </div>

                    <div className="login-field">
                        <label><i className="fas fa-lock"></i> Password</label>
                        <div className="login-password-wrap">
                            <input 
                                type={showPassword ? 'text' : 'password'} 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                placeholder="Enter your password"
                                autoCapitalize="none"
                                autoCorrect="off"
                                spellCheck="false"
                                required 
                            />
                            <button 
                                type="button" 
                                className="login-eye-btn"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                            </button>
                        </div>
                    </div>

                    <button type="submit" className="login-btn" disabled={loading}>
                        {loading ? (
                            <><i className="fas fa-circle-notch fa-spin"></i> Signing in...</>
                        ) : (
                            <><i className="fas fa-arrow-right-to-bracket"></i> Sign In</>
                        )}
                    </button>
                </form>

                <div className="login-footer-text">
                    <i className="fas fa-shield-halved"></i> Secured Admin Access
                </div>
            </div>

            <style>{`
                .login-page {
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #f4f6fb;
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
                    padding: 20px;
                }

                .login-card {
                    background: #ffffff;
                    border: 1px solid #e8ecf1;
                    border-radius: 20px;
                    width: 100%;
                    max-width: 420px;
                    padding: 44px 36px;
                    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
                }

                .login-logo-area {
                    text-align: center;
                    margin-bottom: 28px;
                }

                .login-logo {
                    height: 56px;
                    width: auto;
                }

                .login-title {
                    text-align: center;
                    margin-bottom: 32px;
                }

                .login-title h2 {
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: #1e293b;
                    margin: 0 0 6px;
                    letter-spacing: -0.02em;
                }

                .login-title p {
                    color: #64748b;
                    font-size: 0.88rem;
                    margin: 0;
                }

                .login-form {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }

                .login-error {
                    background: #fef2f2;
                    color: #dc2626;
                    padding: 12px 16px;
                    border-radius: 10px;
                    font-size: 0.85rem;
                    font-weight: 500;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    border: 1px solid #fee2e2;
                }

                .login-field label {
                    display: block;
                    font-size: 0.8rem;
                    font-weight: 600;
                    color: #1e293b;
                    margin-bottom: 8px;
                }

                .login-field label i {
                    color: #ff8c00;
                    margin-right: 6px;
                    font-size: 0.78rem;
                }

                .login-field input {
                    width: 100%;
                    padding: 12px 14px;
                    border: 1.5px solid #e8ecf1;
                    border-radius: 10px;
                    font-size: 0.9rem;
                    font-family: inherit;
                    outline: none;
                    transition: all 0.25s ease;
                    color: #1e293b;
                    background: #fff;
                }

                .login-field input::placeholder {
                    color: #94a3b8;
                }

                .login-field input:focus {
                    border-color: #ff8c00;
                    box-shadow: 0 0 0 3px rgba(255, 140, 0, 0.08);
                }

                .login-password-wrap {
                    position: relative;
                }

                .login-password-wrap input {
                    padding-right: 44px;
                }

                .login-eye-btn {
                    position: absolute;
                    right: 12px;
                    top: 50%;
                    transform: translateY(-50%);
                    background: none;
                    border: none;
                    color: #94a3b8;
                    cursor: pointer;
                    padding: 4px;
                    font-size: 0.85rem;
                    transition: color 0.2s;
                }

                .login-eye-btn:hover {
                    color: #64748b;
                }

                .login-btn {
                    background: linear-gradient(135deg, #ff8c00 0%, #1e90ff 100%);
                    color: white;
                    padding: 13px;
                    border-radius: 10px;
                    border: none;
                    font-size: 0.9rem;
                    font-weight: 600;
                    font-family: inherit;
                    cursor: pointer;
                    transition: all 0.25s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    margin-top: 4px;
                    box-shadow: 0 4px 14px rgba(255, 140, 0, 0.25);
                }

                .login-btn:hover:not(:disabled) {
                    transform: translateY(-1px);
                    box-shadow: 0 6px 20px rgba(255, 140, 0, 0.35);
                }

                .login-btn:active:not(:disabled) {
                    transform: translateY(0);
                }

                .login-btn:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }

                .login-footer-text {
                    text-align: center;
                    margin-top: 28px;
                    color: #94a3b8;
                    font-size: 0.75rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 6px;
                }
            `}</style>
        </div>
    );
};

export default Login;
