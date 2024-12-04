import { env } from '@/env';

const ScreenSize = () => {
  const nodeEnv = env.NODE_ENV;

  if (nodeEnv === 'production') return null;

  const screenSizes = [
    {
      label: 'SM',
      classNames: 'block md:hidden lg:hidden xl:hidden bg-violet-700',
    },
    {
      label: 'MD',
      classNames: 'hidden sm:hidden md:block lg:hidden xl:hidden bg-sky-700',
    },
    {
      label: 'LG',
      classNames: 'hidden sm:hidden md:hidden lg:block xl:hidden bg-lime-700',
    },
    {
      label: 'XL',
      classNames: 'hidden sm:hidden md:hidden lg:hidden xl:block bg-red-700',
    },
  ];

  return (
    <div className='bottom-0 right-0 fixed'>
      {screenSizes.map(({ label, classNames }) => (
        <div
          key={label}
          className={`border rounded-full w-fit p-2 text-white ${classNames}`}>
          {label}
        </div>
      ))}
    </div>
  );
};

export default ScreenSize;
