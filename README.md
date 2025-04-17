# Poké Matcher

An interactive web app that tells you which Pokémon matches your personality using DeepseekAI and PokeAPI.

## Getting Started

### Requirements

- Docker (https://www.docker.com/)
- Ports `3000` and `11434` available

At the root of the project, generate `.env` file based on `.env.example`

```bash
cp .env.example .env
```

### Run the full app in _production_ local mode

Make sure you have Docker installed. At the root of the project, run :

```bash
docker-compose up --build
```

This command can take a few minutes. It runs two containers : Ollama for AI hosting and Next for the app.
The app will be available at [http://localhost:3000](http://localhost:3000).

### Run the app in _development_ mode

1. Stop previous container if any

```bash
docker-compose stop
```

2. Run only Ollama container.

```bash
docker-compose up ollama
```

3. Install dependencies and run development Next server

```bash
npm install
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## Learn More

### AI Model used

Using Ollama to serve:
`deepseek-r1:1.5b`
