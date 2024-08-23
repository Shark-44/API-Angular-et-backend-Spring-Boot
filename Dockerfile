# Étape 1 : Construire l'application Angular
FROM node:18 AS builder

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers du projet
COPY . .

# Construire l'application Angular
RUN npm run build --prod

# Étape 2 : Servir l'application avec un serveur web léger
FROM nginx:alpine

# Copier le fichier de configuration Nginx personnalisé
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copier les fichiers construits dans le répertoire de Nginx
COPY --from=builder /app/dist/front-angular/browser /usr/share/nginx/html

# Exposer le port 80 pour le serveur web
EXPOSE 80

# Commande pour démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
