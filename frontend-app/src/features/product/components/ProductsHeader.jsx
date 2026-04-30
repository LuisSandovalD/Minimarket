import { Building2, Plus } from "lucide-react";
import { Button } from "../../../components/ui/Button";

export const ProductsHeader = ({ onCreate }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-2xl bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600">
          <Building2 />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
            Productos
          </h1>
          <p className="text-sm text-slate-500">
            Gestiona los productos de tu empresa
          </p>
        </div>
      </div>

      <Button onClick={onCreate} leftIcon={Plus}>
        Nuevo Producto
      </Button>
    </div>
  );
};