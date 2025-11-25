import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { AnimatedButton } from './shared/AnimatedButton';
import { fadeIn } from '../utils/animations';

export const LockScreen = () => {
    const navigate = useNavigate();
    const [answer, setAnswer] = useState('');
    const [errorCount, setErrorCount] = useState(0);
    const [status, setStatus] = useState<'idle' | 'wrong' | 'success'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const normalizedAnswer = answer.trim().toLowerCase();

        if (normalizedAnswer === 'chalandri') {
            setStatus('success');
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#ffc8dd', '#e0b0ff', '#bde0fe']
            });
            setTimeout(() => {
                navigate('/story/1');
            }, 2000);
        } else {
            setStatus('wrong');
            setErrorCount(prev => prev + 1);
        }
    };

    const getErrorMessage = () => {
        if (status !== 'wrong') return null;
        if (errorCount === 1) return 'Think again';
        return 'You are a goldfish';
    };

    return (
        <motion.div
            className="min-h-screen flex items-center justify-center overflow-hidden"
            style={{
                background: 'linear-gradient(to bottom right, #ffc8dd, #e0b0ff, #bde0fe)'
            }}
            variants={fadeIn}
            initial="hidden"
            animate="visible"
        >
            <div className="text-center px-4 sm:px-6 md:px-8 max-w-md mx-auto w-full">
                <motion.div
                    className="relative p-8 sm:p-10"
                    style={{
                        background: 'rgba(255, 255, 255, 0.8)',
                        borderRadius: '20px',
                        backdropFilter: 'blur(10px)',
                        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                        border: '1px solid rgba(255, 255, 255, 0.18)',
                    }}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, type: 'spring' }}
                >
                    <div className="mb-8">
                        <span className="text-4xl mb-4 block">🔒</span>
                        <h2
                            className="text-2xl font-bold mb-2 text-gray-800"
                            style={{ fontFamily: 'Pixelify Sans, sans-serif' }}
                        >
                            You're not getting in that easily
                        </h2>
                        <p className="text-gray-600" style={{ fontFamily: 'Pixelify Sans, sans-serif' }}>Where was our first date?</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="relative">
                            <input
                                type="text"
                                value={answer}
                                onChange={(e) => {
                                    setAnswer(e.target.value);
                                    if (status === 'wrong') setStatus('idle');
                                }}
                                placeholder="Type your answer..."
                                className="w-full px-4 py-3 rounded-lg border-2 border-purple-200 focus:border-purple-400 focus:outline-none bg-white/50 transition-colors text-center text-lg"
                                style={{ fontFamily: 'Pixelify Sans, sans-serif' }}
                                disabled={status === 'success'}
                            />
                        </div>

                        <AnimatePresence mode="wait">
                            {status === 'wrong' && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="text-red-500 font-medium"
                                    style={{ fontFamily: 'Pixelify Sans, sans-serif' }}
                                >
                                    {getErrorMessage()}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="pt-2">
                            <AnimatedButton
                                onClick={() => { }} // Form handles submit
                                variant="primary"
                            >
                                {status === 'success' ? 'Unlocked!' : 'Unlock'}
                            </AnimatedButton>
                        </div>
                    </form>
                </motion.div>
            </div>

            {/* Success Modal */}
            <AnimatePresence>
                {status === 'success' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-white p-8 rounded-3xl shadow-2xl text-center max-w-sm mx-4"
                        >
                            <div className="text-6xl mb-4">🎉</div>
                            <h2
                                className="text-3xl font-bold mb-2 text-purple-600"
                                style={{ fontFamily: 'Pixelify Sans, sans-serif' }}
                            >
                                You got it!
                            </h2>
                            <p className="text-gray-600">Let the story begin...</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};
