## Entity Component Group

Adds a component group to an entity. Has additional arguments for overwriting vs merging with an old group, and creating add or remove events. If the `--group` argument is not provided, Notepad will open and the contents will be used as the argument when the file is saved and Notepad is closed.

```
Usage: bed entity group [options]

adds a component group to entities

Options:
  -g --group [component group]  the component group as a json object {"group_name":{"minecraft:is_baby":{}}}
  -t, --type <family type...>   filter entities by family type
  -f, --file [file]             the entity files that should be modified (preset: "**/*.json")
  -o, --overwrite               should the new component group overwrite the old one rather than merge with it
  --no-add                      do not add an "add" event
  --no-remove                   do not add an "remove" event
  -h, --help                    display help for command
```

### Examples

Missing examples.