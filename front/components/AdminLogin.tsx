import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Lock, X, Loader2 } from 'lucide-react';

const AdminLogin: React.FC<{ onClose: () => void, onSuccess: () => void }> = ({ onClose, onSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useData();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    
    const success = await login(password);
    
    if (success) {
      onSuccess();
    } else {
      setError(true);
      setPassword('');
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-700 p-8 rounded-lg w-full max-w-sm relative shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-white">
          <X size={20} />
        </button>
        
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-slate-800 rounded-full text-arch-accent">
            <Lock size={32} />
          </div>
        </div>
        
        <h2 className="text-xl font-bold text-white text-center mb-6">Acceso Administrativo</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input 
              type="password" 
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(false); }}
              className={`w-full bg-slate-950 border ${error ? 'border-red-500' : 'border-slate-700'} p-3 rounded text-white text-center tracking-widest focus:border-arch-accent outline-none`}
              placeholder="Contraseña"
              autoFocus
              disabled={loading}
            />
            {error && <p className="text-red-500 text-xs text-center mt-2">Contraseña incorrecta</p>}
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-arch-accent text-black font-bold py-3 rounded hover:bg-yellow-600 transition-colors flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;