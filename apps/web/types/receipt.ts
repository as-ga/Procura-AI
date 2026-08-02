export interface Receipt {
  id: string;
  paymentId: string;
  procurementId: string;
  amount: number;
  currency: string;
  status: "SUCCESS";
  paidAt: string;
}
