import React from 'react';
import './Nav.css';

const Nav = ({ state, send }) => {
  const goToWelcome = () => {
    send('CANCEL')
    
  }

  const goBack = () => {
    send('BACK')
  }

  const renderView = () => {
    if(!state.matches('inicial') && !state.matches('tickets')) {
      return(
        <button onClick={goToWelcome} className='Nav-cancel button-secondary'>Cancelar</button>
      )
    }
    if(state.matches('tickets')) {
      return null
    }
  }

  return (
    <nav className='Nav'>
      <h1 className='Nav-logo'>FlyToWorld ✈</h1>
      <div className='Nav-buttons-container'>

      {state.matches('passengers') &&
      <button onClick={goBack} className='button-back'><i className='bx bx-left-arrow-alt'></i></button>
      }
      {renderView()}

      </div>
    </nav>
  );
};

export { Nav }