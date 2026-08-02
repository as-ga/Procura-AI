export type PaymentStatus = "PENDING" | "SUCCESS" | "FAILED";

export interface Payment {
  id: string;
  procurementId: string;
  amount: number;
  sessionToken: string;
  iframeUrl: string;
  status: PaymentStatus;
  createdAt: string;
  updatedAt: string;
}
