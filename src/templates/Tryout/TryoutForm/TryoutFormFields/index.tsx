"use client";

import type { Control, UseFormRegister } from "react-hook-form";
import { Controller } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

import type { TryoutFormValues } from "../tryoutFormTypes";
import TryoutFormCurrencyField from "./TryoutFormCurrencyField";
import TryoutFormDateField from "./TryoutFormDateField";
import TryoutFormTimeRangeRow from "./TryoutFormTimeRangeRow";

const inputClassName = cn(
  "h-12 rounded-xl border border-neutral-3 bg-neutral-2 px-4 text-b3 text-neutral-6 shadow-none placeholder:text-neutral-5",
  "focus-visible:border-primary-4 focus-visible:ring-[3px] focus-visible:ring-primary-4/25",
);

const viewSelectTrigger = cn(
  "disabled:cursor-default disabled:opacity-100",
  "disabled:border-neutral-3 disabled:bg-neutral-2 disabled:text-neutral-6",
);

type TryoutFormFieldsProps = {
  control: Control<TryoutFormValues>;
  register: UseFormRegister<TryoutFormValues>;
  readOnly: boolean;
};

export default function TryoutFormFields({
  control,
  register,
  readOnly,
}: TryoutFormFieldsProps) {
  return (
    <div className="flex flex-col gap-5">
      <div className="space-y-2">
        <Label htmlFor="examName" className="text-b2 font-bold text-neutral-6">
          Nama Ujian
        </Label>
        <Input
          id="examName"
          readOnly={readOnly}
          className={cn(
            inputClassName,
            readOnly && "tryout-form-view-input cursor-default",
          )}
          placeholder="Contoh: Tryout Challenge #2"
          {...register("examName")}
        />
      </div>

      <Controller
        name="category"
        control={control}
        render={({ field }) => (
          <div className="space-y-2">
            <Label className="text-b2 font-bold text-neutral-6">
              Kategori Ujian
            </Label>
            <Select
              disabled={readOnly}
              value={field.value || undefined}
              onValueChange={(v) =>
                field.onChange(v as TryoutFormValues["category"])
              }
            >
              <SelectTrigger
                className={cn(
                  "h-12 rounded-xl border border-neutral-3 bg-neutral-2 px-4 text-b3 shadow-none focus-visible:ring-[3px] focus-visible:ring-primary-4/25",
                  viewSelectTrigger,
                )}
              >
                <SelectValue placeholder="Pilih" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="BUMN">BUMN</SelectItem>
                <SelectItem value="CPNS">CPNS</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      />

      <div className="space-y-2">
        <Label
          htmlFor="durationDisplay"
          className="text-b2 font-bold text-neutral-6"
        >
          Durasi
        </Label>
        <Input
          id="durationDisplay"
          readOnly={readOnly}
          className={cn(
            inputClassName,
            readOnly && "tryout-form-view-input cursor-default",
          )}
          placeholder="Contoh: 110 Menit"
          {...register("durationDisplay")}
        />
      </div>

      <TryoutFormTimeRangeRow
        control={control}
        readOnly={readOnly}
        fieldClassName={inputClassName}
      />

      <div className="space-y-2">
        <Label
          htmlFor="totalQuestions"
          className="text-b2 font-bold text-neutral-6"
        >
          Total Soal
        </Label>
        <Input
          id="totalQuestions"
          readOnly={readOnly}
          inputMode="numeric"
          className={cn(
            inputClassName,
            readOnly && "tryout-form-view-input cursor-default",
          )}
          placeholder="Contoh: 110"
          {...register("totalQuestions")}
        />
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="passingGrade"
          className="text-b2 font-bold text-neutral-6"
        >
          Passing Grade
        </Label>
        <Input
          id="passingGrade"
          readOnly={readOnly}
          inputMode="numeric"
          className={cn(
            inputClassName,
            readOnly && "tryout-form-view-input cursor-default",
          )}
          placeholder="Contoh: 87"
          {...register("passingGrade")}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="attempts" className="text-b2 font-bold text-neutral-6">
          Percobaan
          <span className="font-medium text-neutral-5">
            {" "}
            (attempt allow try again)
          </span>
        </Label>
        <Input
          id="attempts"
          readOnly={readOnly}
          inputMode="numeric"
          className={cn(
            inputClassName,
            readOnly && "tryout-form-view-input cursor-default",
          )}
          placeholder="Contoh: 3"
          {...register("attempts")}
        />
      </div>

      <Controller
        name="examType"
        control={control}
        render={({ field }) => (
          <div className="space-y-2">
            <Label className="text-b2 font-bold text-neutral-6">
              Tipe Ujian
            </Label>
            <Select
              disabled={readOnly}
              value={field.value || undefined}
              onValueChange={(v) =>
                field.onChange(v as TryoutFormValues["examType"])
              }
            >
              <SelectTrigger
                className={cn(
                  "h-12 rounded-xl border border-neutral-3 bg-neutral-2 px-4 text-b3 shadow-none focus-visible:ring-[3px] focus-visible:ring-primary-4/25",
                  viewSelectTrigger,
                )}
              >
                <SelectValue placeholder="Pilih" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="simulation">Simulasi</SelectItem>
                <SelectItem value="real">Real</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      />

      <TryoutFormCurrencyField
        id="priceAmount"
        label="Harga"
        register={register("priceAmount")}
        readOnly={readOnly}
        inputClassName={readOnly ? "tryout-form-view-input cursor-default" : ""}
      />

      <TryoutFormDateField
        control={control}
        readOnly={readOnly}
        fieldClassName={inputClassName}
      />

      <div className="space-y-2">
        <Label
          htmlFor="description"
          className="text-b2 font-bold text-neutral-6"
        >
          Deskripsi
        </Label>
        <Textarea
          id="description"
          readOnly={readOnly}
          rows={4}
          className={cn(
            "min-h-28 resize-y rounded-xl border border-neutral-3 bg-neutral-2 px-4 py-3 text-b3 text-neutral-6 shadow-none placeholder:text-neutral-5",
            "focus-visible:border-primary-4 focus-visible:ring-[3px] focus-visible:ring-primary-4/25",
            readOnly && "tryout-form-view-input cursor-default",
          )}
          placeholder="Ujian ini tentang...."
          {...register("description")}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes" className="text-b2 font-bold text-neutral-6">
          Catatan
        </Label>
        <Textarea
          id="notes"
          readOnly={readOnly}
          rows={3}
          className={cn(
            "min-h-24 resize-y rounded-xl border border-neutral-3 bg-neutral-2 px-4 py-3 text-b3 text-neutral-6 shadow-none placeholder:text-neutral-5",
            "focus-visible:border-primary-4 focus-visible:ring-[3px] focus-visible:ring-primary-4/25",
            readOnly && "tryout-form-view-input cursor-default",
          )}
          placeholder="Catatan ini....."
          {...register("notes")}
        />
      </div>
    </div>
  );
}
