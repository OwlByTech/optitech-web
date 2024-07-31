'use client';
import {LinkRef} from '@/modules/common/components/link-ref';
import {FiFile, FiFolder} from 'react-icons/fi';
import {File} from '../../types';

type Props = {
  document: File;
};

export function FileViewTree({document}: Props) {
  return (
    <LinkRef
      href={document.name}
      className={`flex flex-row w-full h-8 rounded-lg items-center bg-white text-black  border pl-3 p-1 text-xs gap-2   `}
    >
      {document.name.includes('pdf') ? (
        <img src="/pdf.svg" className="h-4 w-4" />
      ) : document.name.includes('doc') ? (
        <img src="/doc.svg" className="h-4 w-4" />
      ) : (
        <FiFile strokeWidth={1} className="h-4 w-4" />
      )}
      <p className="truncate text-ellipsis">{document?.name}</p>
    </LinkRef>
  );
}
