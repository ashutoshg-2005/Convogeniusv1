import { SearchIcon } from "lucide-react";

import { Input } from "@/components/ui/input";

import { useMeetingsFilters } from "../../hooks/use-meetings-filters";    

export const MeetingsSearchFilter = () => {
    const [filters, setFilters] = useMeetingsFilters();

    return (
        <div className="relative">
            <Input
                placeholder="Filter by Name "
                value={filters.search}
                onChange={(e) => setFilters({ search: e.target.value })}
                className="h-9 bg-white/[0.02] backdrop-blur-xl border-white/10 text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 w-[200px] pl-7"
            />
            <SearchIcon className="size-4 text-slate-500 absolute left-2 top-1/2 -translate-y-1/2" />
        </div>
    );
};