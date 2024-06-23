import Image from "next/image";

interface AvatarProps {
  author: {
    node: {
      firstName?: string;
      lastName?: string;
      name?: string;
      avatar: {
        url: string;
      };
    };
  };
}

export default function Avatar({ author }: AvatarProps) {
  const doesAuthorHaveFullName =
    author?.node?.firstName && author?.node?.lastName;
  const name = doesAuthorHaveFullName
    ? `${author.node.firstName} ${author.node.lastName}`
    : author.node.name || null;

  return (
    <div className="flex items-center">
      <div className="w-12 h-12 relative mr-4">
        <Image
          src={author.node.avatar.url}
          layout="fill"
          className="rounded-full"
          alt={name}
        />
      </div>
      <div className="text-xl font-bold">{name}</div>
    </div>
  );
}
