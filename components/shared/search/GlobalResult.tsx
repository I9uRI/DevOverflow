"use client";

import { useEffect, useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import GlobalFilters from "./GlobalFilters";
import { globalSearch } from "@/lib/actions/general.action";

const GlobalResult = () => {
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState([
    {
      type: "...",
      id: 1,
      title: "...",
    },
    {
      type: "...",
      id: 1,
      title: "...",
    },
    {
      type: "...",
      id: 1,
      title: "...",
    },
  ]);

  const global = searchParams.get("global");
  const type = searchParams.get("type");

  useEffect(() => {
    const fetchResult = async () => {
      setResult([]);
      setIsLoading(true);

      try {
        // EVERYTHING WE WILL SEARCH WE NEED TO FETCH !
        const res = await globalSearch({
          query: global,
          type,
        });

        setResult(JSON.parse(res as any));
      } catch (error) {
        console.log(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    };

    if (global) {
      fetchResult();
    }
  }, [global, type]);

  const renderLinks = (type: string, id: number) => {
    switch (type) {
      case "question":
        return `/question/${id}`;
      case "answer":
        return `/question/${id}`;
      case "user":
        return `/profile/${id}`;
      case "tag":
        return `/tags/${id}`;
      default:
        return "/";
    }
  };

  return (
    <div className="absolute top-full z-50 mt-3 w-full rounded-xl bg-light-800 py-5 shadow-lg dark:bg-dark-500 dark:shadow-gray-900">
      <p className="text-dark400_light900 paragraph-semibold px-5">
        <GlobalFilters />
      </p>
      <div className="mx-auto my-5 h-[1px] w-[95%] bg-light-500/30" />

      <div className="space-y-5">
        <p className="text-dark400_light900 paragraph-semibold px-5">
          Top Match
        </p>

        {isLoading ? (
          <div className="flex-center flex-col px-5">
            <ReloadIcon className="my-2 h-8 w-8 animate-spin text-primary-500" />
            <p className="text-dark200_light800 body-regular mt-1.5">
              Browsing the entire Database
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {result.length > 0 ? (
              result.map((item, index) => (
                <Link
                  href={renderLinks(item.type, item.id)}
                  key={item.type + item.id + index}
                  className="flex w-full cursor-pointer items-center gap-3 px-5 py-2.5 hover:bg-light-700/50 dark:hover:bg-dark-400/50">
                  <Image
                    src={"/assets/icons/tag.svg"}
                    alt="tags"
                    width={18}
                    height={18}
                    className="invert-colors mt-1 object-contain"
                  />
                  <div className="flex flex-col">
                    <p className="body-medium text-dark200_light800 line-clamp-1">
                      {item.title}
                    </p>
                    <p className="text-dark400_light500 small-medium mt-1 font-bold capitalize">
                      {item.type}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="flex-center flex-col px-5">
                <p className="text-dark200_light800 body-regular px-5 py-2.5">
                  Oops. No result found.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GlobalResult;
