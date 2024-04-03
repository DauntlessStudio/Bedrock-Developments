## Entity Damage Sensor

Adds a damage_sensor to an entity. Has additional arguments for adding to the beginning or end of the sensor array. If the `--damage_sensor` argument is not provided, Notepad will open and the contents will be used as the argument when the file is saved and Notepad is closed.

```
Usage: bed entity sensor [options]

Options:
  -d, --damage_sensor [damage sensor]  the damage sensor as a json object {"cause": "all", "deals_damage": false}
  -t, --type <family type...>          filter entities by family type
  -f, --file [file]                    the entity files that should be modified (preset: "**/*.json")
  -s, --start                          adds the new sensor to the start of the array, rather than the end
  -h, --help                           display help for command
```

### Examples

Missing examples.