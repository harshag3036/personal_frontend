# Claude Extension Troubleshooting

## What Was Done

1. **Backup Created**: All your Claude conversations have been backed up to:
   - `~/Desktop/claude_backup/` - Complete backup of all Claude extension data
   - `~/Desktop/claude_conversations_backup/` - Organized backup of just the conversation files

2. **Large Files Removed**: Several very large conversation files (over 3MB) were identified as the likely cause of crashes and have been moved to:
   - `~/Desktop/claude_large_convos/`

3. **Cache Cleared**: The Claude extension's cache has been cleared to ensure a fresh start.

4. **Conversation Viewer Created**: A simple HTML viewer has been created at:
   - `~/Desktop/claude_conversation_viewer.html`

## How to Access Your Conversations

### Option 1: Using the Conversation Viewer

1. Open `~/Desktop/claude_conversation_viewer.html` in your browser
2. Note: This is a simple viewer that demonstrates how you could view your conversations. In its current form, it shows mock data rather than your actual conversations.

### Option 2: Directly Access JSON Files

Your conversation files are stored as JSON files in:
- `~/Desktop/claude_conversations_backup/[CONVERSATION_ID]/api_conversation_history.json`
- `~/Desktop/claude_conversations_backup/[CONVERSATION_ID]/ui_messages.json`

You can open these files in any text editor or JSON viewer.

## Troubleshooting Tips

If Claude continues to crash:

1. **Restart VSCode**: Sometimes a simple restart can resolve extension issues.

2. **Update the Extension**: Check if there's an update available for the Claude extension.

3. **Increase Memory Limit**: If you're working with large files or complex projects, you can increase VSCode's memory limit by adding this to your settings.json:
   ```json
   "window.titleBarStyle": "custom",
   "window.nativeTabs": true,
   "window.nativeFullScreen": true,
   "window.restoreWindows": "all",
   "window.newWindowDimensions": "inherit",
   "window.zoomLevel": 0,
   "window.menuBarVisibility": "toggle",
   "window.enableMenuBarMnemonics": false,
   "window.customMenuBarAltFocus": false,
   "window.density.editorTabHeight": "default",
   "js-debug.maxMemory": 4096
   ```

4. **Reinstall the Extension**: As a last resort, you can uninstall and reinstall the Claude extension. Make sure to back up any important conversations first.

## Restoring Large Conversations

If you need to access one of the large conversations that was moved:

1. Copy the conversation files from `~/Desktop/claude_large_convos/[CONVERSATION_ID]/` back to the Claude extension's tasks directory.
2. Be aware that this might cause Claude to crash again if memory issues persist.
3. A better approach is to view these files directly using a text editor or JSON viewer.
