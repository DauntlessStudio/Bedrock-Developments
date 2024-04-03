## New Entity

Creates a new server entity, additional options will create the client entity, client geometry, and a texture file.

```
Usage: bed new entity [options] <names...>

Arguments:
  names         entity names as "namespace:entity"

Options:
  --no-lang     do not add lang file
  -c, --client  create client entity in the resource path. Will also create a default geo and texture for the entity
  --no-geo      do not add geo file
  --no-texture  do not add texture file
  -h, --help    display help for command
```

### Examples

---

```
bed new entity namespace:test
```

Creates a new entity with the identifier `namespace:entity` at the path `BP/entity/test.json` and a lang file entry `entity.namespace:test.name=Test`.

---

```
bed new entity -c namespace:test
```

Creates a new entity with the identifier `namespace:entity` at the path `BP/entity/test.json` and a lang file entry `entity.namespace:test.name=Test`. Also creates the client entity at the path `RP/entities/test.entity.json`, a placeholder geometry file at `RP/models/entity/test.geo.json` and a placeholder texture file at `RP/textures/entity/test/default.png`.