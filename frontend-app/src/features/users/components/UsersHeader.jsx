import { Button } from "../../../components/ui/Button";
import { Users, Plus } from "lucide-react";

export const UsersHeader = ({ onCreate }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

      {/* LEFT */}
      <div className="flex items-center gap-3">
        <div className="
          p-3 rounded-2xl
          bg-blue-100 text-blue-600
          dark:bg-blue-900/40 dark:text-blue-400
        ">
          <Users size={24} />
        </div>

        <div>
          <h2 className="
            text-2xl font-bold
            text-gray-800
            dark:text-gray-100
          ">
            Gestión de Usuarios
          </h2>

          <p className="
            text-sm
            text-gray-500
            dark:text-gray-400
          ">
            Administra, filtra y controla los usuarios del sistema
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">
        <Button
          onClick={onCreate}
          variant="primary"
          leftIcon={Plus}
        >
          Nuevo Usuario
        </Button>
      </div>
    </div>
  );
};