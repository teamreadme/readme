import Link from 'next/link';
import React from 'react';
import Logo from './Logo';
import LogoWithText from './LogoWithText';
const footer = {
    solutions: [
        { name: 'Marketing', href: '#' },
        { name: 'Analytics', href: '#' },
        { name: 'Commerce', href: '#' },
        { name: 'Insights', href: '#' },
    ],
    support: [
        // { name: 'Pricing', href: '/pricing' },
        { name: 'Documentation', href: '/docs' },
        { name: 'Guides', href: '/docs' },
    ],
    company: [
        { name: 'About', href: '/docs' },
        { name: 'Github', href: 'https://github.com/teamreadme/readme' },
        { name: 'Blog', href: '/blog' },
    ],
    legal: [
        { name: 'Privacy', href: '/PrivacyPolicy.pdf' },
        { name: 'Terms', href: '/TermsOfService.pdf' },
    ],
    social: [
        {
            name: 'LinkedIn',
            href: 'https://www.linkedin.com/company/readmefirst/',
            icon: (props: any) => (
                <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
            ),
        },
        {
            name: 'Indie Hackers',
            href: 'https://www.indiehackers.com/product/readme',
            icon: (props: any) => (
                <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                    <path d="M4 6H7V18H4V6Z" />
                    <path d="M10 6H13V10.5H17V6H20V18H17V13.5H13V18H10V6Z" />
                </svg>
            ),
        },
        {
            name: 'Twitter',
            href: 'https://twitter.com/readmefirst',
            icon: (props: any) => (
                <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
            ),
        },
        {
            name: 'GitHub',
            href: 'https://github.com/jacobreynolds',
            icon: (props: any) => (
                <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                    <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"
                    />
                </svg>
            ),
        }
    ],
}

export default function Footer() {
    return <footer className="bg-gray-50 z-20" aria-labelledby="footer-heading">
        <h2 id="footer-heading" className="sr-only">
            Footer
        </h2>
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
            <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                <div className="space-y-8 xl:col-span-1 flex items-start flex-col">
                    <LogoWithText noLogoMargin={true} />
                    <p className="text-gray-500 text-base">
                        Bringing the workplace into this century.
                    </p>
                    <div className="flex space-x-6">
                        {footer.social.map((link) => (
                            <a key={link.name} target="_blank" rel="noopener noreferrer" href={link.href} className="text-gray-400 hover:text-gray-500">
                                <span className="sr-only">{link.name}</span>
                                <link.icon className="h-6 w-6" aria-hidden="true" />
                            </a>
                        ))}
                    </div>
                </div>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 xl:mt-0 xl:col-span-2">
                    <div className="md:grid md:grid-cols-2 md:gap-8">
                        <div>
                            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Support</h3>
                            <ul role="list" className="mt-4 space-y-4">
                                {footer.support.map((link) => (
                                    <li key={link.name}>
                                        <Link passHref={true} href={link.href}>
                                            <a className="text-base text-gray-500 hover:text-gray-900">
                                                {link.name}
                                            </a>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Company</h3>
                        <ul role="list" className="mt-4 space-y-4">
                            {footer.company.map((link) => (
                                <li key={link.name}>
                                    <Link passHref={true} href={link.href}>
                                        <a className="text-base text-gray-500 hover:text-gray-900">
                                            {link.name}
                                        </a>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Legal</h3>
                        <ul role="list" className="mt-4 space-y-4">
                            {footer.legal.map((link) => (
                                <li key={link.name}>
                                    <a href={link.href} className="text-base text-gray-500 hover:text-gray-900">
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="mt-12 border-t border-gray-200 pt-8">
                <p className="text-base text-gray-400 xl:text-center">&copy; 2022 README, Inc. All rights reserved.</p>
            </div>
        </div>
    </footer>
}