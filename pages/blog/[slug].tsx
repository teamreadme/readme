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


export default function BlogApp({
    frontmatter, content,
}: InferGetStaticPropsType<typeof getStaticProps> & { children?: React.ReactNode }) {
    return <>
        <div className="relative pt-60 pb-10 shadow-xl overflow-hidden">
            <img
                className="absolute inset-0 h-full w-full object-cover"
                src={frontmatter.imageUrl}
                alt=""
            />
            <div className="absolute inset-0 bg-purple-500 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-600 via-purple-600 opacity-90" />
            <div className="absolute top-8 left-8 text-white items-end">
                <Link href="/blog" passHref={true}>
                    <a>
                        <LogoWithText className="cursor-pointer" noLogoMargin={true} extraText="Blog" color="text-white" />
                    </a>
                </Link>
            </div>
            <div className="absolute top-8 right-8 text-white items-end space-x-4">
                <Link passHref={true} href="/"><a className="text-white text-lg">Home</a></Link>
                <Link passHref={true} href="/auth/login"><a className="text-white text-lg">Login</a></Link>
            </div>
            <div className="relative px-8">
                <div className="relative text-lg font-medium text-white md:flex-grow">
                    <h1 className="relative text-4xl font-semibold">
                        {frontmatter.title}
                    </h1>
                    <footer className="mt-4">
                        <p className="text-base font-semibold text-purple-200">{frontmatter.description}</p>
                        <p className="text-base font-semibold text-purple-200"> - {frontmatter.author}</p>
                    </footer>

                </div>
            </div>
        </div>
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
        },
    };
}