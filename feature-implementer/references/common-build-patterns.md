# Common Build Patterns by Framework

## JavaScript/TypeScript (Node.js, React, Vue, etc.)

### Package.json Scripts
```json
{
  "scripts": {
    "build": "vite build",           // Build for production
    "dev": "vite",                   // Development server
    "test": "vitest run",            // Run tests
    "test:watch": "vitest",          // Watch mode
    "lint": "eslint .",              // Linting
    "preview": "vite preview"        // Preview build
  }
}
```

**Commands:**
- Build: `npm run build`
- Test: `npm test`
- Dev: `npm run dev`
- Lint: `npm run lint`

## .NET (C#)

### Project File (.csproj)
```xml
<Project Sdk="Microsoft.NET.Sdk.Web">
  <PropertyGroup>
    <TargetFramework>net8.0</TargetFramework>
  </PropertyGroup>
</Project>
```

**Commands:**
- Build: `dotnet build`
- Test: `dotnet test`
- Run: `dotnet run`
- Clean: `dotnet clean`
- Restore: `dotnet restore`

## Python

### pyproject.toml (modern)
```toml
[build-system]
requires = ["setuptools>=45", "wheel"]
build-backend = "setuptools.build_meta"

[project]
name = "my-project"
version = "0.1.0"
```

**Commands:**
- Build: `python -m build`
- Test: `pytest` or `python -m pytest`
- Run: `python main.py` or `python -m mymodule`
- Install deps: `pip install -r requirements.txt`

## Go

### go.mod
```go
module github.com/user/project

go 1.21
```

**Commands:**
- Build: `go build`
- Test: `go test ./...`
- Run: `go run main.go`
- Get deps: `go get`
- Tidy: `go mod tidy`

## Rust

### Cargo.toml
```toml
[package]
name = "my-project"
version = "0.1.0"
edition = "2021"
```

**Commands:**
- Build: `cargo build`
- Build release: `cargo build --release`
- Test: `cargo test`
- Run: `cargo run`
- Check: `cargo check`

## Java (Maven)

### pom.xml
```xml
<project>
  <modelVersion>4.0.0</modelVersion>
  <groupId>com.example</groupId>
  <artifactId>my-app</artifactId>
  <version>1.0</version>
</project>
```

**Commands:**
- Build: `mvn package`
- Test: `mvn test`
- Clean: `mvn clean`
- Install: `mvn install`

## Java (Gradle)

### build.gradle
```gradle
plugins {
    id 'java'
}

group = 'com.example'
version = '1.0'
```

**Commands:**
- Build: `gradle build` or `./gradlew build`
- Test: `gradle test` or `./gradlew test`
- Run: `gradle run` or `./gradlew run`
- Clean: `gradle clean`

## Makefile (Generic)

```makefile
.PHONY: build test clean

build:
	@echo "Building project..."
	# Add build commands

test:
	@echo "Running tests..."
	# Add test commands

clean:
	@echo "Cleaning..."
	# Add clean commands
```

**Commands:**
- Build: `make build`
- Test: `make test`
- Clean: `make clean`

## Discovery Strategy

1. **Check for package.json** → Node.js project → `npm run build`, `npm test`
2. **Check for *.csproj** → .NET project → `dotnet build`, `dotnet test`
3. **Check for pyproject.toml or setup.py** → Python → `pytest`
4. **Check for go.mod** → Go → `go build`, `go test ./...`
5. **Check for Cargo.toml** → Rust → `cargo build`, `cargo test`
6. **Check for pom.xml** → Maven → `mvn package`, `mvn test`
7. **Check for build.gradle** → Gradle → `gradle build`
8. **Check for Makefile** → Make → `make`, `make test`
9. **Check README.md** → Often has build instructions
10. **Ask user** → If uncertain
