import React from 'react';
import Message from './message';
import Track from './track';

const ContactUs: React.FC = () => (
  <div className="pt-[150px] md:pt-[70px] mb-[30px] center min-h-screen">
    <div className="w-[1200px] items-center md:items-start mx-[20px]  md:p-[50px] flex flex-col md:flex-row">
      <div className=" flex-1 border-b border-b-gray-0 md:border-l md:border-b-0 border-l-gray-0">
        <Message />
      </div>
      <div className=" flex-1">
        <Track />
      </div>
    </div>
  </div>
);

export default ContactUs;
