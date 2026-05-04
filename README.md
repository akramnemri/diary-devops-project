# 📓 Diary DevOps Project

## 🚀 Overview

This project demonstrates a complete end-to-end DevOps pipeline by building and deploying a simple diary application.

The system allows users to:

* Create diary entries
* View saved entries
* Delete entries

The application is fully containerized, automatically deployed, monitored, and secured using modern DevOps practices.

---

## 🧱 Architecture

Frontend (HTML/CSS)
⬇
Backend API (Node.js + Express)
⬇
Database (MongoDB Atlas)
⬇
Docker Container
⬇
Kubernetes (GKE)
⬇
ArgoCD (GitOps Deployment)
⬇
Monitoring (Prometheus + Grafana)

---

## ⚙️ Tech Stack

### Application

* Node.js (Express API)
* HTML / CSS frontend
* MongoDB Atlas (cloud database)

### DevOps & Cloud

* Docker (containerization)
* Kubernetes (GKE - Google Cloud)
* GitHub Actions (CI pipeline)
* ArgoCD (GitOps CD)
* Trivy (security scanning)
* SonarCloud (code quality analysis)

### Monitoring

* Prometheus (metrics collection)
* Grafana (dashboard visualization)

---

## 🔁 DevOps Pipeline

### Continuous Integration (CI)

On each push:

* Code checkout
* Dependency installation
* Code quality analysis (SonarCloud)
* Security scanning (Trivy)
* Docker image build
* Push to Docker Hub

### Continuous Deployment (CD)

* ArgoCD monitors the `main` branch
* Automatically syncs Kubernetes manifests
* Deploys updated containers to GKE

---

## 🌿 Git Workflow

* `main` → production-ready code
* `dev` → integration branch
* `feat/*` → feature development

Workflow:

1. Create feature branch
2. Develop and test
3. Merge into `dev`
4. Validate system
5. Promote to `main`

---

## ☁️ Cloud Deployment

The application is deployed on **Google Kubernetes Engine (GKE)**.

Key features:

* LoadBalancer service exposes backend
* Multiple replicas for scalability
* Managed Kubernetes environment

---

## 🔐 DevSecOps

Security is integrated into the pipeline:

* Trivy scans Docker images
* Pipeline fails on critical vulnerabilities
* Secrets managed via GitHub Secrets
* Environment variables used for sensitive data

---

## 📊 Monitoring & Observability

* `/metrics` endpoint exposed in backend
* Prometheus collects application metrics
* Grafana visualizes system performance

Example metrics:

* CPU usage
* Memory usage
* Request handling

---

## 🧠 Improvements Implemented

Initial limitations:

* In-memory data storage (data loss on restart)

Improvements:

* Integrated MongoDB Atlas for persistent storage
* Added frontend interface for user interaction
* Implemented monitoring for system observability
* Introduced security and quality gates in CI/CD pipeline

---

## 📦 Project Structure

```
diary-devops-project/
│
├── frontend/              # UI (HTML/CSS)
├── backend/               # Node.js API
├── docker/                # Docker-related configs
├── k8s/                   # Kubernetes manifests
├── .github/workflows/     # CI/CD pipelines
└── README.md
```

---

## ▶️ How to Run Locally

### Backend

```bash
cd backend
npm install
export MONGO_URI="your_connection_string"
node index.js
```

### Docker

```bash
docker build -t diary-backend ./backend
docker run -p 3000:3000 -e MONGO_URI="your_connection_string" diary-backend
```

---

## ☸️ Kubernetes Deployment

```bash
kubectl apply -f k8s/
```

Deployment is automatically managed by ArgoCD in production.

---

## 📌 Key DevOps Concepts Demonstrated

* End-to-end CI/CD pipeline
* GitOps deployment model
* Container orchestration with Kubernetes
* Integrated security (DevSecOps)
* Monitoring and observability
* Cloud-native architecture

---

## 🎯 Conclusion

This project demonstrates a complete DevOps lifecycle from development to deployment and monitoring, using modern tools and best practices.

It reflects real-world DevOps workflows including automation, scalability, security, and continuous improvement.

---
