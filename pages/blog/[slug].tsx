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
            <meta property="title" content={`${frontmatter.title} | README Blog`} />
            <meta property="og:title" content={`${frontmatter.title} | README Blog`} />
            <meta property="og:type" content="blog" />
            <meta property="og:url" content={`https://readmefirst.co/blog/${slug}`} />
            <meta property="og:image" content={`https://readmefirst.co${frontmatter.imageUrl}`} />
            <meta name="twitter:title" content={`${frontmatter.title} | README Blog`} />
            <meta name="description" content={frontmatter.description} />
            <meta name="twitter:description" content={frontmatter.description} />
            <meta name="twitter:image" content={`https://readmefirst.co${frontmatter.imageUrl}`} />
            <meta name="twitter:card" content="summary_large_image" />
        </Head>
        <BlogHeader
            title={frontmatter.title}
            description={frontmatter.description}
            author={frontmatter.author}
            imageUrl={frontmatter.imageUrl} />
        <div className='prose prose-slate lg:prose-xl max-w-prose mt-4 mx-auto border-gray-200 border-2 p-4 rounded-md mb-12'>
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