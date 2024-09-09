'use client';
import {FiFile} from 'react-icons/fi';
import {Document} from '../../types';

type Props = {
  document: Document;
};

export function FileViewTree(props: Props) {
  return (
    <div
      className={`flex flex-row w-full h-8 rounded-lg items-center bg-white text-black  border pl-3 text-xs gap-2`}
    >
      {props.document.name.includes('pdf') ? (
        <img src="/pdf.svg" className="h-4 w-4" />
      ) : props.document.name.includes('doc') ? (
        <img src="/doc.svg" className="h-4 w-4" />
      ) : (
        <FiFile strokeWidth={1} className="h-4 w-4" />
      )}
      <p className="truncate text-ellipsis">{props.document?.name}</p>
    </div>
  );
}
