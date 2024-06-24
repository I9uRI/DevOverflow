"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";

interface Props {
  route: string;
  iconPosition: "left" | "right";
  imgSrc: string;
  placeHolder: string;
  otherClasses: string;
}

const GlobalSearch = ({
  route,
  iconPosition,
  imgSrc,
  placeHolder,
  otherClasses,
}: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.get("q");

  const [search, setSearch] = useState(query || "");

  useEffect(() => {
    const delayDebounceFN = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "q",
          value: search,
        });

        router.push(newUrl, { scroll: false });
      } else {
        if (pathname === route) {
          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keys: ["q"],
          });

          router.push(newUrl, { scroll: false });
        }
      }
    }, 500);

    return () => clearTimeout(delayDebounceFN);
  }, [search, route, pathname, router, searchParams]);

  return (
    <div
      className={`${otherClasses} background-light800_darkgradient relative flex min-h-[36px] grow items-center gap-4 rounded-[10px] px-4`}>
      {iconPosition === "left" && (
        <Image
          src={imgSrc}
          alt="search"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      )}

      <Input
        type="text"
        placeholder={placeHolder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="paragraph-regular no-focus placeholder background-light800_darkgradient border-none text-dark-200 shadow-none outline-none dark:text-light-800"
      />

      {iconPosition === "right" && (
        <Image
          src="/assets/icons/search.svg"
          alt="search"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      )}
    </div>
  );
};

export default GlobalSearch;
