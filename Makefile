.PHONY: help build dev start stop restart logs clean

# Default target
help:
	@echo "Available commands:"
	@echo "  make build    - Build Docker images"
	@echo "  make dev      - Start development environment"
	@echo "  make start    - Start containers"
	@echo "  make stop     - Stop containers"
	@echo "  make restart  - Restart containers"
	@echo "  make logs     - View container logs"
	@echo "  make clean    - Remove containers and images"

# Build Docker images
build:
	docker-compose build

# Start development environment
up:
	docker-compose up -d

# Start containers
start:
	docker-compose start

sh:
	docker-compose exec nextjs-app sh

# Stop containers
stop:
	docker-compose stop

# Restart containers
restart:
	docker-compose restart

# View container logs
logs:
	docker-compose logs -f

# Clean up
clean:
	docker-compose down --rmi all --volumes --remove-orphans
