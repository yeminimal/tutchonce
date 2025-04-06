
import React from 'react';

interface EditorStylesProps {
  minHeight: string;
}

const EditorStyles: React.FC<EditorStylesProps> = ({ minHeight }) => {
  return (
    <style>
      {`
        .ql-container {
          border-bottom-left-radius: 0.5rem;
          border-bottom-right-radius: 0.5rem;
          background: white;
          font-family: inherit;
          font-size: 1rem;
        }
        .ql-toolbar {
          border-top-left-radius: 0.5rem;
          border-top-right-radius: 0.5rem;
          background: #f9fafb;
          border-color: #d1d5db;
        }
        .ql-editor {
          min-height: ${minHeight};
          max-height: 60vh;
          overflow-y: auto;
          padding: 1rem;
        }
        .ql-editor p, .ql-editor ol, .ql-editor ul, .ql-editor pre, .ql-editor blockquote {
          margin-bottom: 1em;
        }
        .ql-editor h1, .ql-editor h2, .ql-editor h3, .ql-editor h4, .ql-editor h5, .ql-editor h6 {
          margin-bottom: 0.5em;
          font-weight: 600;
        }
        .quill {
          width: 100%;
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
        }
        .ql-snow .ql-tooltip {
          z-index: 50;
        }
      `}
    </style>
  );
};

export default EditorStyles;
