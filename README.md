# Rock Paper Scissors Idle Game 🎮

An upgrade-driven idle game blending resource management and automation.  
Inspired by the simplicity of *Cookie Clicker* and the strategic scaling of *Balatro*, this project showcases full-stack web application development with a focus on gameplay, UI/UX, and cloud integration.

Play this game at https://rps-lac.vercel.app/


![Main Screen](images/main.png)


## 🚀 Tech Stack

- Frontend: Angular 19.2.5
- Database: Supabase (PostgreSQL with JSONB saves)
- Authentication: Supabase Email/Password Auth
- Deployment: Vercel


## 🎮 Gameplay Overview

![Help Screen](images/help.png)

- A random move — Rock, Paper, or Scissors — appears.
- Manually select the winning counter-move to earn points.
- Each win grants you the number of points equal to your PPW (Points-Per-Win). You can increase your PPW via Shop Upgrades and by maininting a higher streak.
- Unlock automated "Snipers" that counter moves automatically, consuming limited fuel resources.
- Manage and replenish resources (rocks, papers, scissors) using generators and upgrades.
- Progress is tracked with a robust achievement system saved across devices.

## 🛠️ Core Features

### 🏗️ Game Shop

![Shop Screen](images/shop.png)

- Purchase permanent score bonuses, multipliers, automatic "snipers", and resource generators.
- Each sniper's efficiency can be upgrades such that moves are automatically countered at a much faster rate.
- Generators can be upgraded allowing more fuel produced per interval. Initially, this is 1 resource per 30 seconds. However, this can be maxed-out to generate 30 resources per 1 second.
- Upgrade costs combine exponential and linear scaling models for balance.


### 🏆 Achievement System

![Achievements Screen](images/achievements.png)

- To provide a sense of purpose, players can unlock achievements based on performance and progression.
- Along with other key gameplay elements, achievements are initally saved locally and sent to the cloud upon account creation. This ensures one's progress is not lost.


### ☁️ Cloud Save System

![Sign Up Screen](images/signup.png)

- When users choose to create an account, they their saves are automatically sent to the cloud. This allows them to play the same save file across devices.
- Prior to an account being created, data is saved to the browser. Upon creating an account, one's local saves are transfered to their cloud save.
- Logging back in will restore the user's data as it was at the last save.
- User Authentication is done with an email/password using Supabase.

### 📱 Mobile Support

![Mobile Game Screen](images/main-mobile.png)
![Mobile Shop Screen](images/shop-mobile.png)
![Mobile Achievements Screen](images/achievements-mobile.png)

- Each game screen has mobile support, allowing anyone to play anywhere they wish.