---
slug: /projects/dorkinians-website/home-page
---

# Home

> [< Back to Dorkinians Website](1DorkiniansWebsite.md)

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Overview](#overview)
- [Player Selection](#player-selection)
  - [Selecting a Player](#selecting-a-player)
  - [Recent Players](#recent-players)
  - [Editing Player Selection](#editing-player-selection)
- [Chatbot Interface](#chatbot-interface)
  - [Asking Questions](#asking-questions)
  - [Example Questions](#example-questions)
  - [Example Questions Modal](#example-questions-modal)
  - [Visualization Types](#visualization-types)
  - [Conversation History](#conversation-history)

## Overview

The Home page is the main entry point of the Dorkinians Website app. It features a chatbot interface that allows you to ask questions about player statistics, team performance, and club information.

Users must initially select a player before using the chatbot, allowing them to ask questions about that player's statistics using "I", "me", or "my" in the question such as "How many goals have I scored?" or "What was my highest scoring season?". The chatbot will then attempt to answer the question based on the player's statistics and return visualisations where applicable.

:::info
The chatbot uses advanced natural language processing to understand your questions and return relevant statistics with visualizations.
:::

:::tip
You can still ask questions about other players when you already have a player selected, just as long as you use their full name in the question.

E.g. "How many goals has Oli Goddard scored?"
:::

<!-- TODO [Image: Home Page Screenshot] -->

<div className="sideBySide">
  <img
    src="https://i.postimg.cc/660MVKSh/Homepage_Mobile.png"
    alt="Homepage Mobile Screenshot"
  />
  <img
    src="https://i.postimg.cc/qMvjjYHR/Homepage_Desktop.png"
    alt="Homepage Desktop Screenshot"
  />
</div>

> [Back to Table of Contents](#table-of-contents)

## Player Selection

Before using the chatbot, you need to select a player. The Home page provides an intuitive player selection interface.

### Selecting a Player

To select a player:

1. **Player Selector**: Use the player selector dropdown on the Home page
2. **Search**: Type a player's name to search and filter the list. At least 3 characters are required to search.
3. **Chatbot Activation**: Once a player is selected, the chatbot interface will appear automatically

:::info
The team shown in brackets next to the player's name is the team they have played for the most.
:::

:::tip
Player selection persists across sessions, so you don't need to reselect your player every time you use the app.
:::

> [Back to Table of Contents](#table-of-contents)

### Recent Players

The Home page displays a "Recently Selected Players" section when no player is currently selected. This feature shows up to 5 of your most recently selected players for quick access.

> [Back to Table of Contents](#table-of-contents)

### Editing Player Selection

To change your selected player:

1. **Edit Button**: Click the edit icon next to the player's name (when chatbot is visible)
2. **Player Selector**: The player selector will reappear

> [Back to Table of Contents](#table-of-contents)

## Chatbot Interface

The chatbot interface is the primary way to interact with the app. You can ask questions about any aspect of Dorkinians FC statistics and receive instant answers with visual data.

### Asking Questions

To ask a question, simply type it into the chatbot input field and press `Enter` or tap the send button. The chatbot understands natural language, so you can ask questions in various ways:

- "How many goals has Luke Bangs scored?"
- "Show me the top goal scorers this season"
- "What's the 1st team's win percentage?"
- "Who has the most appearances for the club?"

:::tip
The chatbot understands typos and variations in player names, team names, and stat types. For example, "Luk Bangs" will be matched to "Luke Bangs".
:::

:::info
If a question cannot be answered, the chatbot will return a message saying "I'm not sure how to answer that question. Please try again."

The question will be sent to the developer for review to help train and improve the chatbot's responses.
:::

> [Back to Table of Contents](#table-of-contents)

### Example Questions

The chatbot interface includes example questions that you can click to quickly ask common queries. These examples demonstrate the types of questions the chatbot can answer:

- Player statistics questions
- Team performance queries
- Club-wide statistics
- Comparison questions
- Historical data queries

Clicking an example question will automatically populate the input field, and you can modify it or submit it as-is.

:::tip
Use example questions as templates for your own queries - they show the best way to phrase questions for accurate results.
:::

> [Back to Table of Contents](#table-of-contents)

### Example Questions Modal

The Example Questions Modal provides access to a comprehensive list of example questions organized by category. This modal helps you discover new ways to interact with the chatbot and find questions that match your interests.

**Accessing the Modal:**

1. **Show More Button**: When viewing example questions on the Home page, look for the "Show more example questions" button below the displayed examples
2. **Tap to Open**: Tap the button to open the full Example Questions Modal
3. **Browse Questions**: Scroll through the organized list of example questions

**Using the Modal:**

- **Question Selection**: Tap any question in the modal to select it
- **Auto-Populate**: Selected questions automatically populate the chatbot input field
- **Edit Before Sending**: You can modify the question in the input field before submitting
- **Close Modal**: Tap the "Close" button or tap outside the modal to dismiss it

**Modal Features:**

- **Organized Categories**: Questions are organized by type (player stats, team stats, club stats, comparisons, etc.)
- **Numbered List**: Each question is numbered for easy reference
- **Full-Screen View**: The modal provides a full-screen view for easy browsing on mobile devices
- **Keyboard Accessible**: The modal supports keyboard navigation and screen readers

:::info
The Example Questions Modal contains many more example questions than what's shown on the main Home page, giving you access to a wider variety of query types.
:::

:::tip
Use the Example Questions Modal to explore different question formats and discover what types of statistics you can query.
:::

[Image: Example Questions Modal Screenshot]

> [Back to Table of Contents](#table-of-contents)

### Visualization Types

The chatbot returns answers with different types of visualizations depending on the question and data. Understanding these visualization types helps you interpret the chatbot's responses.

**NumberCard**

The NumberCard displays a single numeric value in a prominent card format. This is used for:

- Single statistics (e.g., "How many goals has Luke Bangs scored?")
- Counts and totals
- Simple numeric answers
- Personal bests and records

**Example Use Cases:**
- Total goals scored
- Number of appearances
- Clean sheets count
- Fantasy points total

[Image: NumberCard Visualization Screenshot]

**Table**

The Table visualization displays data in a structured tabular format. This is used for:

- Multiple records or comparisons
- League tables and standings
- Player comparisons
- Team statistics
- Lists of matches or results

**Example Use Cases:**
- Top goal scorers list
- Team comparison tables
- Match results list
- Player rankings

[Image: Table Visualization Screenshot]

**Calendar**

The Calendar visualization displays time-based data on a calendar view. This is used for:

- Streak analysis (consecutive games, scoring streaks)
- Performance over time
- Temporal patterns
- Date-based statistics

**Example Use Cases:**
- Consecutive games played
- Scoring streaks
- Performance calendar
- Match dates visualization

[Image: Calendar Visualization Screenshot]

**Chart**

The Chart visualization displays data in graphical formats (bar charts, line charts, etc.). This is used for:

- Trends over time
- Comparisons between entities
- Statistical distributions
- Performance trends

**Example Use Cases:**
- Goals per season chart
- Team performance comparison
- Statistical trends
- Performance distributions

[Image: Chart Visualization Screenshot]

:::info
The chatbot automatically selects the most appropriate visualization type based on your question and the data being returned.
:::

:::tip
If you want a specific visualization type, try phrasing your question to request it. For example, "Show me a chart of goals per season" will likely return a Chart visualization.
:::

> [Back to Table of Contents](#table-of-contents)

### Conversation History

The chatbot maintains a conversation history during your session. Previous questions and answers are displayed above the input field, allowing you to:

- Review previous queries and responses
- See the context of your conversation
- Reference earlier answers

**Storage and Persistence:**

- **Local Storage**: Conversation history is stored locally in your browser using localStorage
- **Player-Specific**: Each player's conversation history is stored separately, so switching players shows different conversation histories
- **Persistent Across Sessions**: Your conversation history persists even after closing and reopening the app, as long as you're using the same browser and device
- **Last 3 Conversations**: The app keeps the last 3 conversations per player for quick reference
- **Automatic Restoration**: When you return to a previously selected player, their last conversation is automatically restored

**How It Works:**

1. **Automatic Saving**: Each question and answer pair is automatically saved to your conversation history
2. **Player Context**: Conversations are tagged with the selected player, so each player maintains their own history
3. **Session Management**: The app creates a unique session ID for tracking your chatbot interactions
4. **Context Awareness**: The chatbot uses conversation history to understand context for follow-up questions

**Managing Conversation History:**

- **Clear on Player Change**: When you change the selected player, the conversation history for the new player is loaded (or starts fresh if it's a new player)
- **Browser Storage**: Conversation history is stored in your browser's localStorage, so clearing browser data will remove conversation history
- **Privacy**: All conversation history is stored locally on your device and is never sent to external servers

:::info
Conversation history helps the chatbot understand context for follow-up questions, making your interactions more natural. For example, if you ask "How many goals have I scored?" followed by "What about assists?", the chatbot knows you're still asking about your own statistics.
:::

:::tip
If you want to start fresh with a player, you can clear your browser's localStorage or switch to a different player and back again.
:::

> [Back to Table of Contents](#table-of-contents)

