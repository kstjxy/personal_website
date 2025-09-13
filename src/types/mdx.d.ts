declare module '*.mdx' {
  let MDXComponent: (props: any) => JSX.Element;
  export default MDXComponent;
  export const frontmatter: {
    title: string;
    slug: string;
    date: string;
    role: string[];
    cover?: string;
    summary: string;
    tags: string[];
    highlight: boolean;
    sections?: { id: string; label: string }[];
    links?: { label: string; href: string }[];
  };
  export const cover: string | undefined;
}
