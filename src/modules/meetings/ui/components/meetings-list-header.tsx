"use client";
import { Button } from "@/components/ui/button";
import { PlusIcon, XCircleIcon } from "lucide-react";
import { NewMeetingDialog } from "./new-meeting-dialog";
import { useState } from "react";
import { MeetingsSearchFilter } from "./meetings-search-filter";
import { StatusFilters } from "./status-filters";
import { AgentIdFilter } from "./agent-id-filter";
import { useMeetingsFilters } from "../../hooks/use-meetings-filters";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export const MeetingsListHeader = () => {
  const [filters, setFilters] = useMeetingsFilters();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const isAnyFilterModified =
    !!filters.status || !! filters.search || !! filters.agentId;
  
  const onClearFilters = () => {
    setFilters({
      status: null,
      agentId: null,
      search: "",
      page: 1,
    })
  }
  return (
    <>
      <NewMeetingDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
        <div className="py-6 px-4 md:px-8 flex flex-col gap-y-4">
          <div className="flex items-center justify-between">
                  <h5 className="font-bold tracking-tight text-white text-2xl drop-shadow-sm">My Meetings</h5>
                  <Button onClick={() => setIsDialogOpen(true)} className="rounded-full bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold shadow-[0_4px_14px_rgba(16,185,129,0.25)] hover:shadow-[0_6px_20px_rgba(16,185,129,0.4)] hover:-translate-y-[1px] transition-all px-5">
                      <PlusIcon className="size-4 mr-2"/>
                      New Meeting
                  </Button>
          </div>
          <ScrollArea> 
            <div className="flex items-center gap-x-2 pb-2">
              <MeetingsSearchFilter />
              <StatusFilters />
              <AgentIdFilter />
              {isAnyFilterModified && (
                <Button variant="outline" onClick={onClearFilters} className="rounded-full border-white/10 bg-white/[0.04] text-slate-300 hover:text-white hover:bg-white/[0.08] transition-all px-4 shadow-sm">
                  <XCircleIcon className="size-3.5 mr-2 opacity-70" />
                  <span>Clear Filters</span>
                </Button>
              )}
            </div>
            <ScrollBar orientation="horizontal" className="bg-white/5" />
          </ScrollArea>
        </div>
    </>
  );
};