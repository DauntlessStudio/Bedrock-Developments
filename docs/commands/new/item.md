## New Item

Creates a new server item with additional options for item types.

```
Usage: bed new item [options] <names...>

Arguments:
  names                               item names as "namespace:item"

Options:
  --no-lang                           do not add lang file
  -s, --stack <stack_size>            max stack size (default: "64")
  -c, --cooldown <cooldown_duration>  cooldown duration (default: "3")
  -t, --type <item_type>              basic (choices: "basic", "attachable", "food", "armor_set", "helmet", "chestplate", "leggings", "boots")
  -h, --help                          display help for command
```

### Examples

---

```
bed new item namespace:test
```

Creates a new item with the identifier `namespace:test` at the path `BP/items/test.json`, a placeholder texture at `RP/textures/items/test.png`, and a lang file entry `item.namespace:test.name=Test`.

---

```
bed new item -c 10 -t attachable namespace:test
```

Creates an attachable with a cooldown of ten seconds. This also creates an attachable, animation controller, animation, placeholder geometry, and a placeholder texture file.

---

```
bed new item -t armor_set namespace:test
```

Creates the items `namespace:test_helmet`, `namespace:test_chestplate`, `namespace:test_leggings`, and `namespace:test_boots`, along with template geometry, textures, and attachables for each piece.