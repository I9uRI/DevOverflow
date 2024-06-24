import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface Props {
  _id: string;
  name: string;
  totalQuestion?: number;
  showCount?: boolean;
}

const RenderTag = ({ _id, name, totalQuestion, showCount }: Props) => {
  return (
    <Link href={`/tags/${_id}`} className="flex justify-between gap-2">
      <Badge className="text-light400_light500 subtle-medium background-light800_dark300 rounded-md border-none px-4 py-2 uppercase">
        {name}
      </Badge>

      {showCount && (
        <p className="small-medium text-dark500_light700">{totalQuestion}</p>
      )}
    </Link>
  );
};

export default RenderTag;
