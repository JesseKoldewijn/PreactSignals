import React from "react";

import { appConfig } from "@/config/app";
import DesktopBackground from "@/images/background-1-size_xl.webp";
import MobileBackground from "@/images/background-1-size_xs.webp";
import { cn } from "@/utils/cn";

type HeroBannerProps = {
  title?: string;
  subtitle?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const HeroBanner = (props: HeroBannerProps) => {
  const { title, subtitle, className, ...rest } = props;

  return (
    <div
      className={cn(
        "relative grid h-96 max-h-96 max-w-[100vw] grid-cols-1 items-center overflow-hidden truncate md:grid-cols-4",
        className,
      )}
      {...rest}
    >
      <img
        src={MobileBackground.src}
        srcSet={`${MobileBackground.src} 640w, ${DesktopBackground.src} 1024w`}
        sizes="(max-width: 640px) 100vw, 50vw"
        loading="eager"
        alt="Background of hero banner"
        className="absolute inset-0 -z-[2] h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-[1] flex h-full w-full bg-purple-950 bg-opacity-15 backdrop-blur-[1px]"></div>
      <div className="col-span-full flex flex-col items-center justify-center gap-3 text-center md:col-span-2 md:col-start-2">
        <h1 className="text-3xl font-semibold text-orange-300 sm:text-4xl">
          {title ?? appConfig.banner.defaults.title}
        </h1>
        <p className="mx-4 max-w-sm text-pretty text-base text-orange-200 sm:text-lg">
          {subtitle ?? appConfig.banner.defaults.description}
        </p>
      </div>
      <div className="absolute inset-x-0 bottom-0 z-[1] h-2 bg-gradient-to-b from-transparent to-neutral-950"></div>
    </div>
  );
};

export default HeroBanner;
