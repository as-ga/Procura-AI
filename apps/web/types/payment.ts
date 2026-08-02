export interface Payment {
  id: string;
  procurementId: string;
  amount: number;
  sessionToken: string;
  iframeUrl: string;
  status: "PENDING" | "SUCCESS" | "FAILED";
}
