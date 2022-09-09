# Contributing

## Requirements

- Git
- Docker
- Docker Compose

## Installation

```bash
git clone https://github.com/aminnairi/rollup-plugin-sitemap
cd rollup-plugin-sitemap
```

## Services startup

```bash
docker-compose up --detach
```

## Production build

```bash
docker-compose exec server npm run production
```

## Services shutdown

```bash
docker-compose down --remove-orphans --volumes --timeout 0
```
