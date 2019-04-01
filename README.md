## What is this?

This plugin is intended to help Sketch plugin developers.

In cases where restarting Sketch is necessary to refresh your plugin, Plugin Reloader will disable and enable the plugin to achieve a similar result without restarting Sketch. You might find this handy if you use `shouldKeepAround` or other long running tasks.

Note that ObjC frameworks aren't reloaded.

## How

1. Install the plugin
2. Select setup (reload will also work the first time)
3. Enter the identifier of the plugin you are developing and want to reload.
4. If desired, add a query string to send to your plugin. More info in [Query Strings & Handling Reloads](#handling-reloads)
4. Select reload

## Query Strings & Handling Reloads
<a id="handling-reloads"></a<>

As part of the setup, you can optionally provide a query string to send data to your plugin after it is reloaded. This will be delivered via a handler registered for the `HandleURL` action.

An example maniftest would look like:
```js
{
    ... other manifest info
    "commands": [
        {
            "name": "Actions",
            "identifier": "action-handlers",
            "script": "./index.js",
            "handlers": {
                "actions": {
                    "HandleURL": "handleURL"
                }
            }
        }
    ]
}
```

Then in your handler
```js
export function handleURL(context) {
    const query = context.actionContext.query;
    const reload = Number(query.reload);
    console.log(reload);
    if (reload === 1) { // `reload=1` is always included in the query
        // Do something after reloader reloads your plugin
    }
}
```


## Thanks

Thanks to [@robintindale](https://github.com/robintindale) for sharing how to reload the plugins.
