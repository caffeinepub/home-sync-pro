import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useActor } from "./useActor";
import { ServiceType, ContactInquiry } from "../backend";

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
      return actor.submitContactInquiry(
        data.name,
        data.email,
        data.phone,
        data.message,
        data.serviceInterest
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inquiries"] });
    },
  });
}

export function useGetAllSubmissions() {
  const { actor, isFetching } = useActor();
  
  return useQuery<ContactInquiry[]>({
    queryKey: ["inquiries"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllInquiries();
    },
    enabled: !!actor && !isFetching,
  });
}
