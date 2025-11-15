import { useState } from 'react';
import ParentLogin from './ParentLogin';
import ParentDashboard from './ParentDashboard';

interface ParentAppProps {
  onBack: () => void;
}

export default function ParentApp({ onBack }: ParentAppProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return <ParentLogin onLogin={() => setIsLoggedIn(true)} onBack={onBack} />;
  }

  return <ParentDashboard onLogout={() => setIsLoggedIn(false)} />;
}
