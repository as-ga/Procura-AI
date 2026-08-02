"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { api } from "@/lib/axios";

import { Button, Card, Textarea } from "@repo/ui";

type FormData = {
  prompt: string;
};

export default function PromptForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      prompt: "",
    },
  });

  async function onSubmit(data: FormData) {
    try {
      setLoading(true);
      const res = await api.post("/procurements", data);
      reset();
      router.push(`/procurement/${res.data.data.id}`);
    } catch (err) {
      console.error(err);
      alert("Failed to generate procurement.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="mx-auto mt-10 w-full max-w-3xl p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Textarea
          rows={7}
          placeholder="Set up workstations for 5 frontend developers with a budget of $7000..."
          {...register("prompt", {
            required: true,
          })}
        />

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            "Generate Procurement"
          )}
        </Button>
      </form>
    </Card>
  );
}
