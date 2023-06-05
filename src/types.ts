export type ApplicationStatus = "pending" | "failed" | "success" | null;

export interface Job {
  application: {
    appliedAt?: string;
    status: ApplicationStatus;
    method?: string;
  };
  createdAt: string;
  id: string;
  location?: string;
  notes?: string;
  poster?: string;
  status: "active" | "expired";
  title: string;
}

export interface Toast {
  canClose?: boolean;
  id: string;
  text?: string;
  timeoutMS?: number;
  title: string;
  type?: "error" | "info" | "success" | "warning";
}
