import React, { useState } from 'react';
import Input from '@mui/joy/Input'; 
import Button from '@mui/joy/Button';

const InputComponent = ({ getEditorContent, onSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    const editorContent = getEditorContent();
    onSubmit({ inputValue, editorContent });
    setInputValue(''); 
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '30%' }}> {}
      <Input
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
          backgroundColor: '#FFFFFFE4',
          width: "100%"
        }}
        placeholder='Type instruction'
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      <Button 
        variant="solid"
        color="primary"
        onClick={handleSubmit}
      >
        Send
      </Button>
    </div>
  );
};

export default InputComponent;
