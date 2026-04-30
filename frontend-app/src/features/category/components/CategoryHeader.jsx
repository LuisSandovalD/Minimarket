import { Tag, Plus } from "lucide-react";
import { Button } from "../../../components/ui/Button";

export const CategoryHeader = ({ onCreate }) => {
  return (
    <div className="flex items-center justify-between">
      
      <div className="flex items-center gap-3">
        
        <div className="p-3 rounded-2xl bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600">
          <Tag /> {/* 👈 icono correcto */}
        </div>

        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
            Categorías
          </h1>
          <p className="text-sm text-slate-500">
            Gestiona las categorías de tus productos
          </p>
        </div>

      </div>

      <Button onClick={onCreate} leftIcon={Plus}>
        Nueva Categoría
      </Button>

    </div>
  );
};