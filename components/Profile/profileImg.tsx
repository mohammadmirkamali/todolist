/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState } from 'react';
import { CameraFilled } from '@ant-design/icons';
import Image from 'next/image';
import user from 'public/user.svg';

const ProfileImg: React.FC<{ image: string; isUser: boolean }> = ({ image, isUser }) => {
  const inputRef: React.MutableRefObject<any> = useRef();
  const [img, setImg] = useState(image);
  const [showImage, setShowImage] = useState(false);
  const convertBase64 = (file): Promise<unknown> =>
    new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = (): void => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error): void => {
        reject(error);
      };
    });

  const handleUpload = async (event): Promise<any> => {
    const file = event.target.files[0];
    const base64 = await convertBase64(file);
    setImg(base64 as string);
  };

  return (
    <div
      onMouseEnter={(): void => setShowImage(isUser && true)}
      onMouseLeave={(): void => setShowImage(isUser && false)}
      className="bg-white rounded-full w-[150px] h-[150px] relative overflow-hidden"
    >
      <Image
        src={img || user}
        width={150}
        height={150}
        alt="profile"
        className="rounded-full overflow-hidden"
      />

      <div
        aria-hidden="true"
        onClick={(): void => isUser && inputRef.current.click()}
        className={`${
          showImage ? 'h-[40px]' : 'h-[0px]'
        } absolute bottom-0 bg-gray-9 w-full center overflow-hidden duration-300 text-white cursor-pointer`}
      >
        <input ref={inputRef} type="file" onChange={handleUpload} className="hidden" />
        <CameraFilled className="text-[30px]" />
      </div>
    </div>
  );
};

export default ProfileImg;
