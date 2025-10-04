"use client"

import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import type { ChatConversation, ChatUser } from "@/types/chat"
import { formatDate } from "./utils"

interface ChatContactProps {
  conversation: ChatConversation
  otherUser: ChatUser
  onOpenConversation: (conversationId: string) => void
}

export default function ChatContact({ conversation, otherUser, onOpenConversation }: ChatContactProps) {
  return (
    <div
      className="flex items-center gap-3 p-4 hover:bg-accent cursor-pointer border-b border-border"
      onClick={() => onOpenConversation(conversation.id)}
    >
      {conversation.unreadCount > 0 && (
        <Badge className="bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center p-0">
          {conversation.unreadCount}
        </Badge>
      )}

      <div className="relative">
        <Image
          src={otherUser.avatar || "/placeholder.svg"}
          alt={otherUser.name}
          width={40}
          height={40}
          className="rounded-lg"
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm">{otherUser.name}</h3>
          <span className="text-xs text-muted-foreground">{formatDate(conversation.lastMessage.timestamp)}</span>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">{otherUser.username}</p>
        </div>
        <p className="text-xs text-muted-foreground truncate mt-1">{conversation.lastMessage.content}</p>
      </div>
    </div>
  )
}
