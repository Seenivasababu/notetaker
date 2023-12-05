import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";

const NoteEditor = ({
  onSave,loading
}: {
  onSave: (note: { title: string; content: string }) => void,
  loading:boolean
}) => {
  const [code, setCode] = useState<string>("");
  const [title, setTitle] = useState<string>("");


  return (
    <div className="card mt-1 border border-gray-100 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">
          <input
            type="text"
            placeholder="Note title"
            className="input input-accent input-md w-full font-bold"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </h2>
        <CodeMirror
          value={code}
          width="500px"
          height="30vh"
          minWidth="100%"
          maxHeight="30vh"
          extensions={[
            markdown({ base: markdownLanguage, codeLanguages: languages }),
          ]}
          onChange={(value)=>setCode(value)}
          className="border border-gray-300"
        />
      </div>
      <div className="card-actions justify-end">
         <button onClick={()=>{
     
            onSave({
               title,
               content:code
            })
            setCode("")
            setTitle("")
           
         }}
         className="btn btn-md btn-neutral mx-8 my-2 px-4 py-1"
         disabled={title.trim().length === 0 || code.trim().length ===0 }>
            Save {loading && <span className="loading loading-dots"></span>}
         </button>
      </div>
    </div>
  );
};

export default NoteEditor;
