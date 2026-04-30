import { Boxes, Plus } from "lucide-react";
import { Button } from "../../../components/ui/Button";

export const InventoryHeader = ({ onCreate }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600">
          <Boxes />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
            Inventario
          </h1>
          <p className="text-sm text-slate-500">
            Administra y controla el stock de productos en tiempo real
          </p>
        </div>
      </div>

      <Button onClick={onCreate} leftIcon={Plus}>
        Nuevo Producto
      </Button>
    </div>
  );
};