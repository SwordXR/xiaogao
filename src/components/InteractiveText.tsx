import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Copy, Languages } from 'lucide-react';

interface Props {
  text: string;
  onWordClick: (word: string) => void;
  onSelection?: (text: string) => void;
}

export default function InteractiveText({ text, onWordClick, onSelection }: Props) {
  const containerRef = useRef<HTMLSpanElement>(null);
  
  const [isSelecting, setIsSelecting] = useState(false);
  const [startIndex, setStartIndex] = useState<number | null>(null);
  const [endIndex, setEndIndex] = useState<number | null>(null);
  
  // Floating menu state
  const [showMenu, setShowMenu] = useState(false);
  const [menuPos, setMenuPos] = useState({ x: 0, y: 0 });
  const [selectedTextContent, setSelectedTextContent] = useState('');

  // Extract chunks so we can map over them
  const chunks = React.useMemo(() => {
    return text.split(/([a-zA-Z]+(?:'[a-zA-Z]+)?)/g);
  }, [text]);

  // Handle global click to dismiss selection
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isSelecting) {
        setIsSelecting(false);
      }
    };
    const handleGlobalClick = (e: MouseEvent) => {
      if (showMenu && containerRef.current && !containerRef.current.contains(e.target as Node)) {
        clearSelection();
      }
    };
    
    window.addEventListener('mouseup', handleGlobalMouseUp);
    window.addEventListener('click', handleGlobalClick);
    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      window.removeEventListener('click', handleGlobalClick);
    };
  }, [isSelecting, showMenu]);

  const clearSelection = () => {
    setStartIndex(null);
    setEndIndex(null);
    setShowMenu(false);
    setSelectedTextContent('');
  };

  const handleMouseDown = (i: number, e: React.MouseEvent) => {
    if (e.button !== 0) return; // Only left click
    const isWord = /^[a-zA-Z]+(?:'[a-zA-Z]+)?$/.test(chunks[i]);
    if (!isWord) return;
    
    clearSelection();
    setIsSelecting(true);
    setStartIndex(i);
    setEndIndex(i);
  };

  const handleMouseEnter = (i: number) => {
    if (isSelecting && startIndex !== null) {
      setEndIndex(i);
    }
  };

  // Generic mouse up for the container
  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isSelecting || startIndex === null || endIndex === null) return;
    setIsSelecting(false);
    
    const min = Math.min(startIndex, endIndex);
    const max = Math.max(startIndex, endIndex);
    
    // Single word click - trigger lookup
    if (min === max) {
      const isWord = /^[a-zA-Z]+(?:'[a-zA-Z]+)?$/.test(chunks[min]);
      if (isWord) {
        onWordClick(chunks[min]);
      }
      clearSelection();
      return;
    }
    
    // Multi-word selection
    const selectedWords = chunks.slice(min, max + 1).join('');
    
    // Position menu exactly above the cursor
    setMenuPos({ x: e.clientX, y: e.clientY });
    setSelectedTextContent(selectedWords);
    setShowMenu(true);
  };

  // Touch handlers for mobile
  const handleTouchStart = (i: number, e: React.TouchEvent) => {
    const isWord = /^[a-zA-Z]+(?:'[a-zA-Z]+)?$/.test(chunks[i]);
    if (!isWord) return;
    clearSelection();
    setIsSelecting(true);
    setStartIndex(i);
    setEndIndex(i);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isSelecting) return;
    const touch = e.touches[0];
    const el = document.elementFromPoint(touch.clientX, touch.clientY);
    if (!el) return;
    const idxAttr = el.getAttribute('data-chunk-idx');
    if (idxAttr) {
      setEndIndex(parseInt(idxAttr, 10));
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isSelecting || startIndex === null || endIndex === null) return;
    setIsSelecting(false);
    
    const min = Math.min(startIndex, endIndex);
    const max = Math.max(startIndex, endIndex);
    
    if (min === max) {
      const isWord = /^[a-zA-Z]+(?:'[a-zA-Z]+)?$/.test(chunks[min]);
      if (isWord) {
        onWordClick(chunks[min]);
      }
      clearSelection();
      return;
    }
    
    const selectedWords = chunks.slice(min, max + 1).join('');
    const touch = e.changedTouches[0];
    setMenuPos({ x: touch.clientX, y: touch.clientY });
    setSelectedTextContent(selectedWords);
    setShowMenu(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedTextContent);
    clearSelection();
    // In a real app we might show a tiny toast here
  };

  const handleTranslate = () => {
    if (onSelection) {
      onSelection(selectedTextContent);
    }
    clearSelection();
  };

  const isSelected = (i: number) => {
    if (startIndex === null || endIndex === null) return false;
    const min = Math.min(startIndex, endIndex);
    const max = Math.max(startIndex, endIndex);
    return i >= min && i <= max;
  };

  return (
    <>
      <span
        ref={containerRef}
        className="leading-loose select-none touch-none"
        onMouseUp={handleMouseUp}
        onTouchEnd={handleTouchEnd}
        onMouseLeave={handleMouseUp}
      >
        {chunks.map((chunk, i) => {
          const isWord = /^[a-zA-Z]+(?:'[a-zA-Z]+)?$/.test(chunk);
          const selected = isSelected(i);
          
          if (isWord) {
            return (
              <span
                key={i}
                data-chunk-idx={i}
                onMouseDown={(e) => handleMouseDown(i, e)}
                onMouseEnter={() => handleMouseEnter(i)}
                onTouchStart={(e) => handleTouchStart(i, e)}
                onTouchMove={handleTouchMove}
                className={`transition-colors duration-100 rounded px-[2px] mx-[-2px] inline-block
                  ${selected ? 'bg-amber-200 dark:bg-amber-700/50 text-stone-900 dark:text-amber-50' : 'cursor-pointer hover:bg-stone-200 dark:hover:bg-stone-700'}
                `}
              >
                {chunk}
              </span>
            );
          }
          // For punctuation and spaces
          return (
            <span 
              key={i} 
              data-chunk-idx={i}
              onMouseEnter={() => handleMouseEnter(i)}
              className={selected ? 'bg-amber-200 dark:bg-amber-700/50 text-stone-900 dark:text-amber-50' : ''}
            >
              {chunk}
            </span>
          );
        })}
      </span>

      {/* Floating Action Menu */}
      {showMenu && createPortal(
        <div 
          className="fixed z-50 flex items-center gap-1 bg-stone-900 dark:bg-stone-100 p-1.5 rounded-xl shadow-xl transform -translate-x-1/2 -translate-y-[120%] animate-in fade-in zoom-in-95 duration-200"
          style={{ top: menuPos.y, left: menuPos.x }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-3 py-1.5 hover:bg-stone-800 dark:hover:bg-stone-200 text-white dark:text-stone-900 rounded-lg text-sm font-medium transition-colors"
          >
            <Copy className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Copy</span>
          </button>
          <div className="w-px h-4 bg-stone-700 dark:bg-stone-300 mx-1"></div>
          <button
            onClick={handleTranslate}
            className="flex items-center gap-2 px-3 py-1.5 hover:bg-stone-800 dark:hover:bg-stone-200 text-white dark:text-stone-900 rounded-lg text-sm font-medium transition-colors"
          >
            <Languages className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Translate</span>
          </button>
        </div>,
        document.body
      )}
    </>
  );
}

