import React from 'react';

export default function Navbar(props: React.PropsWithChildren) {
  return (
    <nav className='nav-bar'>
      <div className='logo'>
        <span role='img'>🍿</span>
        <h1>usePopcorn</h1>
      </div>
      {props.children}
    </nav>
  );
}
