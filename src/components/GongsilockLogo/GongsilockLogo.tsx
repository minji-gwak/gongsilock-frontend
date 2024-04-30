import logo from '@/static/images/gongsilock-signature-transparent.png';
import Image from 'next/image';

export const GongsilockLogo = () => {
  return (
    <Image
      className="h-[3.25rem] md:h-[4.5rem] object-contain mx-auto"
      src={logo.src}
      width={339}
      height={92}
      alt="Gongsilock Logo"
    />
  );
};
