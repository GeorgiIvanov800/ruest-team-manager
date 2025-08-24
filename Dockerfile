# ---- 1) Build frontend ----
FROM node:20 AS frontend-builder
WORKDIR /app/frontend

# Copy and install frontend dependencies
COPY ruest-team-manager-fe/package*.json ./
RUN npm ci

# Copy frontend source and build
COPY ruest-team-manager-fe/. ./
RUN npm run build

# ---- 2) Build backend (incl. static frontend) ----
FROM maven:3.9.9-amazoncorretto-23-alpine AS backend-builder
WORKDIR /app/backend

# Cache backend dependencies
COPY ruest-team-manager-be/pom.xml ./
RUN mvn dependency:go-offline -B

# Copy backend source code
COPY ruest-team-manager-be/src ./src

# Embed built frontend into backend static resources
COPY --from=frontend-builder /app/frontend/dist ./src/main/resources/static

# Build fat‑jar
RUN mvn clean package -Dmaven.test.skip=true -DskipTests

# ---- 3) Runtime stage ----
FROM amazoncorretto:23.0.0-alpine
WORKDIR /app

# Copy executable JAR
COPY --from=backend-builder /app/backend/target/*.jar app.jar

# Expose API port
EXPOSE 8088

# Launch application
ENTRYPOINT ["java","-jar","app.jar"]