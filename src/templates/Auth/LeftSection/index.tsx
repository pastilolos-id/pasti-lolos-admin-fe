import Link from "next/link";
import type { DetailedHTMLProps, HTMLAttributes } from "react";
import BrandWordmark from "@/components/BrandWordmark";
import { cn } from "@/lib/utils";

type AuthLeftSectionProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  title: string;
};

export default function AuthLeftSection({
  title,
  className,
  children,
  ...props
}: AuthLeftSectionProps) {
  return (
    <div
      {...props}
      className={cn(
        "bg-gradient-root-layout min-h-screen py-10 px-4 md:px-20 flex flex-col items-center justify-center gap-11",
        className,
      )}
    >
      <Link href="/" className="block text-center">
        <BrandWordmark
          variant="putih"
          className="justify-center"
          textClassName="text-[2rem] font-bold -tracking-widest"
          size={40}
        />
      </Link>

      <section className="flex flex-col gap-7 w-full max-w-md mx-auto">
        <h1 className="text-center text-h3 font-bold tracking-normal leading-10 flex flex-col gap-7 lg:gap-4">
          {title}
        </h1>

        {title === "Masuk" && (
          <p className="text-center text-b3 md:text-b1 max-w-80 md:max-w-120 mx-auto">
            Silahkan masuk dengan email yang sudah terdaftar
          </p>
        )}

        {children}
      </section>
    </div>
  );
}
