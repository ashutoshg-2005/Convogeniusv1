import { Button } from "@/components/ui/button";

interface Props{
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}


export const DataPagination = ({ page, totalPages, onPageChange }: Props) => {
    return (
        <div className="flex items-center justify-between mt-4">
            <div className=" flex-1 text-sm text-slate-400 font-medium">
                Page {page} of {totalPages || 1}
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    disabled={page === 1}
                    onClick={() => onPageChange(Math.max( 1, page - 1))}
                    className="px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-slate-300 hover:text-white hover:bg-white/[0.08] disabled:opacity-50 transition-all shadow-sm"
                    variant="outline"
                    size="sm"
                >
                    Previous
                </Button>
                <Button
                    disabled={page === totalPages || totalPages === 0}
                    onClick={() => onPageChange(Math.min(totalPages, page + 1))}
                    className="px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-slate-300 hover:text-white hover:bg-white/[0.08] disabled:opacity-50 transition-all shadow-sm"
                    variant="outline"
                    size="sm"

                >
                    Next
                </Button>
            </div>
        </div>
    );
}