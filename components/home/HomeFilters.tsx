"use client";

import { HomePageFilters } from "@/constants/filters";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { formUrlQuery } from "@/lib/utils";

const HomeFilters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [active, setActive] = useState("");

  const handleTypeClick = (item: string) => {
    if (active === item) {
      setActive("");
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "filter",
        value: null,
      });

      router.push(newUrl, { scroll: false });
    } else {
      setActive(item);
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "filter",
        value: item.toLowerCase(),
      });

      router.push(newUrl, { scroll: false });
    }
  };

  return (
    <div className="mt-10 hidden flex-wrap gap-3 md:flex">
      {HomePageFilters.map((filter) => (
        <Button
          key={filter.value}
          className={`body-medium rounded-lg px-6 py-3 capitalize shadow-none ${
            active === filter.value
              ? "bg-light-700 text-primary-500 dark:bg-dark-400"
              : "bg-light-800 text-light-500 hover:bg-light-700 dark:bg-dark-300 dark:text-light-500 dark:hover:bg-dark-400"
          }`}
          onClick={() => handleTypeClick(filter.value)}>
          {filter.name}
        </Button>
      ))}
    </div>
  );
};

export default HomeFilters;
