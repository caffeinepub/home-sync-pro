import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useActor } from "./useActor";
import { ServiceType } from "../backend";

export function useSubmitContactForm() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      phone: string;
      message: string;
      serviceInterest: ServiceType;
    }) => {
      if (!actor) throw new Error("Actor not initialized");
      return actor.submitContactForm(
        data.name,
        data.email,
        data.phone,
        data.message,
        data.serviceInterest
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["submissions"] });
    },
  });
}
