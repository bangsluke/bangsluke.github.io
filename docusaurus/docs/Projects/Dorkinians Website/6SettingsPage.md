---
slug: /projects/dorkinians-website/settings-page
---

# Settings

> [< Back to Dorkinians Website](1DorkiniansWebsite.md)

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Overview](#overview)
- [Accessing Settings](#accessing-settings)
- [Available Screens Navigation](#available-screens-navigation)
  - [Main Pages](#main-pages)
  - [Sub-Pages](#sub-pages)
  - [Quick Navigation](#quick-navigation)
- [Database Status](#database-status)
  - [Seeding Status](#seeding-status)
  - [Status Indicators](#status-indicators)
  - [Database Information](#database-information)
- [PWA Installation](#pwa-installation)
  - [Install Prompt](#install-prompt)
  - [Installation Benefits](#installation-benefits)
  - [Update Notifications](#update-notifications)
- [App Updates](#app-updates)
  - [Check for Updates](#check-for-updates)
  - [Update Toast](#update-toast)
- [Help and Support](#help-and-support)
  - [Documentation Link](#documentation-link)
  - [Feedback Modal](#feedback-modal)
  - [Data Privacy Modal](#data-privacy-modal)
- [App Information](#app-information)

## Overview

The Settings page provides quick navigation to all app sections, displays database status information, and offers PWA (Progressive Web App) installation options. It serves as a central hub for app management and navigation.

:::info
The Settings page is accessible from the header menu icon on any page in the app.
:::

<div className="sideBySide">
  <img
    src="https://i.postimg.cc/qBL1crYP/Settings_Mobile.png"
    alt="Settings Mobile Screenshot"
  />
  <img
    src="https://i.postimg.cc/v8z07yks/Settings_Desktop.png"
    alt="Settings Desktop Screenshot"
  />
</div>

> [Back to Table of Contents](#table-of-contents)

## Accessing Settings

To access the Settings page:

1. **From Any Page**: Tap the menu icon (three horizontal lines or hamburger menu) in the header
2. **Settings Option**: Select "Settings" from the menu
3. **Direct Access**: The Settings page can also be accessed via direct URL (where supported)

:::tip
The Settings page is hidden from the bottom navigation bar to keep the main navigation clean, but it's always accessible via the header menu.
:::

> [Back to Table of Contents](#table-of-contents)

## Available Screens Navigation

The Available Screens section provides a comprehensive navigation tree showing all available pages and sub-pages in the app.

### Main Pages

The main navigation pages are displayed with icons:

- **Home**: Chatbot interface (no sub-pages)
- **Stats**: Statistics section with multiple sub-pages
- **TOTW**: Team of the Week section with sub-pages
- **Club Info**: Club information section with sub-pages

Each main page is displayed as a button that navigates directly to that page when tapped.

> [Back to Table of Contents](#table-of-contents)

### Sub-Pages

Sub-pages are displayed under their respective main pages:

**Stats Sub-Pages:**
- Player Stats
- Team Stats
- Club Stats
- Comparison

**TOTW Sub-Pages:**
- Team of the Week
- Players of the Month

**Club Info Sub-Pages:**
- Club Information
- League Information
- Club Captains
- Club Awards
- Useful Links

Each sub-page is displayed as a nested button that navigates directly to that specific sub-page when tapped.

:::tip
Use the sub-page navigation to jump directly to a specific section without having to navigate through the main pages first.
:::

> [Back to Table of Contents](#table-of-contents)

### Quick Navigation

The Available Screens section can be expanded or collapsed:

- **Expand/Collapse**: Tap the "Available Screens" header to expand or collapse the navigation tree
- **Quick Access**: When expanded, you can quickly navigate to any page or sub-page with a single tap
- **Visual Hierarchy**: Main pages and sub-pages are visually distinguished with different styling

This provides a quick way to navigate to any section of the app without using the bottom navigation or swiping through pages.

> [Back to Table of Contents](#table-of-contents)

## Database Status

The Database Status section displays information about the app's database connection and data seeding status.

### Seeding Status

The seeding status indicates whether the database has been successfully populated with the latest statistics data:

- **Success**: Database has been successfully seeded with the latest data
- **Failed**: Database seeding encountered an error
- **Running**: Database seeding is currently in progress
- **Unknown**: Seeding status is not available

:::info
Database seeding is the process of loading statistics data into the database. This typically happens automatically but may need to be triggered manually in some cases.
:::

> [Back to Table of Contents](#table-of-contents)

### Status Indicators

Status indicators use color-coded icons to show the current state:

- **Green Checkmark**: Seeding was successful
- **Red X**: Seeding failed
- **Yellow Clock (Pulsing)**: Seeding is currently running
- **Gray Clock**: Status is unknown or not available

The status indicator is accompanied by a text summary explaining the current state.

> [Back to Table of Contents](#table-of-contents)

### Database Information

When seeding is successful, additional information may be displayed:

- **Nodes Created**: Number of database nodes (data entries) created during seeding
- **Relationships Created**: Number of relationships between data entries created
- **Last Seeding Time**: When the database was last successfully seeded

This information helps verify that the database contains the expected amount of data.

:::tip
If you notice statistics seem outdated, check the database status to see when data was last updated.
:::

> [Back to Table of Contents](#table-of-contents)

## PWA Installation

The PWA Installation section provides options for installing the Dorkinians Website as a Progressive Web App on your device.

### Install Prompt

The install prompt appears when:

- The app detects that it can be installed on your device
- You haven't already installed the app
- Your browser supports PWA installation

**To Install:**
1. Tap the "Install App" button
2. Follow your device's installation prompts
3. The app will be added to your home screen or app drawer

:::info
PWA installation is supported on most modern mobile browsers and some desktop browsers (Chrome, Edge, Safari).
:::

> [Back to Table of Contents](#table-of-contents)

### Installation Benefits

Installing the app as a PWA provides several benefits:

- **Home Screen Access**: Quick access from your device's home screen
- **App-Like Experience**: Full-screen experience without browser UI
- **Offline Capabilities**: Some features may work offline (where supported)
- **Faster Loading**: Improved performance and faster load times
- **Push Notifications**: Receive updates and notifications (where enabled)

:::tip
Installing the app provides a more native, app-like experience compared to using it in a browser.
:::

> [Back to Table of Contents](#table-of-contents)

### Update Notifications

When the app is installed as a PWA, you may receive notifications about:

- **App Updates**: When a new version of the app is available
- **Data Updates**: When new statistics data is available
- **Important Announcements**: Club or app-related announcements

Update notifications help ensure you're always using the latest version with the most current data.

> [Back to Table of Contents](#table-of-contents)

## App Updates

The Settings page provides tools to check for and install app updates.

### Check for Updates

You can manually check for app updates from the Settings page:

1. **Navigate to Settings**: Open the Settings page from the header menu
2. **Find Update Section**: Locate the "Check for Updates" section
3. **Tap Check Button**: Tap the "Check" button to check for available updates
4. **View Status**: The app will display whether updates are available or if you're using the latest version

**Update Status Messages:**
- **"No updates available"**: You're using the latest version
- **"Update available"**: A new version is ready to install
- **"Checking..."**: The app is currently checking for updates

:::tip
Check for updates regularly to ensure you have access to the latest features and improvements.
:::

> [Back to Table of Contents](#table-of-contents)

### Update Toast

When an app update is available, an Update Toast notification appears at the bottom of the screen. This notification provides:

- **Update Information**: Shows the new version number and release notes (if available)
- **Update Button**: Tap "Update Now" to install the update immediately
- **Dismiss Option**: Tap the X button to dismiss the notification (you can update later from Settings)

**Update Toast Features:**
- Appears automatically when updates are detected
- Can be dismissed and accessed later from Settings
- Shows version number and release notes
- One-tap update installation

:::info
If you dismiss the update toast, you can still update the app later from the Settings page.
:::

> [Back to Table of Contents](#table-of-contents)

## Help and Support

The Settings page provides access to help resources and support options.

### Documentation Link

A "Help" button in the Settings page provides quick access to the complete user documentation:

1. **Find Help Button**: Locate the "Help" button in the Settings page
2. **Tap to Open**: Tap the button to open the documentation in a new tab
3. **Browse Documentation**: Access complete guides for all app features

The documentation includes:
- Complete user guides for all pages
- Feature explanations and usage examples
- Tips and tricks for using the app effectively
- Troubleshooting information

> [Back to Table of Contents](#table-of-contents)

### Feedback Modal

The Settings page includes a feedback option to submit comments, suggestions, or report issues. The Feedback Modal provides an easy way to communicate with the development team.

**Accessing the Feedback Modal:**

1. **Find Feedback Button**: Look for the feedback button in the Settings page (typically displayed with a bug or lightbulb icon)
2. **Tap to Open**: Tap the button to open the feedback modal
3. **Select Feedback Type**: Choose between "Report a Bug" or "Request a Feature"

**Submitting Feedback:**

1. **Select Type**: Choose whether you're reporting a bug or requesting a feature
   - **Report a Bug**: Use this option to report issues, errors, or unexpected behavior
   - **Request a Feature**: Use this option to suggest new features or improvements
2. **Enter Your Name**: Provide your name (optional but recommended for follow-up)
3. **Enter Your Message**: Describe the bug or feature request in detail
   - For bugs: Include steps to reproduce the issue, what you expected to happen, and what actually happened
   - For features: Describe the feature you'd like to see and how it would benefit users
4. **Submit**: Tap the submit button to send your feedback
5. **Confirmation**: You'll see a success message confirming your feedback was submitted

**Feedback Processing:**

- All feedback is automatically timestamped and includes the app version you're using
- Bug reports and feature requests are reviewed by the development team
- Your feedback helps prioritize improvements and fixes

**Modal Features:**

- **Type Selection**: Switch between bug reports and feature requests
- **Form Validation**: The form ensures both name and message are provided before submission
- **Success Feedback**: Clear confirmation when feedback is successfully submitted
- **Error Handling**: Error messages if submission fails, with option to try again
- **Keyboard Accessible**: Full keyboard navigation support

:::tip
When reporting bugs, be as specific as possible. Include details like what page you were on, what action you took, and any error messages you saw. This helps the development team fix issues faster.
:::

:::info
Your feedback is valuable! The development team reviews all feedback to improve the app experience for everyone.
:::

> [Back to Table of Contents](#table-of-contents)

### Data Privacy Modal

The Settings page provides access to data privacy information and the ability to request data removal. The Data Privacy Modal helps you understand how your data is handled and provides options for data management.

**Accessing the Data Privacy Modal:**

1. **Find Privacy Button**: Look for the data privacy button in the Settings page (typically displayed with a shield icon)
2. **Tap to Open**: Tap the button to open the data privacy modal
3. **Review Information**: Read about data collection, usage, and your privacy rights

**Data Privacy Information:**

The modal provides comprehensive information about:

- **Data Collection Practices**: What data is collected when you use the app
- **Data Usage**: How collected data is used to provide app functionality
- **Data Storage**: Where and how your data is stored
- **Data Security**: Security measures in place to protect your data
- **Privacy Rights**: Your rights regarding your personal data
- **Local Storage**: Information about data stored locally on your device (conversation history, player selections, etc.)

**Requesting Data Removal:**

If you want to request removal of your data:

1. **Enter Your Name**: Provide the name associated with the data you want removed
2. **Submit Request**: Tap the submit button to send your data removal request
3. **Confirmation**: You'll see a success message confirming your request was submitted
4. **Processing**: The development team will process your request and remove your data

**What Data Can Be Removed:**

- Player statistics and match data (if you're a player)
- User preferences and settings
- Feedback submissions
- Other personal data associated with your name

**What Data Cannot Be Removed:**

- Historical match records (these are part of the club's official records)
- Statistics that are part of team and club records
- Data required for maintaining historical accuracy

**Modal Features:**

- **Clear Information**: Easy-to-understand explanation of data practices
- **Request Form**: Simple form to request data removal
- **Success Feedback**: Confirmation when removal request is submitted
- **Error Handling**: Error messages if submission fails
- **Keyboard Accessible**: Full keyboard navigation support

:::info
The app is committed to protecting your privacy. All data removal requests are processed in accordance with privacy regulations and best practices.
:::

:::warning
Requesting data removal will permanently delete your personal data. This action cannot be undone. Historical match records that are part of official club statistics may be retained for record-keeping purposes.
:::

> [Back to Table of Contents](#table-of-contents)

## App Information

The Settings page displays app version and build information to help you identify which version you're using.

**App Version Display:**

- **Location**: The app version is typically displayed in the Settings page, often near the bottom or in an "About" section
- **Format**: Version numbers follow semantic versioning (e.g., "1.1.31")
- **Purpose**: Helps identify which version of the app you're running, useful for:
  - Reporting bugs (include version number in bug reports)
  - Checking if you have the latest version
  - Understanding which features are available in your version

**Version Information Includes:**

- **Current Version**: The version number of the app you're currently using
- **Build Information**: Technical details about the app build (where applicable)
- **Auto-Updated**: Version information is automatically updated when the app is updated

**Checking for Updates:**

- Use the "Check for Updates" feature (if available) to see if a newer version is available
- The app may automatically check for updates in the background
- Update notifications will appear when new versions are available

:::info
The app version is also included automatically when you submit feedback or data removal requests, helping the development team understand which version you're using.
:::

> [Back to Table of Contents](#table-of-contents)