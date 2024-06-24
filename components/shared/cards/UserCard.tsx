import { getUserInfo } from "@/lib/actions/user.action";
import Image from "next/image";
import Link from "next/link";

interface Props {
  user: {
    _id: string;
    clerkId: string;
    picture: string;
    name: string;
    username: string;
  };
}

const UserCard = async ({ user }: Props) => {
  const userInfo = await getUserInfo({
    userId: user.clerkId,
  });

  return (
    <Link
      href={`/profile/${user.clerkId}`}
      className="w-full rounded-2xl shadow shadow-gray-300 dark:shadow-gray-800 max-xs:min-w-full xs:w-[260px]">
      <article className="background-light700_dark300 light-border flex w-full flex-col items-center justify-center rounded-2xl border p-8">
        <Image
          src={user.picture}
          alt={user.username}
          width={190}
          height={190}
          className="h-[86px] w-[86px] rounded-full"
        />

        <div className="mt-5 text-center">
          <h3 className="h3-bold text-dark400_light900 line-clamp-1">
            {user.name}
          </h3>
          <p className="body-regular text-dark500_light500 mt-2">
            @{user.username}
          </p>
        </div>

        <div className="paragraph-medium text-dark100_light900 mt-5">
          Stats ^
          <span className="paragraph-semibold ml-1 font-spaceGrotesk text-primary-500">
            {userInfo.user.reputation}
          </span>
        </div>
      </article>
    </Link>
  );
};

export default UserCard;
