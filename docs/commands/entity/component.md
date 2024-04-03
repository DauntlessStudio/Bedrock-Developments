## Entity Component

Adds a component to an entity. Has additional arguments for overwriting vs merging with an old component. If the `--component` argument is not provided, Notepad will open and the contents will be used as the argument when the file is saved and Notepad is closed.

```
Usage: bed entity component [options]

adds a component to entities

Options:
  -c --component [component]   the component as a json object {"minecraft:is_baby":{}}
  -t, --type <family type...>  filter entities by family type
  -f, --file [file]            the entity files that should be modified (preset: "**/*.json")
  -o, --overwrite              should the new component overwrite the old one rather than merge with it
  -h, --help                   display help for command
```

### Examples

Missing examples.