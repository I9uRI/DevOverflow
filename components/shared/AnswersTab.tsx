import { getUserAnswers } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import React from "react";
import AnswerCard from "./cards/AnswerCard";
import Pagination from "../Pagination";

interface Props extends SearchParamsProps {
  userId: string;
  clerkId?: string | null;
}

const AnswersTab = async ({ searchParams, userId, clerkId }: Props) => {
  const result = await getUserAnswers({
    userId,
    page: searchParams?.page ? +searchParams.page : 1,
  });

  return (
    <>
      {result.answers.map((answer: any) => (
        <AnswerCard
          key={answer._id}
          clerkId={clerkId}
          _id={answer._id}
          question={answer.question}
          author={answer.author}
          upvotes={answer.upvotes.length}
          createdAt={answer.createdAt}
        />
      ))}
      {result.answers.length === 0 ? (
        ""
      ) : (
        <div className="mt-5">
          <Pagination
            pageNumber={searchParams?.page ? +searchParams.page : 1}
            isNext={result.isNext}
          />
        </div>
      )}
    </>
  );
};

export default AnswersTab;
