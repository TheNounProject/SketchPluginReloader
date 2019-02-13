## What is this?

This plugin is intended to help Sketch plugin developers.

In cases where restarting Sketch is necessary to refresh your plugin, Plugin Reloader will disable and enable the plugin to achieve a similar result without restarting Sketch. You might find this handy if you use `shouldKeepAround` or other long running tasks.

Note that ObjC frameworks aren't reloaded.

## How

1. Install the plugin
2. Select setup (reload will also work the first time)
3. Enter the identifier of the plugin you are developing and want to reload.
4. Select reload

## Thanks

Thanks to [@robintindale](https://github.com/robintindale) for sharing how to reload the plugins.
