import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import Image from 'next/image';

export const TeacherAvatar = ({ teacher, size }): JSX.Element => {
  return teacher?.avatar ? (
    <Image
      src={teacher.avatar}
      width={size}
      height={size}
      alt={teacher.nickname}
      className="rounded-full"
    />
  ) : (
    <Avatar
      style={{ backgroundColor: '#87d068' }}
      icon={<UserOutlined style={{ fontSize: size / 1.6 }} />}
      size={size}
    />
  );
};
