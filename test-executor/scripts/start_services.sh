#!/bin/bash
# Start Services Script Template
#
# This is a customizable template for starting project services.
# Adapt this script to your project's specific needs.
#
# Usage:
#   ./start_services.sh [service1] [service2] ...
#   ./start_services.sh all
#   ./start_services.sh frontend backend database

set -e  # Exit on error

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
LOG_DIR="$PROJECT_ROOT/logs"
mkdir -p "$LOG_DIR"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Service PIDs
FRONTEND_PID=""
BACKEND_PID=""
DATABASE_PID=""

# Log file paths
FRONTEND_LOG="$LOG_DIR/frontend.log"
BACKEND_LOG="$LOG_DIR/backend.log"
DATABASE_LOG="$LOG_DIR/database.log"

log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Start Database (Docker example)
start_database() {
    log_info "Starting database..."

    # Example: PostgreSQL via Docker
    if command -v docker &> /dev/null; then
        if docker ps | grep -q postgres; then
            log_warn "Database already running"
            return 0
        fi

        # Start with docker-compose or docker run
        cd "$PROJECT_ROOT/backend" || cd "$PROJECT_ROOT"

        if [ -f "docker-compose.yml" ]; then
            docker-compose up -d postgres > "$DATABASE_LOG" 2>&1
            DATABASE_PID=$!
            log_info "Database started (docker-compose)"
        else
            log_warn "docker-compose.yml not found, skipping database"
        fi
    else
        log_warn "Docker not found, skipping database"
    fi

    # Wait for database to be ready
    sleep 3

    # Health check (PostgreSQL example)
    if command -v psql &> /dev/null; then
        until psql -h localhost -U postgres -c '\q' 2>/dev/null; do
            log_info "Waiting for database to be ready..."
            sleep 1
        done
        log_info "Database is ready"
    fi
}

# Start Backend
start_backend() {
    log_info "Starting backend..."

    cd "$PROJECT_ROOT"

    # Detect backend type and start accordingly
    if [ -f "backend/src/Bovis.API/Bovis.API.csproj" ]; then
        # .NET backend
        cd backend/src/Bovis.API
        dotnet run > "$BACKEND_LOG" 2>&1 &
        BACKEND_PID=$!
        log_info "Backend started (.NET) - PID: $BACKEND_PID"

    elif [ -f "backend/package.json" ]; then
        # Node.js backend
        cd backend
        npm start > "$BACKEND_LOG" 2>&1 &
        BACKEND_PID=$!
        log_info "Backend started (Node.js) - PID: $BACKEND_PID"

    elif [ -f "backend/main.py" ] || [ -f "backend/app.py" ]; then
        # Python backend
        cd backend
        python main.py > "$BACKEND_LOG" 2>&1 &
        BACKEND_PID=$!
        log_info "Backend started (Python) - PID: $BACKEND_PID"

    elif [ -f "backend/main.go" ]; then
        # Go backend
        cd backend
        go run main.go > "$BACKEND_LOG" 2>&1 &
        BACKEND_PID=$!
        log_info "Backend started (Go) - PID: $BACKEND_PID"

    else
        log_error "Backend not found or not recognized"
        return 1
    fi

    # Wait for backend to be ready
    sleep 5

    # Health check (example)
    if curl -f http://localhost:5001/health &> /dev/null; then
        log_info "Backend is ready (http://localhost:5001)"
    elif curl -f http://localhost:3000/health &> /dev/null; then
        log_info "Backend is ready (http://localhost:3000)"
    else
        log_warn "Backend health check failed, but process is running"
    fi
}

# Start Frontend
start_frontend() {
    log_info "Starting frontend..."

    cd "$PROJECT_ROOT"

    if [ -f "package.json" ]; then
        # React/Vue/Angular with Vite or similar
        npm run dev > "$FRONTEND_LOG" 2>&1 &
        FRONTEND_PID=$!
        log_info "Frontend started - PID: $FRONTEND_PID"

        # Wait for frontend to be ready
        sleep 3

        # Health check
        if curl -f http://localhost:5174 &> /dev/null; then
            log_info "Frontend is ready (http://localhost:5174)"
        elif curl -f http://localhost:3000 &> /dev/null; then
            log_info "Frontend is ready (http://localhost:3000)"
        else
            log_warn "Frontend health check failed, but process is running"
        fi
    else
        log_error "Frontend package.json not found"
        return 1
    fi
}

# Stop all services
stop_services() {
    log_info "Stopping services..."

    if [ -n "$FRONTEND_PID" ]; then
        kill $FRONTEND_PID 2>/dev/null || true
        log_info "Frontend stopped"
    fi

    if [ -n "$BACKEND_PID" ]; then
        kill $BACKEND_PID 2>/dev/null || true
        log_info "Backend stopped"
    fi

    if [ -n "$DATABASE_PID" ]; then
        docker-compose down 2>/dev/null || true
        log_info "Database stopped"
    fi
}

# Trap Ctrl+C to stop services
trap stop_services EXIT INT TERM

# Main
main() {
    local services=("$@")

    if [ ${#services[@]} -eq 0 ] || [[ " ${services[@]} " =~ " all " ]]; then
        services=("database" "backend" "frontend")
    fi

    log_info "Starting services: ${services[*]}"

    for service in "${services[@]}"; do
        case "$service" in
            database|db)
                start_database
                ;;
            backend|api)
                start_backend
                ;;
            frontend|ui)
                start_frontend
                ;;
            *)
                log_error "Unknown service: $service"
                log_info "Valid services: database, backend, frontend, all"
                exit 1
                ;;
        esac
    done

    log_info ""
    log_info "All services started!"
    log_info ""
    log_info "Service URLs:"
    log_info "  Frontend: http://localhost:5174"
    log_info "  Backend:  http://localhost:5001"
    log_info "  Database: localhost:5432"
    log_info ""
    log_info "Logs:"
    log_info "  Frontend: $FRONTEND_LOG"
    log_info "  Backend:  $BACKEND_LOG"
    log_info "  Database: $DATABASE_LOG"
    log_info ""
    log_info "Press Ctrl+C to stop all services"

    # Keep script running
    wait
}

main "$@"
