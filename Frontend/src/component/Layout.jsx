import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Outlet , useLocation} from 'react-router-dom';
 
export default function Layout() {
  const location = useLocation();
  const isHome = location.pathname === '/';
 
  return (
    <div className="flex flex-col min-h-screen overflow-y-auto">
      <Header />
     
      <main
      className="flex-grow px-4 py-6 overflow-y-auto"
        style={
          isHome
          ?
          {
           backgroundImage: "url('Car2.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }
        : {}
       
      }
      >
        <Outlet />
      </main>
 
      <Footer />
    </div>
  );
}