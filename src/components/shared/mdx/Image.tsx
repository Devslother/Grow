/* eslint-disable @next/next/no-img-element */
import type { FC, ImgHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt?: string;
  classes?: string;
}

export const Image: FC<Props> = ({ src, alt, classes, ...rest }) => {
  return (
    <img
      src={src}
      alt={alt || "image"}
      loading="lazy"
      className={cn("w-full h-full object-cover", classes)}
      {...rest}
    />
  );
};
