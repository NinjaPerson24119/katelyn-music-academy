.PHONY: run lint reformat

run:
	pnpm run dev

lint:
	pnpm run lint

# reformat:
# 	pnpm exec prettier . --write

build:
	pnpm run build

# https://developers.cloudflare.com/workers/static-assets/migration-guides/migrate-from-pages/#pages-functions-with-a-functions-folder
build-functions:
	pnpm wrangler pages functions build --outdir=./dist/worker/
