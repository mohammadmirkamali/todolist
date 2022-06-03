import React, { useEffect, useState } from 'react';
import request from 'services/request';
import { AllTermsUrl } from 'services/routes';

const Terms: React.FC = () => {
  const [data, setData] = useState(null);
  // useEffect(async () => {
  //   const res = await request.get(AllTermsUrl());
  //   setData(res.data);
  // }, []);
  return (
    <div className="bg-blue-11 w-full md:my-[50px] center flex-col pb-[60px]">Terms</div>
  );
};

export default Terms;
