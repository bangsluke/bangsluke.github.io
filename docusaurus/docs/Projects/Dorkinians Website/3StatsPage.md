---
slug: /projects/dorkinians-website/stats-page
---

# Stats

> [< Back to Dorkinians Website](1DorkiniansWebsite.md)

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Overview](#overview)
- [Navigation](#navigation)
  - [Stats Navigation Menu](#stats-navigation-menu)
- [Filters](#filters)
- [Player Stats](#player-stats)
  - [Key Performance Stats](#key-performance-stats)
  - [Seasonal Performance](#seasonal-performance)
  - [Team Performance](#team-performance)
  - [Positional Stats](#positional-stats)
  - [Match Results](#match-results)
  - [Game Details](#game-details)
  - [Monthly Performance](#monthly-performance)
  - [Defensive Record](#defensive-record)
  - [Distance Travelled](#distance-travelled)
  - [Opposition Locations](#opposition-locations)
  - [Minutes per Stats](#minutes-per-stats)
  - [Opposition Performance](#opposition-performance)
  - [Fantasy Points](#fantasy-points)
  - [Penalty Stats](#penalty-stats)
  - [Awards and Achievements](#awards-and-achievements)
  - [Data Table](#data-table)
  - [Sharing Statistics](#sharing-statistics)
- [Team Stats](#team-stats)
  - [Key Performance Stats](#key-performance-stats-1)
  - [Recent Form](#recent-form)
  - [Top Players](#top-players)
  - [Seasonal Performance](#seasonal-performance-1)
  - [Match Results](#match-results-1)
  - [Goals Scored vs Conceded](#goals-scored-vs-conceded)
  - [Home vs Away Performance](#home-vs-away-performance)
  - [Key Team Stats](#key-team-stats)
  - [Unique Player Stats](#unique-player-stats)
  - [Best Season Finish](#best-season-finish)
  - [Data Table](#data-table-1)
- [Club Stats](#club-stats)
  - [Key Club Stats](#key-club-stats)
  - [Team Comparison](#team-comparison)
  - [Top Players](#top-players-1)
  - [Seasonal Performance](#seasonal-performance-2)
  - [Player Distribution](#player-distribution)
  - [Player Tenure](#player-tenure)
  - [Stats Distribution](#stats-distribution)
  - [Match Results](#match-results-2)
  - [Game Details](#game-details-1)
  - [Big Club Numbers](#big-club-numbers)
  - [Goals Scored vs Conceded](#goals-scored-vs-conceded-1)
  - [Home vs Away Performance](#home-vs-away-performance-1)
  - [Key Team Stats](#key-team-stats-1)
  - [Unique Player Stats](#unique-player-stats-1)
  - [Data Table](#data-table-2)
- [Comparison](#comparison)
  - [Selecting Players](#selecting-players)
  - [Radar Charts](#radar-charts)
  - [Filtering Options](#filtering-options)
- [Tips and Tricks](#tips-and-tricks)

## Overview

The Stats section provides comprehensive statistics for players, teams, and the entire club, plus a player comparison section.

:::info
All statistics can be filtered by time range, team, location, opposition, competition, result, and position (where each is applicable).
:::

<div className="sideBySide">
  <img
    src="https://i.postimg.cc/593s5JGk/Player_Stats_Mobile.png"
    alt="Player Stats Mobile Screenshot"
  />
  <img
    src="https://i.postimg.cc/zXG00MYX/Player_Stats_Desktop.png"
    alt="Player Stats Desktop Screenshot"
  />
</div>

<!-- TODO [Image: Stats Page Screenshot] -->

> [Back to Table of Contents](#table-of-contents)

## Navigation

The Stats section has four main sub-pages accessible via swiping left or right on mobile devices or using the navigation menu on desktop devices:

- **Player Stats**: Individual player performance metrics
- **Team Stats**: Team-level statistics and analysis
- **Club Stats**: Club-wide statistics and comparisons
- **Comparison**: Side-by-side player comparison

:::tip
Swipe left or right on mobile devices to quickly switch between Stats sub-pages.
:::

You can also access the navigation menu by tapping the burger menu icon in the header (that's the three horizontal lines) to see all available sections and jump directly to any one.

### Stats Navigation Menu

The Stats Navigation Menu provides quick access to all sections within the Stats pages. Access it by tapping the menu icon (three horizontal lines) in the header when viewing any Stats page.

**Using the Stats Navigation Menu:**
1. Tap the menu icon in the header (on mobile) or sidebar (on desktop)
2. Expand the stats page you want to navigate to
3. Tap on any section to jump directly to it

:::tip
Use the Stats Navigation Menu to quickly jump to specific sections without scrolling through the entire page.
:::

> [Back to Table of Contents](#table-of-contents)

## Filters

Filters allow you to narrow down statistics to specific criteria. Available filter types include:

**Time Range Filter:**
- Filter statistics by specific seasons (e.g., "2023/24", "2024/25")
- Filter by custom date ranges (select start and end dates)
- Filter by "All Time" to see statistics across all seasons
- Filter by "This Season" for current season statistics only
- Multiple seasons can be selected simultaneously

**Team Filter:**
- Filter by specific teams within the club (1st XI, 2nd XI, 3rd XI, etc.)
- Select multiple teams to compare performance across teams
- Available only for Player Stats and Comparison pages
- When no teams are selected, all teams are included by default

**Location Filter:**
- Filter by "Home" matches only
- Filter by "Away" matches only
- Filter by both home and away (default)
- Useful for analyzing home vs away performance differences

**Opposition Filter:**
- Filter by specific opposition teams
- Select multiple opposition teams to analyze performance against specific clubs
- Useful for identifying which teams a player or team performs best against
- Shows all opposition teams the player/team has played against

**Competition Filter:**
- Filter by competition type: League, Cup, or Friendly matches
- Filter by specific competitions (e.g., "Surrey Intermediate League")
- Select multiple competition types simultaneously
- Useful for comparing performance in different competition formats

**Result Filter:**
- Filter by match results: Wins, Draws, or Losses
- Select multiple result types (e.g., wins and draws only)
- Useful for analyzing performance in winning vs losing matches
- Available for Player Stats, Team Stats, and Club Stats pages

**Position Filter:**
- Filter by player position: Goalkeeper (GK), Defender (DEF), Midfielder (MID), or Forward (FWD)
- Available only for Player Stats and Comparison pages
- Useful for analyzing performance in specific positions
- Position is determined by where the player played the majority of each match

**Using Filters:**
1. Tap the filter icon to open the filter sidebar
2. Select your desired filter criteria for each filter type
3. Click "Apply Filters" to apply your selections
4. Active filters appear as white pills below the header once back on the Stats page so you can see what filters are currently applied
5. Tap on a filter pill to quickly remove that specific filter
6. Tap "Clear All Filters" in the filter sidebar to remove all active filters

**Filter Persistence:**
- Filters persist when navigating between Stats sub-pages (Player Stats, Team Stats, Club Stats, Comparison)
- Filters are cleared when you change the selected player or team
- Filters are stored in your browser's session storage

:::tip
Combine multiple filters to create very specific queries. For example, filter by "This Season", "Home", and "Wins" to see how a player performs in home wins this season.
:::

:::warning
Filters persist when navigating between Stats sub-pages, so remember to clear filters if you want to see unfiltered data in a different section.
:::

[Image: Filters Screenshot]

> [Back to Table of Contents](#table-of-contents)

## Player Stats

The Player Stats section provides comprehensive statistics for individual players. Select a player using the player selector at the top of the page, then explore their performance across multiple categories.

<div className="sideBySide">
  <img
    src="https://i.postimg.cc/593s5JGk/Player_Stats_Mobile.png"
    alt="Player Stats Mobile Screenshot"
  />
  <img
    src="https://i.postimg.cc/zXG00MYX/Player_Stats_Desktop.png"
    alt="Player Stats Desktop Screenshot"
  />
</div>

### Key Performance Stats

The Key Performance Stats section displays the most important metrics for the selected player, including:

- Appearances
- Minutes played
- Seasons count
- Man of the Match awards
- Goals scored
- Assists

> [Back to Table of Contents](#table-of-contents)

### Seasonal Performance

The Seasonal Performance section shows how the player's statistics have changed across different seasons displayed in a column chart to show trends over time.

:::tip
Use the dropdown menu to select a different metric to display in the chart.
:::

> [Back to Table of Contents](#table-of-contents)

### Team Performance

The Team Performance section shows how the player performs for different teams within the club. This includes:

- Statistics broken down by team (1st XI, 2nd XI, etc.)
- Most played for team
- Best performing team
- Goals scored per team

This helps identify which team a player performs best for.

> [Back to Table of Contents](#table-of-contents)

### Positional Stats

The Positional Stats section displays statistics broken down by the position the player played in (Goalkeeper, Defender, Midfielder, Forward). This includes:

- Appearances in each position
- Goals scored from each position
- Performance metrics by position
- Minutes played in each position

:::info
Position is determined by the captain's assessment of where the player played the majority of each match.
:::

> [Back to Table of Contents](#table-of-contents)

### Match Results

The Match Results section shows the player's record in matches, including:

- Win percentage
- Games won, drawn, and lost
- Win rate when the player scores
- Home vs away win rates

This section helps understand the player's impact on match outcomes.

> [Back to Table of Contents](#table-of-contents)

### Game Details

The Game Details section provides a detailed list of all matches the player has participated in, including:

- Match date
- Opposition team
- Result
- Goals scored
- Assists
- Man of the Match awards
- Other match-specific statistics

You can scroll through the list to see individual match performances.

> [Back to Table of Contents](#table-of-contents)

### Monthly Performance

The Monthly Performance section shows statistics broken down by month, helping identify:

- Best performing months
- Seasonal patterns
- Monthly goal and assist trends

Data is displayed in bar charts showing performance across different months.

> [Back to Table of Contents](#table-of-contents)

### Defensive Record

The Defensive Record section focuses on defensive statistics, including:

- Clean sheets
- Goals conceded
- Clean sheets per appearance
- Goals conceded per appearance
- Minutes per clean sheet

This section is particularly relevant for defenders and goalkeepers.

> [Back to Table of Contents](#table-of-contents)

### Distance Travelled

The Distance Travelled section shows the total distance the player has traveled to away matches, calculated from the club's home ground (Pixham Sports Ground) to each opposition ground.

:::info
Distance is calculated as the round trip (there and back) for each away match.
:::

> [Back to Table of Contents](#table-of-contents)

### Opposition Locations

The Opposition Locations section displays a map or list showing all the locations where the player has played away matches, providing a visual representation of their travel history.

> [Back to Table of Contents](#table-of-contents)

### Minutes per Stats

The Minutes per Stats section shows efficiency metrics, displaying how many minutes of play are required for various statistics:

- Minutes per goal
- Minutes per assist
- Minutes per clean sheet
- Minutes per appearance

Lower numbers indicate higher efficiency.

> [Back to Table of Contents](#table-of-contents)

### Opposition Performance

The Opposition Performance section shows how the player performs against different opposition teams, including:

- Goals scored against each opposition
- Appearances against each opposition
- Win rate against each opposition
- Best and worst performing oppositions

This helps identify which teams the player performs best against.

> [Back to Table of Contents](#table-of-contents)

### Fantasy Points

The Fantasy Points section displays the player's fantasy football points total and breakdown, including:

- Total fantasy points
- Fantasy points per appearance
- Points breakdown by category (goals, assists, clean sheets, etc.)

:::tip
Fantasy points are calculated using a standard fantasy football scoring system.
:::

> [Back to Table of Contents](#table-of-contents)

### Penalty Stats

The Penalty Stats section provides detailed penalty statistics, including:

- Penalties scored
- Penalties missed
- Penalties conceded
- Penalties saved (for goalkeepers)
- Penalty conversion rate

This section helps assess a player's penalty-taking ability.

> [Back to Table of Contents](#table-of-contents)

### Awards and Achievements

The Awards and Achievements section displays any awards, milestones, or achievements the player has earned, such as:

- Team of the Week appearances
- Player of the Month awards
- Milestone achievements (e.g., 100 appearances, 50 goals)
- Club records

> [Back to Table of Contents](#table-of-contents)

### Data Table

The Data Table section provides a comprehensive, sortable table of all player statistics. You can:

- Sort by any column
- Scroll through all available statistics
- View raw data values
- Export data (where supported)

:::tip
Use the data table when you need to see exact values or compare specific statistics that aren't shown in the visual sections.
:::

> [Back to Table of Contents](#table-of-contents)

### Sharing Statistics

The Player Stats section includes functionality to share player statistics as images. This feature allows you to create and share visual representations of player performance data.

**Accessing Share Functionality:**

1. **Share Button**: Look for the share button in the Player Stats section (typically located near the player selector or in the header)
2. **Select Visualization**: Choose which visualization you want to share from the available options
3. **Customize Appearance**: Select a background color (yellow or green) for your shared image
4. **Generate and Share**: The app will generate an image that you can share via your device's sharing options

**Available Visualizations for Sharing:**

- **Seasonal Performance**: Bar chart showing performance across seasons
- **Team Performance**: Bar chart showing performance by team
- **Positional Stats**: Visualization of appearances by position
- **Match Results**: Pie chart of wins, draws, and losses
- **Game Details**: Summary of game statistics
- **Defensive Record**: Defensive statistics visualization
- **Card Stats**: Yellow and red card statistics
- **Penalty Stats**: Penalty-related statistics
- **Fantasy Points**: Fantasy points breakdown
- **Distance Travelled**: Distance traveled visualization
- **Minutes per Stats**: Efficiency metrics visualization
- **Monthly Performance**: Monthly performance chart
- **Awards and Achievements**: Awards and achievements display

**Sharing Options:**

- **Web Share API**: On supported devices, you can share directly to social media, messaging apps, or other installed apps
- **Download**: On devices without Web Share API support, the image is automatically downloaded to your device
- **iOS Preview**: On iOS devices, a preview is shown before sharing
- **Image Format**: Shared images are saved as PNG files with the player's name in the filename

**Customization:**

- **Background Colors**: Choose between yellow (Dorkinians yellow) or green background colors
- **Filter Inclusion**: The shared image includes information about any active filters applied to the statistics
- **Player Information**: The shared image includes the player's name and key statistics

:::info
The share functionality generates a high-quality 1080x1080 pixel image optimized for social media sharing.
:::

:::tip
Use the share functionality to create personalized statistics cards for social media posts, team communications, or personal records.
:::

:::warning
Share functionality may not be available on all devices or browsers. If the share button is not visible, the feature may be temporarily disabled or not supported on your device.
:::

> [Back to Table of Contents](#table-of-contents)

## Team Stats

The Team Stats section provides statistics and analysis for individual teams within the club. Select a team using the team selector, then explore their performance across multiple categories.

<div className="sideBySide">
  <img
    src="https://i.postimg.cc/jqXM6T9c/Team_Stats_Mobile.png"
    alt="Team Stats Mobile Screenshot"
  />
  <img
    src="https://i.postimg.cc/CLxmmtpM/Team_Stats_Desktop.png"
    alt="Team Stats Desktop Screenshot"
  />
</div>

### Key Performance Stats

The Key Performance Stats section displays the most important metrics for the selected team, including:

- Games played
- Wins, draws, and losses
- Goals scored and conceded
- Goal difference
- Clean sheets
- Win percentage
- Points per game

These stats are displayed as large, easy-to-read cards.

> [Back to Table of Contents](#table-of-contents)

### Recent Form

The Recent Form section shows the team's performance in their most recent matches, displaying:

- Recent match results
- Form guide (W/D/L indicators)
- Goals scored and conceded in recent matches
- Current winning or losing streak

This helps assess the team's current form and momentum.

> [Back to Table of Contents](#table-of-contents)

### Top Players

The Top Players section displays the best performing players for the selected team across various metrics, including:

- Top goal scorers
- Top assist providers
- Most appearances
- Highest fantasy points
- Other key statistics

Players are ranked and displayed with their statistics.

> [Back to Table of Contents](#table-of-contents)

### Seasonal Performance

The Seasonal Performance section shows how the team's statistics have changed across different seasons, including:

- Win percentage per season
- Goals scored per season
- Goals conceded per season
- League position per season
- Other key metrics over time

Data is displayed in charts showing trends across seasons.

> [Back to Table of Contents](#table-of-contents)

### Match Results

The Match Results section provides a detailed list of all matches the team has played, including:

- Match date
- Opposition team
- Result
- Score
- Competition
- Location (home/away)

You can scroll through the list to see individual match results.

> [Back to Table of Contents](#table-of-contents)

### Goals Scored vs Conceded

The Goals Scored vs Conceded section displays a comparison chart showing the relationship between goals scored and goals conceded, helping identify:

- Offensive strength
- Defensive strength
- Balance between attack and defense

> [Back to Table of Contents](#table-of-contents)

### Home vs Away Performance

The Home vs Away Performance section compares the team's performance at home versus away matches, showing:

- Home win percentage vs away win percentage
- Goals scored at home vs away
- Goals conceded at home vs away
- Other home/away comparisons

This helps identify whether the team performs better at home or away.

> [Back to Table of Contents](#table-of-contents)

### Key Team Stats

The Key Team Stats section displays important team-level statistics, including:

- Average goals per game
- Average goals conceded per game
- Clean sheet percentage
- Points per game
- Other team metrics

> [Back to Table of Contents](#table-of-contents)

### Unique Player Stats

The Unique Player Stats section shows interesting statistics about the players who have represented the team, such as:

- Number of unique players
- Most capped player
- Longest-serving player
- Other player-related metrics

> [Back to Table of Contents](#table-of-contents)

### Best Season Finish

The Best Season Finish section displays the team's best league finish across all seasons, including:

- Best league position achieved
- Season when best finish occurred
- Points total in best season
- Other season records

> [Back to Table of Contents](#table-of-contents)

### Data Table

The Data Table section provides a comprehensive, sortable table of all team statistics. You can:

- Sort by any column
- Scroll through all available statistics
- View raw data values

> [Back to Table of Contents](#table-of-contents)

## Club Stats

The Club Stats section provides club-wide statistics and comparisons across all teams. This section gives a comprehensive view of the entire club's performance.

<div className="sideBySide">
  <img
    src="https://i.postimg.cc/bYTm0PMT/Club_Stats_Mobile.png"
    alt="Club Stats Mobile Screenshot"
  />
  <img
    src="https://i.postimg.cc/yY8vv5C7/Club_Stats_Desktop.png"
    alt="Club Stats Desktop Screenshot"
  />
</div>

### Key Club Stats

The Key Club Stats section displays the most important club-wide metrics, including:

- Total games played across all teams
- Total wins, draws, and losses
- Total goals scored and conceded
- Overall win percentage
- Other club-level statistics

> [Back to Table of Contents](#table-of-contents)

### Team Comparison

The Team Comparison section allows you to compare statistics across different teams within the club, showing:

- Side-by-side comparisons of team performance
- Comparative charts and graphs
- Team rankings across various metrics

This helps identify which teams are performing best and how they compare to each other.

> [Back to Table of Contents](#table-of-contents)

### Top Players

The Top Players section displays the best performing players across the entire club, including:

- Top goal scorers (all teams)
- Top assist providers (all teams)
- Most appearances (all teams)
- Highest fantasy points (all teams)
- Other club-wide player rankings

> [Back to Table of Contents](#table-of-contents)

### Seasonal Performance

The Seasonal Performance section shows how the club's overall statistics have changed across different seasons, including:

- Club-wide win percentage per season
- Total goals scored per season
- Total goals conceded per season
- Other club metrics over time

Data is displayed in charts showing trends across seasons.

> [Back to Table of Contents](#table-of-contents)

### Player Distribution

The Player Distribution section shows how players are distributed across teams, including:

- Number of players per team
- Players who have played for multiple teams
- Team representation statistics

> [Back to Table of Contents](#table-of-contents)

### Player Tenure

The Player Tenure section displays statistics about how long players have been with the club, including:

- Longest-serving players
- Average player tenure
- Players by years of service
- Other tenure-related metrics

> [Back to Table of Contents](#table-of-contents)

### Stats Distribution

The Stats Distribution section shows how various statistics are distributed across the club, including:

- Distribution of goals across players
- Distribution of appearances
- Other statistical distributions

This helps identify whether performance is concentrated in a few players or spread across many.

> [Back to Table of Contents](#table-of-contents)

### Match Results

The Match Results section provides a comprehensive list of all matches played by all teams, including:

- Match date
- Team
- Opposition team
- Result
- Score
- Competition
- Location (home/away)

You can filter and scroll through all club matches.

> [Back to Table of Contents](#table-of-contents)

### Game Details

The Game Details section provides detailed information about all matches, including comprehensive match statistics for the entire club.

> [Back to Table of Contents](#table-of-contents)

### Big Club Numbers

The Big Club Numbers section displays impressive club-wide milestones and records, such as:

- Total goals scored (all time)
- Total appearances (all time)
- Club records and achievements
- Other significant numbers

> [Back to Table of Contents](#table-of-contents)

### Goals Scored vs Conceded

The Goals Scored vs Conceded section displays a club-wide comparison chart showing the relationship between goals scored and goals conceded across all teams.

> [Back to Table of Contents](#table-of-contents)

### Home vs Away Performance

The Home vs Away Performance section compares the club's overall performance at home versus away matches across all teams.

> [Back to Table of Contents](#table-of-contents)

### Key Team Stats

The Key Team Stats section displays important team-level statistics aggregated across all teams, showing club-wide averages and totals.

> [Back to Table of Contents](#table-of-contents)

### Unique Player Stats

The Unique Player Stats section shows interesting statistics about all players who have represented the club, such as:

- Total unique players
- Players who have played for multiple teams
- Other club-wide player metrics

> [Back to Table of Contents](#table-of-contents)

### Data Table

The Data Table section provides a comprehensive, sortable table of all club statistics. You can:

- Sort by any column
- Scroll through all available statistics
- View raw data values

> [Back to Table of Contents](#table-of-contents)

## Comparison

The Comparison section allows you to compare multiple players side-by-side using interactive radar charts and detailed statistics.

<div className="sideBySide">
  <img
    src="https://i.postimg.cc/J7qp38gP/Player_Comparison_Mobile.png"
    alt="Player Comparison Mobile Screenshot"
  />
  <img
    src="https://i.postimg.cc/NfjppVvY/Player_Comparison_Desktop.png"
    alt="Player Comparison Desktop Screenshot"
  />
</div>

### Selecting Players

To compare players:

1. Enter edit mode by tapping the edit icon
2. Select the first player from the player selector
3. Select additional players (up to the maximum allowed)
4. Exit edit mode to view the comparison

:::tip
You can compare up to multiple players simultaneously. The radar chart will show all selected players for easy comparison.
:::

> [Back to Table of Contents](#table-of-contents)

### Radar Charts

Radar charts provide a visual comparison of multiple players across various statistics. Each axis represents a different statistic, and each player is represented by a different colored line.

**Radar Chart Features:**
- Multiple statistics displayed simultaneously
- Easy visual comparison between players
- Interactive tooltips showing exact values
- Responsive design adapting to screen size

:::info
Radar charts are particularly useful for comparing players across multiple dimensions at once, such as goals, assists, appearances, and fantasy points.
:::

> [Back to Table of Contents](#table-of-contents)

### Filtering Options

The Comparison section supports all standard filters, allowing you to:

- Compare players within a specific time range
- Compare players for specific teams
- Compare players in home or away matches
- Compare players against specific oppositions
- Compare players in specific competitions
- Compare players in matches with specific results
- Compare players in specific positions

Filters are applied to all players in the comparison simultaneously.

> [Back to Table of Contents](#table-of-contents)

## Tips and Tricks

1. **Use Filters Strategically**: Apply filters to focus on specific aspects of performance (e.g., "this season", "home matches only")

2. **Compare Across Sections**: Use the same filters across Player Stats, Team Stats, and Club Stats to see how individual performance relates to team and club performance

3. **Explore Data Tables**: When you need exact values or want to see all available statistics, check the Data Table sections

4. **Check Multiple Sections**: Some statistics appear in multiple sections with different visualizations - explore different sections to find the view that works best for you

5. **Use Comparison for Insights**: The Comparison section is great for identifying strengths and weaknesses when evaluating players

6. **Player Context**: Set a player context in Player Stats, then use the chatbot on the Home page with pronouns for quick queries

:::warning
Filters persist when navigating between Stats sub-pages, so remember to clear filters if you want to see unfiltered data in a different section.
:::

> [Back to Table of Contents](#table-of-contents)