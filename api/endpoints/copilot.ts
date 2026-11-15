import { waterApi } from "@/api/waterApi";
import type {
  CopilotConversationDTO,
  CopilotMessageDTO,
  CopilotMessageRequest,
  CopilotReplyDTO,
  OpenConversationDTO,
  ReplenishmentDraftCreateDTO,
  ReplenishmentDraftDTO,
  ReplenishmentDraftUpdateDTO,
  TelegramLinkStartDTO,
  TelegramLinkStatusDTO,
} from "@/interfaces/types";

/** GET /copilot/conversations */
export async function listConversations(): Promise<CopilotConversationDTO[]> {
  const { data } = await waterApi.get<CopilotConversationDTO[]>("/copilot/conversations");
  return data;
}

/** POST /copilot/conversations */
export async function openConversation(
  body: OpenConversationDTO = {}
): Promise<CopilotConversationDTO> {
  const { data } = await waterApi.post<CopilotConversationDTO>("/copilot/conversations", body);
  return data;
}

/** GET /copilot/conversations/{id}/messages */
export async function getConversationMessages(
  conversationId: string
): Promise<CopilotMessageDTO[]> {
  const { data } = await waterApi.get<CopilotMessageDTO[]>(
    `/copilot/conversations/${conversationId}/messages`
  );
  return data;
}

/** POST /copilot/conversations/{id}/messages */
export async function sendConversationMessage(
  conversationId: string,
  body: CopilotMessageRequest
): Promise<CopilotReplyDTO> {
  const { data } = await waterApi.post<CopilotReplyDTO>(
    `/copilot/conversations/${conversationId}/messages`,
    body
  );
  return data;
}

/** POST /copilot/chat */
export async function sendChatMessage(body: CopilotMessageRequest): Promise<CopilotReplyDTO> {
  const { data } = await waterApi.post<CopilotReplyDTO>("/copilot/chat", body);
  return data;
}

/** GET /copilot/telegram/link */
export async function getTelegramLinkStatus(): Promise<TelegramLinkStatusDTO> {
  const { data } = await waterApi.get<TelegramLinkStatusDTO>("/copilot/telegram/link");
  return data;
}

/** POST /copilot/telegram/link */
export async function startTelegramLink(): Promise<TelegramLinkStartDTO> {
  const { data } = await waterApi.post<TelegramLinkStartDTO>("/copilot/telegram/link");
  return data;
}

/** DELETE /copilot/telegram/link */
export async function unlinkTelegram(): Promise<void> {
  await waterApi.delete("/copilot/telegram/link");
}

/** GET /copilot/replenishment-drafts */
export async function listReplenishmentDrafts(): Promise<ReplenishmentDraftDTO[]> {
  const { data } = await waterApi.get<ReplenishmentDraftDTO[]>("/copilot/replenishment-drafts");
  return data;
}

/** POST /copilot/replenishment-drafts */
export async function createReplenishmentDraft(
  body: ReplenishmentDraftCreateDTO
): Promise<ReplenishmentDraftDTO> {
  const { data } = await waterApi.post<ReplenishmentDraftDTO>(
    "/copilot/replenishment-drafts",
    body
  );
  return data;
}

/** PATCH /copilot/replenishment-drafts/{id} */
export async function updateReplenishmentDraft(
  idBorrador: number,
  body: ReplenishmentDraftUpdateDTO
): Promise<ReplenishmentDraftDTO> {
  const { data } = await waterApi.patch<ReplenishmentDraftDTO>(
    `/copilot/replenishment-drafts/${idBorrador}`,
    body
  );
  return data;
}
