# Introduction

This is other faces of tech main website built with NextJS for static site generation and WordPress as CMS. The website is deployed to vercel and DNS management is handled with Cloudflare.

# Important Stuffs

- The repo was bootstrapped with NextJS/WordPress template. You should read up on how that works [here]() and also checkout the template repo [here]()
- Try to get familiar with data fetching strategies in NextJS with `getStaticProps`, `getServerProps`, and `getStaticPaths`
- In `lib/api`, there's a function called `fetchAPI` which implements a graphql wrapper, kindly take a minute to look through the method and understand what it does.

# Publishing a new story/resource

- Upload the story or resource to WordPress
- Redeploy the last product deployment on vercel

## TODOs

- [ ] Convert all `.js/.jsx` files to `.ts/.tsx` files
- [ ] Look for a way to ensure that results from API have types
- [ ] Move `envs` to an object in the `config` directory
- [ ] Fix issues/errors with linting
- [ ] Break the `stories/[slug].tsx` page into components that move into the `templates` directory
- [ ] Create a page for all stories (collaborate w/Design team on this)
- [ ] Create a page for all resources according to their categories (there's an implementation of this on the old `gatsby` repo, we can revisit this)
