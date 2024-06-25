"use client";

import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

export function Router(props: Readonly<{
  children: React.ReactNode;
}>) {
  const [isServer, setIsServer] = useState(true);
  useEffect(() => {
    setIsServer(false);
  }, []);
  if (isServer) return null;

  return (
    <BrowserRouter>
      {props.children}
    </BrowserRouter>
  );
}
