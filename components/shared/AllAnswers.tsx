import { AnswerFilters } from "@/constants/filters";
import Filter from "./Filter";
import { getAnswers } from "@/lib/actions/answer.action";
import Link from "next/link";
import Image from "next/image";
import ParseHTML from "./ParseHTML";
import Votes from "./Votes";
import Pagination from "../Pagination";

interface Props {
  questionId: string;
  userId: string;
  totalAnswers: number;
  page?: number;
  filter?: string;
}

const AllAnswers = async ({
  questionId,
  userId,
  totalAnswers,
  page,
  filter,
}: Props) => {
  const result = await getAnswers({
    questionId,
    page: page ? +page : 1,
    sortBy: filter,
  });
  return (
    <div className="mt-11">
      <div className="flex items-center justify-between">
        <h3 className="primary-text-gradient font-bold">
          {totalAnswers} {totalAnswers === 1 ? "Answer" : "Answers"}
        </h3>

        <Filter filters={AnswerFilters} />
      </div>

      <div>
        {result.answers.map((answer) => (
          <article key={answer._id} className="light-border-2 border-b py-10">
            <div className="flex items-center justify-between">
              <div className="mb-4 flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
                <Link
                  href={`/profile/${answer.author.clerkId}`}
                  className="flex flex-1 items-center gap-1">
                  <Image
                    src={answer.author.picture}
                    alt={answer.author.name}
                    width={48}
                    height={48}
                    className="h-[28px] w-[28px] rounded-full object-cover"
                  />
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <p className="body-semibold text-dark300_light700 ml-1 line-clamp-1">
                      {answer.author.name}
                    </p>
                  </div>
                </Link>

                <div className="flex justify-end">
                  <Votes
                    type="Answer"
                    itemId={JSON.stringify(answer._id)}
                    userId={JSON.stringify(userId)}
                    upvotes={answer.upvotes.length}
                    hasUpvoted={answer.upvotes.includes(userId)}
                    downVotes={answer.downvotes.length}
                    hasDownvoted={answer.downvotes.includes(userId)}
                  />
                </div>
              </div>
            </div>
            <div className="max-w-sm overflow-hidden whitespace-normal break-words max-xs:max-w-[300px] sm:max-w-sm md:max-w-lg lg:max-w-xl">
              <ParseHTML data={answer.content} />
            </div>
          </article>
        ))}
      </div>

      <div className="my-10 w-full">
        <Pagination pageNumber={page ? +page : 1} isNext={result.isNext} />
      </div>
    </div>
  );
};

export default AllAnswers;
