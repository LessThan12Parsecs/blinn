import React, { useState } from 'react';
import Input from '@mui/joy/Input';// Changed to Joy UI TextField

const InputComponent = ({ getEditorContent, onSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent the default action to avoid form submission
      const editorContent = getEditorContent();
      onSubmit({ inputValue, editorContent });
      setInputValue(''); // Clear input after sending
    }
  };

  return (
    <Input // Adjusted for Joy UI TextField
      variant="soft"
      color="neutral"
      sx={{
        '&::before': {
          display: 'none',
        },
        '&:focus-within': {
          outline: '2px solid var(--Input-focusedHighlight)',
          outlineOffset: '2px',
        },
        backgroundColor: '#FFFFFFE4', // Changed background color to light blue
        width: "25%"
      }}
      placeholder='Type instruction'
      value={inputValue}
      onChange={handleInputChange}
      onKeyPress={handleKeyPress}
    />
  );
};

export default InputComponent;