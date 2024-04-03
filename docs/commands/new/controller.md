## New Animation Controller

Creates a new server animation controller.

```
Usage: bed new ctrl [options] <names...>

Arguments:
  names                               controller names as "entity.anim"

Options:
  -e, --entry [on entry commands...]  the commands to play on entry (default: ["/say anim_name"])
  -x, --exit [on exit commands...]    the commands to play on exit (preset: ["/say anim_name"])
  -a, --anim <animations...>          the animations to play
  -q, --query [query]                 the query to transition from default (default: "true")
  -t, --transition [transition]       the query to transition back to default (preset: "true")
  -h, --help                          display help for command
```

### Examples

Missing examples.