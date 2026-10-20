import { apiClient } from '../lib/apiClient'
import type { ContactMessage, CreateMessageInput } from '../types/message'

export function sendMessage(input: CreateMessageInput) {
  return apiClient.post<ContactMessage>('/messages', input)
}
