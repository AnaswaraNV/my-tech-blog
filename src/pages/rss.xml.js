import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('blog', ({ data }) => !data.draft);

  return rss({
    title: 'Anaswara NV — Tech Blog',
    description: 'Articles on AI, software development, system design, and engineering ideas.',
    site: context.site,
    items: posts
      .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
      .map((post) => ({
        title: post.data.title,
        pubDate: post.data.date,
        description: post.data.description,
        categories: post.data.tags,
        link: `/blog/${post.id.replace(/\.(mdx?|md)$/, '')}/`,
      })),
    customData: `<language>en-us</language>`,
  });
}
