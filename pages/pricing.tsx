import { prisma } from "@/utils/prisma";

import {
  BookmarkAltIcon,
  CalendarIcon,
  ChartBarIcon,
  CheckIcon,
  CursorClickIcon,
  PhoneIcon,
  PlayIcon,
  RefreshIcon,
  ShieldCheckIcon,
  SupportIcon,
  ViewGridIcon,
} from '@heroicons/react/outline'
import classNames from 'classnames'
import Footer from '@/components/Footer'
import AppNav from '@/components/AppNav'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { getSession } from 'next-auth/react'
import Layout from "@/components/Layout";

const header = {
  solutions: [
    {
      name: 'Analytics',
      description: 'Get a better understanding of where your traffic is coming from.',
      href: '#',
      icon: ChartBarIcon,
    },
    {
      name: 'Engagement',
      description: 'Speak directly to your customers in a more meaningful way.',
      href: '#',
      icon: CursorClickIcon,
    },
    {
      name: 'Security',
      description: "Your customers' data will be safe and secure.",
      href: '#',
      icon: ShieldCheckIcon,
    },
    {
      name: 'Integrations',
      description: "Connect with third-party tools that you're already using.",
      href: '#',
      icon: ViewGridIcon,
    },
    {
      name: 'Automations',
      description: 'Build strategic funnels that will drive your customers to convert',
      href: '#',
      icon: RefreshIcon,
    },
  ],
  callsToAction: [
    { name: 'Watch Demo', href: '#', icon: PlayIcon },
    { name: 'Contact Sales', href: '#', icon: PhoneIcon },
  ],
  resources: [
    {
      name: 'Help Center',
      description: 'Get all of your questions answered in our forums or contact support.',
      href: '#',
      icon: SupportIcon,
    },
    {
      name: 'Guides',
      description: 'Learn how to maximize our platform to get the most out of it.',
      href: '#',
      icon: BookmarkAltIcon,
    },
    {
      name: 'Events',
      description: 'See what meet-ups and other events we might be planning near you.',
      href: '#',
      icon: CalendarIcon,
    },
    {
      name: 'Security',
      description: 'Understand how we take your privacy seriously.',
      href: '#',
      icon: ShieldCheckIcon,
    },
  ],
  recentPosts: [
    { name: 'Boost your conversion rate', href: '#' },
    { name: 'How to use search engine optimization to drive traffic to your site', href: '#' },
    { name: 'Improve your customer experience', href: '#' },
  ],
}
const pricing = {
  tiers: [
    {
      title: 'Self-hosted',
      price: 0,
      frequency: '/month',
      description: 'Host it yourself, same great READMEs.',
      features: ['Unlimited READMEs', 'Unlimited teams'],
      cta: 'Get Started',
      ctaHref: 'https://github.com/teamreadme/readme',
      mostPopular: false,
      comingSoon: false
    },
    {
      title: 'Personal',
      price: 0,
      frequency: '/month',
      description: 'Document yourself for free, forever.',
      features: [
        'Personal README',
        'Access to the README community',
        'Github integration',
      ],
      cta: 'Get Started',
      ctaHref: "/auth/register",
      mostPopular: true,
      comingSoon: false
    },
    {
      title: 'Business',
      price: .50,
      frequency: '/user/month',
      description: 'Dedicated support for your company.',
      features: [
        'Unlimited READMEs',
        'Unlimited teams',
        'Company directory of READMEs',
        'Github & Slack integrations',
        'Dedicated support',
      ],
      cta: 'Monthly billing',
      mostPopular: false,
      comingSoon: true
    },
  ],
}
const faqs = [
  {
    id: 1,
    question: "Can I host README myself?",
    answer:
      <span>Absolutely! Using our self-hosted plan you can run README on your own infrastructure. Check us out on <a href="https://github.com/teamreadme/readme" rel="noopener noreferrer" target="_blank">Github</a>!</span>,
  },
  {
    id: 2,
    question: "Why should I use README?",
    answer:
      "With the explosion in remote work, team members can feel more isolated than ever. Having a README allows peers to learn more about each other and find a collaborative way to work together.",
  },
  {
    id: 2,
    question: "What if my employees don't want to write READMEs?",
    answer:
      "The best way to start, is to lead. Having your executive team write their READMEs and share them with the team will no only increase accessibility to your leadership, but motivate others to join the trend.",
  },
]


export default function Pricing({
  userSession
}: InferGetServerSidePropsType<typeof getServerSideProps> & { children?: React.ReactNode }) {
  return (
    <Layout authenticated={userSession != null}>
      <div>
        {/* Header and Page Header */}
        <div className="relative">
          {/* Page Header */}
          <div className="relative bg-gradient-to-r from-purple-600 via-purple-600 opacity-90 bg-purple-500 rounded-md max-w-2xl mx-auto py-24 px-4 sm:px-6 lg:max-w-7xl lg:py-32 lg:px-8">
            <div className="relative">
              <h1 className="text-3xl font-extrabold text-white sm:text-5xl sm:leading-none sm:tracking-tight lg:text-6xl">
                Get your team started today
              </h1>
              <p className="mt-6 max-w-2xl text-xl text-gray-200">
                Host it yourself or let us help you out, there&apos;s an option for everyone.
              </p>
            </div>
          </div>
        </div>

        <main>
          {/* Pricing Section */}
          <section className="relative -mt-12" aria-labelledby="pricing-heading">
            <h2 id="pricing-heading" className="sr-only">
              Pricing
            </h2>

            {/* Tiers */}
            <div className="max-w-2xl mx-auto px-4 space-y-12 sm:px-6 lg:max-w-7xl lg:space-y-0 lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8">
              {pricing.tiers.map((tier) => (
                <div
                  key={tier.title}
                  className="relative p-8 bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col"
                >
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900">{tier.title}</h3>
                    {tier.mostPopular ? (
                      <p className="absolute top-0 py-1.5 px-4 bg-purple-500 rounded-full text-xs font-semibold uppercase tracking-wide text-white transform -translate-y-1/2">
                        Most popular
                      </p>
                    ) : null}
                    {tier.comingSoon ? (
                      <p className="absolute top-0 py-1.5 px-4 bg-gray-200 rounded-full text-xs font-semibold uppercase tracking-wide text-black transform -translate-y-1/2">
                        Coming soon
                      </p>
                    ) : null}
                    <p className="mt-4 flex items-baseline text-gray-900">
                      <span className="text-5xl font-extrabold tracking-tight">${tier.price}</span>
                      <span className="ml-1 text-xl font-semibold">{tier.frequency}</span>
                    </p>
                    <p className="mt-6 text-gray-500">{tier.description}</p>

                    {/* Feature list */}
                    <ul role="list" className="mt-6 space-y-6">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex">
                          <CheckIcon className="flex-shrink-0 w-6 h-6 text-purple-500" aria-hidden="true" />
                          <span className="ml-3 text-gray-500">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {!tier.comingSoon && <a
                    href={tier.ctaHref}
                    className={classNames(
                      tier.mostPopular
                        ? 'bg-purple-500 text-white hover:bg-purple-600'
                        : 'bg-purple-50 text-purple-700 hover:bg-purple-100',
                      'mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium'
                    )}
                  >
                    {tier.cta}
                  </a>}
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section
            aria-labelledby="faq-heading"
            className="max-w-2xl mx-auto py-24 px-4 divide-y bg-gray-100 rounded-md mt-10 divide-gray-200 sm:px-6 lg:max-w-7xl lg:py-32 lg:px-8"
          >
            <h2 id="faq-heading" className="text-3xl font-extrabold text-gray-900">
              Frequently asked questions
            </h2>
            <div className="mt-8">
              <dl className="divide-y divide-gray-200">
                {faqs.map((faq) => (
                  <div key={faq.id} className="pt-6 pb-8 md:grid md:grid-cols-12 md:gap-8">
                    <dt className="text-base font-medium text-gray-900 md:col-span-5">{faq.question}</dt>
                    <dd className="mt-2 md:mt-0 md:col-span-7">
                      <p className="text-base text-gray-500">{faq.answer}</p>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>
        </main>

      </div>
    </Layout>
  )
}


/**
 * Load a public, unauthenticated readme profile
 * @param context
 * @returns
 */
export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const readMe = await prisma.readMe.findFirst({
    where: { user: { username: process.env.NEXT_PUBLIC_INSPIRATION_USERNAME } },
    include: { user: { select: { firstName: true, lastName: true, username: true } } },
  });
  const userSession = await getSession(context);

  return { props: { readMe, userSession } };
};
