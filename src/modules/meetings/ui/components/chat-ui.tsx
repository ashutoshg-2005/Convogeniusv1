import { useState, useEffect } from "react";
import {useMutation} from "@tanstack/react-query";
import type {Channel as StreamChannel} from "stream-chat";
import{
  useCreateChatClient,
  Chat,
  Channel,
  MessageList,
  Thread,
  Window
} from "stream-chat-react";

import {useTRPC} from "@/trpc/client";
import { LoadingState } from "@/components/loading-state";
import { AnimatedAIChat } from "@/components/ui/animated-ai-chat";

import "stream-chat-react/dist/css/v2/index.css"
import styles from "./chat-ui.module.css";

interface Props{
  meetingId: string;
  meetingName: string;
  userId: string;
  userName: string;
  userImage: string | undefined;
}

export const ChatUI = ({ meetingId, meetingName, userId, userName, userImage }: Props) => {
  const trpc = useTRPC();
  const {mutateAsync: generateChatToken} = useMutation(
    trpc.meetings.generateChatToken.mutationOptions(),
  );

  const [channel, setChannel] = useState<StreamChannel>();
  const client =useCreateChatClient({
    apiKey: process.env.NEXT_PUBLIC_STREAM_CHAT_API_KEY!,
    tokenOrProvider:generateChatToken,
    userData:{
      id: userId,
      name: userName,
      image: userImage, 
    }
  });

  useEffect(() => {
    if(!client) return;

    const channel = client.channel("messaging", meetingId, {
      members: [userId],
    })
    setChannel(channel);
  }, [client, meetingId, meetingName, userId]);

  if(!client){
    return(
      <LoadingState
        title="Loading chat..."
        description="Please wait while we load the chat."
      />
    )
  }

  return(
    <div className={`${styles.chatShell} rounded-lg border border-border bg-card overflow-hidden`}>
        <Chat client={client} >
          <Channel channel={channel}>
            <Window>
              <div className="flex-1 overflow-y-auto max-h-[calc(100vh-23rem)] border-b border-border">
                <MessageList />
              </div>
              <div className="p-3 bg-card">
                <AnimatedAIChat
                  placeholder="Ask about this meeting..."
                  disabled={!channel}
                  onSendMessage={async (message) => {
                    if (!channel) return;
                    await channel.sendMessage({ text: message });
                  }}
                />
              </div>
          </Window>
          <Thread/>
        </Channel>
        </Chat>
    </div>
  )
}