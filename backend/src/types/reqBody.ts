export type UpdateTaskBody = {
    title?: string;
    description?: string;
    storyPoints?: number;
    priority: "LOW" | "MEDIUM" | "HIGH" | "HIGHEST";
  };