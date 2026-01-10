.PHONY: run lint reformat

run:
	pnpm run dev

lint:
	pnpm run lint

reformat:
	pnpm exec prettier . --write
