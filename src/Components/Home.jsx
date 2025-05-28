import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import './Home.css';
import FrontMusic from '../audio/FrontMusic.mp3';

const Carousel = lazy(() => import('./Carousel'));

export const Home = () => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [showNewPage, setShowNewPage] = useState(false);
    const [isMobile, setIsMobile] = useState(true);
    const [showMobileWarning, setShowMobileWarning] = useState(false);
    const [showIntro, setShowIntro] = useState(true);
    const [introAnimation, setIntroAnimation] = useState('');
    const audioRef = useRef(null);

    useEffect(() => {
        const checkDevice = () => {
            const width = window.innerWidth;
            const userAgent = navigator.userAgent.toLowerCase();
            const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
            const isMobileWidth = width <= 768;
            const mobile = isMobileDevice || isMobileWidth;
            setIsMobile(mobile);

            if (!mobile && !showIntro) {
                setShowMobileWarning(true);
            }
        };

        const debounce = (func, delay) => {
            let timeout;
            return () => {
                clearTimeout(timeout);
                timeout = setTimeout(func, delay);
            };
        };

        const handleResize = debounce(checkDevice, 200);
        checkDevice();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [showIntro]);

    useEffect(() => {
        const targetDate = new Date('2025-06-02T00:00:00').getTime();

        const updateCountdown = () => {
            const now = Date.now();
            const diff = targetDate - now;
            if (diff <= 0) {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                return;
            }

            setTimeLeft({
                days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((diff / (1000 * 60)) % 60),
                seconds: Math.floor((diff / 1000) % 60),
            });
        };

        const timer = setInterval(updateCountdown, 1000);
        updateCountdown();

        return () => clearInterval(timer);
    }, []);

    const handleIntroClick = () => {
        audioRef.current?.play().catch(console.log);
        setIntroAnimation('fade-out');

        setTimeout(() => {
            setShowIntro(false);
            if (!isMobile) setShowMobileWarning(true);
        }, 800);
    };

    const handleEnterClick = () => {
        audioRef.current?.paused && audioRef.current.play().catch(console.log);
        setIsTransitioning(true);
        setTimeout(() => setShowNewPage(true), 1000);
    };

    if (showIntro) {
        return (
            <div className={`intro-container ${introAnimation}`}>
                <audio ref={audioRef} loop preload="auto" style={{ display: 'none' }}>
                    <source src={FrontMusic} type="audio/mpeg" />
                </audio>

                <div className="intro-content">
                    <div className="intro-hearts">
                        <div className="heart heart-1">💕</div>
                        <div className="heart heart-2">💖</div>
                        <div className="heart heart-3">💝</div>
                    </div>
                    <div className="intro-text">
                        <h1 className="intro-title">You're Invited!</h1>
                        <div className="intro-subtitle">
                            <span className="elegant-text">To celebrate the sacred union of</span>
                            <div className="couple-names">Nidhi & Pratham</div>
                        </div>
                        <p className="intro-description">
                            Join us as two hearts become one<br />
                            in love, laughter, and eternal happiness
                        </p>
                    </div>

                    <button className="intro-button" onClick={handleIntroClick}>
                        <span className="button-text">Open Invitation</span>
                        <div className="button-hearts"><span>💝</span><span>✨</span></div>
                    </button>

                    <div className="intro-footer">
                        <p>Tap to enter our wedding journey</p>
                    </div>
                </div>

                <div className="intro-decoration">
                    {['💕','💖','💝','💞','💗'].map((h, i) => (
                        <div key={i} className={`floating-heart floating-heart-${i + 1}`}>{h}</div>
                    ))}
                </div>
            </div>
        );
    }

    if (showNewPage) {
        return (
            <div className="new-page">
                <Suspense fallback={<div></div>}>
                    <Carousel />
                </Suspense>
            </div>
        );
    }

    return (
        <div className={`home-container ${isTransitioning ? 'scroll-up' : ''}`}>
            <audio ref={audioRef} loop preload="auto" style={{ display: 'none' }}>
                <source src={FrontMusic} type="audio/mpeg" />
            </audio>

            {showMobileWarning && (
                <div className="mobile-warning-overlay">
                    <div className="mobile-warning-modal">
                        <div className="warning-icon">📱</div>
                        <h2>Mobile Experience Recommended</h2>
                        <p>This invitation is optimized for mobile phones.</p>
                    </div>
                </div>
            )}

            <div className="main">
                <div className="tined-sheet">
                    <div className="home-title"><div>The Union of Hearts</div></div>
                    <div className="line"></div>
                    <div className="Sub-title"><div>Nidhi & Pratham</div></div>
                    <div className="line-2"></div>
                    <div className="count-down">
                        <div className="timer-section-1">
                            <CountdownItem label="Days" value={timeLeft.days} />
                            <CountdownItem label="Minutes" value={timeLeft.minutes} />
                        </div>
                        <div className="timer-section-2">
                            <CountdownItem label="Hours" value={timeLeft.hours} />
                            <CountdownItem label="Seconds" value={timeLeft.seconds} />
                        </div>
                    </div>
                    <div className="enter-btn">
                        <button onClick={handleEnterClick}>Click</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const CountdownItem = ({ label, value }) => (
    <div className={`countdown-item ${label.toLowerCase()}`}>
        <span className="countdown-number">{value}</span>
        <span className="countdown-label">{label}</span>
    </div>
);
