export interface Notification {
  type: NotificationType;
  message: string;
  title: string;
  class?: string;
}

export enum NotificationType {
  SUCCESS = "success",
	INFO = "info",
	WARNING = "warning",
  DANGER = "danger",
	PRIMARY = "primary",
  SECONDARY = "secondary",
  LIGHT = "light",
  DARK = "dark",
}
