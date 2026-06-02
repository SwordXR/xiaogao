import React, { useCallback, useEffect } from 'react';

interface Props {
  text: string;
  onWordClick: (word: string) => void;
  onSelection?: (text: string) => void;
}

export default function InteractiveText({ text, onWordClick, onSelection }: Props) {
  
  const handleSelection = useCallback(() => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) return;

    const selectedText = selection.toString().trim();
    if (!selectedText) return;

    // Clean up punctuation if they accidentally selected it
    const cleanAlphaText = selectedText.replace(/^[^a-zA-Z]+|[^a-zA-Z]+$/g, '');
    
    // Check if the selection is essentially a single word
    const isSingleWord = /^[a-zA-Z]+(?:'[a-zA-Z]+)?$/.test(cleanAlphaText);

    if (isSingleWord && cleanAlphaText.length > 0) {
      onWordClick(cleanAlphaText);
    } else if (onSelection && selectedText.length > 0) {
      onSelection(selectedText);
    }
  }, [onWordClick, onSelection]);

  return (
    <span
      onMouseUp={handleSelection}
      onTouchEnd={handleSelection} // support mobile selection
      className="cursor-text leading-relaxed"
    >
      {text}
    </span>
  );
}
