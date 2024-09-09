import {clx} from '@/utils/clx';
import {DragEvent, ReactNode, useRef} from 'react';

export type DragAndDropProps = {
  children: ReactNode;
  className?: string;
  onDrop: (e: DragEvent<HTMLDivElement>) => void;
};

export function DragAndDrop(props: DragAndDropProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (containerRef.current) {
      containerRef.current.classList.add('h-full');
      containerRef.current.classList.add('opacity-30');
      containerRef.current.classList.remove('h-0');
      containerRef.current.classList.remove('opacity-0');
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (containerRef.current) {
      containerRef.current.classList.add('h-0');
      containerRef.current.classList.add('opacity-0');
      containerRef.current.classList.remove('h-full');
      containerRef.current.classList.remove('opacity-30');
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (containerRef.current) {
      containerRef.current.classList.add('h-0');
      containerRef.current.classList.add('opacity-0');
      containerRef.current.classList.remove('h-full');
      containerRef.current.classList.remove('opacity-30');
    }

    props.onDrop(e);
  };

  return (
    <div
      className="relative w-full h-full"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div
        className={clx('absolute w-full h-0 z-10 opacity-0 bottom-0 ease-in-out', props.className)}
        ref={containerRef}
      />
      {props.children}
    </div>
  );
}
