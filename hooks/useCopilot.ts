"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as copilotApi from "@/api/endpoints/copilot";
import type {
  CopilotMessageRequest,
  OpenConversationDTO,
  ReplenishmentDraftCreateDTO,
  ReplenishmentDraftUpdateDTO,
} from "@/interfaces/types";

const COPILOT_QUERY_KEY = ["copilot"];

export function useCopilot(companyId: string | null) {
  const queryClient = useQueryClient();

  const useConversations = () => {
    return useQuery({
      queryKey: [...COPILOT_QUERY_KEY, "conversations", companyId],
      queryFn: () => (companyId ? copilotApi.listConversations() : Promise.resolve([])),
      enabled: !!companyId,
      staleTime: 1000 * 30,
    });
  };

  const useMessages = (conversationId: string | null) => {
    return useQuery({
      queryKey: [...COPILOT_QUERY_KEY, "messages", conversationId],
      queryFn: () =>
        conversationId
          ? copilotApi.getConversationMessages(conversationId)
          : Promise.resolve([]),
      enabled: !!conversationId,
      staleTime: 1000 * 10,
    });
  };

  const useOpenConversation = () => {
    return useMutation({
      mutationFn: (body: OpenConversationDTO = {}) => copilotApi.openConversation(body),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: COPILOT_QUERY_KEY });
      },
    });
  };

  const useSendMessage = () => {
    return useMutation({
      mutationFn: ({
        conversationId,
        body,
      }: {
        conversationId: string;
        body: CopilotMessageRequest;
      }) => copilotApi.sendConversationMessage(conversationId, body),
      onSuccess: (_data, variables) => {
        queryClient.invalidateQueries({
          queryKey: [...COPILOT_QUERY_KEY, "messages", variables.conversationId],
        });
        queryClient.invalidateQueries({ queryKey: [...COPILOT_QUERY_KEY, "conversations"] });
        queryClient.invalidateQueries({ queryKey: [...COPILOT_QUERY_KEY, "drafts"] });
      },
    });
  };

  const useSendChatMessage = () => {
    return useMutation({
      mutationFn: (body: CopilotMessageRequest) => copilotApi.sendChatMessage(body),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: COPILOT_QUERY_KEY });
      },
    });
  };

  const useTelegramStatus = () => {
    return useQuery({
      queryKey: [...COPILOT_QUERY_KEY, "telegram", "status"],
      queryFn: () => copilotApi.getTelegramLinkStatus(),
      enabled: !!companyId,
      staleTime: 1000 * 60,
    });
  };

  const useStartTelegramLink = () => {
    return useMutation({
      mutationFn: () => copilotApi.startTelegramLink(),
    });
  };

  const useUnlinkTelegram = () => {
    return useMutation({
      mutationFn: () => copilotApi.unlinkTelegram(),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [...COPILOT_QUERY_KEY, "telegram"] });
      },
    });
  };

  const useReplenishmentDrafts = () => {
    return useQuery({
      queryKey: [...COPILOT_QUERY_KEY, "drafts", companyId],
      queryFn: () => (companyId ? copilotApi.listReplenishmentDrafts() : Promise.resolve([])),
      enabled: !!companyId,
      staleTime: 1000 * 30,
    });
  };

  const useCreateReplenishmentDraft = () => {
    return useMutation({
      mutationFn: (body: ReplenishmentDraftCreateDTO) =>
        copilotApi.createReplenishmentDraft(body),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [...COPILOT_QUERY_KEY, "drafts"] });
      },
    });
  };

  const useUpdateReplenishmentDraft = () => {
    return useMutation({
      mutationFn: ({
        idBorrador,
        body,
      }: {
        idBorrador: number;
        body: ReplenishmentDraftUpdateDTO;
      }) => copilotApi.updateReplenishmentDraft(idBorrador, body),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [...COPILOT_QUERY_KEY, "drafts"] });
      },
    });
  };

  return {
    useConversations,
    useMessages,
    useOpenConversation,
    useSendMessage,
    useSendChatMessage,
    useTelegramStatus,
    useStartTelegramLink,
    useUnlinkTelegram,
    useReplenishmentDrafts,
    useCreateReplenishmentDraft,
    useUpdateReplenishmentDraft,
  };
}
