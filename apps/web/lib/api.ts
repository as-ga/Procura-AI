import { api } from "./axios";

export const procurementApi = {
  create(prompt: string) {
    return api.post("/procurements", {
      prompt,
    });
  },

  get(id: string) {
    return api.get(`/procurements/${id}`);
  },

  approve(id: string) {
    return api.patch(`/procurements/${id}/approve`);
  },
};

export async function getProcurement(id: string) {
  const res = await api.get(`/procurements/${id}`);
  return res.data.data;
}

export const paymentApi = {
  async create(procurementId: string) {
    const res = await api.post("/payments", {
      procurementId,
    });
    return res.data.data;
  },

  async get(id: string) {
    const res = await api.get(`/payments/${id}`);
    return res.data.data;
  },

  async success(id: string) {
    const res = await api.patch(`/payments/${id}/success`);
    return res.data.data;
  },
};

export const receiptApi = {
  async get(id: string) {
    const res = await api.get(`/receipts/${id}`);

    return res.data.data;
  },
};
