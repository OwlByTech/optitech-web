import { useEffect } from "react";
import { CommonActionState } from "../types/action";
import { toast } from "sonner";

export type UseFormResponseProps = {
  response: CommonActionState;
  onSuccess?: () => void;
};

export function useFormResponse(props: UseFormResponseProps) {
  useEffect(() => {
    const errors = props.response.errors;
    if (errors?.length == 0) return;

    if (errors && errors.length > 0) {
      errors.forEach((error) => error?.forEach((e) => toast.error(e)));
      return;
    }

    toast.success(props.response?.message);
    props.onSuccess && props.onSuccess();
  }, [props.response]);
}
