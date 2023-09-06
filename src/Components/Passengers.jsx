import React, { useState } from 'react';
import './Passengers.css';

export const Passengers = ({ state, send }) => {
  const [value, changeValue] = useState('');

  const onChangeInput = (e) => {
    changeValue(e.target.value);
  }

  const goToTicket = () => {
    send('DONE')
  }

  const submit = (e) => {
    e.preventDefault();
    send('ADD', {newPassenger: value})
    changeValue('');
  }

  const { passengers } = state.context

  return (
    <form onSubmit={submit} className='Passengers'>
      <p className='Passengers-title title'>Agrega a las personas que van a volar</p>
      <ul className='Passengers-list'>
      {passengers.map((person, idx) =>
        <li key={`${person}-${idx}`}>
          <p className='text'>{person}</p>
        </li>
      )}
      </ul>

      <input 
        id="name" 
        name="name" 
        type="text" 
        placeholder='Escribe el nombre completo' 
        required 
        value={value} 
        onChange={onChangeInput}
      />
      <div className='Passengers-buttons'>
        <button 
          className='Passengers-add button-passangers button-secondary'
          type="submit"
        >
          Agregar Pasajero
        </button>
        <button
          className={`${passengers.length > 0 ? 'Passenger-pay' : 'Passenger-disabled'}`}
          type="button"
          onClick={goToTicket}
        >
          Ver mi ticket
        </button>
      </div>
    </form>
  );
};

