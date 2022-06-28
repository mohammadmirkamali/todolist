import { message } from 'antd';
import Login from 'components/Account/login';
import RegisterModal from 'components/Common/LoginLayout/registerModal';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import request from 'services/request';
import { ratePayUrl } from 'services/routes';
import { getChapterAction, getEventAction } from 'store/course/course.action';
import { CourseType, PageTermType, WebinarType } from 'types/course.type';

type LayoutType = {
  url?: string;
  data?: CourseType | WebinarType | PageTermType;
  condition?: boolean;
  setLoading?: (item) => void;
  handleNext?: () => void;
};
const LoginLayout: React.FC<LayoutType> = (props) => {
  const { url, setLoading, condition, data, children, handleNext } = props;
  const dispatch = useDispatch();
  const router = useRouter();
  const { eventId, termId } = router.query;
  const type = termId ? 'term' : eventId ? 'event' : 'workshop';
  const user = useSelector((state) => state.account.user);
  const [loginModal, setLoginModal] = useState(null);
  const [registerModalVisible, setRegisterModalVisible] = useState(false);
  const [tryRegister, setTryRegister] = useState(false);

  const registerCourse = async (): Promise<void> => {
    if (Number(data.price)) {
      setRegisterModalVisible(true);
    } else {
      setLoading && setLoading(true);
      const res: any = await request.post(ratePayUrl(data.id, type)); // eslint-disable-line
      setLoading && setLoading(false);
      const text = res.data.message;
      res.ok ? message.success(text) : message.error(text);
      res.ok &&
        dispatch(eventId ? getEventAction(eventId) : getChapterAction(data.id, !!user));
      res.ok && url && router.push(url);
      res.ok && handleNext && handleNext();
    }
  };

  const handleSelect = (): void => {
    setTryRegister(true);
    !user ? setLoginModal(true) : data ? registerCourse() : null;
  };

  // to show register pop after user login
  useEffect(() => {
    tryRegister && user && !data.registered && (registerCourse(), setTryRegister(false));
  }, [data]);

  return (
    <div>
      {condition || (user && data?.registered && url) ? (
        <Link href={url}>
          <a>{children}</a>
        </Link>
      ) : (
        <div onClick={handleSelect} aria-hidden="true">
          {children}
        </div>
      )}

      <Login
        isVisible={loginModal}
        setIsVisible={setLoginModal}
        // nextAction={nextAction}
      />
      <RegisterModal
        url={url}
        data={data}
        isVisible={registerModalVisible}
        setIsVisible={setRegisterModalVisible}
      />
    </div>
  );
};

export default LoginLayout;
