"use client";

import { cn } from "../lib/utils";

interface GridDetailProps {
  isBottom?: boolean;
}

export const GridDetail = ({ isBottom }: GridDetailProps) => {
  return (
    <div
      className={cn(
        "absolute -left-5 -z-30 h-screen w-screen md:-left-32",
        isBottom ? "bottom-[510px] md:bottom-[390px]" : "-top-60",
      )}
    >
      <div className="grid h-screen grid-cols-6 grid-rows-[2fr_4fr_1fr_5fr_7fr] gap-x-0 gap-y-0 md:grid-cols-12">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={`w-[1px] border-r border-dashed border-gray-300`}
            style={{
              gridRow: "1/-1",
              gridColumn: `${i + 1}/-1`,
            }}
          ></div>
        ))}

        <div
          className="hash-gray"
          style={{
            gridRow: 1,
            gridColumn: 2,
          }}
        ></div>
        <div
          className="hash-gray"
          style={{
            gridRow: 1,
            gridColumn: 6,
          }}
        ></div>
        <div
          className="hash-gray opacity-50"
          style={{
            gridRow: 2,
            gridColumn: 8,
          }}
        ></div>
        <div
          className="hash-gray opacity-50"
          style={{
            gridRow: 3,
            gridColumn: 10,
          }}
        ></div>
        <div
          className="hash-gray opacity-50"
          style={{
            gridRow: 4,
            gridColumn: 4,
          }}
        ></div>
        <div
          className="hash-gray opacity-50"
          style={{
            gridRow: 5,
            gridColumn: 1,
          }}
        ></div>
        <div
          className="hash-gray opacity-50"
          style={{
            gridRow: 5,
            gridColumn: 6,
          }}
        ></div>
        <div
          className="hash-gray opacity-50"
          style={{
            gridRow: 5,
            gridColumn: 11,
          }}
        ></div>

        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="h-[1px] border-b border-dashed border-border"
            style={{
              gridRow: `${i + 1}/-1`,
              gridColumn: "1/-1",
            }}
          ></div>
        ))}
      </div>
      <div
        className={cn(
          "absolute left-0 h-80 w-screen from-transparent to-background",
          isBottom ? "top-0 bg-gradient-to-t" : "bottom-0 bg-gradient-to-b",
        )}
      />
    </div>
  );
};
