import React, { useState } from 'react';
import { Lock, User, KeyRound, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LoginScreenProps {
  onLoginSuccess: () => void;
}

export default function LoginScreen({ onLoginSuccess }: LoginScreenProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [showContact, setShowContact] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'skkaxiaogao' && password === 'administatorskka') {
      setError(false);
      onLoginSuccess();
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center p-4 selection:bg-amber-200">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm bg-white rounded-3xl shadow-xl overflow-hidden border border-amber-100 p-8 space-y-8"
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-100">
            <Lock className="w-7 h-7 text-amber-600" />
          </div>
          <h2 className="text-2xl font-serif text-stone-800">系统登录</h2>
          <p className="text-stone-400 text-sm mt-2 font-medium tracking-wide uppercase">Authentication</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-1">
            <div className="relative group">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400 group-focus-within:text-amber-500 transition-colors" />
              <input
                type="text"
                placeholder="用户名"
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-stone-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-50 transition-all outline-none text-stone-700 bg-stone-50/50"
                value={username}
                onChange={(e) => { setUsername(e.target.value); setError(false); }}
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="relative group">
              <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400 group-focus-within:text-amber-500 transition-colors" />
              <input
                type="password"
                placeholder="密码"
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-stone-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-50 transition-all outline-none text-stone-700 bg-stone-50/50"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(false); }}
              />
            </div>
            <AnimatePresence>
              {error && (
                <motion.p 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-red-500 text-sm font-medium flex items-center gap-1.5 mt-2"
                >
                  <AlertCircle className="w-4 h-4" /> 账号或密码错误
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <button
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-3.5 rounded-2xl transition-all shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 active:scale-[0.98]"
          >
            登 录
          </button>
        </form>

        <div className="text-center text-sm pt-2">
          {showContact ? (
            <motion.span 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-stone-600 bg-stone-100 px-4 py-2 rounded-xl inline-block font-medium"
            >
              联系邮箱 swordstopthinking@gmail.com
            </motion.span>
          ) : (
            <button 
              onClick={() => setShowContact(true)} 
              className="text-stone-400 hover:text-amber-600 transition-colors font-medium"
            >
              忘记密码？
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
