
# ===== 1. Build Stage =====
FROM maven:3.9.6-eclipse-temurin-21 AS builder

WORKDIR /app

# Copy Maven descriptor first (for dependency caching)
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy the rest of the source code
COPY src ./src

# Build the jar
RUN mvn clean package -DskipTests

# ===== 2. Runtime Stage =====
FROM eclipse-temurin:21-jdk

WORKDIR /app

# Copy the jar from the builder stage
COPY --from=builder /app/target/cvMatch-0.0.1-SNAPSHOT.jar .

EXPOSE 8080

# Run the jar
ENTRYPOINT ["java", "-jar", "cvMatch-0.0.1-SNAPSHOT.jar"]




