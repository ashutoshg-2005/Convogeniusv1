import { CircleCheckIcon, CircleXIcon, ClockArrowUpIcon, LoaderIcon, VideoIcon } from "lucide-react";
import { MeetingStatus } from "../../types";
import { useMeetingsFilters } from "../../hooks/use-meetings-filters";
import { CommandSelect } from "@/components/command-select";

const options = [
    {
        id: MeetingStatus.Upcoming,
        value: MeetingStatus.Upcoming,
        children: (
            <div className="flex items-center gap-x-2 capitalize text-white">
                <ClockArrowUpIcon className="text-slate-400" />
                {MeetingStatus.Upcoming}
            </div>
        )
    },
    {
        id: MeetingStatus.Completed,
        value: MeetingStatus.Completed,
        children: (
            <div className="flex items-center gap-x-2 capitalize text-white">
                <CircleCheckIcon className="text-slate-400" />
                {MeetingStatus.Completed}
            </div>
        )
    },
    {
        id: MeetingStatus.Active,
        value: MeetingStatus.Active,
        children: (
            <div className="flex items-center gap-x-2 capitalize text-white">
                <VideoIcon className="text-slate-400" />
                {MeetingStatus.Active}
            </div>
        )
    },
    {
        id: MeetingStatus.Processing,
        value: MeetingStatus.Processing,
        children: (
            <div className="flex items-center gap-x-2 capitalize text-white">
                <LoaderIcon className="text-slate-400" />
                {MeetingStatus.Processing}
            </div>
        )
    },
    {
        id: MeetingStatus.Cancelled,
        value: MeetingStatus.Cancelled,
        children: (
            <div className="flex items-center gap-x-2 capitalize text-white">
                <CircleXIcon className="text-slate-400" />
                {MeetingStatus.Cancelled}
            </div>
        )
    },
    
];

export const StatusFilters = () => {
    const [filters, setFilters] = useMeetingsFilters();
    return(
        <CommandSelect 
            placeholder="Status"
            className="h-9"
            options={options}
            onSelect={(value) => setFilters({ status: value as MeetingStatus})}
            value = {filters.status ?? ""}
        />
    )
}