## Entity Properties

Adds a property to an entity. Has options for the type of property, the values, client_sync, and if events should be created for each value.

```
Usage: bed entity property [options] <names...>

Arguments:
  names                           property names as "namespace:property"

Options:
  -t, --type <family type...>     filter entities by family type
  -f, --file [file]               the entity files that should be modified (preset: "**/*.json")
  -p, --property <property type>  the type of property (choices: "bool", "enum", "float", "int", default: "bool")
  -v, --values <values...>        the values, either a list of enum values or a min-max
  -d, --default <default>         the default value
  -c, --client                    should use client_sync
  -e, --event                     automatically generate events for the values
  -h, --help                      display help for command
```

### Examples

Missing examples.