"use client";
import React, { useState } from "react";
import { api } from "~/trpc/react";
import { RouterOutputs } from "~/trpc/shared";
import NoteEditor from "./NoteEditor";
import NoteCard from "./NoteCard";
import { FaTrash } from "react-icons/fa";
import Link from "next/link";

type Topic = RouterOutputs["topic"]["getAll"][0];
type Note = RouterOutputs["note"]["getAll"][0];

const Content = () => {
  const [topic, setTopic] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

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
      void refetchTopics();
    },
  });

  const { data: notes, refetch: refetchNotes } = api.note.getAll.useQuery({
    topicId: selectedTopic?.id ?? "",
  });

  const createNote = api.note.create.useMutation({
    onSuccess: () => {
      void refetchNotes();
      setLoading(false);
    },
  });

  const deleteNote = api.note.delete.useMutation({
    onSuccess: () => {
      void refetchNotes();
      setDeleteLoading(false);
    },
  });

  const deletetopic = api.topic.delete.useMutation({
    onSuccess(data) {
      void refetchTopics();
      void refetchNotes();
    },
  });

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
        <ul className="menu w-56 rounded-box ">
          {topics?.map((topic) => {
            return (
              <div
              key={topic.id}
              onClick={(e) => {
                e.preventDefault();
                setSelectedTopic(topic);
                void refetchNotes();
              }}
              className={`${
                topic.id === selectedTopic?.id ? "bg-slate-300 rounded-md" : ""
              } flex cursor-pointer justify-between hover:bg-slate-300 hover:rounded-md px-3 py-1 transition-colors  duration-200`}
            >
              <button>{topic.title}</button>
              <button className="p-2 text-sm hover:text-red-500" onClick={()=>{
                deletetopic.mutate({id:topic.id})
              }}><FaTrash/></button>
            </div>
            );
          })}
        </ul>
      </div>
      <div className="col-span-3">
        <div>
          {notes?.map((note: Note) => (
            <div key={note.id} className="mt-1">
              <NoteCard
                deleteLoading={deleteLoading}
                note={note}
                onDelete={() => {
                  setDeleteLoading(true);
                  void deleteNote.mutate({ id: note.id });
                }}
              />
            </div>
          ))}
        </div>
        <NoteEditor
          loading={loading}
          onSave={({ title, content }) => {
            setLoading(true);
            void createNote.mutate({
              title,
              content,
              topicId: selectedTopic?.id ?? "",
            });
          }}
        />
      </div>
    </div>
  );
};

export default Content;
