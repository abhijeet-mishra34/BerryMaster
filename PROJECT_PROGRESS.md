# 🍓 BerryMaster — Project Progress Log

**Project:** BerryMaster
**Author:** Abhijeet Mishra
**Framework:** React + TypeScript + Vite + Tailwind CSS
**Storage:** Local Storage (Current Version)
**Status:** 🟢 Active Development

---

# 📌 Project Goal

BerryMaster is a desktop web application designed for PokeMMO players to efficiently manage berry farming.

The long-term goal is to create a complete berry farming management system that tracks:

* Characters
* Berry planting
* Watering schedules
* Harvest timers
* Inventory
* Seeds
* Analytics
* Farming profits

Future goal:

A smart farming assistant capable of helping players optimize their farming workflow.

---

# 🏗 Current Architecture

Technology:

```
React
TypeScript
Vite
Tailwind CSS
React Router
Local Storage
```

Architecture principles:

* Reusable components
* Strong TypeScript typing
* Modular data structure
* Context for application state
* Pages manage UI state
* Services handle business logic
* Easy future expansion

---

# ✅ Completed Features

# Sprint 1 — Project Setup

Completed:

✔ Created React + TypeScript project using Vite

✔ Installed and configured Tailwind CSS

✔ Created project folder structure

✔ Added React Router

✔ Created application layout

✔ Built Sidebar navigation

Structure created:

```
src/

components/
context/
data/
pages/
types/
utils/
constants/
services/
```

Status:

✅ Complete

---

# Sprint 2 — Dashboard System

Created:

* Dashboard Page
* Statistics Cards
* Character Preview Section
* Reusable Section Component
* Reusable Button Component
* Dashboard Data Structure

Dashboard displays:

* Character count
* Farming overview
* Application statistics

Status:

✅ Complete

---

# Sprint 3 — Character Management System

Created:

```
src/types/Character.ts
src/context/CharacterContext.tsx
```

Implemented:

✔ Character type system

✔ Character Provider

✔ Local Storage persistence

✔ Character state management

Features:

✔ Add Character

✔ Duplicate name validation

✔ Persistent storage

✔ Dashboard integration

Status:

✅ Complete

---

# Sprint 4 — Character Card System

Created:

```
CharacterCard.tsx
```

Character display:

```
Character #001

ID

Name

Berry

Status

Next Water

Harvest
```

Actions:

* ✏ Edit
* 🗑 Delete

Status:

✅ Complete

---

# Sprint 5 — Delete System

Created:

```
ConfirmDialog.tsx
```

Implemented:

✔ Custom confirmation modal

✔ Cancel action

✔ Delete confirmation

✔ Character information display

Removed:

* Browser confirm()

Status:

✅ Complete

---

# Sprint 6 — Character CRUD System

Implemented:

Complete CRUD:

✔ Create Character

✔ Read Characters

✔ Update Character

✔ Delete Character

Created:

```
CharacterModal
```

Supports:

* Add Mode
* Edit Mode

CharacterContext manages:

```ts
addCharacter()

updateCharacter()

deleteCharacter()
```

Character IDs:

Display:

```
Character #001
```

Internal:

```
UUID
```

Status:

✅ Complete

---

# Sprint 7 — Berry Database System 🍓

The foundation of BerryMaster's berry system was created.

---

# Berry Type System

Created:

```
src/types/Berry.ts
```

Implemented:

✔ Berry ID

✔ Name

✔ Description

✔ Category

✔ Growth Time

✔ Harvest Window

✔ Yield Range

✔ Recipes

✔ Seed Drops

✔ Tags

✔ Featured Berry support

Status:

✅ Complete

---

# Berry Category System

Created:

```
src/types/BerryCategories.ts
```

Categories:

✔ Status Berries

✔ Healing / Utility Berries

✔ Flavor Berries

✔ EV Berries

✔ Type Resistance Berries

✔ Special Berries

Status:

✅ Complete

---

# Berry Database Architecture

Created:

```
src/data/

berryDatabase.ts

berries/

├── statusBerries.ts
├── healingUtilityBerries.ts
├── flavorBerries.ts
├── evBerries.ts
├── typeResistanceBerries.ts
└── specialBerries.ts
```

Benefits:

✔ Modular database

✔ Easy expansion

✔ No duplicate entries

✔ Ready for farming calculations

Status:

✅ Complete

---

# Berry Database Validation

Created:

```
validateBerryDatabase.ts
```

Checks:

✔ Duplicate IDs

✔ Duplicate names

✔ Missing categories

✔ Missing recipes

✔ Missing seed drops

✔ Invalid yields

✔ Invalid growth times

✔ Invalid harvest windows

Status:

✅ Complete

---

# Berry Database Refactor Fix

Issue:

```
Berries Page:

No berries found
```

Console:

```
Cannot read properties of undefined (reading 'length')
```

Cause:

Old property:

```
possibleSeedDrops
```

New schema:

```
seedDrops
```

Fixed:

✔ Updated validation logic

✔ Database loads correctly

✔ Schema consistency restored

Status:

✅ Complete

---

# Sprint 8 — Project Cleanup & Architecture Improvement

Status:

🔄 In Progress

Goal:

Improve code quality before adding complex farming systems.

---

# Services Layer Created

Created:

```
src/services/
```

Purpose:

Separate business logic from UI components.

Future services:

```
wateringService.ts

harvestService.ts

farmingService.ts

inventoryService.ts
```

Status:

✅ Folder created

⏳ Logic migration planned when required

---

# Utilities Created

Created:

```
src/utils/
```

Purpose:

Reusable helper functions.

Current:

```
dateFormatter.ts
```

Goal:

Avoid duplicated formatting logic across:

* Character Cards
* Dashboard
* Scheduler
* Harvest System

Status:

✅ Started

---

# Constants System Created

Created:

```
src/constants/
```

Current:

```
storageKeys.ts
```

Purpose:

Remove magic values and centralize configuration.

Future constants:

* Timer values
* Status labels
* Farming rules

Status:

✅ Started

---

# Type Audit Phase ⭐

Current focus:

Review and improve:

```
types/

Character.ts
Berry.ts
Seed.ts
BerryRecipe.ts
SeedDrop.ts
```

Goals:

✔ Remove unnecessary fields

✔ Improve naming

✔ Prepare for watering system

✔ Prepare for inventory

✔ Prepare for analytics

Status:

🔄 Current Task

---

# 🎨 UI Components

Completed:

✔ Button

✔ Modal

✔ CharacterModal

✔ ConfirmDialog

✔ CharacterCard

✔ Section

✔ StatCard

Pending:

⬜ BerryCard

⬜ BerrySelector

⬜ Berry Details UI

⬜ Berries Page

---

# 💾 Data Storage

Current:

```
Local Storage
```

Current key:

```
berrymaster.characters
```

Character example:

```json
[
  {
    "id": "uuid",
    "name": "Alpha"
  }
]
```

Future:

* SQLite
* Cloud Sync
* Import / Export

---

# 📂 Current Folder Structure

```
src/

components/

├── characters/
├── dashboard/
└── ui/


constants/

context/

data/

├── berryDatabase.ts
└── berries/


pages/

services/

types/

utils/
```

---

---

# 🚧 Current Milestone

## Sprint 11 — Notification Engine 🔔

The BerryMaster farming engine is now fully operational and has entered its first quality-of-life phase.

Sprint 11 focused on creating a complete notification ecosystem that keeps players informed throughout the entire farming lifecycle.

Completed during this phase:

✔ Notification Context

✔ Notification Service

✔ Browser Notification Service

✔ Notification History

✔ Notification Bell

✔ Notification Dropdown

✔ Live notification badge

✔ Browser Notification API integration

✔ Notification permission handling

✔ Water reminders

✔ Harvest reminders

✔ Wilt reminders

✔ Priority-based notification ordering

✔ Notification deduplication

✔ Live notification updates

✔ Multi-character notification support

✔ Infinite farming cycle notification support

✔ Notification synchronization

✔ Farming cycle notification architecture

Status:

✅ Complete

---

# 🔔 Notification Engine Architecture

BerryMaster now includes a dedicated notification system separated from the farming engine.

```
Character Context
        │
        ▼
Notification Service
        │
        ▼
Notification Context
        │
        ▼
Browser Notification Service
        │
        ▼
Notification History
        │
        ▼
Notification Bell
        │
        ▼
Notification Dropdown
        │
        ▼
Desktop Notifications
```

Benefits:

✔ Live notification updates

✔ Browser notification support

✔ No duplicate notifications

✔ Multi-character support

✔ Infinite notification cycles

✔ Clear separation of responsibilities

✔ Ready for future mobile notifications

---

# 🌱 Farming Engine Architecture

BerryMaster now follows a layered farming architecture.

```
Berry Database
        │
        ▼
Farming Profiles
        │
        ▼
Time Calculator
        │
        ▼
Planting Service
        │
        ▼
Watering Service
        │
        ▼
Harvest Service
        │
        ▼
Notification Service
        │
        ▼
Notification Context
        │
        ▼
Browser Notifications
        │
        ▼
Character Context
        │
        ▼
Character Cards
```

Business logic is now completely separated from UI components.

Benefits:

✔ Easier maintenance

✔ Easier testing

✔ Better scalability

✔ Cleaner architecture

✔ Reusable services

✔ Modular notification engine

✔ Ready for future inventory integration

---

# 🗺 Updated Roadmap

## Sprint 9 — Farming Engine 🌱

Completed:

✔ Berry planting

✔ Berry assignment

✔ Plant Berry modal

✔ Plant Berry selector

✔ Character farming state

✔ Planting service

✔ Harvest timer

✔ Countdown timer

✔ Character status badges

✔ Farming profile architecture

Status:

✅ Complete

---

## Sprint 10 — Farming Workflow 💧🌾🍂

Completed:

✔ Watering service

✔ Water tracking

✔ Water counters

✔ Last Water tracking

✔ Next Water tracking

✔ Harvest service

✔ Harvest workflow

✔ Wilt timer

✔ Harvest window

✔ Countdown engine

✔ Live countdown updates

✔ Character lifecycle

✔ Character reset after harvesting

✔ Farming profile implementation

✔ Character card redesign

✔ Debug Berry testing

✔ Complete farming lifecycle validation

Status:

✅ Complete

---

## Sprint 11 — Notification Engine 🔔

Completed:

✔ Notification Context

✔ Notification Service

✔ Browser Notification Service

✔ Notification History

✔ Notification Bell

✔ Notification Dropdown

✔ Browser Notification API integration

✔ Notification permission request

✔ Desktop notifications

✔ Water reminders

✔ Harvest reminders

✔ Wilt reminders

✔ Live notification badge

✔ Priority-based notifications

✔ Notification deduplication

✔ Multi-character notifications

✔ Infinite farming cycle notifications

✔ Live synchronization

✔ Farming-cycle notification IDs

✔ Browser notification architecture

Major Improvements:

✔ Notification IDs now uniquely identify each farming cycle using:

```
Character ID
        +
Plant Time
        +
Notification Type
```

instead of:

```
Character ID
        +
Notification Type
```

This guarantees reliable notifications across every farming cycle while preventing duplicates.

Status:

✅ Complete

---

Sprint 12 — Application Polish ✨
Current Focus:

The core farming engine is now considered feature-complete for the first playable version.

Sprint 12 shifted the focus from building core mechanics to improving the overall application experience.

The Dashboard was expanded into a connected farming command center capable of summarizing the entire farm and directing the player toward characters requiring attention.

Completed:

✔ Dashboard Farm Overview improvements

✔ Dashboard statistics integration with the farming engine

✔ Characters statistic card

✔ Planted berries statistic card

✔ Need Water statistic card

✔ Harvest Ready statistic card

✔ Wilted statistic card

✔ Farm status calculation system

✔ Growing status tracking

✔ Need Water status tracking

✔ Ready to Harvest status tracking

✔ Wilted status tracking

✔ Empty character slot tracking

✔ Farm Status donut chart

✔ Dynamic status breakdown

✔ Status-based color system

✔ Status icons

✔ Responsive Farm Status layout

✔ Dynamic chart filtering for active statuses

✔ Dashboard Needs Attention section

✔ Character-specific attention items

✔ Need Water attention detection

✔ Ready to Harvest attention detection

✔ Wilted berry attention detection

✔ Direct navigation from Dashboard to Characters

✔ Exact character targeting

✔ Automatic scrolling to the target character

✔ Character highlight animation

✔ Cross-page Dashboard → Character interaction

Dashboard Architecture:

BerryMaster's Dashboard now follows a connected data flow:

Character Context
        │
        ▼
Farm Statistics
        │
        ▼
Dashboard Overview
        │
        ├──► Farm Status Chart
        │
        ├──► Needs Attention
        │
        └──► Character Navigation
                    │
                    ▼
             Exact Character
                    │
                    ▼
             Auto Scroll
                    │
                    ▼
             Visual Highlight

Benefits:

✔ The Dashboard now reflects real farming data

✔ Players can immediately see the overall condition of their farm

✔ Important actions are surfaced automatically

✔ Players can jump directly to the affected character

✔ No manual searching through large character lists

✔ The system remains scalable for large farming operations

Recent Activity System:

BerryMaster now includes a dedicated farming activity tracking system.

Implemented:

✔ Activity Context

✔ Activity state management

✔ Activity persistence

✔ Recent Activity dashboard section

✔ Activity timestamps

✔ Activity type tracking

✔ Activity history limit

✔ Maximum of 100 stored activities

✔ Automatic removal of older activities when the limit is exceeded

Tracked Activities:

✔ Berry planting

✔ Berry watering

✔ Berry harvesting

✔ Wilted berry clearing

Each activity records information such as:

Activity Type
Character
Berry
Timestamp

Example:

Planted Leppa Berry on Alpha
Watered Alpha's Leppa Berry
Harvested Leppa Berry from Alpha
Cleared wilted Leppa Berry from Alpha
Farming Activity Integration:

Character actions now automatically create activity records.

Character Action
        │
        ▼
Character Context
        │
        ├──► Update Character
        │
        └──► Create Activity
                    │
                    ▼
             Activity Context
                    │
                    ▼
             Recent Activity

Benefits:

✔ Farming history is automatically generated

✔ No manual logging required

✔ Recent actions are visible from the Dashboard

✔ Activity history remains limited and manageable

✔ The system is ready for future statistics and analytics

Wilted Berry Workflow Improvement:

The wilted berry workflow was refined to distinguish between harvesting and clearing a failed farming cycle.

Implemented:

✔ Wilted berries can be cleared

✔ Wilted berry removal no longer represents a successful harvest

✔ Harvest-ready berries are recorded as harvested

✔ Wilted berries are recorded as cleared

✔ Activity history now accurately reflects farming outcomes

This creates a clearer distinction between:

Successful Farming Cycle
        │
        ▼
Harvested Berry

and:

Missed Farming Cycle
        │
        ▼
Wilted Berry
        │
        ▼
Cleared Wilted Berry
Character Navigation System:

The Dashboard and Characters page are now directly connected.

When a player selects a character from the Needs Attention section:

Needs Attention
        │
        ▼
Selected Character ID
        │
        ▼
Navigate to Characters Page
        │
        ▼
Find Exact Character
        │
        ▼
Scroll Into View
        │
        ▼
Highlight Character

The system uses the character's unique ID rather than its position in the character list.

This means the system remains reliable even when:

✔ Characters are added

✔ Characters are deleted

✔ The character list becomes large

✔ Character ordering changes

UI Improvements:

Completed:

✔ Dashboard section organization

✔ Farm Overview layout

✔ Farm Status section

✔ Needs Attention section

✔ Recent Activity section

✔ Responsive Dashboard layouts

✔ Dynamic status indicators

✔ Status color consistency

✔ Character highlight animation

✔ Improved visual hierarchy

✔ Improved dashboard navigation flow

Current Status:

✅ Dashboard functionality complete

✅ Farm monitoring complete

✅ Needs Attention system complete

✅ Recent Activity system complete

✅ Character navigation complete

✅ Exact character scrolling complete

✅ Character highlighting complete

⏳ Final UI polish pending

🧭 Pre-Launch Feature Audit

BerryMaster has now reached the point where the major core systems are implemented.

The next development phase is no longer focused on blindly adding features.

The project is now entering a structured pre-launch audit.

The purpose of this phase is to verify that every existing system works together correctly before final polish and release preparation.

Audit Areas:
Dashboard:

⬜ Verify empty farm state

⬜ Verify no-character state

⬜ Verify farm statistics

⬜ Verify donut chart

⬜ Verify status breakdown

⬜ Verify Needs Attention

⬜ Verify Recent Activity

⬜ Verify direct character navigation

⬜ Verify automatic scrolling

⬜ Verify character highlighting

Character System:

⬜ Add character

⬜ Edit character

⬜ Delete character

⬜ Plant berry

⬜ Change berry

⬜ Water berry

⬜ Harvest berry

⬜ Clear wilted berry

⬜ Verify harvest timer

⬜ Verify watering timer

⬜ Verify wilt timer

⬜ Verify character status

⬜ Verify activity logging

Berry System:

⬜ Verify berry database

⬜ Verify berry categories

⬜ Verify berry filtering

⬜ Verify berry search

⬜ Verify favorite berries

⬜ Verify planting flow

Persistence:

⬜ Refresh browser

⬜ Verify characters remain

⬜ Verify farming timers remain

⬜ Verify activities remain

⬜ Verify favorites remain

⬜ Verify notification data remains

✨ Final Polish Run

After the Pre-Launch Feature Audit is complete, BerryMaster will enter the final visual polish phase.

Planned:

⬜ Fix remaining card sizing inconsistencies

⬜ Improve spacing consistency

⬜ Improve typography

⬜ Improve responsive layouts

⬜ Improve empty states

⬜ Improve animations

⬜ Improve hover interactions

⬜ Improve color consistency

⬜ Improve dashboard visual hierarchy

⬜ Improve notification UI

⬜ Improve loading states

⬜ Improve error states

⬜ Perform final UX refinement

🏆 Current Stable Milestone

BerryMaster currently includes:

✅ Project Architecture

✅ Routing

✅ Dashboard

✅ Character Management

✅ Berry Database

✅ Farming Profiles

✅ Planting Engine

✅ Watering Engine

✅ Harvest Engine

✅ Wilt Engine

✅ Countdown Timers

✅ Character Status System

✅ Notification Engine

✅ Browser Notifications

✅ Notification Center

✅ Farm Statistics

✅ Farm Status Donut Chart

✅ Dynamic Status Breakdown

✅ Needs Attention System

✅ Recent Activity System

✅ Activity History Limit

✅ Direct Character Navigation

✅ Automatic Character Scrolling

✅ Character Highlighting

BerryMaster has now evolved into a connected farming management system capable of managing the complete farming lifecycle while actively guiding the player toward characters requiring attention.

▶ Next Session

The next development phase will begin with the Pre-Launch Feature Audit.

Immediate goals:

• Verify all existing core systems

• Test Dashboard edge cases

• Test Character workflows

• Verify Local Storage persistence

• Identify remaining launch blockers

• Complete final bug fixes

• Begin the Final Polish Run

The focus now shifts from building the core application to ensuring that every existing feature works reliably as one cohesive system.

🍓 BerryMaster Status

Project Phase:

Pre-Launch Feature Audit

Overall Progress:

🟩🟩🟩🟩🟩🟩🟩🟩🟩⬜

≈ 90% of the planned first-version application

Current Direction:

The remaining work primarily consists of:

• Pre-Launch Feature Audit

• Final Bug Fixes

• UI Polish

• UX Refinement

• Final Testing

• Launch Preparation

The foundation of BerryMaster is now solid, scalable, and fully connected.

The project has successfully moved from a collection of independent systems into a cohesive farming companion capable of monitoring the player's farm, identifying problems, tracking activity, and guiding the player directly to the characters requiring attention.

"Great software isn't built in one giant leap. It's built one well-designed sprint at a time."

— BerryMaster Development Journal  