# Usamos la imagen base de Nginx en su versión ligera (Alpine Linux)
FROM nginx:alpine

# Eliminamos la configuración por defecto de Nginx
# Esto se hace para evitar conflictos con nuestra propia configuración
RUN rm /etc/nginx/conf.d/default.conf

# Copiamos nuestro archivo de configuración personalizado (default.conf)
# desde el proyecto local hacia la ruta de configuración de Nginx dentro del contenedor
COPY default.conf /etc/nginx/conf.d/default.conf