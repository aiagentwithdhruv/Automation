# n8n Docker Installation for Windows 🖥️

A complete guide to running n8n workflow automation platform using Docker on Windows.

## 📋 Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installation Steps](#installation-steps)
  - [1. Install Docker Desktop](#1-install-prerequisites)
  - [2. Create Project Directory](#2-create-a-local-folder-for-n8n)
  - [3. Configure Docker Compose](#3-create-a-docker-composeyml-file)
  - [4. Start n8n Service](#4-start-n8n-with-docker-compose)
  - [5. Access n8n Dashboard](#5-open-n8n-in-browser)
- [Managing the Service](#6-stop--restart--remove)
- [Data Persistence](#7-persisting-data)
- [Troubleshooting](#troubleshooting)
- [Additional Resources](#additional-resources)

---

## Overview

This repository contains the configuration files and instructions to run **n8n** (a workflow automation tool) using Docker on Windows. All workflows, credentials, and execution data are persisted locally, ensuring your work is never lost.

---

## Prerequisites

Before starting, ensure you have:

- Windows 10/11 (64-bit)
- Administrator access
- At least 4GB RAM available
- Stable internet connection

---

## Installation Steps

### 1. Install Prerequisites

#### Install Docker Desktop for Windows

👉 **[Download Docker Desktop](https://www.docker.com/products/docker-desktop/)**

**Important:** Make sure **WSL 2 backend** is enabled during installation.

After installation, **restart your PC** once.

#### Verify Installation

Open **PowerShell** or **Command Prompt** and run:

```bash
docker --version
docker compose version
```

If you see version numbers for both commands, Docker is installed correctly. ✅

---

### 2. Create a Local Folder for n8n

Open **PowerShell** and create a project directory:

```powershell
mkdir n8n-docker
cd n8n-docker
```

---

### 3. Create a docker-compose.yml file

Inside the folder, create a file named `docker-compose.yml` with the following content:

```yaml
version: "3.8"

services:
  n8n:
    image: n8nio/n8n:latest
    ports:
      - "5678:5678"          # Map local port 5678 to n8n
    environment:
      - GENERIC_TIMEZONE=Asia/Kolkata   # change if needed
      - N8N_ENCRYPTION_KEY=mysupersecretkey
      - N8N_HOST=localhost
      - WEBHOOK_URL=http://localhost:5678/
    volumes:
      - ./n8n_data:/home/node/.n8n   # Persist workflows/data
    restart: unless-stopped
```

#### 📝 Configuration Notes:

- **`N8N_ENCRYPTION_KEY`**: Set this to a **long random string** for security. Never share this key publicly.
- **`GENERIC_TIMEZONE`**: Adjust to your timezone (e.g., `America/New_York`, `Europe/London`)
- **Port `5678`**: Default n8n UI port. Change if needed.

---

### 4. Start n8n with Docker Compose

From inside the project folder, run:

```bash
docker compose up -d
```

This command will:

1. Pull the official **n8n Docker image** from Docker Hub
2. Create and start the container in **detached mode** (background)

#### Verify the Service is Running

```bash
docker ps
```

You should see a container named `n8n-docker-n8n-1` (or similar) with status **Up**. ✅

---

### 5. Open n8n in Browser

Navigate to:

```
http://localhost:5678
```

You should see the **n8n dashboard**! 🎉

On first launch, you'll be prompted to create an admin account.

---

## 6. Stop / Restart / Remove

### Stop the Service

```bash
docker compose down
```

This stops and removes the container (but keeps your data).

### Restart the Service

```bash
docker compose up -d
```

### View Live Logs

```bash
docker compose logs -f
```

Press `Ctrl+C` to exit log view.

### Restart Container Only

```bash
docker compose restart
```

---

## 7. Persisting Data

All your workflows, credentials, and execution history are saved in the `./n8n_data` folder on your Windows machine.

This folder is mapped as a Docker volume, ensuring:

✅ Data persists across container restarts  
✅ Data survives container recreation  
✅ Easy backup by copying the `n8n_data` folder  

**Location:** `n8n-docker/n8n_data/`

---

## Troubleshooting

### Issue: Port 5678 Already in Use

**Solution:** Change the port mapping in `docker-compose.yml`:

```yaml
ports:
  - "8080:5678"  # Use port 8080 instead
```

Then access n8n at `http://localhost:8080`

### Issue: Container Keeps Restarting

**Check logs:**

```bash
docker compose logs n8n
```

Common causes:
- Port conflict
- Insufficient resources
- Corrupted data folder

### Issue: Cannot Access n8n Dashboard

1. Check if container is running: `docker ps`
2. Check Docker Desktop is running
3. Try accessing `http://127.0.0.1:5678` instead
4. Check Windows Firewall settings

---

## Additional Resources

- **Official n8n Documentation**: [https://docs.n8n.io/](https://docs.n8n.io/)
- **n8n Community Forum**: [https://community.n8n.io/](https://community.n8n.io/)
- **Docker Documentation**: [https://docs.docker.com/](https://docs.docker.com/)
- **n8n GitHub Repository**: [https://github.com/n8n-io/n8n](https://github.com/n8n-io/n8n)

---

## 📄 License

This setup is provided as-is for educational and development purposes.

n8n is licensed under the [Sustainable Use License](https://github.com/n8n-io/n8n/blob/master/LICENSE.md).

---

## 🤝 Contributing

Feel free to submit issues or pull requests if you have improvements to suggest!

---

**Happy Automating!** 🚀

