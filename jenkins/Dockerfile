FROM jenkins/jenkins:lts

USER root

# 1. Instalar dependencias básicas
RUN apt-get update && apt-get install -y \
    lsb-release \
    ca-certificates \
    curl \
    gnupg \
    git

# 2. Instalar Docker CLI (repositorio oficial para tener la versión más reciente)
RUN curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg && \
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian $(lsb_release -cs) stable" > /etc/apt/sources.list.d/docker.list && \
    apt-get update && apt-get install -y docker-ce-cli

# 3. Instalar Docker Compose V2 (El plugin que usa 'docker compose' sin guion)
RUN mkdir -p /usr/local/lib/docker/cli-plugins/ && \
    curl -SL https://github.com/docker/compose/releases/download/v2.24.5/docker-compose-linux-x86_64 -o /usr/local/lib/docker/cli-plugins/docker-compose && \
    chmod +x /usr/local/lib/docker/cli-plugins/docker-compose

# 4. Gestión de permisos
# Creamos el grupo docker si no existe y añadimos al usuario jenkins
RUN groupadd -f docker && usermod -aG docker jenkins

USER jenkins