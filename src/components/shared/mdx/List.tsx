import type { FC, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ListProps {
  children: ReactNode;
  listClasses?: string;
}

export const List: FC<ListProps> = ({ children, listClasses }) => {
  return (
    <ul
      className={cn(
        "list-disc mt-6 pl-8 flex flex-col gap-[10px]",
        listClasses
      )}
    >
      {children}
    </ul>
  );
};

interface ItemProps {
  children: ReactNode;
  classes?: string;
}

export const Item: FC<ItemProps> = ({ children, classes }) => {
  return <li className={cn("text-body-6", classes)}>{children}</li>;
};
