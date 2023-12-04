import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { NextUIProvider } from "@nextui-org/react";
import { MqttProvider } from './hooks/MqttProvider.jsx';




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>


    <NextUIProvider>
      <MqttProvider>
        <div className='dark relative bg-background  text-foreground   '>
          <main className="relative z-10 min-h-screen ">
            <App />
          </main>
          <div className='fixed z-0 inset-0 opacity-20'>
            <img src='/p1.png' className='w-full h-full object-cover object-center' />
          </div>
        </div>
      </MqttProvider>

    </NextUIProvider>


  </React.StrictMode>,
)
