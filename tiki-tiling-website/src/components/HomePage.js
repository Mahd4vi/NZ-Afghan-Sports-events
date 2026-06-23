import React from 'react';
import Hero from './Hero';

function HomePage() {
  return (
    <div className="page-content"> {/* Added page-content class */}
      <Hero />
      <div>
        <h2>Welcome to the Homepage!</h2>
        <p>This is where the main content for the homepage will go.</p>
        <p>We can showcase featured projects or services here.</p>
      </div>
    </div>
  );
}
export default HomePage;
