import { startNewChat } from "@/features/home/actions/start-new-chat";
import { redirect } from "next/navigation";

export default async function Page() {
  const conversationId = await startNewChat();
  redirect(`/c/${conversationId}`);
}
