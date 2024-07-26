import { ReactNode, RefObject } from "react";
export type ToastProps = {
  id: number;
  type?: string | "success" | "info" | "warning" | "error";
  message?: ReactNode;
  duration?: number;
  position?: ToastPositionType;
  icon?: ReactNode | boolean;
};

export type ToastPositionType =
  | "topLeft"
  | "topCenter"
  | "topRight"
  | "bottomRight"
  | "bottomCenter"
  | "bottomLeft";

export type RequiredToastProps = Required<ToastProps>;

export type ToastContextType = {
  add: (toast: Omit<ToastProps, "id">) => void;
  remove: (toastId: number, ref: RefObject<HTMLDivElement>) => void;
  position: ToastPositionType;
};

export class ToastSuccess {
  type = "success";
  duration = 3000;
  position = "topRight" as ToastPositionType;
  icon = "";
  message;
  constructor(message: ReactNode) {
    this.message = message;
  }
}

export class ToastError {
  type = "error";
  duration = 5000;
  position = "topRight" as ToastPositionType;
  icon = "";
  message;
  constructor(message: ReactNode) {
    this.message = message;
  }
}
