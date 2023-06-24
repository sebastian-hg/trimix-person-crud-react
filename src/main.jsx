import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import FilterPage from '../src/pages/filters/filter.tsx';
import HandlingPerson from './pages/handlingPerson/handlingPerson';
import { store } from './redux/store';

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
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)