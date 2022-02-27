import React from 'react';
import { DominoSpinner } from 'react-spinners-kit';

const PageLoading: React.FC = () => (
  <div className="w-screen h-screen center">
    <DominoSpinner size={370} />
  </div>
);

export default PageLoading;
