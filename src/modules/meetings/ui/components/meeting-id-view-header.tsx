import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ChevronsRightIcon, TrashIcon, PencilIcon, MoreVerticalIcon } from "lucide-react";
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    } from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

interface Props{
    meetingId: string;
    meetingName: string;
    onEdit: () => void;
    onRemove: () => void;
}

export const MeetingIdViewHeader = ({
    meetingId, 
    meetingName, 
    onEdit, 
    onRemove}: Props) => {
    return (
        <div className="flex items-center justify-between">
            <Breadcrumb >
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild className="font-md text-xl text-white">
                            <Link href="/meetings">
                                My Meetings
                            </Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="text-slate-500 text-xl font-medium [$>svg]:size-4" >
                        <ChevronsRightIcon />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild className="font-md text-xl text-emerald-400 font-semibold drop-shadow-[0_0_6px_rgba(16,185,129,0.3)]">
                            <Link href={`/meetings/${meetingId}`}>
                                {meetingName}
                            </Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>  
            </Breadcrumb>
            <DropdownMenu modal = {false}>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="w-8 h-8 text-white hover:bg-white/[0.06] border border-white/[0.05]">
                        <MoreVerticalIcon className="size-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align = "end" className="bg-[#06090e]/95 backdrop-blur-xl border border-white/10 shadow-[0_0_20px_rgba(16,185,129,0.05)]">
                    <DropdownMenuItem onClick={onEdit} className="text-white hover:bg-white/[0.06] cursor-pointer">
                        <PencilIcon className="size-4" />
                            Edit Meeting
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={onRemove} className="text-white hover:bg-white/[0.06] cursor-pointer">
                        <TrashIcon className="size-4 text-red-500" />
                            Delete Meeting
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>      
        </div>
    );
};