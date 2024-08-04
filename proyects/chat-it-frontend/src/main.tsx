import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './routes/Home';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Root from './routes/Root';
import ChatRoom from './routes/Chat';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { path: '/home', element: <Home /> },
      {
        path: '/chat',
        element: <ChatRoom />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
