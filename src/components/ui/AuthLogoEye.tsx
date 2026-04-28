import Image from "next/image";

export const AuthLogoEye = () => {
  return (
    <div className="flex flex-row gap-[10px] items-center justify-center">
      <div className="relative w-[60px] h-[60px] rounded-full overflow-hidden">
        <Image
          src="/images/eye-bg.png"
          alt=""
          fill
          sizes="60px"
          className="object-cover"
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src="/images/eye.svg"
            alt=""
            fill
            sizes="60px"
            className="object-cover"
          />
        </div>
      </div>
      <h2 className="font-sans-serif text-2xl font-bold">GrowChief</h2>
    </div>
  );
};
