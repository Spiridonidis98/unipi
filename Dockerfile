# Use a lightweight Python image
FROM python:3.9-slim

# Install Git, Nmap, and other necessary dependencies
RUN apt-get update && apt-get install -y git nmap && rm -rf /var/lib/apt/lists/*

# Install TruffleHog
RUN pip install truffleHog

# Set the working directory
WORKDIR /app

# Default command (optional, can be overridden)
CMD ["bash"]
