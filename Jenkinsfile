pipeline {
    agent any

    options {
        timestamps()
        disableConcurrentBuilds()
    }

    environment {
        COMPOSE_FILE = 'docker-compose.yml'
    }

    stages {
        stage('🧼 Clean Workspace') {
            steps {
                deleteDir()
            }
        }

        stage('📥 Checkout') {
            steps {
                checkout scm
                sh 'ls -R'
            }
        }

        stage('🏗️ Build & Deploy') {
            steps {
                sh '''
                echo "🧹 Limpiando residuos de volumenes o carpetas..."
                [ -d "nginx/default.conf" ] && rm -rf nginx/default.conf

                echo "🚀 Construyendo imágenes de la App..."
                # Solo construimos los servicios de la aplicación
                docker compose build --no-cache backend frontend nginx

                echo "⚡ Levantando servicios (EXCLUYENDO JENKINS)..."
                # LISTAMOS LOS SERVICIOS UNO POR UNO PARA NO RECREAR JENKINS
                docker compose up -d --force-recreate postgres backend frontend nginx
                
                echo "📦 Estado de los contenedores:"
                docker compose ps
                '''
            }
        }

        stage('🛠️ Prisma Setup') {
            steps {
                sh '''
                echo "🔑 Corrigiendo permisos de ejecución para Prisma..."
                docker exec -u root tienda_backend sh -c "chmod +x ./node_modules/.bin/prisma"
                
                echo "🧬 Generando Cliente de Prisma..."
                docker exec -u root tienda_backend npx prisma generate
                '''
            }
        }

        stage('⏱️ Health Check') {
            steps {
                sh '''
                echo "⏱️ Verificando que el backend responda..."
                
                SUCCESS=0
                for i in $(seq 1 10); do
                  if curl -s http://host.docker.internal:4000/health | grep -q "OK"; then
                    echo "✅ Sistema saludable."
                    SUCCESS=1
                    break
                  fi
                  echo "⌛ Esperando backend... ($i/10)"
                  sleep 5
                done

                if [ $SUCCESS -eq 0 ]; then
                  echo "❌ El backend no inició correctamente."
                  docker compose logs backend --tail=20
                  exit 1
                fi
                '''
            }
        }
    }

    post {
        success {
            echo '✅ ¡Despliegue exitoso!'
            echo '🔗 Accede a la App en: http://localhost'
        }
        failure {
            echo '❌ El Pipeline falló. Jenkins no se detuvo, pero la App tuvo un error.'
        }
    }
}