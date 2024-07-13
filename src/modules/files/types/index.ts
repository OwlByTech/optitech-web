import { coerce, z } from "zod";

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

export const CreateDirectoryReqValidator = z.object({
  parentId: z.number({ coerce: true }),
  institutionId: z.number({ coerce: true }),
  name: z.string().min(1),
});

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
