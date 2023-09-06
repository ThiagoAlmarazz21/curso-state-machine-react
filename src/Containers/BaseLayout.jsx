import React from 'react';
import { useMachine } from '@xstate/react';
import { Nav } from '../Components/Nav';
import { StepsLayout } from './StepsLayout';
import { flyMachine } from '../Machines/flyMachine';
import './BaseLayout.css';

export const BaseLayout = () => {
  const [state, send] = useMachine(flyMachine);
  
  console.log('CONTEXTO: ', state.context);

  return (
    <div className='BaseLayout'>
      <Nav state={state} send={send} />
      <StepsLayout state={state} send={send}/>
    </div>
  );
}