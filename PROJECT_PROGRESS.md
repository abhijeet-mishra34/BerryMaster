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

🚧 Current Milestone
Sprint 10 — Farming Workflow 🌱💧🌾

The project has successfully transitioned from architecture cleanup into building the complete berry farming engine.

Completed during this phase:

✔ Plant Berry workflow

✔ Plant Berry modal

✔ Plant Berry selector

✔ Berry assignment to characters

✔ Planting service

✔ Watering service

✔ Harvest service foundation

✔ Character farming lifecycle

✔ Character status engine

✔ Countdown timer engine

✔ Time calculation utilities

✔ Wilt timer foundation

✔ Farming profile system

✔ Character card redesign

✔ Watering workflow

✔ Last Water tracking

✔ Next Water tracking

✔ Harvest countdown

✔ Harvest window foundation

✔ Live countdown updates

Current:

🔄 Harvest workflow

🔄 Full farming lifecycle testing

Next:

✔ Complete Harvest service

✔ Return character to Ready to Plant state

✔ Final farming workflow testing

🌱 Farming Engine Architecture

BerryMaster now follows a layered farming architecture.

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
Character Context
        │
        ▼
Character Cards

Business logic is now completely separated from UI components.

Benefits:

✔ Easier maintenance

✔ Easier future expansion

✔ Cleaner code

✔ Better testing

✔ Supports future notification engine

🌾 Farming Profiles

BerryMaster now supports multiple farming strategies based on berry growth time.

16 Hour Berries

✔ Automatically watered on planting

✔ Second watering after 10 hours

✔ Harvest window: 8 hours

20 Hour Berries

✔ Automatically watered on planting

✔ Second watering after 10 hours

✔ Harvest window: 8 hours

42 Hour Berries

✔ No automatic watering

✔ First watering after 3 hours

✔ Repeat watering every 12 hours

✔ Harvest window: 8 hours

44 Hour Berries

✔ No automatic watering

✔ First watering after 3 hours

✔ Repeat watering every 12 hours

✔ Harvest window: 8 hours

67 Hour Berries

✔ No automatic watering

✔ First watering after 3 hours

✔ Repeat watering every 12 hours

✔ Harvest window: 8 hours

🗺 Updated Roadmap
Sprint 9 — Farming Engine 🌱

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

Sprint 10 — Farming Workflow 💧🌾

Completed:

✔ Watering service

✔ Water tracking

✔ Water counters

✔ Last Water support

✔ Next Water support

✔ Countdown engine

✔ Harvest timer

✔ Wilt timer

✔ Farming profiles

✔ Character card redesign

Current:

🔄 Harvest workflow

🔄 Harvest service

🔄 Full farming lifecycle

Status:

🔄 In Progress

Sprint 11 — Notification Engine 🔔

Planned:

Desktop notifications
Water reminders
Harvest reminders
Wilt reminders
Notification Center
Foundation for Mobile Companion
Sprint 12 — Inventory System 📦

Current plan:

Berry inventory
Quantity management
Filters
Search

Design Decision:

Seed conversion has been postponed.

Reason:

Berry yields are deterministic.

Seed yields are probabilistic.

BerryMaster Version 1 focuses on assisting berry farming rather than simulating every game mechanic.

Sprint 13 — Analytics 📈

Planned:

Farming statistics
Berry production
Harvest history
Farming efficiency
Profit analysis
Sprint 14 — Settings ⚙

Planned:

Theme
Notifications
Backup
Preferences
💡 Planned Improvements
UI Polish
Toast notifications
Animations
Better icons
Loading states
Improved dashboard
Future Features
Berry search
Favorite berries
Profit calculator
Farming route planner
Export / Import
Cloud Sync
Automation assistant
Mobile companion
📝 Development Notes

BerryMaster development philosophy:

Build features only when required
Keep UI components reusable
Keep business logic inside services
Keep calculations inside utilities
Prefer modular architecture
Strong TypeScript typing
Design for long-term scalability
Keep the project beginner-friendly and maintainable
Avoid over-engineering while keeping expansion simple
🚀 Current Stable Milestone

Latest Completed:

Berry Farming Engine

Includes:

✔ Character CRUD

✔ Berry Database

✔ Planting System

✔ Watering System

✔ Countdown Engine

✔ Character Status System

✔ Farming Profiles

✔ Time Calculation Utilities

✔ Services Architecture

✔ Modular Utilities

✔ Architecture Cleanup

▶ Next Session

Continue:

Sprint 10 — Harvest Workflow

Tasks:

Complete Harvest Service
Reset character after harvesting
Complete farming lifecycle
Test all supported berry growth profiles
Prepare Notification Engine

🍓 BerryMaster Status:

Foundation: COMPLETE

Architecture: COMPLETE

Berry Database: COMPLETE

Farming Engine: COMPLETE

Farming Workflow: IN PROGRESS

Next Big System:
🔔 Notification Engine