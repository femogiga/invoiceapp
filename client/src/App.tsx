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
import InvoiceForm from './pages/invoicedetails/components/InvoiceForm';
import CreateFrom from './pages/invoicedetails/components/CreateFrom';
import EditForm from './pages/invoicedetails/components/EditForm';
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<BaseLayout />}>
        <Route path='/' element={<InvoiceForm />} />
        <Route path='/invoices' element={<Index />} />
        <Route path='/invoices/create' element={<CreateFrom />} />
        <Route path='/invoices/:id' element={<InvoiceDetails />} />
        <Route path='/invoices/:id/edit' element={<EditForm />} />
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
