import React from "react";
import CodeEditor from '@uiw/react-textarea-code-editor';

const Editor = ({ initialCode, onChange }) => {

  return (
    <CodeEditor
      value={initialCode}
      language="glsl"
      data-color-mode="dark"
      placeholder="Please enter JS code."
      onChange={(evn) => onChange(evn.target.value)}
      padding={15}
      style={{
        backgroundColor: "#161616",
        fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
        fontSize: '18px', 
        height: '100%', 
        width: '100%',
        overflow: 'auto', // Enable scrolling
        scrollbarWidth: 'none', /* For Firefox */
        '-ms-overflow-style': 'none', /* For Internet Explorer and Edge */
        '&::-webkit-scrollbar': {
          display: 'none' /* For Chrome, Safari, and Opera */
        }
      }}
    />

  );
};

export default Editor;
