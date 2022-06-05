import { Popover } from '@headlessui/react';
import { MenuIcon } from '@heroicons/react/outline';
import { XIcon } from '@primer/octicons-react';
import classNames from 'classnames';
import Link from 'next/link';
import React, { useMemo } from 'react';
import Logo from './Logo';
import LogoWithText from './LogoWithText';

interface AppNavProps {
    authenticated: boolean;
}

const authNavigation = [
    { name: 'Home', href: '/me' },
    { name: 'Blog', href: '/blog' },
    { name: 'Docs', href: '/docs', target: "_blank" },
    { name: 'Explore', href: '/explore' }
]

const unauthNavigation = [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Docs', href: '/docs', target: "_blank" },
    { name: 'Github', href: 'https://github.com/teamreadme/readme', target: "_blank" },
    { name: 'Login', href: '/auth/login', className: '!text-purple-600 hover:!text-purple-700' }
];

export default function AppNav(props: AppNavProps) {
    const navigation: { name: string, href: string, className?: string, target?: string }[] = useMemo(() => props.authenticated ? authNavigation : unauthNavigation, [props.authenticated]);

    return <Popover>
        <div className="relative py-6 mb-4 px-4 sm:px-6 lg:px-8 border-b-[1px] border-gray-200">
            <nav className="relative flex w-full items-center justify-between sm:h-10" aria-label="Global">
                <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
                    <div className="flex items-center justify-between w-full md:w-auto">
                        <span className="sr-only">README</span>
                        <LogoWithText
                            noLogoMargin={true}
                        />
                        <div className="-mr-2 flex items-center md:hidden">
                            <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500">
                                <span className="sr-only">Open main menu</span>
                                <MenuIcon className="h-6 w-6" aria-hidden="true" />
                            </Popover.Button>
                        </div>
                    </div>
                </div>
                <div className="hidden md:block md:ml-10 md:pr-4 md:space-x-8">
                    {navigation.map((item) => (
                        <Link key={item.name} href={item.href} passHref={true}>
                            <a target={item.target} className={classNames("font-medium text-gray-500 hover:text-gray-900", item.className)}>
                                {item.name}
                            </a>
                        </Link>
                    ))}
                </div>
            </nav>
        </div>
        <Popover.Panel
            focus
            className="absolute z-[200] top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
        >
            <div className="rounded-lg shadow-md bg-gray-100 ring-1 ring-black ring-opacity-5 overflow-hidden">
                <div className="px-5 pt-4 flex items-center justify-between">
                    <div>
                        <LogoWithText noLogoMargin={true} className="h-8 w-auto"></LogoWithText>
                    </div>
                    <div className="-mr-2">
                        <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500">
                            <span className="sr-only">Close main menu</span>
                            <XIcon className="h-6 w-6" aria-hidden="true" />
                        </Popover.Button>
                    </div>
                </div>
                <div className="px-2 pt-2 pb-3 space-y-1">
                    {navigation.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                        >
                            {item.name}
                        </a>
                    ))}
                </div>
            </div>
        </Popover.Panel>
    </Popover>
}