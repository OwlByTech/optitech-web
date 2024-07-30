import { apiGet, apiSecureGet } from "@/modules/common/services";
import { ClientInfoRes } from "../types";
import { CommonServiceRes } from "@/modules/common/types";

export async function clientInfoService(): Promise<
  CommonServiceRes<ClientInfoRes | null>
> {
  try {
    const res = await apiSecureGet<ClientInfoRes>("/client");
    // TODO: Implement endpoints error handling
    // @ts-ignore
    if (res.error) {
      return {
        errors: [[""]],
      };
    }
    return {
      data: res,
    };
  } catch (e) {
    const error = e as Error;
    return {
      errors: [[error.message]],
    };
  }
}
