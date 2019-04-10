## What is this?

This plugin is intended to help Sketch plugin developers.

In cases where restarting Sketch is necessary to refresh your plugin, Plugin Reloader will disable and enable the plugin to achieve a similar result without restarting Sketch. You might find this handy if you use `shouldKeepAround` or other long running tasks.

Note that ObjC frameworks aren't reloaded.

## How

1. Install the plugin
2. Select setup (reload will also work the first time)
3. Enter the identifier of the plugin you are developing and want to reload.
4. If desired, add a command identifier from your plugin to run after reloading. More info in [Query Strings & Handling Reloads](#handling-reloads)
4. Select reload

## Handling Reloads

<a id="handling-reloads"></a>

There are two ways to handle your plugin being reloaded.

### 1. Run a Command

> Note: Support coming in a future release of Sketch (current is 54).

If you just want to run an existing command after your plugin is reloaded, simply provide the command identifier from your plugin.

### 2. HandleURL Action

If no command identifier is provided (or in Sketch 54 or earlier) you can handle the reload maually if needed. The HandleURL action will be called after reloading.

The query string always includes `reload=1` but you can provide additional info if needed by entering a query string instead of a command identifier during setup (not this must begin with `?`)

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
