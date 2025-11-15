import { useState } from 'react';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

interface AdminAppProps {
  onBack: () => void;
}

export default function AdminApp({ onBack }: AdminAppProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return <AdminLogin onLogin={() => setIsLoggedIn(true)} onBack={onBack} />;
  }

  return <AdminDashboard onLogout={() => setIsLoggedIn(false)} />;
}
