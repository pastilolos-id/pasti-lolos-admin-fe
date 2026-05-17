import type { inputDataType } from "@/components/Form/InputElement/types";

const loginInputData: inputDataType[] = [
  {
    type: "email",
    name: "email",
    autoComplete: "username",
    label: "Email",
    placeholder: "contoh@gmail.com",
    className: "",
    leftIcon: "mail",
    required: true,
    variant: "auth",
  },
  {
    type: "password",
    name: "password",
    label: "Password",
    autoComplete: "current-password",
    placeholder: "********",
    className: "",
    required: true,
    variant: "auth",
  },
];

export { loginInputData };
