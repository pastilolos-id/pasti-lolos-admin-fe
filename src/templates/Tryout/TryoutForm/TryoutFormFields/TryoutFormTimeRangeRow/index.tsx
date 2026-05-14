"use client";

import type { Control } from "react-hook-form";
import { Controller } from "react-hook-form";

import type { TryoutFormValues } from "../../tryoutFormTypes";
import TryoutFormTimePicker from "./TryoutFormTimePicker";

type TryoutFormTimeRangeRowProps = {
  control: Control<TryoutFormValues>;
  readOnly: boolean;
  fieldClassName: string;
};

export default function TryoutFormTimeRangeRow({
  control,
  readOnly,
  fieldClassName,
}: TryoutFormTimeRangeRowProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Controller
        name="startTime"
        control={control}
        render={({ field }) => (
          <TryoutFormTimePicker
            id="tryout-start-time"
            label="Mulai Ujian"
            value={field.value}
            onChange={field.onChange}
            readOnly={readOnly}
            triggerClassName={fieldClassName}
          />
        )}
      />
      <Controller
        name="endTime"
        control={control}
        render={({ field }) => (
          <TryoutFormTimePicker
            id="tryout-end-time"
            label="Selesai Ujian"
            value={field.value}
            onChange={field.onChange}
            readOnly={readOnly}
            triggerClassName={fieldClassName}
          />
        )}
      />
    </div>
  );
}
