import { z } from "zod";
import { CommonActionState } from "../types/action";

function formDataToObject(formData: FormData) {
  // Converts FormData to a plain object.
  // If there are multiple values for the same key in FormData, they are collected into an array.
  const entries: Record<string, any> = {};

  formData.forEach((v: any, k: string) => {
    if (!entries[k]) {
      entries[k] = v;
      return;
    }

    if (!Array.isArray(entries[k])) {
      entries[k] = [entries[k]];
    }
    entries[k].push(v);
  });

  return entries;
}

export async function BaseFormActionService(
  state: CommonActionState,
  payload: FormData,
  validator: z.ZodObject<any>,
  service: (req: any) => null | any
): Promise<CommonActionState> {
  const validateFields = validator.safeParse(formDataToObject(payload));

  if (validateFields.error) {
    return {
      errors: Object.entries(validateFields.error.flatten().fieldErrors).map(
        (e) => e[1]
      ),
    };
  }

  return await service(validateFields.data);
}
