export type ContactMessage = {
  id: string
  name: string
  email: string
  message: string
  createdAt: string
}

export type CreateMessageInput = Pick<ContactMessage, 'name' | 'email' | 'message'>
