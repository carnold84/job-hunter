export type ApplicationStatus = "pending" | "failed" | "success";

export interface Job {
  application: {
    appliedAt: string | null;
    status: ApplicationStatus | null;
    method: string | null;
  };
  createdAt: string;
  id: string;
  location: string | null;
  notes: string | null;
  poster: string | null;
  status: "active" | "expired";
  title: string | null;
  updatedAt: string;
  url: string | null;
}

export type JobCreate = Omit<Job, "createdAt" | "id" | "updatedAt">;

export type JobUpdate = Omit<Job, "createdAt" | "id" | "updatedAt">;

export interface Toast {
  canClose?: boolean;
  id: string;
  text?: string;
  timeoutMS?: number;
  title: string;
  type?: "error" | "info" | "success" | "warning";
}

export type ToastCreate = Omit<Toast, "id">;
