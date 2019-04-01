import sketch from "sketch";
// documentation: https://developer.sketchapp.com/reference/api/

export const setup = function() {
  sketch.UI.getInputFromUser(
    "(1/2) Which plugin would you like to reload?",
    {
      initialValue: sketch.Settings.settingForKey("targetPluginIdentifier")
    },
    (err, value) => {
      if (value) {
        sketch.Settings.setSettingForKey("targetPluginIdentifier", value);
        promptForCommand();
      }
    }
  );
};

function promptForCommand() {
  sketch.UI.getInputFromUser(
    "(2/2) Send data to your plugin after reloading.",
    {
      initialValue: sketch.Settings.settingForKey("targetPluginQuery") || "",
      description:
        "Provide a query string to send data to the plugin after reloading. ex. `dance=moonwalk&skill=high`.\n\nNote, you will need to add a handler to your plugin to use this."
    },
    (err, value) => {
      sketch.Settings.setSettingForKey("targetPluginQuery", null);
      if (value) {
        sketch.UI.alert(
          "Setup Complete",
          "Note you will need to setup a handler in your plugin to use this extra data.\n\nSee help in Plugins > Plugin Reloader > Help for more info."
        );
      }
      reload();
    }
  );
}

function appURL() {
  const app = String(MSArchiveHeader.metadataForNewHeader()["app"]);
  switch (app) {
    case "com.bohemiancoding.sketch3":
      return "sketch://plugin";
    case "com.bohemiancoding.sketch3.beta":
      return "sketch-beta://plugin";
    case "com.bohemiancoding.sketch3.private":
      return "sketch-private://plugin";
    default:
      throw new Error("Unexpected sketch app");
  }
}

function openURL(urlString) {
  let url = NSURL.alloc().initWithString(urlString);
  NSWorkspace.sharedWorkspace().openURL(url);
}

export const reload = function() {
  const identifier = sketch.Settings.settingForKey("targetPluginIdentifier");
  const pm = AppController.sharedInstance().pluginManager();
  const plugin = pm.plugins()[identifier];
  if (plugin) {
    pm.disablePlugin_(plugin);
    pm.reloadPlugins();
    pm.enablePlugin_(plugin);
    pm.reloadPlugins();

    const query = sketch.Settings.settingForKey("targetPluginQuery");
    let urlString = `${appURL()}/${identifier}?reload=1&${query}`;
    openURL(urlString);

    sketch.UI.message(`🔄 Plugin Reloaded - ${identifier}`);
  } else {
    setup();
  }
};

export const openHelp = function() {
  openURL("https://github.com/TheNounProject/SketchPluginReloader");
};
