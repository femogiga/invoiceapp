import './App.css';
import Header from './components/derivedcomponents/Header';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Index from './pages/home/Index';
import BaseLayout from './layouts/BaseLayout';
import { ThemeProvider } from './components/providers/ThemeProvider';
import InvoiceDetails from './pages/invoicedetails/InvoiceDetails';
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<BaseLayout />}>
        <Route path='/invoices' element={<Index />} />
        <Route path='/invoices/:id' element={<InvoiceDetails />} />
      </Route>
    )
  );

  return (
    <div>
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        <RouterProvider router={router} />
      </ThemeProvider>
    </div>
  );
}

export default App;
