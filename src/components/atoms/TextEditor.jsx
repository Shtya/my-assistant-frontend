'use client';

import dynamic from 'next/dynamic';
import 'suneditor/dist/css/suneditor.min.css';

const SunEditor = dynamic(() => import('suneditor-react'), { ssr: false });

export default function TextEditor({ value, onChange }) {
  return (
    <div className="bg-white/50 h-fit rounded-[10px] overflow-hidden shadow-md">
      <SunEditor
  setContents={value}
  onChange={onChange}
  height="400px"
  setOptions={{
    height: '400px',
    defaultStyle: 'font-size: 18px; font-family: Inter, sans-serif;', // ✅ default size and font
    font: ['Inter', 'Lato', 'Roboto', 'Arial', 'Georgia', 'Courier New'],
    fontSize: [12, 14, 16, 18, 20, 24, 28, 32], // optional: cleaner steps
    buttonList: [
      ['undo', 'redo'],
      ['font', 'fontSize', 'formatBlock'],
      ['paragraphStyle', 'blockquote'],
      ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
      ['fontColor', 'hiliteColor', 'textStyle'],
      ['removeFormat'],
      ['outdent', 'indent'],
      ['align', 'horizontalRule', 'list', 'table'],
      ['link', 'image', 'video'],
      ['fullScreen', 'showBlocks', 'codeView'],
    ],
    formats: ['p', 'blockquote', 'h1', 'h2', 'h3', 'pre'],
  }}
/>

    </div>
  );
}
