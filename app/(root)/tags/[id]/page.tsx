import Pagination from "@/components/Pagination";
import NoResult from "@/components/shared/NoResult";
import QuestionCard from "@/components/shared/cards/QuestionCard";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import { getQuestionsByTagName } from "@/lib/actions/tag.action";
import { URLProps } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tag | DevFlow",
};

const Page = async ({ params, searchParams }: URLProps) => {
  const result = await getQuestionsByTagName({
    tagId: params.id,
    searchQuery: searchParams.q,
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900 uppercase">
        {result.tagTitle}
      </h1>

      <div className="mt-11 w-full">
        <LocalSearchBar
          route={`/tags/${params.id}`}
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeHolder="Search tag Questions"
          otherClasses="flex-1"
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
            title="No Tag Question's Found"
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
};

export default Page;
