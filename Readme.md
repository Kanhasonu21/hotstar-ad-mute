# Hotstar Ad Controller

![Hotstar Ad Controller](128.png?raw=true)

An enhanced version of the Hotstar Ad Muter extension that gives you complete control over all ads played during Hotstar live streams. While the original extension only muted specific ads, this version handles all ads and provides volume control options.

## Features

- **Universal Ad Detection**: Automatically detects and handles all ads during live streams
- **Flexible Control Modes**: 
  - **Mute Mode**: Completely mutes ads (0% volume)
  - **Volume Control**: Set a custom volume level for ads
- **Smart Duration Detection**: Automatically determines ad duration and restores volume when the ad ends
- **User-Friendly Interface**: Simple popup interface to:
  - Enable/disable the extension
  - Switch between mute and volume control modes
  - Adjust ad volume level with a slider
- **Volume Auto-Restore**: Automatically restores original volume when ads end

## Installation

1. Clone this repository:
```bash
git clone https://github.com/Kanhasonu21/hotstar-ad-mute
```

2. Load the extension:

### For Chrome/Edge/Brave:
1. Open `chrome://extensions/`
2. Enable "Developer Mode"
3. Click "Load unpacked"
4. Select the `chrome` folder from the cloned repository

## Usage

1. Click the extension icon in your browser toolbar
2. Toggle the main switch to enable/disable the extension
3. Choose your preferred mode:
   - **Mute Mode**: Completely mutes all ads
   - **Volume Control**: Allows setting a specific volume level for ads
4. If using Volume Control mode, use the slider to set your preferred ad volume level

## How It Works

The extension monitors Hotstar's ad tracking pixels and automatically detects when ads start playing. It then applies your chosen volume settings for the duration of the ad, after which it restores the original volume.

## Credits

This is an enhanced version of the original [Hotstar IPL Ad Muter](https://github.com/pea1bee/hotstar-ipl-ad-mute) by pea1bee, with added features for universal ad detection and volume control.

## License

MIT © 2025
