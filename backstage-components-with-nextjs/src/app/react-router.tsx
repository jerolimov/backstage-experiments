"use client";
import { BrowserRouter } from 'react-router-dom';

export function Router(props: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <BrowserRouter>
      {props.children}
    </BrowserRouter>
  );
}
