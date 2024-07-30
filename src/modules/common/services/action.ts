import { z } from "zod";
import { CommonActionState } from "../types/action";

export async function BaseFormActionService(
  state: CommonActionState,
  payload: FormData,
  validator: z.ZodObject<any>,
  service: (req: any) => null | any
): Promise<CommonActionState> {
  const entries = Object.fromEntries(payload.entries());
  const validateFields = validator.safeParse(entries);

  if (validateFields.error) {
    return {
      errors: Object.entries(validateFields.error.flatten().fieldErrors).map(
        (e) => e[1]
      ),
    };
  }

  const res = await service(validateFields.data);
  if (res.errors) {
    console.log(res.errors);
    return {
      errors: res.errors,
    };
  }

  return {
    message: res.message,
  };
}
