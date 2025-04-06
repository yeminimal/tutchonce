
import React from 'react';

interface EditorToolbarProps {
  onImageUpload?: (file: File) => Promise<string>;
}

const EditorToolbar: React.FC<EditorToolbarProps> = ({ onImageUpload }) => {
  const modules = {
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'align': [] }],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['blockquote', 'code-block'],
        ['link', 'image'],
        ['clean']
      ],
      handlers: onImageUpload ? {
        image: function() { /* This is a placeholder that will be handled in the parent component */ }
      } : undefined
    },
    clipboard: {
      matchVisual: false
    },
  };

  return modules;
};

export const editorFormats = [
  'header',
  'bold', 'italic', 'underline', 'strike',
  'color', 'background',
  'align',
  'list', 'bullet', 'indent',
  'blockquote', 'code-block',
  'link', 'image'
];

export default EditorToolbar;
