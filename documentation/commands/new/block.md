## New Block

Creates a new server block with additional options for block components.

```
Usage: bed new block [options] <names...>

Arguments:
  names                      block names as "namespace:block"

Options:
  --no-lang                  do not add lang file
  -e, --emissive <emission>  block emmission level [1-15]
  -t, --table                create a loot table
  -g, --geo                  create a custom geo
  -h, --help                 display help for command
```

### Examples

---

```
bed new block namespace:test
```

Creates a new block with the identifier `namespace:test` at the path `BP/blocks/test.json`, a placeholder texture at `RP/textures/blocks/test.png`, and a lang file entry `tile.namespace:test.name=Test`.

---

```
bed new item -e 15 -t attachable namespace:test
```

Creates a new block with an emissive value of 15 and a loot table at `BP/loot_tables/test.json` which drops this block.