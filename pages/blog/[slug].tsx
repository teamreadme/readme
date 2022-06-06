import React from 'react';
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import fs from 'fs';
import matter from 'gray-matter';
import md from 'markdown-it';
import { InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import LogoWithText from '@/components/LogoWithText';
import Footer from '@/components/Footer';
import BlogHeader from '@/components/BlogHeader';


export default function BlogApp({
    frontmatter, content, slug
}: InferGetStaticPropsType<typeof getStaticProps> & { children?: React.ReactNode }) {
    return <>
        <Head>
            <title>{frontmatter.title} | README Blog</title>
            <meta key="title" property="title" content={`${frontmatter.title} | README Blog`} />
            <meta key="og:title" property="og:title" content={`${frontmatter.title} | README Blog`} />
            <meta key="og:type" property="og:type" content="blog" />
            <meta key="og:url" property="og:url" content={`https://readmefirst.co/blog/${slug}`} />
            <meta key="og:image" property="og:image" content={`https://readmefirst.co${frontmatter.imageUrl}`} />
            <meta key="twitter:title" name="twitter:title" content={`${frontmatter.title} | README Blog`} />
            <meta key="description" name="description" content={frontmatter.description} />
            <meta key="twitter:description" name="twitter:description" content={frontmatter.description} />
            <meta key="twitter:image" name="twitter:image" content={`https://readmefirst.co${frontmatter.imageUrl}`} />
            <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
        </Head>
        <BlogHeader
            title={frontmatter.title}
            description={frontmatter.description}
            author={frontmatter.author}
            imageUrl={frontmatter.imageUrl} />
        <div className='prose prose-slate lg:prose-xl max-w-prose mt-4 mx-auto border-gray-200 border-0 lg:border-2 p-4 rounded-md mb-12'>
            <div dangerouslySetInnerHTML={{ __html: md({ html: true }).render(content) }} />
        </div>
        <Footer />
    </>
}

export async function getStaticPaths() {
    const files = fs.readdirSync('posts');
    const paths = files.map((fileName) => ({
        params: {
            slug: fileName.replace('.md', ''),
        },
    }));
    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params: { slug } }: any) {
    const fileName = fs.readFileSync(`posts/${slug}.md`, 'utf-8');
    const { data: frontmatter, content } = matter(fileName);
    return {
        props: {
            frontmatter,
            content,
            slug
        },
    };
}