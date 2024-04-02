## Entity Animation or Controller Reference

Adds an animation or animation controller to a server entity's animations list. Additional options will add it to the scripts array, and create the animation or controller automatically.

```
Usage: bed entity anim [options] <names...>

Arguments:
  names                        animation names as "entity.anim"

Options:
  -t, --type <family type...>  filter entities by family type
  -f, --file [file]            the entity files that should be modified (preset: "**/*.json")
  -s, --script                 should these animations be added to script
  -c, --create [anim type]     create the animation as well (choices: "ctrl", "anim", preset: "ctrl")
  -h, --help                   display help for command
```

### Examples

Missing examples.