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
          placeholder="Contoh: Tryout SKD CPNS — Paket Lengkap"
          {...register("examName")}
        />
      </div>

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

      <Controller
        name="subjectId"
        control={control}
        render={({ field }) => (
          <div className="space-y-2">
            <Label className="text-b2 font-bold text-neutral-6">
              Mata Pelajaran / Kategori
            </Label>
            <Select
              disabled={readOnly}
              value={field.value || undefined}
              onValueChange={field.onChange}
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
                <SelectItem value="1">BUMN</SelectItem>
                <SelectItem value="2">CPNS</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      />

      <div className="space-y-2">
        <Label
          htmlFor="durationMinutes"
          className="text-b2 font-bold text-neutral-6"
        >
          Durasi (menit)
        </Label>
        <Input
          id="durationMinutes"
          readOnly={readOnly}
          inputMode="numeric"
          className={cn(
            inputClassName,
            readOnly && "tryout-form-view-input cursor-default",
          )}
          placeholder="Contoh: 100"
          {...register("durationMinutes")}
        />
      </div>

      <Controller
        name="status"
        control={control}
        render={({ field }) => (
          <div className="space-y-2">
            <Label className="text-b2 font-bold text-neutral-6">Status</Label>
            <Select
              disabled={readOnly}
              value={field.value || undefined}
              onValueChange={field.onChange}
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
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      />

      <div className="space-y-2">
        <Label
          htmlFor="passingScore"
          className="text-b2 font-bold text-neutral-6"
        >
          Passing Grade
        </Label>
        <Input
          id="passingScore"
          readOnly={readOnly}
          inputMode="numeric"
          className={cn(
            inputClassName,
            readOnly && "tryout-form-view-input cursor-default",
          )}
          placeholder="Contoh: 70"
          {...register("passingScore")}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="price" className="text-b2 font-bold text-neutral-6">
          Harga
        </Label>
        <Input
          id="price"
          readOnly={readOnly}
          inputMode="numeric"
          className={cn(
            inputClassName,
            readOnly && "tryout-form-view-input cursor-default",
          )}
          placeholder="Contoh: 149000"
          {...register("price")}
        />
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="attemptsAllowed"
          className="text-b2 font-bold text-neutral-6"
        >
          Percobaan
        </Label>
        <Input
          id="attemptsAllowed"
          readOnly={readOnly}
          inputMode="numeric"
          className={cn(
            inputClassName,
            readOnly && "tryout-form-view-input cursor-default",
          )}
          placeholder="Contoh: 1"
          {...register("attemptsAllowed")}
        />
      </div>
    </div>
  );
}
