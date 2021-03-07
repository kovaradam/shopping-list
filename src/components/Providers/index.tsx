import React from 'react';
import { IconContext } from 'react-icons/lib';

const Providers: React.FC = ({ children }) => {
  return (
    <IconContext.Provider value={{ className: 'react-icons' }}>
      {children}
    </IconContext.Provider>
  );
};

export default Providers;
