import { FC } from "react";
import { cn } from "@/lib/utils";

interface Props {
  thead: string[];
  tbody: string[][];
  classes?: string;
}

export const Table: FC<Props> = ({ thead, tbody, classes }) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className={cn("w-full text-lg max-md:text-base", classes)}>
        <thead className="font-bold">
          <tr>
            {thead.map((text, index) => (
              <th
                key={index}
                className="border border-white p-2.5 text-center"
                scope="col"
              >
                {text}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tbody.map((row, rowIndex) => (
            <tr key={rowIndex} className="transition hover:bg-neutral-80">
              {row.map((text, cellIndex) => (
                <td
                  key={cellIndex}
                  className="border border-white p-2.5 text-left"
                >
                  {text}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
