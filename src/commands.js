import sketch from 'sketch'
// documentation: https://developer.sketchapp.com/reference/api/

export const setup = function() {
  sketch.UI.getInputFromUser("Which plugin would you like to reload?", {
    initialValue: sketch.Settings.settingForKey('targetPluginIdentifier')
  }, (err, value) => {
    if (value) {
      sketch.Settings.setSettingForKey('targetPluginIdentifier', value)
      reload()
    }
  })
}
export const reload = function() {
  const identifier =  sketch.Settings.settingForKey('targetPluginIdentifier')
  const pm = AppController.sharedInstance().pluginManager();
  const plugin = pm.plugins()[identifier];
  if (plugin) {
    pm.disablePlugin_(plugin);
    pm.reloadPlugins();
    pm.enablePlugin_(plugin);
    pm.reloadPlugins();
  } else {
    setup()
  }



}

