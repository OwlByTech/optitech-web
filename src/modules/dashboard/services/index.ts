import { apiGet, apiSecureGet } from "@/modules/common/services";
import { ClientInfoRes } from "../types";
import { CommonServiceRes } from "@/modules/common/types";

export async function clientInfoService(): Promise<
  CommonServiceRes<ClientInfoRes | null>
> {
  try {
    const res = await apiSecureGet<ClientInfoRes>("/client");
    if (!res) {
      return {
        errors: [[""]],
      };
    }
    return {
      data: res,
    };
  } catch (e) {
    return {
      errors: [[""]],
    };
  }
}
