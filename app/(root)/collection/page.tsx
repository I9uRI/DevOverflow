import Pagination from "@/components/Pagination";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import QuestionCard from "@/components/shared/cards/QuestionCard";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import { QuestionFilters } from "@/constants/filters";
import { fetchSavedQuestions } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import { auth } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Collection | DevFlow",
};

export default async function Page({ searchParams }: SearchParamsProps) {
  const { userId } = auth();
  if (!userId) return null;

  const result = await fetchSavedQuestions({
    clerkId: userId,
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Saved Questions</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route="/collection"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeHolder="Search for Questions"
          otherClasses="flex-1"
        />

        <Filter
          filters={QuestionFilters}
          otherClasses="min-h-[36px] sm:min-w-[170px]"
        />
      </div>

      <div className="mt-10 flex w-full flex-col gap-6">
        {result.questions.length > 0 ? (
          result.questions.map((question: any) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult
            link="/"
            title="No Saved Question's Found"
            description="It appears that you haven't saved any questions yet. Start exploring and saving questions that pique your interest."
            linkTitle="Explore Questions"
          />
        )}
      </div>

      <div className="mt-10">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={result.isNext}
        />
      </div>
    </>
  );
}
