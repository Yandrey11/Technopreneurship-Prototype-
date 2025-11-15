import { useState } from 'react';
import StudentLogin from './StudentLogin';
import StudentDashboard from './StudentDashboard';

interface StudentAppProps {
  onBack: () => void;
}

export default function StudentApp({ onBack }: StudentAppProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return <StudentLogin onLogin={() => setIsLoggedIn(true)} onBack={onBack} />;
  }

  return <StudentDashboard onLogout={() => setIsLoggedIn(false)} />;
}
