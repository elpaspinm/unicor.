import React, { useState, useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import PasswordPage from './pages/PasswordPage';
import PatientIdPage from './pages/PatientIdPage';
import PatientEducationPage from './pages/PatientEducationPage';
import PharmacistDashboardPage from './pages/PharmacistDashboardPage';
import PharmacistPublicationsPage from './pages/PharmacistPublicationsPage';
import PharmacistTrainingsPage from './pages/PharmacistTrainingsPage';
import PharmacistEducationEditorPage from './pages/PharmacistEducationEditorPage';
import PersonalPublicationsPage from './pages/PersonalPublicationsPage';
import AppHeader from './components/Layout/AppHeader';
import AppNavigation from './components/Layout/AppNavigation';
import ChatWindow from './components/Chat/ChatWindow';
import { getFromStorage, saveToStorage } from './utils/storage';

// Importar los mocks directamente aquí para asegurar su disponibilidad global en el archivo
import initialMockUsers from './mock/users'; 
import initialMockMessages from './mock/messages';
import initialMockEducationalContent from './mock/educationalContent';

// Definir la función initializeLocalStorage fuera del componente App
// para asegurar que tenga acceso a las importaciones de mocks
const initializeLocalStorage = (users, messages, educationalContent) => {
  try {
    if (!getFromStorage('users') || getFromStorage('users').length === 0) {
      saveToStorage('users', users);
    }
    // Los mensajes y el contenido educativo se inicializan en sus respectivos componentes
    // o se cargan de forma centralizada si se usa getCentralizedData.
    // Aquí solo nos aseguramos de que los usuarios estén inicializados.
  } catch (e) {
    console.error("Error initializing localStorage:", e);
  }
};

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [otherUser, setOtherUser] = useState(null);
  const [currentView, setCurrentView] = useState('loading'); 
  const [selectedRoleForPassword, setSelectedRoleForPassword] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    // Pasar solo initialMockUsers a la función de inicialización de usuarios
    initializeLocalStorage(initialMockUsers, initialMockMessages, initialMockEducationalContent);

    const storedUser = getFromStorage('currentUser'); 
    if (storedUser) {
      setCurrentUser(storedUser);
      const users = getFromStorage('users') || initialMockUsers; 
      let oppositeRoleUser = null;
      if (storedUser.role === 'patient') {
        oppositeRoleUser = users.find(u => u.role === 'pharmacist');
      } else {
        oppositeRoleUser = users.find(u => u.role === 'patient' && !u.trashed);
      }
      setOtherUser(oppositeRoleUser || null);

      if (storedUser.role === 'patient') {
        setCurrentView('education');
      } else if (storedUser.role === 'pharmacist' || storedUser.role === 'admin') {
        setCurrentView('pharmacistDashboard');
      } else if (storedUser.role === 'medical_viewer' || storedUser.role === 'pharmacist_viewer' || storedUser.role === 'general_viewer') {
        setCurrentView('personalPublications');
      }
      if (storedUser.role === 'patient' && !storedUser.trashed) {
        const patientInStorage = users.find(u => u.id === storedUser.id);
        if (patientInStorage && !patientInStorage.trashed) {
          setIsChatOpen(true);
        }
      }
    } else {
      setCurrentView('login');
    }
  }, []);

  const handleRoleSelect = (role) => {
    if (role === 'pharmacist' || role === 'personal') {
      setSelectedRoleForPassword(role);
      setCurrentView('password');
    } else if (role === 'patient') {
      setCurrentView('patientId');
    }
  };

  const handleLogin = (user) => {
    setCurrentUser(user);
    saveToStorage('currentUser', user); 
    const users = getFromStorage('users') || initialMockUsers; 
    
    let oppositeRoleUser = null;
    if (user.role === 'patient') {
      oppositeRoleUser = users.find(u => u.role === 'pharmacist');
    } else { 
      oppositeRoleUser = users.find(u => u.role === 'patient' && !u.trashed);
    }
    
    setOtherUser(oppositeRoleUser || null);
    
    if (user.role === 'patient') {
      setCurrentView('education');
    } else if (user.role === 'pharmacist' || user.role === 'admin') {
      setCurrentView('pharmacistDashboard');
    } else if (user.role === 'medical_viewer' || user.role === 'pharmacist_viewer' || user.role === 'general_viewer') {
      setCurrentView('personalPublications');
    }

    if (user.role === 'patient' && !user.trashed) {
       const usersInStorage = getFromStorage('users') || initialMockUsers; 
       const patientInStorage = usersInStorage.find(u => u.id === user.id);
       if (patientInStorage && !patientInStorage.trashed) {
         setIsChatOpen(true);
       } else {
         setIsChatOpen(false);
       }
    } else {
      setIsChatOpen(false);
    }
    
    setSelectedRoleForPassword(null);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    saveToStorage('currentUser', null); 
    setOtherUser(null);
    setCurrentView('login');
    setSelectedRoleForPassword(null);
    setIsChatOpen(false);
  };

  const handleCancelPassword = () => {
    setSelectedRoleForPassword(null);
    setCurrentView('login');
  };

  const handleCancelPatientId = () => {
    setCurrentView('login');
  };

  const renderView = () => {
    if (currentView === 'loading') {
      return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-700">Cargando...</div>;
    }
    
    switch(currentView) {
      case 'login':
        return <LoginPage onRoleSelect={handleRoleSelect} />;
      case 'password':
        return <PasswordPage onLogin={handleLogin} selectedRole={selectedRoleForPassword} onCancel={handleCancelPassword} />;
      case 'patientId':
        return <PatientIdPage onLogin={handleLogin} onCancel={handleCancelPatientId} />;
      case 'education':
        return <PatientEducationPage />;
      case 'pharmacistDashboard':
        return currentUser && (currentUser.role === 'pharmacist' || currentUser.role === 'admin') ? (
          <PharmacistDashboardPage onSelectPatientForChat={setOtherUser} onOpenChat={() => setIsChatOpen(true)} />
        ) : null;
      case 'pharmacistPublications':
        return currentUser && (currentUser.role === 'pharmacist' || currentUser.role === 'admin') ? (
          <PharmacistPublicationsPage />
        ) : null;
      case 'pharmacistTrainings':
        return currentUser && (currentUser.role === 'pharmacist' || currentUser.role === 'admin') ? (
          <PharmacistTrainingsPage />
        ) : null;
      case 'pharmacistEducationEditor':
        return currentUser && (currentUser.role === 'pharmacist' || currentUser.role === 'admin') ? (
          <PharmacistEducationEditorPage />
        ) : null;
      case 'personalPublications':
        return currentUser && (currentUser.role === 'medical_viewer' || currentUser.role === 'pharmacist_viewer' || currentUser.role === 'general_viewer') ? (
          <PersonalPublicationsPage currentUserRole={currentUser.role} />
        ) : null;
      default:
        return <LoginPage onRoleSelect={handleRoleSelect} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentUser ? (
        <>
          <AppHeader user={currentUser} onLogout={handleLogout} />
          <AppNavigation 
            role={currentUser.role} 
            currentView={currentView}
            onChangeView={setCurrentView}
          />
          <main className="bg-white">
            {renderView()}
          </main>
          {isChatOpen && currentUser && otherUser ? (
            <ChatWindow 
              currentUser={currentUser} 
              otherUser={otherUser} 
              onClose={() => setIsChatOpen(false)} 
            />
          ) : currentUser && otherUser && currentUser.role === 'patient' && !currentUser.trashed && (
            <button
              onClick={() => setIsChatOpen(true)}
              className="fixed bottom-4 right-4 px-6 py-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors z-50 flex items-center space-x-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-.55.55c-.1.1-.22.15-.35.15s-.25-.05-.35-.15L9 16z" />
              </svg>
              <span>Chat con el Farmacéutico</span>
            </button>
          )}
        </>
      ) : (
        renderView()
      )}
    </div>
  );
};

export default App;

// DONE