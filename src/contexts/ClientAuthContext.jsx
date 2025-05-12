import { createContext, useState, useContext, useEffect } from 'react';
import { clients } from '../data/ClientsData';

// Create context for client authentication
const ClientAuthContext = createContext(null);

export const ClientAuthProvider = ({ children }) => {
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if the client is already logged in (via localStorage)
  useEffect(() => {
    const savedClient = localStorage.getItem('clientAuth');
    if (savedClient) {
      setClient(JSON.parse(savedClient));
    }
    setLoading(false);
  }, []);

  // Log in a client
  const login = (email, password) => {
    // Find the client with matching email and password
    const foundClient = clients.find(
      c => c.email === email && c.password === password
    );

    if (foundClient) {
      // Remove password before storing in state/localStorage
      const { password, ...clientData } = foundClient;
      
      // Store client data in state and localStorage
      setClient(clientData);
      localStorage.setItem('clientAuth', JSON.stringify(clientData));
      return true;
    }
    
    return false;
  };

  // Log out the client
  const logout = () => {
    setClient(null);
    localStorage.removeItem('clientAuth');
  };

  return (
    <ClientAuthContext.Provider value={{ client, login, logout, loading }}>
      {children}
    </ClientAuthContext.Provider>
  );
};

// Custom hook to use the client auth context
export const useClientAuth = () => {
  return useContext(ClientAuthContext);
};