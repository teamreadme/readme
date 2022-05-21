import React from "react";

interface SuggestedTopicsProps {
  onSuggestion: (topic: string) => void;
}

const topics = [
  {
    title: "Communication Preferences",
    data: `
  <h1>Communication Preferences</h1>
    <p>I prefer to be contacted during ... via ...</p>
  `
  },
  {
    title: "Childhood",
    data: `
    <h1>Growing up</h1>
    <p>I grew up in ... and remember ... most from my childhood</p>
    `
  },
  {
    title: "Strengths",
    data: `
    <h1>Strengths</h1>
    <p>A couple major areas I am proud of are:<p>
    <ol>
    <li>...</li>
    <li>...</li>
    <li>...</li>
    </ol>
    `
  },
  {
    title: "Flaws",
    data: `
    <h1>Flaws</h1>
    <p>A couple major areas I am working on improving are:<p>
    <ol>
    <li>...</li>
    <li>...</li>
    <li>...</li>
    </ol>
    `
  },
  {
    title: "The Future",
    data: `
    <h1>The Future</h1>
    <p>In the next 5 years I really hope to ... </p>
    `
  },
];

export default function SuggestedTopics(props: SuggestedTopicsProps) {
  return (
    <div>
      <h2 className="font-bold text-2l">Suggested Topics</h2>
      <hr className="my-2" />
      {topics.map((topic) => (
        <div key={`suggested-topic-${topic.title}`}>
          <h3 onClick={() => props.onSuggestion(topic.data)} className="hover:underline cursor-pointer">
            {topic.title}
          </h3>
        </div>
      ))}
    </div>
  );
}
