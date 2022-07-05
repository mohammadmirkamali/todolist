/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';
import { CameraFilled } from '@ant-design/icons';
import Image from 'next/image';
import user from 'public/user.svg';
import request from 'services/request';
import { ChangeUserImgUrl } from 'services/routes';
import { message, Spin } from 'antd';
import { useDispatch } from 'react-redux';
import { getUserAction } from 'store/account/account.action';

const ProfileImg: React.FC<{ image: string; isUser: boolean }> = ({ image, isUser }) => {
  const inputRef: React.MutableRefObject<any> = useRef();
  const dispatch = useDispatch();
  const [img, setImg] = useState(image);
  const [showImage, setShowImage] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (event): Promise<any> => {
    const file = event.target.files[0];
    const formData = new FormData();
    setLoading(true);
    formData.append('avatar', file);
    const res: any = await request.post(ChangeUserImgUrl(), formData); // eslint-disable-line
    await dispatch(getUserAction());
    setLoading(false);
    res.ok && message.success(res.data.message);
  };

  useEffect(() => {
    setImg(image); // need it on search from one teacher to another
  }, [image]);

  return (
    <div
      onMouseEnter={(): void => setShowImage(isUser && true)}
      onMouseLeave={(): void => setShowImage(isUser && false)}
      className="bg-white rounded-full w-[130px] h-[130px] relative overflow-hidden"
    >
      <Image
        src={img || user}
        width={130}
        height={130}
        alt="profile"
        className="rounded-full overflow-hidden"
      />

      <div
        aria-hidden="true"
        onClick={(): void => isUser && inputRef.current.click()}
        className={`${
          showImage || loading ? 'h-[40px]' : 'h-[0px]'
        } absolute bottom-0 bg-gray-9 w-full center overflow-hidden duration-300 text-white cursor-pointer`}
      >
        <input ref={inputRef} type="file" onChange={handleUpload} className="hidden" />
        {loading ? <Spin /> : <CameraFilled className="text-[30px]" />}
      </div>
    </div>
  );
};

export default ProfileImg;
