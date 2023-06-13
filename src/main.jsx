import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import FilterPage from '../src/pages/filters/filter.tsx';
import HandlingPerson from './pages/handlingPerson/handlingPerson';

const router = createBrowserRouter([
  {
    path: '/',
    element: <FilterPage />,
  },
  {
    path: '/editar',
    element: <HandlingPerson/>
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)