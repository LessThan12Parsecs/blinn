import React, { useState } from 'react';
import { Input } from '@mui/base/Input';
import './style.css'

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
    <Input
      slotProps={{ input: { className: 'CustomInput' } }}
      variant="outlined"
      value={inputValue}
      onChange={handleInputChange}
      onKeyPress={handleKeyPress}
    />
  );
};

export default InputComponent;