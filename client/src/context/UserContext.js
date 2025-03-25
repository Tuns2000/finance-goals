import React, { createContext, useState, useContext, useEffect } from 'react';

// Создаем контекст для текущего пользователя
const UserContext = createContext();

// Провайдер контекста
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwt.decode(token);
      setUser(decoded);  // Декодируем токен и сохраняем данные пользователя
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
