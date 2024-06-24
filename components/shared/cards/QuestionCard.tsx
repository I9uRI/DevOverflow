import Link from "next/link";
import RenderTag from "../SideBar/RenderTag";
import Metric from "../Metric";
import { formatLargeNumber, getTimeStamp } from "@/lib/utils";
import { SignedIn } from "@clerk/nextjs";
import EditDeleteAction from "../EditDeleteAction";

interface QuestionCardProps {
  _id: string;
  clerkId?: string | null;
  title: string;
  tags: {
    _id: string;
    name: string;
  }[];
  author: {
    _id: string;
    name: string;
    picture: string;
    clerkId: string;
  };
  upvotes: string[];
  views: number;
  answers: Array<object>;
  createdAt: Date;
}

const QuestionCard = ({
  _id,
  clerkId,
  title,
  tags,
  author,
  upvotes,
  views,
  answers,
  createdAt,
}: QuestionCardProps) => {
  const showActionButtons = clerkId && clerkId === author.clerkId;

  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:p-11">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimeStamp(createdAt)}
          </span>
          <Link href={`/question/${_id}`}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
              {title}
            </h3>
          </Link>
        </div>

        <SignedIn>
          {showActionButtons && (
            <EditDeleteAction type="Question" itemId={JSON.stringify(_id)} />
          )}
        </SignedIn>
      </div>

      <div className="mt-3.5 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
        ))}
      </div>

      <div className="mt-6 flex w-full flex-col flex-wrap items-center gap-3.5">
        <div className="flex w-full items-center justify-start">
          <Metric
            imgUrl={author.picture}
            alt="user"
            value={author.name}
            title={` - asked ${getTimeStamp(createdAt)}`}
            href={`/profile/${author.clerkId}`}
            isAuthor
            textStyles="body-medium text-dark400_light700"
          />
        </div>
        <div className="flex w-full items-center justify-between border-t border-gray-200 pt-3 dark:border-dark-400">
          <Metric
            imgUrl="/assets/icons/like.svg"
            alt="up votes"
            value={formatLargeNumber(upvotes.length)}
            title={upvotes.length === 1 ? " Vote" : " Votes"}
            textStyles="small-medium text-dark400_light800"
          />
          <Metric
            imgUrl="/assets/icons/message.svg"
            alt="message"
            value={formatLargeNumber(answers.length)}
            title={answers.length === 1 ? " Answer" : " Answers"}
            textStyles="small-medium text-dark400_light800"
          />
          <Metric
            imgUrl="/assets/icons/eye.svg"
            alt="views"
            value={formatLargeNumber(views)}
            title=" Views"
            textStyles="small-medium text-dark400_light800"
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
