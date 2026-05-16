import type { SVGProps } from "react";
import IconImage from "./IconImage";
import { iconImagePath, icons } from "./iconData";

const svg24IconNames = [
  "home",
  "card",
  "course",
  "tryout",
  "door",
  "people-circle-fill",
  "exam-multiple-choice",
  /** Path `eye-open` berada di grid 24×24; tanpa ini viewBox 41×41 membuat ikon tampil kecil. */
  "eye-open",
] as const;

type Svg24IconName = (typeof svg24IconNames)[number];

function isSvg24Icon(name: string): name is Svg24IconName {
  return (svg24IconNames as readonly string[]).includes(name);
}

type IconProps = SVGProps<SVGSVGElement> & {
  className?: string;
  pathClassName?: string;
  name:
    | "arrow-left-circle"
    | "card"
    | "chevron-down-fill"
    | "course"
    | "discount"
    | "door"
    | "exam-multiple-choice"
    | "exam-multiple-choice-outline"
    | "eye-closed"
    | "eye-open"
    | "google-fullcolor"
    | "hamburger-menu-toggle"
    | "home"
    | "lock"
    | "mail"
    | "people-circle-fill"
    | "spinner"
    | "slash-circle"
    | "text-box-edit-blue"
    | "time-outlined"
    | "tryout"
    | "";
  size?: number | string;
  fill?: string | null;
  onClick?: (event: React.MouseEvent<SVGSVGElement | HTMLImageElement>) => void;
};

const Icon = ({
  className,
  pathClassName,
  name,
  size,
  fill,
  onClick,
  ...props
}: IconProps) => {
  switch (name) {
    case "google-fullcolor":
    case "eye-closed":
    case "arrow-left-circle":
    case "discount":
    case "hamburger-menu-toggle":
    case "exam-multiple-choice-outline":
    case "text-box-edit-blue":
      return (
        <IconImage
          name={name as keyof typeof iconImagePath}
          src={iconImagePath[name as keyof typeof iconImagePath]?.src}
          alt={name}
          width={typeof size === "number" ? size : 24}
          height={typeof size === "number" ? size : 24}
          className={className}
          onClick={onClick as React.MouseEventHandler<HTMLImageElement>}
        />
      );

    case "time-outlined":
      return (
        <svg
          onClick={onClick}
          onKeyDown={
            !onClick
              ? undefined
              : (e) => {
                  if (onClick && e.key === "Enter") {
                    e.preventDefault();
                    // biome-ignore lint/suspicious/noExplicitAny: false positive
                    onClick(e as any);
                  }
                }
          }
          className={`${className}`}
          width={size || 20}
          height={size || 20}
          viewBox="0 0 20 20"
          {...props}
        >
          <title>{name || "Icon"}</title>
          <path
            className={pathClassName}
            d={icons[name]}
            fill={fill || "#777777"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "chevron-down-fill":
      return (
        <svg
          onClick={onClick}
          onKeyDown={
            !onClick
              ? undefined
              : (e) => {
                  if (onClick && e.key === "Enter") {
                    e.preventDefault();
                    // biome-ignore lint/suspicious/noExplicitAny: false positive
                    onClick(e as any);
                  }
                }
          }
          className={`${className}`}
          width={size || 16}
          height={size || 16}
          viewBox="0 0 16 16"
          {...props}
        >
          <title>{name}</title>
          <path
            className={pathClassName}
            d={icons[name]}
            fill={fill || "white"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      );

    case "":
      return (
        <svg
          onClick={onClick}
          onKeyDown={
            !onClick
              ? undefined
              : (e) => {
                  if (onClick && e.key === "Enter") {
                    e.preventDefault();
                    // biome-ignore lint/suspicious/noExplicitAny: false positive
                    onClick(e as any);
                  }
                }
          }
          className={`${className ? className : ""}`}
          width={size || 24}
          height={size || 24}
          viewBox="0 0 24 24"
          {...props}
        >
          <title>{name || "Icon"}</title>
          <path
            className={pathClassName}
            d={icons["slash-circle"]}
            fill={fill || "white"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      );

    default:
      if (isSvg24Icon(name)) {
        return (
          <svg
            onClick={onClick}
            onKeyDown={
              !onClick
                ? undefined
                : (e) => {
                    if (onClick && e.key === "Enter") {
                      e.preventDefault();
                      // biome-ignore lint/suspicious/noExplicitAny: false positive
                      onClick(e as any);
                    }
                  }
            }
            className={`${className}`}
            width={size || 24}
            height={size || 24}
            viewBox="0 0 24 24"
            {...props}
          >
            <title>{name}</title>
            <path
              className={pathClassName}
              d={icons[name]}
              fill={fill || "white"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        );
      }

      return (
        <svg
          onClick={onClick}
          onKeyDown={
            !onClick
              ? undefined
              : (e) => {
                  if (onClick && e.key === "Enter") {
                    e.preventDefault();
                    // biome-ignore lint/suspicious/noExplicitAny: false positive
                    onClick(e as any);
                  }
                }
          }
          className={`${className}`}
          width={size || 24}
          height={size || 24}
          viewBox="0 0 41 41"
          {...props}
        >
          <title>{name || "Icon"}</title>
          <path
            className={pathClassName}
            d={icons[name]}
            fill={fill || "white"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      );
  }
};

export type { IconProps };

export default Icon;
