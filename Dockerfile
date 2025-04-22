FROM node:20-alpine3.19 AS builder

# Crear directorio de la aplicación
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar el resto de los archivos
COPY . .

# Si hay algún paso de construcción (build)
# RUN npm run build

# Imagen final
FROM node:20-alpine3.19

# Crear directorio de la aplicación
WORKDIR /app

# Configurar variables de entorno para producción
ENV NODE_ENV=production

# Copiar dependencias y archivos compilados desde la etapa de construcción
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app ./

# Exponer el puerto que utiliza tu aplicación
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["node", "index.js"]