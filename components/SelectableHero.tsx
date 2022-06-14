import { getStaticProps } from '@/pages/blog/[slug]';
import { Tab } from '@headlessui/react';
import classNames from 'classnames';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import React, { useMemo } from 'react';

let personas = [{
    title: "New Hire",
    queryParam: 'n',
    text: <>
        <h2>👋 Hello there!</h2>
        <p>I just joined [awesome start up] this week and wanted to introduce myself to everyone! This is my README, inside of it you will find:</p>  <ol>
            <li>An awesome set of facts about me</li>
            <li>My likes and dislikes</li>
            <li>How best to work with me</li>
            <li>Fun stories from my career</li>
        </ol>
        <p>Shall we get started?</p>
        <h3>🤪 Fun facts about me</h3>
        <ul>
            <li>I can throw a football over that mountain over there</li>
            <li>I&apos;ve never been to Greece</li>
            <li>I&apos;m not real!</li>
        </ul>
        <p className="font-bold text-xl">Now it&apos;s your turn. Get started <Link href="/auth/register"><span className="font-bold underline cursor-pointer">here</span></Link>!</p>
    </>
},
{
    title: "Recruiter",
    queryParam: 'r',
    text: <>
        <h2>🎉 Hey Candidate!</h2>
        <p>My name is Arnold and I&apos;m a recruiter with [awesome startup]. I&apos;m so excited for the possibility of you joining us! This is my README, inside of it you can find everything about me, my career journey, and how we can best work together to further your career journey.</p>
        <h3>Communication</h3>
        <p>Communication is key for us in the recruiting process and we want to make sure you always feel up to date. I am a huge fan of <b>asynchronous</b> communication and you will often find me sending you <a href="https://loom.com" target="_blank" rel="noreferrer noopener">Loom</a> messages. You will always get a response from us, so if you feel 👻 ghosted, please reach out!</p>
        <h3>My career journey</h3>
        <p>I&apos;ve been a recruiter for 5 years, I joined [awesome startup] right after graduating from the University of Minnesota, Twin Cities. I love helping people find their passion and seeing them succeed in their new roles. I&apos;m now the Director of HR and am humbled by how much opportunity I&apos;ve been given at this company. I&apos;m sure you&apos;ll find the same quick success with us.</p>
        <p className="font-bold text-xl">Now it&apos;s your turn. Get started <Link href="/auth/register"><span className="font-bold underline cursor-pointer">here</span></Link>!</p>
    </>
},
{
    title: "Manager",
    queryParam: 'm',
    text: <>
        <h2>🧑‍💼 Hey Team!</h2>
        <p>I heard about this new README craze and wanted to give it a try. Inside you&apos;ll find details about me as a person, manager, and peer of yours. I want to be the best leader I can for our team and that includes being open about myself and my progress as a leader.</p>
        <h3>Leadership Style</h3>
        <p>I&apos;m a big proponent of Participative Leadership and a big part of that is making information about myself and our business readily available to the team.</p>
        <p>If you ever feel I&apos;m being argumentative, it&apos;s perfectly okay to say so! I love a good debate, but understand it can come off a bit terse at times.</p>
        <h3>Growing up</h3>
        <p>I feel my childhood is a huge part of who I am, so I felt it important to include in here. I grew up in Boston, Massachusetts and unfortunately hate the Red Sox 😥. It feels good to get that off my chest.</p>
        <p className="font-bold text-xl">Now it&apos;s your turn. Get started <Link href="/auth/register"><span className="font-bold underline cursor-pointer">here</span></Link>!</p>
    </>
},
{
    title: "Indie Hacker",
    queryParam: 'i',
    text: <>
        <h2>💻 Hello World!</h2>
        <p>My name&apos;s Jake and I&apos;m the founder of README! I really appreciate you checking out the site and learning more about us. I created README so that we can humanize the workplace and share information more openly. We all have strengths and flaws, but rarely get the chance to share them with each other.</p>
        <p>I hope you take the opportunity to sit down and write a README, long or short, it&apos;s a great opportunity for self reflection and transparency.</p>
        <h2>Are you an Indie Hacker?</h2>
        <p>Then make a README! The IH community strives on openness and sharing, I&apos;m sure others would love the chance to get to know you in-depth and learn about who you are outside of Twitter.</p>
        <p className="font-bold text-xl">Now it&apos;s your turn. Get started <Link href="/auth/register"><span className="font-bold underline cursor-pointer">here</span></Link>!</p>
    </>
},
{
    title: "Leader",
    queryParam: 'l',
    text: <>
        <h2>📟 Is this thing on?</h2>
        <p>As I imagine some of you may know, my name&apos;s Hans and I&apos;m the Founder &amp; CEO of [awesome startup]. Now that we&apos;ve grown to 500 (!) employees, I&apos;ve noticed that it&apos;s hard for me to get time with everyone and a lot of people don&apos;t get the chance to speak with me. Since accessibility is one of our core values, I wanted to make sure information about me is shared equally amongst the team in my README.</p>
        <h3>Creating [awesome startup]</h3>
        <p>I love telling stories about the early days founding this company. It started in my great aunt&apos;s garage with 2 Macbook Airs and a lot of bud light. I sometimes wish I could go back to those days, they seem simpler at times, but I don&apos;t ever want to go back to not having this awesome team beside me.</p>
        <h3>Quirks</h3>
        Everyone has them and it&apos;s important to be aware of mine. I don&apos;t ever want one my quirks to cause someone to feel left out or uncomfortable, so please tell me if you notice that happening.
        <ol>
            <li>Eye contact can be hard for me at times. But I promise I&apos;m listening! I just think better when staring off into space.</li>
            <li>I <b><u>love</u></b> Broadway musicals, so much that you might hear me humming it while walking down the street</li>
            <li>I sometimes make up words. I wish I knew why, but occassionally there&apos;s an itch in my brain and that&apos;s the only way to scratch it.</li>
        </ol>
        <p className="font-bold text-xl">Now it&apos;s your turn. Get started <Link href="/auth/register"><span className="font-bold underline cursor-pointer">here</span></Link>!</p>
    </>
},
]

export default function SelectableHero() {
    const router = useRouter();

    /**
     * Update the `p` query param with the provided value
     * @param val 
     */
    function updateQueryParam(val: string) {
        router.push({ query: { ...router.query, p: val } }, undefined, { scroll: false })
    }

    /**
     * Get the default tab to be shown, based upon the `p` query param
     */
    const defaultIndex = useMemo(() => {
        if (router.query.p) {
            let personaIndex = personas.findIndex((persona) => persona.queryParam == router.query.p);
            if (personaIndex > -1) return personaIndex;
        }
        return 0;
    }, [router.query.p]);

    return <div className="p-4 lg:p-0 w-full flex items-center flex-col ">
        <h2 className="text-3xl lg:text-2xl mb-4 font-bold text-black lg:text-gray-800">How does it work?</h2>
        <Tab.Group onChange={(index: number) => updateQueryParam(personas[index].queryParam)} defaultIndex={defaultIndex}>
            <Tab.List className="space-x-2 space-y-2">
                <span className="text-gray-600 text-xl font-bold">I&apos;m a&nbsp;</span>
                {personas.map((persona) =>
                    <Tab
                        className={({ selected }) => classNames("inline-flex items-center text-gray-600 px-2.5 focus:outline-purple-600 py-0.5 rounded-md text-md font-medium",
                            { 'bg-purple-400 text-white': selected, 'bg-purple-200 hover:bg-purple-400 hover:text-white': !selected })}
                        key={persona.title}>{persona.title}</Tab>
                )}
            </Tab.List>
            <Tab.Panels className="w-full h-[450px] focus:outline-purple-500 mt-4">
                {personas.map((persona) =>
                    <Tab.Panel key={persona.title}><div className="bg-white shadow-md rounded-md h-[450px] w-full overflow-y-auto max-w-[600px] mx-auto p-4 prose">{persona.text}</div></Tab.Panel>
                )}
            </Tab.Panels>
        </Tab.Group>
    </div>
}
