import type { VoucherDisplayStatus } from "@/templates/Vouchers/VoucherPage/types";

export type VoucherFormMode = "create" | "edit";

export type VoucherFormValues = {
  judul: string;
  kode: string;
  startDate: string;
  endDate: string;
  nilai: string;
  status: VoucherDisplayStatus;
};

export type VoucherFormProps =
  | {
      mode: "create";
      /** Remount form when adding another voucher after success. */
      formKey?: number;
      onSubmit: (values: VoucherFormValues) => void;
    }
  | {
      mode: "edit";
      voucherId: string;
      initialValues: VoucherFormValues;
      onSubmit: (values: VoucherFormValues) => void;
    };
