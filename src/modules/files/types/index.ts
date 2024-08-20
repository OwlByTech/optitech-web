import { z } from 'zod';
import { DOCUMENT_STATUS } from './enum';

export type Directory = {
  id?: number;
  name?: string;
  parentId?: number;
  open?: boolean;
  document?: File[];
  directory?: Directory[];
  institutionId?: number;
};

export type File = {
  id: number;
  name: string;
};
export type ChangeDirectory = {
  id?: number;
  action?: 'delete-directory' | 'delete' | 'rename' | 'create' | 'upload';
};

export const CreateDirectoryReqValidator = z.object({
  parentId: z.number({ coerce: true }),
  institutionId: z.number({ coerce: true }).optional(),
  asesorId: z.number({ coerce: true }).optional(),
  name: z.string().min(1),
});

export const CreateDocumentReqValidator = z.object({
  directoryId: z.number({ coerce: true }),
  status: z.string(),
  files: z.any(),
});

export type CreateDocumentReq = {
  directoryId: number;
  status: DOCUMENT_STATUS.APROBADO;
  files: File[];
};

export type CreateDiretoryReq = {
  parentId: number;
  institutionId: number;
  name: string;
};

export type CreateDirectoryRes = {
  id: number;
  directoryId: number;
  institutionId: number;
  parentId: number;
  name: string;
};

export const DeleteDirectoryReqValidator = z.object({
  id: z.number({ coerce: true }),
});

export type DeleteDirectoryReq = {
  id: number;
};

export type DeleteDirectoryRes = boolean;

export const UpdateDirectoryReqValidator = z.object({
  directoryId: z.number({ coerce: true }),
  name: z.string(),
});

export type UpdateDirectoryReq = {
  directoryId: number;
  name: string;
};

export type DownloadDocumentRes = string;

export const DownloadDocumentReqValidator = z.object({
  id: z.number({ coerce: true }),
});

export type DownloadDocumentReq = {
  id: number;
};

export const DeleteDocumentReqValidator = z.object({
  id: z.number({ coerce: true }),
});

export type DeleteDocumentReq = {
  id: number;
};

export type DeleteDocumentRes = boolean;

export const RenameDocumentReqValidator = z.object({
  id: z.number({ coerce: true }),
  name: z.string(),
});

export type RenameDocumentReq = {
  id: number;
  name: string;
};

export type RenameDocumentRes = boolean;

export type FolderLayout = 'grid' | 'list';
