# Usamos la imagen oficial de Jenkins en su versión LTS (Long Term Support)
FROM jenkins/jenkins:lts

# Cambiamos al usuario root para poder instalar paquetes del sistema
USER root

# 1. Instalar dependencias básicas del sistema
# lsb-release → para obtener información de la distribución
# ca-certificates → certificados SSL necesarios para conexiones seguras
# curl → para descargar archivos desde internet
# gnupg → para gestionar claves GPG (repositorios seguros)
# git → para clonar repositorios (muy usado en Jenkins)
RUN apt-get update && apt-get install -y \
    lsb-release \
    ca-certificates \
    curl \
    gnupg \
    git

# 2. Instalar Docker CLI desde el repositorio oficial
# Esto permite que Jenkins pueda ejecutar comandos Docker (build, run, etc.)
RUN curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg && \
    # Agregamos el repositorio oficial de Docker a la lista de paquetes
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian $(lsb_release -cs) stable" > /etc/apt/sources.list.d/docker.list && \
    # Actualizamos repositorios e instalamos solo el cliente de Docker (no el daemon)
    apt-get update && apt-get install -y docker-ce-cli

# 3. Instalar Docker Compose V2 manualmente
# Docker Compose V2 funciona como un plugin del comando "docker"
RUN mkdir -p /usr/local/lib/docker/cli-plugins/ && \
    # Descargamos el binario oficial de Docker Compose
    curl -SL https://github.com/docker/compose/releases/download/v2.24.5/docker-compose-linux-x86_64 -o /usr/local/lib/docker/cli-plugins/docker-compose && \
    # Damos permisos de ejecución al archivo
    chmod +x /usr/local/lib/docker/cli-plugins/docker-compose

# 4. Gestión de permisos
# Creamos el grupo "docker" si no existe
# y añadimos el usuario "jenkins" a ese grupo
# Esto permite ejecutar Docker sin usar sudo
RUN groupadd -f docker && usermod -aG docker jenkins

# Volvemos al usuario por defecto (jenkins) por seguridad
USER jenkins