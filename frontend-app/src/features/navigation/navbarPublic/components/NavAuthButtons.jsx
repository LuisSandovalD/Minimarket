import { LogIn, UserPlus } from "lucide-react";
import { Button } from "../../../../components/ui/Button"

export const NavAuthButtons = ({
  isMobile = false,
  onLoginClick,
  onRegisterClick,
}) => {
  if (isMobile) {
    return (
      <div className="space-y-2">
        <Button
          variant="ghost"
          full
          icon={LogIn}
          onClick={onLoginClick}
        >
          Iniciar Sesión
        </Button>

        <Button
          variant="primary"
          full
          icon={UserPlus}
          onClick={onRegisterClick}
        >
          Registrarse
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="sm"
        icon={LogIn}
        onClick={onLoginClick}
      >
        Iniciar Sesión
      </Button>

      <Button
        variant="primary"
        size="sm"
        icon={UserPlus}
        onClick={onRegisterClick}
      >
        Registrarse
      </Button>
    </div>
  );
};