import React from "react";

interface SuggestedTopicsProps {
  onSuggestion: (topic: object[]) => void;
}

const topics = [
  {
    title: "Communication Preferences",
    data: [
      {
        type: "heading-one",
        children: [
          {
            text: "Communication Preferences",
          },
        ],
      },
      {
        type: "paragraph",
        children: [
          {
            text: "I prefer to be contacted during ... via ...",
          },
        ],
      },
    ],
  },
  {
    title: "Childhood",
    data: [
      {
        type: "heading-one",
        children: [
          {
            text: "Growing up",
          },
        ],
      },
      {
        type: "paragraph",
        children: [
          {
            text: "I grew up in ... and remember ... most from my childhood.",
          },
        ],
      },
    ],
  },
  {
    title: "Strengths",
    data: [
      {
        type: "heading-one",
        children: [
          {
            text: "Strengths",
          },
        ],
      },
      {
        type: "paragraph",
        children: [
          {
            text: "A couple major areas I am proud of are:",
          },
        ],
      },
      {
        type: "numbered-list",
        children: [
          {
            type: "list-item",
            children: [
              {
                text: "...",
              },
            ],
          },
          {
            type: "list-item",
            children: [
              {
                text: "...",
              },
            ],
          },
          {
            type: "list-item",
            children: [
              {
                text: "...",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: "Flaws",
    data: [
      {
        type: "heading-one",
        children: [
          {
            text: "Flaws",
          },
        ],
      },
      {
        type: "paragraph",
        children: [
          {
            text: "A couple major areas I am working on improving are:",
          },
        ],
      },
      {
        type: "numbered-list",
        children: [
          {
            type: "list-item",
            children: [
              {
                text: "...",
              },
            ],
          },
          {
            type: "list-item",
            children: [
              {
                text: "...",
              },
            ],
          },
          {
            type: "list-item",
            children: [
              {
                text: "...",
              },
            ],
          },
        ],
      },
      {
        title: "Communication Preferences",
        data: [
          {
            type: "heading-one",
            children: [
              {
                text: "Communication Preferences",
              },
            ],
          },
          {
            type: "paragraph",
            children: [
              {
                text: "I prefer to be contacted during ... via ...",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: "The Future",
    data: [
      {
        type: "heading-one",
        children: [
          {
            text: "The Future",
          },
        ],
      },
      {
        type: "paragraph",
        children: [
          {
            text: "In the next 5 years I really hope to be ...",
          },
        ],
      },
    ],
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
