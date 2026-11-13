import React, { forwardRef, useEffect, useRef, useImperativeHandle, useState } from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  icon?: React.ReactNode;
  rightElement?: React.ReactNode;
  containerClassName?: string;
  error?: string;
  autoResize?: boolean;
  maxHeight?: number;
  renderOverlay?: (value: string) => React.ReactNode;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      label,
      icon,
      rightElement,
      className = '',
      containerClassName = '',
      error,
      id,
      autoResize = false,
      maxHeight = 120,
      onChange,
      value,
      renderOverlay,
      ...props
    },
    ref,
  ) => {
    const innerRef = useRef<HTMLTextAreaElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const [scrollbarWidth, setScrollbarWidth] = useState(0);
    useImperativeHandle(ref, () => innerRef.current!);

    const inputId =
      id || (label ? `textarea-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);

    useEffect(() => {
      if (!autoResize || !innerRef.current) return;
      const el = innerRef.current;
      el.style.height = 'auto';
      const target = Math.min(el.scrollHeight, maxHeight);
      el.style.height = `${target}px`;
    }, [value, autoResize, maxHeight]);

    useEffect(() => {
      if (!innerRef.current) return;
      const ro = new ResizeObserver(() => {
        if (innerRef.current) {
          const diff = innerRef.current.offsetWidth - innerRef.current.clientWidth;
          setScrollbarWidth(Math.max(0, diff - 2));
        }
      });
      ro.observe(innerRef.current);
      return () => ro.disconnect();
    }, []);

    return (
      <div className={`flex flex-col gap-1.5 w-full ${containerClassName}`}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-caption font-semibold text-ink-2 ml-1 cursor-pointer"
          >
            {label}
          </label>
        )}
        <div
          className={`
        relative group overflow-hidden
        bg-surface border border-line transition-all duration-200
        ${props.disabled ? 'opacity-50 bg-canvas cursor-not-allowed' : 'focus-within:border-accent focus-within:ring-2 focus-within:ring-focus/50 hover:border-line-strong'}
        ${!className.includes('rounded-') ? 'rounded-control' : ''}
        ${error ? 'border-danger ring-2 ring-danger/50' : ''}
        ${className}
      `}
        >
          {renderOverlay && (
            <div
              aria-hidden="true"
              ref={(el) => {
                overlayRef.current = el;
                if (el && innerRef.current) el.scrollTop = innerRef.current.scrollTop;
              }}
              className={`
              absolute inset-0 w-full h-full pointer-events-none
              bg-transparent outline-none text-base leading-relaxed resize-none
              whitespace-pre-wrap break-words text-ink
              ${icon ? 'pl-11' : 'pl-4'}
              ${!className.includes('py-') ? 'py-2' : ''}
              overflow-hidden z-20
            `}
              style={{
                paddingTop: innerRef.current
                  ? getComputedStyle(innerRef.current).paddingTop
                  : '8px',
                paddingBottom: innerRef.current
                  ? getComputedStyle(innerRef.current).paddingBottom
                  : '8px',
                paddingRight: `calc(${rightElement ? '2rem' : '1rem'} + ${scrollbarWidth}px)`,
              }}
            >
              {renderOverlay((value as string) || '')}
            </div>
          )}

          {icon && (
            <div className="absolute top-3 left-0 pl-3.5 flex items-start pointer-events-none text-ink-3 group-focus-within:text-accent transition-colors duration-200">
              {icon}
            </div>
          )}

          <textarea
            ref={innerRef}
            id={inputId}
            className={`
            block w-full bg-transparent outline-none border-none text-base leading-relaxed resize-none
            ${renderOverlay ? 'text-transparent caret-accent selection:bg-accent/20 selection:text-transparent' : 'text-ink'}
            placeholder:text-ink-3
            ${icon ? 'pl-11' : 'pl-4'}
            ${rightElement ? 'pr-8' : 'pr-4'}
            ${!className.includes('py-') ? 'py-2' : ''}
            ${!className.includes('min-h-') ? 'min-h-[40px]' : ''}
            overflow-y-auto scroll-hide
            relative z-10
          `}
            rows={1}
            value={value}
            onScroll={(e) => {
              if (overlayRef.current)
                overlayRef.current.scrollTop = (e.target as HTMLTextAreaElement).scrollTop;
              props.onScroll?.(e);
            }}
            onChange={onChange}
            style={{ caretColor: 'var(--color-accent)' }}
            {...props}
          />

          {rightElement && (
            <div className="absolute bottom-1 right-1 pr-1 flex items-center h-8 z-20">
              {rightElement}
            </div>
          )}
        </div>
        {error && (
          <p className="mt-0.5 ml-1 text-xs font-medium text-danger flex items-center gap-1 animate-fade-in">
            {error}
          </p>
        )}
      </div>
    );
  },
);

TextArea.displayName = 'TextArea';
