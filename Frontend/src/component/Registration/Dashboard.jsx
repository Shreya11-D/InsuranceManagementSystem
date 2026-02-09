import React, { useState } from 'react';
 
import UserPolicy from './UserPolicy';
import CreateClaim from './CreateClaim';
import RaiseTicket from './RaiseTicket';
 
import Users from './Users';
import Policies from './Policies';
import Claims from './Claim';
import Payment from './Payment';
 
import CreatePolicy from './CreatePolicy';
import UpdatePolicy from './UpdatePolicy';
import UpdateClaim from './UpdateClaim';
import UpdateTicket from './UpdateTicket';
import TrackPayment from './TrackPayment';
 
export default function Dashboard({ role }) {
  const [activeLink, setActiveLink] = useState(null);
 
  const componentMap = {
    '/user-policy': <UserPolicy />,
    '/create-claim': <CreateClaim />,
    '/raise-ticket': <RaiseTicket />,
    '/users': <Users />,
    '/policies': <Policies />,
    '/claims': <Claims />,
    '/payment': <Payment />,
    '/create-policy': <CreatePolicy />,
    '/update-policy': <UpdatePolicy />,
    '/update-claim': <UpdateClaim />,
    '/update-ticket': <UpdateTicket />,
    '/track-payment': <TrackPayment />,
  };
 
  const renderCards = () => {
    switch (role) {
      case 'ADMIN':
        return [
          { title: 'Users', link: '/users' },
          { title: 'Policies', link: '/policies' },
          { title: 'Claims', link: '/claims' },
          { title: 'Payment', link: '/payment' },
        ];
      case 'AGENT':
        return [
          { title: 'Create Policy', link: '/create-policy' },
          { title: 'Update Policy', link: '/update-policy' },
          { title: 'Update Claim', link: '/update-claim' },
          { title: 'Update Ticket', link: '/update-ticket' },
          { title: 'Track Payment', link: '/track-payment' },
        ];
      case 'CUSTOMER':
        return [
          { title: 'Policy And Claim', link: '/user-policy' },
          { title: 'Create Claim', link: '/create-claim' },
          { title: 'Raise Ticket', link: '/raise-ticket' },
        ];
      default:
        return [];
    }
  };
 
  const renderContent = () => {
    const heading = activeLink
      ? `Welcome to ${activeLink.replace('/', '').replace(/-/g, ' ')}`
      : 'Select a card to view details';
 
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300">
        <h2 className="text-2xl font-bold mb-4 text-center text-slate-700">{heading}</h2>
        {componentMap[activeLink] || (
          <p className="text-gray-500">Component not found for {activeLink}</p>
        )}
      </div>
    );
  };
 
  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-50 to-amber-100">
      {/* Header */}
      <header className="bg-gray-400 text-white text-center py-5 text-3xl font-extrabold shadow-md">
  {`Welcome to ${role} Portal`}
</header>
 
 
      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-1/4 bg-gradient-to-b from-amber-100 to-slate-200 p-6 border-r shadow-inner">
          <div className="space-y-4">
            {renderCards().map((card, index) => (
              <Card
                key={index}
                title={card.title}
                link={card.link}
                isActive={activeLink === card.link}
                onClick={() => setActiveLink(card.link)}
              />
            ))}
          </div>
        </aside>
 
        {/* Right Panel */}
        <main className="flex-1 p-8 overflow-auto bg-slate-50">{renderContent()}</main>
      </div>
    </div>
  );
}
 
function Card({ title, link, onClick, isActive }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left rounded-xl p-5 transition-all duration-300 shadow-md hover:shadow-lg hover:bg-amber-100 ${
        isActive ? 'border-l-4 border-slate-800 bg-white' : 'bg-white'
      }`}
    >
      <h2 className="text-xl font-semibold text-slate-800">{title}</h2>
      <p className="text-sm text-gray-600">Manage {title.toLowerCase()}.</p>
    </button>
  );
}
 
 