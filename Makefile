install:
	npm install

build:
	npm run build

prepare:
	cp -n .env.example .env || true

start:
	heroku local -f Procfile.dev

# start-backend:
# 	npm start -- --watch --verbose-watch --ignore-watch='node_modules .git .sqlite'

# start-frontend:
# 	npx webpack --watch --progress

lint:
	npx eslint .

test:
	npm test -s