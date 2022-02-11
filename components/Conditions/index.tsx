import { t } from 'i18next';
import React from 'react';

const Conditions: React.FC = () => {
  const infos = [1, 2, 3, 4, 5, 6, 7];
  return (
    <div className="pt-[130px] md:pt-[100px] px-[50px] mb-[80px]">
      <h2 className="font-bold text-[30px]">{t('conditions.h2')}</h2>
      {infos.map((key) => (
        <div key={key}>
          <h3 className="font-bold text-[20px]">{t(`conditions.title${key}`)}</h3>
          <div className="mb-[25px]">
            {t(`conditions.info${key}`)
              .split('&')
              .map((item) => (
                <p className="text-[18px] mb-[7px]" key={item}>
                  {item}
                </p>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Conditions;
