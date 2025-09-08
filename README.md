# Print Sleeve Management System

This is a web application I developed to digitalize the management of printing sleeves in a factory.  
The old process was based on physical boards and handwritten labels, which caused frequent mistakes, wasted time, and no way to trace who did what.  

The goal of this project was to provide a simple but reliable system that:
- stores all sleeves in a proper database,  
- allows fast searching by print set,  
- generates labels automatically and consistently,  
- and adds accountability for cleaning and archiving.  

**Stack:** Java (Spring Boot), Vue3 + TypeScript, PostgreSQL, Docker/Podman, Keycloak  
**Impact:** Fewer errors, faster preparation, clear traceability.  

---

## Features

- Sleeve database with details (ID, diameter, design, production date, warehouse location).  
- Search by print set number → results in seconds instead of minutes.  
- Automatic A5 label generation (no more manual Acrobat templates).  
- Traceability: whoever prints the label is registered as the person who cleaned the sleeve.  
- Admin functions: add/edit sleeves, archive with reason, view archive history.  
- Archive view with statistics about retired sleeves.  

---

## Tech Stack

- **Backend:** Java, Spring Boot  
- **Frontend:** Vue3 + TypeScript + Vuetify  
- **Database:** PostgreSQL  
- **Authentication:** Keycloak (roles for admin/user, OIDC)  
- **Deployment:** Docker / Podman (`docker compose` `podman-compose`)  

---

## Architecture (high-level)

```plaintext
Frontend: Vue3 + TypeScript (UI, search, label generation)

Backend: Spring Boot REST API (business logic, DB access)

Database: PostgreSQL (sleeves, warehouses, archive)

Authentication: Keycloak (OIDC, role-based access)

Deployment: Docker/Podman (containerized services)

All services run in containers managed by Docker/Podman.
Database (MVP)

The schema was kept intentionally simple for the initial version:

Sleeve – main entity with attributes (ID, diameter, design, etc.)

Warehouse – one-to-many relation with sleeves

Archive – retired sleeves, stored separately for traceability

This structure can be extended later with logs, user actions, or audit trails if needed.
Security

Keycloak used for authentication and authorization.

Role-based access control: Admin vs. User.

Only non-sensitive data is stored (usernames for traceability).
Deployment

Requirements:

Docker or Podman

JDK 21+

PostgreSQL 13+

Start all services with:

podman-compose up


This starts the backend, database, and Keycloak in containers.

Impact

Reduced sleeve labeling errors from ~99% to nearly zero.

Preparation time per print set shortened by several minutes.

Introduced accountability and traceability for sleeve cleaning and archiving.

Notes

The project is built entirely with open-source software (Spring Boot, Vue, PostgreSQL, Keycloak, Docker).

Designed for on-premise use in the factory network, not as an internet-facing application.
