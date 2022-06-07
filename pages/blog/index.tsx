import Logo from "@/components/Logo"
import LogoWithText from "@/components/LogoWithText"
import classNames from "classnames"
import Link from "next/link"
import matter from 'gray-matter';
import fs from 'fs';
import { InferGetServerSidePropsType } from "next";
import BlogHeader from "@/components/BlogHeader";
import Head from "next/head";
import AppNav from "@/components/AppNav";


export default function Blog({
    posts,
}: InferGetServerSidePropsType<typeof getStaticProps>) {
    return (
        <>
            <Head>
                <title>README Blog</title>
                <meta property="title" content="README Blog" />
                <meta property="og:title" content="README Blog" />
                <meta property="og:type" content="blog" />
                <meta property="og:url" content={`https://readmefirst.co/blog/`} />
                <meta property="og:image" content={`https://readmefirst.co/library.jpg`} />
                <meta name="twitter:title" content="README Blog" />
                <meta name="description" content="Stay up-to-date with README" />
                <meta name="twitter:description" content="Stay up-to-date with README" />
                <meta name="twitter:image" content={`https://readmefirst.co/library.jpg`} />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>
            <AppNav logoText=" Blog" className="mb-0" authenticated={false}/>
            <BlogHeader title="Learn more about README" description={<span>Ready to get started? Create an account <Link href="/auth/register" passHref={true}><a className="text-white underline">here</a></Link>.</span>} imageUrl="/library.jpg" />
            <div className="pb-20 px-4 sm:px-6 lg:pt-8 lg:pb-28 lg:px-8">
                <div className="relative max-w-lg mx-auto divide-y-2 divide-gray-200 lg:max-w-7xl">

                    <div className="mt-12 grid gap-16 pt-12 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-12">
                        {posts.map(({ slug, frontmatter }) => (
                            <Link key={frontmatter.title} href={`/blog/${slug}`}>
                                <div className="flex hover:shadow-2xl transition-shadow cursor-pointer flex-col rounded-lg shadow-lg overflow-hidden">
                                    <div className="flex-shrink-0">
                                        <img className="h-48 w-full object-cover" src={frontmatter.imageUrl} alt="" />
                                    </div>
                                    <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                                        <div className="flex-1">
                                            <p className="text-xl font-semibold text-gray-900">{frontmatter.title}</p>
                                            <p className="mt-3 text-base text-gray-500">{frontmatter.description}</p>
                                        </div>
                                        <div className="mt-6 flex items-center">
                                            <div className="flex-shrink-0">
                                                <span className="sr-only">{frontmatter.author}</span>
                                                <Logo className="h-10 w-10 rounded-full" />
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-sm font-medium text-gray-900">
                                                    {frontmatter.author}
                                                </p>
                                                <div className="flex space-x-1 text-sm text-gray-500">
                                                    <time dateTime={frontmatter.createdAt}>{frontmatter.createdAtDisplay}</time>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                        <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                            <div className="flex-shrink-0">
                                <img className="h-48 w-full object-cover" src="/blogImages/ThankYou.jpg" alt="" />
                            </div>
                            <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                                <div className="flex-1">
                                    <p className="text-xl font-semibold text-gray-900">More coming soon</p>
                                    <p className="mt-3 text-base text-gray-500">Thanks for checking out our blog! Check back frequently for new updates!</p>
                                </div>
                                <div className="mt-6 flex items-center">
                                    <div className="flex-shrink-0">
                                        <span className="sr-only">Team README</span>
                                        <Logo className="h-10 w-10 rounded-full" />
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-gray-900">
                                            Team README
                                        </p>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export async function getStaticProps() {
    const files = fs.readdirSync('posts');

    const posts = files.map((fileName) => {
        const slug = fileName.replace('.md', '');
        const readFile = fs.readFileSync(`posts/${fileName}`, 'utf-8');
        const { data: frontmatter } = matter(readFile);
        return {
            slug,
            frontmatter,
        };
    }).sort((a, z) => a.frontmatter.createdAt > z.frontmatter.createdAt ? -1 : 1);

    return {
        props: {
            posts,
        },
    };
}