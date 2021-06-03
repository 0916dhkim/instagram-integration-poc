import React, { FC, createContext, useContext, useState } from 'react';

export interface TokenContext {
  accessToken?: string;
  setAccessToken: (value: string) => void;
}

const TokenContext = createContext<TokenContext>({
  accessToken: undefined,
  setAccessToken: () => {},
});

export const TokenProvider: FC = ({children}) => {
  const [accessToken, setAccessToken] = useState<string|undefined>();
  return (
    <TokenContext.Provider value={{
      accessToken,
      setAccessToken,
    }}>
      {children}
    </TokenContext.Provider>
  );
};

export function useToken() {
  const value = useContext(TokenContext);
  return value;
}
