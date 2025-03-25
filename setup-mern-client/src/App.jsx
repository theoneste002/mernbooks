import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import MyFooter from './components/MyFooter';

function App() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
      <div className='min-h-screen'>
      <Outlet />
      </div>
        <MyFooter/>
      </Suspense>
    </>
  );
}

export default App;
