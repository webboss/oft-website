import PostPreview from "./post-preview";
import { ArticlePreview } from "./article/preview/article-preview";

interface MoreStoriesProps {
  posts: {
    node: {
      slug: string;
      title: string;
      featuredImage: {
        node: {
          sourceUrl: string;
        };
      };
    };
  }[];
}

export default function MoreStories({ posts }: MoreStoriesProps) {
  return (
    <section>
      <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
        More Stories
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
        {posts.map(({ node }) => (
          <ArticlePreview
            key={node.slug}
            title={node.title}
            featuredImage={node.featuredImage}
            role={node.slug}
            slug={node.slug}
          />
          // <PostPreview
          //   key={node.slug}
          //   title={node.title}
          //   coverImage={node.featuredImage}
          //   date={node.date}
          //   author={node.author}
          //   slug={node.slug}
          //   excerpt={node.excerpt}
          // />
        ))}
      </div>
    </section>
  );
}
