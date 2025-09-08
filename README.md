Print Sleeve Management System

This is a web application I built to solve a problem in the factory where I currently work.
The original process for managing printing sleeves was based on physical boards with paper notes and handwritten labels – slow, error-prone, and impossible to trace.

I wanted to create a digital solution that:

keeps all sleeves in a proper database,

allows fast searching by print set,

generates labels automatically and correctly,

and adds accountability (who cleaned or archived a sleeve).

Main Features

Sleeve database with details like ID, diameter, design, production date, warehouse location.

Search by print set number – find the exact sleeves in seconds.

Automatic label generation (A5 format) with almost 100% accuracy.

Traceability: the person who prints the label is recorded as the one who cleaned the sleeve.

Admin functions: add/edit sleeves, delete with reason, view archive of deleted sleeves.

Archive view: see which sleeves are retired most often and why.

Tech Stack

Backend: Java, Spring Boot

Frontend: Vue3 + TypeScript + Vuetify

Database: PostgreSQL

Authentication: Keycloak (roles for admin/user)

Deployment: Docker / Podman (podman-compose)

CI/CD: GitHub Actions for build & test

Architecture (high-level)

Frontend (Vue3) → REST API (Spring Boot) → PostgreSQL
Authentication handled separately via Keycloak.
All services are containerized and can run together with podman-compose.

Database (MVP)

The database is intentionally simple:

Sleeve – main entity with details about each sleeve

Warehouse – one-to-many relation with sleeves

Archive – retired sleeves, stored separately for traceability

I kept the schema minimal to fit the use case, but it could be extended with user logs, audit trails, etc.

Security

Authentication and authorization are handled by Keycloak.

Users can search and print labels.

Admins can manage sleeves and view archives.

Only non-sensitive data is stored (username for traceability).

Deployment

Requirements: Docker or Podman, JDK 17, PostgreSQL 13+.

# start containers
podman-compose up


This will bring up the API, DB, and Keycloak.

Impact

In practice, this system replaced handwritten processes and:

reduced labeling errors from ~99% to almost zero,

saved several minutes per print set preparation,

made it possible to trace responsibility for sleeve cleaning.

Notes

This project was developed entirely with FOSS tools. It is not connected to the internet; it is designed for use on a local server inside the factory.
