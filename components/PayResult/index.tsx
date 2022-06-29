import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import request from 'services/request';
import { PayResultUrl } from 'services/routes';

const PayResult: React.FC = () => {
  const router = useRouter();
  const [status, setStatus] = useState(null);
  useEffect(() => {
    const { Authority, Status } = router.query;
    if (Status) {
      setStatus(Status === 'OK');
      //   const res = await request.post(PayResultUrl(), { Authority, Status });
    }
  }, [router]);
  return <div>PayResult</div>;
};

export default PayResult;
