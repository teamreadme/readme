/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import { prisma } from "@/utils/prisma";
import { Popover, Transition } from '@headlessui/react'
import { GlobeAltIcon, LightningBoltIcon, MailIcon, MenuIcon, ScaleIcon, XIcon } from '@heroicons/react/outline'
import Logo from '@/components/Logo'
import ReadMeTitle from '@/components/ReadMeTitle'
import Link from 'next/link'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'

const features = [
    {
        name: 'Learn about coworkers',
        description: 'In a successful company with new coworkers starting every week, it\'s hard to keep up. Thankfully they have a README 🙌',
        icon: GlobeAltIcon,
    },
    {
        name: 'Increase accessibility',
        description:
            'Navigating the social mindfield that is life can be difficult for many. Help make sure everyone\'s working with the same information.',
        icon: ScaleIcon,
    },
    {
        name: 'Get up to speed, fast',
        description:
            'Meeting with your CEO for the first time? I\'m sure her README will give you the confidence you need to ace that meeting.',
        icon: LightningBoltIcon,
    },
    {
        name: 'Optimize communication',
        description:
            'Let others now your best working styles, paths for communication, and preferred tones when working with you.',
        icon: MailIcon,
    },
]

const navigation: { main: { name: string, href: string }[], social: any[] } = {
    main: [
    ],
    social: [
        {
            name: 'Twitter',
            href: 'https://twitter.com/teamreadme',
            icon: (props: any) => (
                <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
            ),
        },
    ],
}

export default function Home({
    readMe,
}: InferGetServerSidePropsType<typeof getServerSideProps> & { children?: React.ReactNode }) {
    return (
        <>
            <div className="relative lg:flex bg-gray-100 overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="relative z-10 pb-8 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
                        <Popover>
                            <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
                                <nav className="relative flex items-center justify-between sm:h-10 lg:justify-start" aria-label="Global">
                                    <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
                                        <div className="flex items-center justify-between w-full md:w-auto">
                                            <a href="#">
                                                <span className="sr-only">README</span>
                                                <Logo
                                                    className="h-8 w-auto sm:h-10" />
                                            </a>
                                            <div className="-mr-2 flex items-center md:hidden">
                                                <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500">
                                                    <span className="sr-only">Open main menu</span>
                                                    <MenuIcon className="h-6 w-6" aria-hidden="true" />
                                                </Popover.Button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="hidden md:block md:ml-10 md:pr-4 md:space-x-8">
                                        {navigation.main.map((item) => (
                                            <a key={item.name} href={item.href} className="font-medium text-gray-500 hover:text-gray-900">
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>
                                </nav>
                            </div>
                            <Popover.Panel
                                focus
                                className="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
                            >
                                <div className="rounded-lg shadow-md bg-gray-100 ring-1 ring-black ring-opacity-5 overflow-hidden">
                                    <div className="px-5 pt-4 flex items-center justify-between">
                                        <div>
                                            <Logo className="h-8 w-auto"></Logo>
                                        </div>
                                        <div className="-mr-2">
                                            <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500">
                                                <span className="sr-only">Close main menu</span>
                                                <XIcon className="h-6 w-6" aria-hidden="true" />
                                            </Popover.Button>
                                        </div>
                                    </div>
                                    <div className="px-2 pt-2 pb-3 space-y-1">
                                        {navigation.main.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                                            >
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>
                                    <a
                                        href="#"
                                        className="block w-full px-5 py-3 text-center font-medium text-purple-600 bg-gray-50 hover:bg-gray-100"
                                    >
                                        Log in
                                    </a>
                                </div>
                            </Popover.Panel>
                        </Popover>

                        <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                            <div className="sm:text-center lg:text-left">
                                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                                    <span className="block xl:inline">Encyclopedia</span>{' '}
                                    <span className="block text-purple-600 xl:inline">you</span>
                                </h1>
                                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                                    Increase self-awareness and empathy by documenting the latest version of you. Introduce yourself to the world, learn about others, and make every day interactions more enjoyable.
                                </p>
                                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                                    <div className="rounded-md shadow">
                                        <Link
                                            href="/auth/register"
                                        >
                                            <button
                                                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 md:py-4 md:text-lg md:px-10"
                                            >Get started</button>
                                        </Link>
                                    </div>
                                    <div className="mt-3 sm:mt-0 sm:ml-3">
                                        <Link
                                            href="/auth/login"
                                        >
                                            <button
                                                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-purple-700 bg-purple-100 hover:bg-purple-200 md:py-4 md:text-lg md:px-10"
                                            >Log in</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
                <div className="hidden lg:flex lg:w-1/2 w-full mt-10 mr-10 flex-col justify-center items-center">
                    <div>
                        <ReadMeTitle name={"Jake Reynolds"} isUser={false} />
                        <div className="bg-white prose overflow-y-auto mt-4 p-4 h-[500px] rounded-md"><div dangerouslySetInnerHTML={{ __html: readMe?.text ?? '' }}></div></div>
                        <p className="text-gray-600 mt-2 text-sm italic self-start">The above snippets come from an <Link href="/jreynoldsdev">actual README</Link>!</p>
                    </div>
                </div>
            </div>
            <div id="features" className="bg-gray-50 overflow-hidden mt-8">
                <div className="relative max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                    <div className="relative lg:grid lg:grid-cols-3 lg:gap-x-8">
                        <div className="lg:col-span-1">
                            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                                A better way to communicate.
                            </h2>
                        </div>
                        <dl className="mt-10 space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10 lg:mt-0 lg:col-span-2">
                            {features.map((feature) => (
                                <div key={feature.name}>
                                    <dt>
                                        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white">
                                            <feature.icon className="h-6 w-6" aria-hidden="true" />
                                        </div>
                                        <p className="mt-5 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                                    </dt>
                                    <dd className="mt-2 text-base text-gray-500">{feature.description}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>
            <div className="relative bg-gray-100 py-16 sm:py-24">
                <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-24 lg:items-start">
                    <div className="relative sm:py-16 lg:py-0">
                        <div aria-hidden="true" className="hidden sm:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-screen">
                            <div className="absolute inset-y-0 right-1/2 w-full bg-gray-50 rounded-r-3xl lg:right-72" />
                            <svg
                                className="absolute top-8 left-1/2 -ml-3 lg:-right-8 lg:left-auto lg:top-12"
                                width={404}
                                height={392}
                                fill="none"
                                viewBox="0 0 404 392"
                            >
                                <defs>
                                    <pattern
                                        id="02f20b47-fd69-4224-a62a-4c9de5c763f7"
                                        x={0}
                                        y={0}
                                        width={20}
                                        height={20}
                                        patternUnits="userSpaceOnUse"
                                    >
                                        <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
                                    </pattern>
                                </defs>
                                <rect width={404} height={392} fill="url(#02f20b47-fd69-4224-a62a-4c9de5c763f7)" />
                            </svg>
                        </div>
                        <div className="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0 lg:max-w-none lg:py-20">
                            {/* Testimonial card*/}
                            <div className="relative pt-64 pb-10 rounded-2xl shadow-xl overflow-hidden">
                                <img
                                    className="absolute inset-0 h-full w-full object-cover"
                                    src="/skyline.jpg"
                                    alt=""
                                />
                                <div className="absolute inset-0 bg-purple-500 mix-blend-multiply" />
                                <div className="absolute inset-0 bg-gradient-to-t from-purple-600 via-purple-600 opacity-90" />
                                <div className="relative px-8">
                                    <div className="flex text-white items-end">
                                        <Logo className="h-12 text-white" /> <span className="text-2xl font-semibold ml-2">README</span>
                                    </div>
                                    <blockquote className="mt-8">
                                        <div className="relative text-lg font-medium text-white md:flex-grow">
                                            <svg
                                                className="absolute top-[-10px] left-0 transform -translate-x-3 -translate-y-2 h-8 w-8 text-purple-400"
                                                fill="currentColor"
                                                viewBox="0 0 32 32"
                                                aria-hidden="true"
                                            >
                                                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                                            </svg>
                                            <p className="relative">
                                                README allows me to give everyone in my life an up-to-date index of me and who I am working to become.
                                            </p>
                                        </div>

                                        <footer className="mt-4">
                                            <p className="text-base font-semibold text-purple-200">Jake Reynolds, Founder at README</p>
                                        </footer>
                                    </blockquote>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0">
                        {/* Content area */}
                        <div className="pt-12 sm:pt-16 lg:pt-20">
                            <h2 className="text-3xl text-gray-900 font-extrabold tracking-tight sm:text-4xl">
                                Let the world know who you are
                            </h2>
                            <div className="mt-6 text-gray-500 space-y-6">
                                <p className="text-lg">
                                    Outside of dating profiles and twitter bios, how much opportunity do you really have to communicate who you are online?
                                </p>
                                <p className="text-base leading-7">
                                    Since the mid-1970s README files have been included alongside software to provide an overview and describe the purpose of a piece of software.
                                    Shouldn&apos;t humans come with the same documentation? README acts as a living, breathing documentation of yourself:
                                </p>
                                <ul role="list" className="list-disc ml-4 md:ml-0">
                                    <li>Introduce your preferred communication methods.</li>
                                    <li>Let peers know flaws you&apos;re working on fixing.</li>
                                    <li>Learn about how people truly see themselves.</li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className="bg-purple-50">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-24 lg:px-8 lg:flex lg:items-center lg:justify-between">
                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
                        <span className="block">Ready to dive in?</span>
                        <span className="block text-purple-600">Register for free today.</span>
                    </h2>
                    <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
                        <div className="inline-flex rounded-md shadow">
                            <Link href="/auth/register">
                                <button
                                    className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
                                >Get started</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="bg-white">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
                    <div className="flex justify-center space-x-6 md:order-2">
                        {navigation.social.map((item) => (
                            <a target="_blank" rel="noopener noreferrer" key={item.name} href={item.href} className="text-gray-400 hover:text-gray-500">
                                <span className="sr-only">{item.name}</span>
                                <item.icon className="h-6 w-6" aria-hidden="true" />
                            </a>
                        ))}
                    </div>
                    <div className="mt-8 md:mt-0 md:order-1">
                        <p className="text-center text-base text-gray-400">&copy; 2022 README, Inc. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </>
    )
}


/**
 * Load a public, unauthenticated readme profile
 * @param context
 * @returns
 */
export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const readMe = await prisma.readMe.findFirst({
        where: { user: { username: 'jreynoldsdev' } },
        include: { user: { select: { firstName: true, lastName: true, username: true } } },
    });
    return { props: { readMe } };
};
