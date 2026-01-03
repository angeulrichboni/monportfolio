import React, { createContext, useContext, useState, useCallback } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastContextType {
  addToast: (type: ToastType, message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((type: ToastType, message: string) => {
    const id = Math.random().toString(36).substring(7);
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[60] flex flex-col gap-2">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              className={`flex w-80 items-start rounded-lg border p-4 shadow-lg backdrop-blur-md ${
                toast.type === 'success' ? 'bg-emerald-50/90 border-emerald-200 text-emerald-800' :
                toast.type === 'error' ? 'bg-red-50/90 border-red-200 text-red-800' :
                toast.type === 'warning' ? 'bg-amber-50/90 border-amber-200 text-amber-800' :
                'bg-blue-50/90 border-blue-200 text-blue-800'
              }`}
            >
              <div className="mr-3 mt-0.5">
                {toast.type === 'success' && <CheckCircle className="h-5 w-5 text-emerald-600" />}
                {toast.type === 'error' && <AlertCircle className="h-5 w-5 text-red-600" />}
                {toast.type === 'warning' && <AlertTriangle className="h-5 w-5 text-amber-600" />}
                {toast.type === 'info' && <Info className="h-5 w-5 text-blue-600" />}
              </div>
              <div className="flex-1 text-sm font-medium">{toast.message}</div>
              <button onClick={() => removeToast(toast.id)} className="ml-2 text-current opacity-50 hover:opacity-100">
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within a ToastProvider');
  return context;
};