import { sleep } from "utils/sleep";

const API_URL = process.env.WORDPRESS_API_URL;

async function fetchAPI(query = "", { variables }: Record<string, any> = {}) {
  const headers = { "Content-Type": "application/json" };

  if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
    headers["Authorization"] =
      `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`;
  }

  /**
   * Artificially delay GraphQL API executions
   * For some weird reasons, API requests fail when making a lot of requests
   * during static site generation. This is the workaround I was able to get things
   * working. More elegant solutions are of course always welcome.
   *
   * PS: If SSG every fails, increase the DELAY_IN_MS value
   */

  const DELAY_IN_MS = 10_000;
  await sleep(DELAY_IN_MS);
  // WPGraphQL Plugin must be enabled
  const res = await fetch(API_URL, {
    headers,
    method: "POST",
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }
  return json.data;
}

export async function getPreviewPost(id, idType = "DATABASE_ID") {
  const data = await fetchAPI(
    `
    query PreviewPost($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
        databaseId
        slug
        status
      }
    }`,
    {
      variables: { id, idType },
    },
  );
  return data.post;
}

export async function getAllPostsWithSlug() {
  const data = await fetchAPI(`
    {
      posts(first: 10000) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `);
  return data?.posts;
}

export async function getAllPostsForHome(preview) {
  const data = await fetchAPI(
    `
    query AllPosts {
      posts(first: 20, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            title
            excerpt
            slug
            date
            role
            date
            featuredImage {
              node {
                sourceUrl
              }
            }
            author {
              node {
                name
                firstName
                lastName
                avatar {
                  url
                }
              }
            }
          }
        }
      }
    }
  `,
    {
      variables: {
        onlyEnabled: !preview,
        preview,
      },
    },
  );

  return data?.posts;
}

export async function getPostAndMorePosts(slug, preview, previewData) {
  const postPreview = preview && previewData?.post;
  // The slug may be the id of an unpublished post
  const isId = Number.isInteger(Number(slug));
  const isSamePost = isId
    ? Number(slug) === postPreview.id
    : slug === postPreview.slug;
  const isDraft = isSamePost && postPreview?.status === "draft";
  const isRevision = isSamePost && postPreview?.status === "publish";
  const data = await fetchAPI(
    `
    fragment AuthorFields on User {
      name
      firstName
      lastName
      avatar {
        url
      }
    }
    fragment PostFields on Post {
      title
      excerpt
      slug
      date
      role
      featuredImage {
        node {
          sourceUrl
        }
      }
      author {
        node {
          ...AuthorFields
        }
      }
      categories {
        edges {
          node {
            name
          }
        }
      }
      tags {
        edges {
          node {
            name
          }
        }
      }
    }
    query PostBySlug($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
        ...PostFields
        content
        ${
          // Only some of the fields of a revision are considered as there are some inconsistencies
          isRevision
            ? `
        revisions(first: 1, where: { orderby: { field: MODIFIED, order: DESC } }) {
          edges {
            node {
              title
              excerpt
              content
              author {
                node {
                  ...AuthorFields
                }
              }
            }
          }
        }
        `
            : ""
        }
      }
      posts(first: 10, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            ...PostFields
          }
        }
      }
    }
  `,
    {
      variables: {
        id: isDraft ? postPreview.id : slug,
        idType: isDraft ? "DATABASE_ID" : "SLUG",
      },
    },
  );

  // Draft posts may not have an slug
  if (isDraft) data.post.slug = postPreview.id;
  // Apply a revision (changes in a published post)
  if (isRevision && data.post.revisions) {
    const revision = data.post.revisions.edges[0]?.node;

    if (revision) Object.assign(data.post, revision);
    delete data.post.revisions;
  }

  // Filter out the main post
  const totalPosts = data.posts.edges;

  const NO_OF_ITEMS = 3;
  const indexOfPost = totalPosts.findIndex(({ node }) => node.slug === slug);
  const postsWithoutCurrentPost = totalPosts.filter(
    ({ node }) => node.slug !== slug,
  );

  const relatedPosts = postsWithoutCurrentPost.filter((_, index) => {
    /**
     * The algorithm for this should be improved using something like categories but because we don't have the numbers yet
     * This approach would work just fine.
     */
    if (postsWithoutCurrentPost.length < NO_OF_ITEMS) {
      return true;
    } else if (indexOfPost == 0) {
      return index < NO_OF_ITEMS;
    } else if (indexOfPost > postsWithoutCurrentPost.length - NO_OF_ITEMS) {
      return index >= postsWithoutCurrentPost.length - NO_OF_ITEMS;
    } else {
      return index >= indexOfPost - 1 && index < indexOfPost + NO_OF_ITEMS - 1;
    }
  });

  data.posts.edges = relatedPosts;

  return data;
}

export async function getAllCategory() {
  const data = await fetchAPI(`
query AllCategory {
  categories(first: 50) {
    nodes{
      slug
      description
      name
    }

  }
    resources(first:1000) {
      nodes{
        slug
      }
    }
  }
`);
  return data;
}

export async function getAllTeamMembers() {
  const data = await fetchAPI(`
  query AllTeamMembers {
    teamMembers(first:30){
      nodes {
        role
        title
      }
    }
  }
  `);

  return data;
}

export async function getAllResources() {
  const data = await fetchAPI(`
  query AllResources{
    resources(first: 100000) {
          nodes {
            title
            url
            categories {
              nodes {
                name
              }
            }
            featuredImage {
              node {
                sourceUrl
              }
            }
            resourceTypes {
              nodes {
                name
              }
            }
            resourcePayments {
              nodes {
                name
              }
            }
          }
        }
  }
  `);

  return data;
}
