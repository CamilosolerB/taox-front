import { Droplet } from "lucide-react";
const TopForm = () => {
    return (
        <div className="pt-8 flex flex-col items-center">
            <div className="bg-primary/10 p-4 rounded-full mb-4">
                <Droplet className="text-primary text-4xl" />
            </div>
            <h1 className="text-[#111418] dark:text-white tracking-tight text-[28px] font-bold leading-tight px-4 text-center">
                Login
            </h1>
            <p className="text-[#617589] dark:text-slate-400 text-sm mt-2">Acceso a sistema de inventarios</p>
        </div>
    )
}

export default TopForm;