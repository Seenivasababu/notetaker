"use client";
import React, { useState } from "react";
import { api } from "~/trpc/react";
import { RouterOutputs } from "~/trpc/shared";

type Topic = RouterOutputs["topic"]["getAll"][0];

const Content = () => {
  const [topic, setTopic] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  const { data: topics, refetch: refetchTopics } = api.topic.getAll.useQuery(
    undefined,
    {
      onSuccess: (data) => {
        setSelectedTopic(selectedTopic ?? data[0] ?? null);
      },
    },
  );
  const createTopic = api.topic.create.useMutation({
    onSuccess: () => {
      refetchTopics();
    },
  });
  console.log(topics);

  return (
    <div className="mx-5 mt-5 grid grid-cols-4 gap-2">
      <div className="px-2">
        <input
          value={topic}
          className="input input-bordered input-sm w-full"
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Add Topic"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              createTopic.mutate({
                title: topic,
              });
              setTopic("");
            }
          }}
        />
        <div className="divider"></div>
        <ul className="menu w-56 rounded-box bg-base-100 p-2">
          {topics?.map((topic) => {
            return (
              <li key={topic.id}>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedTopic(topic);
                  }}
                >
                  {topic.title}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="col-span-3"></div>
    </div>
  );
};

export default Content;
