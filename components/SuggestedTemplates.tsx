import { AcademicCapIcon, ChartBarIcon, ChatIcon, DesktopComputerIcon } from "@heroicons/react/outline";
import { BriefcaseIcon } from "@primer/octicons-react";
import React from "react";

interface SuggestedTemplatesProps {
  onSuggestion: (topic: string) => void;
}

//I'd prefer to save `topics[i].data` as actual JSX, but then I'd have to render it to convert it to a string
// to append to the editor
const topics = [
  {
    title: "Developer",
    icon: (props: any) => <DesktopComputerIcon {...props} />,
    tagline: 'you@work:~$ whoami',
    data: `
    <p><span style="color: rgb(126, 140, 141);"><em>[Below is a template that contains preformatted sections, please take the time to remove anything that doesn't apply and get creative by adding new sections!]</em></span></p>
    <h1>🌎 Hello World</h1>
    <p>Thanks for checking out my README! You can consider this a user guide to working with me. Inside you'll find things like my communication preferences, do's and don'ts, and favorite local restaurants.</p>
    <h2>My API</h2>
    <table style="border-collapse: collapse; width: 100%; height: 79.3752px;" border="1"><colgroup><col style="width: 49.9197%;"><col style="width: 49.9197%;"></colgroup>
    <tbody>
    <tr style="height: 19.5938px;">
    <td style="height: 19.5938px;"><span style="color: rgb(126, 140, 141);">Priority / Method</span></td>
    <td style="height: 19.5938px;"><span style="color: rgb(126, 140, 141);">Notes</span></td>
    </tr>
    <tr style="height: 20.5938px;">
    <td style="height: 20.5938px;"><span class="badge" style="background-color: #fef2f2; color: #991b1b;">Urgent</span> | <strong>Call or text</strong></td>
    <td style="height: 20.5938px;">When in doubt, call me.</td>
    </tr>
    <tr style="height: 19.5938px;">
    <td style="height: 19.5938px;"><span class="badge" style="background-color: #fefce8; color: #854d0e;">Time Sensitive</span>| <strong>Slack</strong></td>
    <td style="height: 19.5938px;">Please refrain from using <code>@here</code> unless it's important</td>
    </tr>
    <tr style="height: 19.5938px;">
    <td style="height: 19.5938px;"><span class="badge" style="background-color: #faf5ff; color: #6b21a8;">Low</span> | <strong>Email</strong></td>
    <td style="height: 19.5938px;">I'm a big fan of inbox zero, so you can expect a timely response</td>
    </tr>
    </tbody>
    </table>
    <h2>Do's and Dont's</h2>
    <p>This is a great section to outline ways to build a successful working relationship with you. Some common do's:</p>
    <ol>
    <li>Communicate early and often</li>
    <li>Be lavish in your praise and hearty in your approbation</li>
    <li>Bring donuts on Fridays</li>
    </ol>
    <p>and some common don'ts:</p>
    <ol>
    <li>Ask me to speak publicly</li>
    <li>Promote bullying in the workplace</li>
    <li>Make eye contact with gorillas at the zoo</li>
    </ol>
    <h2>Lunch Meetings</h2>
    <p>A README is a great place to introduce others to you, not just you&nbsp;<em>at work</em>. What are some of your favorite things to do outside of work, favorite lunch spots, and hobbies? Suggest ways to get to know each other outside of work, like lunch meetings at local restaurants!</p>    
  `
  },
  {
    title: "New Employee",
    icon: (props: any) => <AcademicCapIcon {...props} />,
    tagline: 'Introduce yourself to your new team',
    data: `
    <p><span style="color: rgb(126, 140, 141);"><em>[Below is a template that contains preformatted sections, please take the time to remove anything that doesn't apply and get creative by adding new sections!]</em></span></p>
<h1>👋 Hey There</h1>
<p>Thanks for checking out my README! I'm super excited to join [awesome start up]. You can consider this a user guide to working with me. Inside you'll find things like my career journey, communication preferences, and hopes for my new role.</p>
<h2>My Career Journey</h2>
<p>Before joining [awesome start up] I was a marketing director at [not so awesome start up]. This is a great place to tell people about your career journey. Don't be humble, let them know how successful you are!</p>
<h2>Communication Preferences</h2>
<table style="border-collapse: collapse; width: 100%; height: 119.063px;" border="1"><colgroup><col style="width: 49.9197%;"><col style="width: 49.9197%;"></colgroup>
<tbody>
<tr style="height: 19.5938px;">
<td style="height: 19.5938px;"><span style="color: rgb(126, 140, 141);">Priority / Method</span></td>
<td style="height: 19.5938px;"><span style="color: rgb(126, 140, 141);">Notes</span></td>
</tr>
<tr style="height: 20.5938px;">
<td style="height: 20.5938px;"><span class="badge" style="background-color: #fef2f2; color: #991b1b;">Urgent</span> | <strong>Call or text</strong></td>
<td style="height: 20.5938px;">When in doubt, call me.</td>
</tr>
<tr style="height: 39.6875px;">
<td style="height: 39.6875px;"><span class="badge" style="background-color: #fefce8; color: #854d0e;">Time Sensitive</span>| <strong>Slack</strong></td>
<td style="height: 39.6875px;">Please refrain from using <code>@here</code> unless it's important</td>
</tr>
<tr style="height: 39.1875px;">
<td style="height: 39.1875px;"><span class="badge" style="background-color: #faf5ff; color: #6b21a8;">Low</span> | <strong>Email</strong></td>
<td style="height: 39.1875px;">I'm a big fan of inbox zero, so you can expect a timely response</td>
</tr>
</tbody>
</table>
<h2>Hopes</h2>
<p>I'm really excited for this new role and want to do everything I can to succeed. I, personally, have a couple things I hope to achieve in my first year at [awesome start up]:</p>
<ol>
<li>Identify and fix 5 problems</li>
<li>Increase my vertical to 5 feet</li>
<li>Present to the entire company on my area of expertise</li>
</ol>
    `
  },
  {
    title: "Recruiter",
    icon: (props: any) => <ChatIcon {...props} />,
    tagline: 'Increase transparency with candidates',
    data: `
    <p><span style="color: rgb(126, 140, 141);"><em>[Below is a template that contains preformatted sections, please take the time to remove anything that doesn't apply and get creative by adding new sections!]</em></span></p>
    <h1>🎉 Hi There!</h1>
    <p>Thanks for checking out my README! I'm really happy you're considering joining [awesome start up]. You can consider this a user guide to me as a recruiter and a guide to the company. Inside you'll find things like my career journey, my hopes for candidates I work with, and some secret tips to interviewing with us.&nbsp;</p>
    <h2>My Career Journey</h2>
    <p>Before joining [awesome start up] I was a director of HR at [not so awesome mega corp]. This is a great place to tell people about your career journey. Don't be humble, let them know how successful you are!</p>
    <h2>Working Together</h2>
    <p>I will do everything in my power to help you succeed in this process. My job is to help you perform your best as we move through the couple steps in our interviewing process. With that being said, here are a couple ideas for how we can best work together:</p>
    <ol>
    <li><strong>Quick communication&nbsp;</strong>- I will promise to give you clear and quick communication. We don't 👻 people here. All I ask in return is that if you need some time to think or respond, just let me know! I'm happy to give you a couple days to think things over</li>
    <li><strong>Transparency</strong> - We pride ourselves on transparency and try to make sure we aren't putting our interests above your own. That's why you'll notice we had salary ranges included in the job posting. We feel a successful negotation is one where everyone walks away happy.</li>
    <li><strong>Feedback</strong> - You'll receive feedback after each round of interviews and we would love the same! Don't hesitate to let us know how we can improve. Once you join us, you might be one of the interviewers!</li>
    </ol>
    <h2>Secret Tips</h2>
    <p>We're super casual here and a core tenant is accessibility, which means there's no hidden social code. The only secret tip to working with us is be yourself! Have fun during the interviews and don't be afraid to advocate for yourself.</p>   
    `
  },
  {
    title: "Manager",
    icon: (props: any) => <BriefcaseIcon {...props} />,
    tagline: 'Be open with your team',
    data: `
    <p>
    <span style="color: rgb(126, 140, 141);" data-mce-style="color: rgb(126, 140, 141);">
      <em>[Below is a template that contains preformatted sections, please take the time to remove anything that doesn't apply and get creative by adding new sections!]</em>
    </span>
  </p>
  <h2>🔥 Hey Team</h2>
  <p>I heard about this new README craze and wanted to give it a try. Inside you'll find details about me as a person, manager, and peer of yours. I want to be the best leader I can for our team and that includes being open about myself and my progress as a leader.</p>
  <h2>Leadership Style</h2>
  <p>I'm a big proponent of Participative Leadership and a big part of that is making information about myself and our business readily available to the team.</p>
  <p>If you ever feel I'm being argumentative, it's perfectly okay to say so! I love a good debate, but understand it can come off a bit terse at times.</p>
  <h2>Growing up</h2>
  <p>I feel my childhood is a huge part of who I am, so I felt it important to include in here. I grew up in Boston, Massachusetts and unfortunately hate the Red Sox 😥. It feels good to get that off my chest.</p>
  <h2>A Month as Me</h2>
  <h3>Daily</h3>
  <ol>
    <li>What do you do every day? Coffee, 1:1s, jogging?</li>
  </ol>
  <h3>Weekly</h3>
  <ol>
    <li>What do you do every week? Meetings, routines, reports...</li>
  </ol>
  <h3>Monthly</h3>
  <ol>
    <li>What do you do every month? Solve a rubik's cube, meet with your VP, go through feedback</li>
  </ol>
    `
  },
  {
    title: "Executive",
    icon: (props: any) => <ChartBarIcon {...props} />,
    tagline: 'Increase accessibility across your organization',
    data: `
    <span style="color: rgb(126, 140, 141);" data-mce-style="color: rgb(126, 140, 141);">
    <em>[Below is a template that contains preformatted sections, please take the time to remove anything that doesn't apply and get creative by adding new sections!]</em>
  </span>
        <h1>📟 Is this thing on?</h1>
        <p>As I imagine some of you may know, my name&apos;s Hans and I&apos;m the Founder &amp; CEO of [awesome startup]. Now that we&apos;ve grown to 500 (!) employees, I&apos;ve noticed that it&apos;s hard for me to get time with everyone and a lot of people don&apos;t get the chance to speak with me. Since accessibility is one of our core values, I wanted to make sure information about me is shared equally amongst the team in my README.</p>
        <h2>Creating [awesome startup]</h2>
        <p>I love telling stories about the early days founding this company. It started in my great aunt&apos;s garage with 2 Macbook Airs and a lot of bud light. I sometimes wish I could go back to those days, they seem simpler at times, but I don&apos;t ever want to go back to not having this awesome team beside me.</p>
        <h2>Quirks</h2>
        Everyone has them and it&apos;s important to be aware of mine. I don&apos;t ever want one my quirks to cause someone to feel left out or uncomfortable, so please tell me if you notice that happening.
        <ol>
            <li>Eye contact can be hard for me at times. But I promise I&apos;m listening! I just think better when staring off into space.</li>
            <li>I <b><u>love</u></b> Broadway musicals, so much that you might hear me humming it while walking down the street</li>
            <li>I sometimes make up words. I wish I knew why, but occassionally there&apos;s an itch in my brain and that&apos;s the only way to scratch it.</li>
        </ol>
        <h2>Tips for Success</h2>
        <p>I've found those that solve problems not given to them succeed first. I'm always open to helping with any problems you may have, but I ask that you come up with at least one potential solution. Even if it seems outlandish, it shows me that the problem matters to you and you are willing to find a solution.</p>
    `
  },
];

export default function SuggestedTemplates(props: SuggestedTemplatesProps) {
  return (
    <div>
      <h2 className="font-bold text-2l">Suggested Templates</h2>
      <hr className="mt-2" />
      <ul role="list" className="divide-y divide-gray-200">
        {topics.map((topic) => (
          <li onClick={() => props.onSuggestion(topic.data)} className="hover:bg-gray-100 cursor-pointer py-4 flex" key={topic.title}>
            {topic.icon({ className: 'h-10 w-10 p-2' })}
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{topic.title}</p>
              <p className="text-sm text-gray-500">{topic.tagline}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
