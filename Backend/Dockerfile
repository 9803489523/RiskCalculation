FROM maven:3.6.3-jdk-11-slim AS build
WORKDIR /home/app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn package -DskipTests

FROM amazoncorretto:15
VOLUME /tmp
COPY --from=build /home/app/target/vulnerability-aggregate-service-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]