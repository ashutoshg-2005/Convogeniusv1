import Image from "next/image";
interface Props{
    title: string;
    description: string;   
    image?: string;
}

export const EmptyState = ({ 
    title,
    description,
    image = "/empty.svg"
    }: Props) => {
    return (
        <div className="flex flex-1 items-center justify-center">
            <div className="flex flex-col items-center gap-6 text-center max-w-md">
                <Image 
                    src={image} 
                    alt="Empty" 
                    width={240} 
                    height={240}
                    style={{ width: "auto", height: "auto" }}
                />
                <div className="flex flex-col gap-y-2">
                    <h6 className="text-lg font-bold tracking-tight text-white">{title}</h6>
                    <p className="text-sm text-slate-400">{description}</p>
                </div>
            </div>
        </div>
    );
};