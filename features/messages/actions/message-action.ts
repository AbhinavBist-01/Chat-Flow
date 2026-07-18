"user server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/features/auth/actions/require-user";
import { prisma } from "@/lib/db";
import type { MessageRole } from "@/lib/generated/prisma/client";
import { z } from "zod";
import { assertOwnsConversation } from "@/features/conversation/actions/conversation-action";

export type MessageType = {
  id: string;
  conversationId: string;
  role: MessageRole;
  status: "PENDING" | "SUCCESS" | "ERROR";
  content: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export async function listMessages(
  conversationId: string,
): Promise<MessageType[]> {
  const user = await requireUser();
  await assertOwnsConversation(conversationId, user.id);

  return prisma.message.findMany({
    where: { conversationId },
    orderBy: { createdAt: "asc" },
    select: {
      id: true,
      conversationId: true,
      role: true,
      status: true,
      content: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

export async function createMessage(conversationId: string, content: string) {
  const user = await requireUser();
  const conversation = await assertOwnsConversation(conversationId, user.id);

  const trimmed = content.trim();
  if (!trimmed) {
    throw new Error("Message cannot be empty");
  }

  const message = await prisma.message.create({
    data: {
      conversationId,
      role: "USER",
      status: "SUCCESS",
      content: trimmed,
    },
  });

  const shouldRename =
    conversation.title === "New Chat" || conversation.title.trim() === "";

  await prisma.conversation.update({
    where: { id: conversationId },
    data: {
      lastMessageAt: new Date(),
      ...(shouldRename
        ? {
            title: trimmed.length > 48 ? `${trimmed.slice(0, 48)}…` : trimmed,
          }
        : {}),
    },
  });

  revalidatePath("/");
  revalidatePath(`/c/${conversationId}`);
  return message;
}

/** Update message text (e.g. edit). */
export async function updateMessage(messageId: string, content: string) {
  const user = await requireUser();
  const trimmed = content.trim();

  if (!trimmed) {
    throw new Error("Message cannot be empty");
  }

  const existing = await prisma.message.findUnique({
    where: { id: messageId },
    include: { conversation: true },
  });

  if (!existing || existing.conversation.userId !== user.id) {
    throw new Error("Message not found");
  }

  const message = await prisma.message.update({
    where: { id: messageId },
    data: { content: trimmed },
  });

  revalidatePath(`/c/${existing.conversationId}`);
  return message;
}

/** Delete a single message. */
export async function deleteMessage(messageId: string) {
  const user = await requireUser();

  const existing = await prisma.message.findUnique({
    where: { id: messageId },
    include: { conversation: true },
  });

  if (!existing || existing.conversation.userId !== user.id) {
    throw new Error("Message not found");
  }

  await prisma.message.delete({ where: { id: messageId } });

  revalidatePath(`/c/${existing.conversationId}`);
  return { id: messageId, conversationId: existing.conversationId };
}
