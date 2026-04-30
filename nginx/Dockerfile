FROM nginx:alpine
# Borramos la configuración de fábrica
RUN rm /etc/nginx/conf.d/default.conf
# Copiamos TU archivo dentro de la imagen directamente
COPY default.conf /etc/nginx/conf.d/default.conf