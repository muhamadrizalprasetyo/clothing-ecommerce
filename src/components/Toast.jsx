import { useStore } from '../context/StoreContext';
import { CheckCircle, AlertCircle, Info, X, Heart, ShoppingBag, User } from 'lucide-react';

const iconMap = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
  wishlist: Heart,
  cart: ShoppingBag,
  profile: User
};

const colorMap = {
  success: 'bg-navy-600 text-white',
  error: 'bg-red-500 text-white',
  info: 'bg-gray-800 text-white',
  wishlist: 'bg-pink-500 text-white',
  cart: 'bg-navy-600 text-white',
  profile: 'bg-navy-600 text-white'
};

// Individual Toast Item with CSS-only animations
const ToastItem = ({ toast, onClose }) => {
  const Icon = iconMap[toast.type] || Info;
  const colorClass = colorMap[toast.type] || colorMap.info;

  return (
    <div
      className={`
        pointer-events-auto
        flex items-center gap-3 
        px-4 py-3 rounded-xl shadow-lg
        backdrop-blur-md bg-opacity-95
        min-w-[280px] max-w-[400px]
        transform transition-all duration-300 ease-out
        translate-x-0 opacity-100
        ${colorClass}
        active:scale-95
        hover:shadow-xl
        border border-white/10
      `}
      data-toast-id={toast.id}
      style={{
        animation: 'slideInRight 0.3s ease-out'
      }}
    >
      <Icon className="w-5 h-5 flex-shrink-0" />
      <p className="text-sm font-medium flex-1 leading-snug">
        {toast.message}
      </p>
      <button
        onClick={onClose}
        className="p-1 rounded-full hover:bg-white/20 transition-colors duration-200 active:scale-90"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

// Toast Container
const Toast = () => {
  const { toasts, showToast } = useStore();

  // Expose showToast globally for convenience
  if (typeof window !== 'undefined') {
    window.cozzyToast = showToast;
  }

  if (toasts.length === 0) return null;

  return (
    <>
      {/* CSS Animations */}
      <style>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideOutRight {
          from {
            opacity: 1;
            transform: translateX(0);
          }
          to {
            opacity: 0;
            transform: translateX(100%);
          }
        }
        
        .toast-exit {
          animation: slideOutRight 0.3s ease-in forwards;
        }
      `}</style>

      {/* Toast Stack */}
      <div
        className="fixed top-4 right-4 z-[9999] flex flex-col gap-2"
        aria-live="polite"
        aria-atomic="true"
      >
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            toast={toast}
            onClose={() => {
              // Find and animate out
              const element = document.querySelector(`[data-toast-id="${toast.id}"]`);
              if (element) {
                element.classList.add('toast-exit');
                setTimeout(() => {
                  showToast('', 'info', 0); // Trigger removal
                }, 300);
              }
            }}
          />
        ))}
      </div>
    </>
  );
};

export default Toast;
