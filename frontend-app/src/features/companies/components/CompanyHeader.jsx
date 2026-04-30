import { Building2 } from "lucide-react";
export default function CampanyHeader(){
    return (
        <div className="flex items-center justify-between mb-4">
      
            <div className="flex items-center gap-3">
                
                <div className="p-3 rounded-2xl bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600">
                <Building2 />
                </div>

                <div>
                <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
                    Empresas
                </h1>
                <p className="text-sm text-slate-500">
                    Compañia principal
                </p>
                </div>

            </div>
        </div>
    )
}