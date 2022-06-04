// This section sets up some basic app metadata, the entire section is optional.
App.info({
  id: "com.mexar.lacartonomadesDEV",
  name: "La Carto'NomadesDEV",
  description: "Get a sleep spot anywhere in France",
  author: "MeXaR",
  email: "contact@mexar.fr",
  website: "https://mexar.fr",
  version: "1.1.0",
  buildNumber: "11000"
});
App.setPreference("android-targetSdkVersion", "29");

// Set up resources such as icons and launch screens.
App.icons({
  "app_store": "resources/icons/app_store.png", // 1024x1024
  "iphone_2x": "resources/icons/iphone_2x.png", // 120x120
  "iphone_3x": "resources/icons/iphone_3x.png", // 180x180
  "ipad": "resources/icons/ipad.png", // 76x76
  "ipad_2x": "resources/icons/ipad_2x.png", // 152x152
  "ipad_pro": "resources/icons/ipad_pro.png", // 167x167
  "ios_settings": "resources/icons/ios_settings.png", // 29x29
  "ios_settings_2x": "resources/icons/ios_settings_2x.png", // 58x58
  "ios_settings_3x": "resources/icons/ios_settings_3x.png", // 87x87
  "ios_spotlight": "resources/icons/ios_spotlight.png", // 40x40
  "ios_spotlight_2x": "resources/icons/ios_spotlight_2x.png", // 80x80
  "ios_notification": "resources/icons/ios_notification.png", // 20x20
  "ios_notification_2x": "resources/icons/ios_notification_2x.png", // 40x40
  "ios_notification_3x":"resources/icons/ios_notification_3x.png", // 60x60
  "iphone_legacy": "resources/icons/iphone_legacy.png", // 57x57
  "iphone_legacy_2x": "resources/icons/iphone_legacy_2x.png", // 114x114
  "ipad_spotlight_legacy": "resources/icons/ipad_spotlight_legacy.png", // 50x50
  "ipad_spotlight_legacy_2x": "resources/icons/ipad_spotlight_legacy_2x.png", // 100x100
  "ipad_app_legacy": "resources/icons/ipad_app_legacy.png", // 72x72
  "ipad_app_legacy_2x": "resources/icons/ipad_app_legacy_2x.png", // 144x144
  "android_mdpi": "resources/icons/android_mdpi.png", // 48x48
  "android_hdpi": "resources/icons/android_hdpi.png", // 72x72
  "android_xhdpi": "resources/icons/android_xhdpi.png", // 96x96
  "android_xxhdpi": "resources/icons/android_xxhdpi.png", // 144x144
  "android_xxxhdpi": "resources/icons/android_xxxhdpi.png", // 192x192
  "android_store": "resources/icons/android_store.png" // 512x512
});
App.launchScreens({
  // iOS splash screens
  iphone5: "resources/launch_screens/iphone5.png",
  iphone6: "resources/launch_screens/iphone6.png",
  iphone6p_portrait: "resources/launch_screens/iphone6p_portrait.png",
  iphone6p_landscape: "resources/launch_screens/iphone6p_landscape.png",
  iphoneX_portrait: "resources/launch_screens/iphoneX_portrait.png",
  iphoneX_landscape: "resources/launch_screens/iphoneX_landscape.png",
  ipad_portrait_2x: "resources/launch_screens/ipad_portrait_2x.png",
  ipad_landscape_2x: "resources/launch_screens/ipad_landscape_2x.png",
  // ipad_portrait_pro_10_5: "resources/launch_screens/ipad_portrait_pro_10_5.png",
  // ipad_landscape_pro_10_5:
  //   "resources/launch_screens/ipad_landscape_pro_10_5.png",
  // ipad_portrait_pro_12_9: "resources/launch_screens/ipad_portrait_pro_12_9.png",
  // ipad_landscape_pro_12_9:
  //   "resources/launch_screens/ipad_landscape_pro_12_9.png",

  // iOS splash screens legacy
  iphone_2x: "resources/launch_screens/iphone_2x.png",
  ipad_portrait: "resources/launch_screens/ipad_portrait.png",
  ipad_landscape: "resources/launch_screens/ipad_landscape.png",

  // Android splash screens
  android_mdpi_portrait: "resources/launch_screens/android_mdpi_portrait.png",
  android_mdpi_landscape: "resources/launch_screens/android_mdpi_landscape.png",
  android_hdpi_portrait: "resources/launch_screens/android_hdpi_portrait.png",
  android_hdpi_landscape: "resources/launch_screens/android_hdpi_landscape.png",
  android_xhdpi_portrait: "resources/launch_screens/android_xhdpi_portrait.png",
  android_xhdpi_landscape:
    "resources/launch_screens/android_xhdpi_landscape.png",
  android_xxhdpi_portrait:
    "resources/launch_screens/android_xxhdpi_portrait.png",
  android_xxhdpi_landscape:
    "resources/launch_screens/android_xxhdpi_landscape.png",
  android_xxxhdpi_portrait:
    "resources/launch_screens/android_xxxhdpi_portrait.png",
  android_xxxhdpi_landscape:
    "resources/launch_screens/android_xxxhdpi_landscape.png",
});
// Set PhoneGap/Cordova preferences.
App.setPreference("BackgroundColor", "#3e9f74");
App.setPreference("StatusBarBackgroundColor", "#3e9f74");
App.setPreference("StatusBarStyle", "lightcontent");
App.setPreference("Orientation", "portrait");
App.setPreference("android-usesCleartextTraffic", true);
App.appendToConfig(`
    <edit-config file="app/src/main/AndroidManifest.xml" mode="merge" target="/manifest/application" xmlns:android="http://schemas.android.com/apk/res/android">
        <application android:usesCleartextTraffic="true"></application>
    </edit-config>

    <edit-config target="NSLocationWhenInUseUsageDescription" file="*-Info.plist" mode="merge">
        <string>need location access to find things nearby</string>
    </edit-config>

    <preference name="AndroidLaunchMode" value="singleInstance" />

    <universal-links>
      <ios-team-id value="RAGBR73TBD" />
      <host name="lacartonomades.fr" scheme="https" event="openLinkForApp" />
      <host name="*.lacartonomades.fr" scheme="https" event="openLinkForApp" />
      <host name="cartonomades.fr" scheme="https" event="openLinkForApp" />
      <host name="*.cartonomades.fr" scheme="https" event="openLinkForApp" />
    </universal-links>

    <allow-navigation href="*://*.openstreetmap.org/*" />
    <allow-navigation href="*://*.openstreetmap.fr/*" />
    <allow-navigation href="*://*.ibb.co/*" />
    
    <access origin="*" />
    <allow-intent href="http://*/*" />
    <allow-intent href="https://*/*" />
    <allow-intent href="tel:*" />
    <allow-intent href="sms:*" />
    <allow-intent href="mailto:*" />
    <allow-intent href="geo:*" />
    <allow-intent href="maps:*" />


    <edit-config target="NSCameraUsageDescription" file="*-Info.plist" mode="merge">
        <string>need camera access to take pictures</string>
    </edit-config>
    <edit-config target="NSPhotoLibraryUsageDescription" file="*-Info.plist" mode="merge">
        <string>need photo library access to get pictures from there</string>
    </edit-config>
    <edit-config target="NSLocationWhenInUseUsageDescription" file="*-Info.plist" mode="merge">
        <string>need location access to find things nearby</string>
    </edit-config>
    <edit-config target="NSPhotoLibraryAddUsageDescription" file="*-Info.plist" mode="merge">
        <string>need photo library access to save pictures there</string>
    </edit-config>
`);
