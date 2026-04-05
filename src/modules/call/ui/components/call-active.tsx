import { CallControls, SpeakerLayout, useCallStateHooks, LoadingIndicator } from "@stream-io/video-react-sdk";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Props{
    onLeave : () => void;   
    meetingName: string;
}

export const CallActive = ({ onLeave, meetingName }: Props) => {
    const { useParticipants, useCallCallingState, useIsCallLive } = useCallStateHooks();
    const participants = useParticipants();
    const callingState = useCallCallingState();
    const isCallLive = useIsCallLive();
    const [isStabilized, setIsStabilized] = useState(false);

    // More comprehensive state checking
    const isCallReady = callingState === 'joined' && 
                       isCallLive && 
                       participants.length > 0 && 
                       participants.some(p => p.sessionId && p.userId);

    // Add a small delay to ensure participant state is stabilized
    useEffect(() => {
        if (isCallReady) {
            const timer = setTimeout(() => {
                setIsStabilized(true);
            }, 500); // 500ms delay
            
            return () => clearTimeout(timer);
        } else {
            setIsStabilized(false);
        }
    }, [isCallReady]);

    return (
        <div className="flex flex-col justify-between p-4 h-[100dvh] bg-[#06090e] text-white overflow-hidden">
            {/* Header */}
            <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] shadow-lg rounded-full px-4 py-3 flex items-center gap-4 mb-2 z-10 shrink-0">
                <Link href="/" className="flex items-center justify-center p-1.5 bg-white/5 hover:bg-white/10 transition-colors rounded-full">
                    <Image src="/logo.svg" width={20} height={20} alt="logo" className="min-w-[20px]" />
                </Link>
                <h4 className="text-sm font-medium tracking-tight truncate">{meetingName}</h4>
            </div>
            
            {/* Main content - video container */}
            <div className="flex-1 min-h-0 relative w-full mb-2 flex flex-col justify-center">
                {isCallReady && isStabilized ? (
                    <SpeakerLayout />
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <LoadingIndicator />
                    </div>
                )}
            </div>
            
            {/* Footer controls */}
            <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] shadow-[0_0_30px_rgba(16,185,129,0.05)] rounded-full px-6 py-3 shrink-0 z-10 flex items-center justify-center">
                <CallControls onLeave={onLeave} />
            </div>
        </div>
    );
}