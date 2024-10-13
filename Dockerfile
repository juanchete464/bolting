# Usar una imagen base de Node.js
FROM node:18-slim

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar los archivos de configuración primero para aprovechar el caché de Docker
COPY package*.json tsconfig*.json vite.config.ts ./

# Instalar las dependencias del proyecto
RUN npm install

# Copiar el resto del código al contenedor
COPY . .

# Construir la aplicación
RUN npm run build

# Exponer el puerto que utiliza la aplicación
EXPOSE 3000

# Comando para ejecutar la aplicación en modo producción
CMD ["npm", "run", "preview"]
