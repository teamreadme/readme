import Link from 'next/link';
import React from 'react';
import LogoWithText from './LogoWithText';

interface BlogHeaderProps {
    imageUrl: string;
    title?: string;
    description?: string | React.ReactNode;
    author?: string;
}

export default function BlogHeader(props: BlogHeaderProps) {
    return <div className="relative pt-64 pb-10 shadow-xl overflow-hidden">
        <img
            className="absolute inset-0 h-full w-full object-cover"
            src={props.imageUrl}
            alt=""
        />
        <div className="absolute inset-0 bg-purple-500 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-purple-600 via-purple-600 opacity-90" />
        <div className="absolute top-12 sm:top-8 left-8 text-white items-end">
            <Link href="/" passHref={true}>
                <a>
                    <LogoWithText className="cursor-pointer" noLogoMargin={true} extraText="Blog" color="text-white" />
                </a>
            </Link>
        </div>
        <div className="absolute top-4 sm:top-8 right-8 text-white items-end space-x-4">
            <Link passHref={true} href="/"><a className="rounded-md text-base font-medium text-white hover:text-gray-200 ">Home</a></Link>
            <Link passHref={true} href="/auth/register"><a className="rounded-md text-base font-medium text-white hover:text-gray-200">Register</a></Link>
            <Link passHref={true} href="/auth/login"><a className="rounded-md text-base font-medium text-white hover:text-gray-200">Log in</a></Link>
        </div>
        <div className="relative px-8">
            <div className="relative text-lg font-medium text-white md:flex-grow">
                {props.title && <h1 className="relative text-4xl font-semibold">
                    {props.title}
                </h1>}
                <footer className="mt-4">
                    {props.description && <p className="text-base font-semibold text-purple-200">{props.description}</p>}
                    {props.author && <p className="text-base font-semibold text-purple-200"> - {props.author}</p>}
                </footer>
            </div>
        </div>
    </div>
}