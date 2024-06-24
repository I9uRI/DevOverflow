import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import { TagFilters } from "@/constants/filters";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import { getAllTags } from "@/lib/actions/tag.action";
import Link from "next/link";
import { SearchParamsProps } from "@/types";
import Pagination from "@/components/Pagination";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tags | DevFlow",
};

const Page = async ({ searchParams }: SearchParamsProps) => {
  const result = await getAllTags({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">All Tags</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route="/tags"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeHolder="Search for tags"
          otherClasses="flex-1"
        />
        <Filter
          filters={TagFilters}
          otherClasses="min-h-[36px] sm:min-w-[170px]"
        />
      </div>

      <section className="mt-12 flex flex-wrap items-center justify-center gap-4">
        {result.tags.length > 0 ? (
          result.tags.map((tag) => (
            <Link
              href={`/tags/${tag._id}`}
              key={tag._id}
              className="shadow-light100_darknone">
              <article className="background-light700_dark300 light-border flex w-full flex-col items-center rounded-2xl border px-8 py-10 sm:w-[260px]">
                <div className="background-light800_dark400 w-fit rounded-md px-5 py-1.5">
                  <p className="paragraph-semibold text-dark300_light900 uppercase">
                    {tag.name}
                  </p>
                </div>
                <p className="paragraph-regular text-dark400_light500 mt-3.5">
                  <span className="body-semibold primary-text-gradient mr-2.5">
                    {tag.questions.length}+
                  </span>{" "}
                  Questions
                </p>
              </article>
            </Link>
          ))
        ) : (
          <NoResult
            title="No Tags Found"
            description="It looks like there are no tags found."
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </section>

      <div className="mt-10">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={result.isNext}
        />
      </div>
    </>
  );
};

export default Page;
