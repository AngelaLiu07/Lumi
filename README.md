# Lumi ✨

Lumi is a context-aware AI desktop companion that uses your Google Calendar, tasks, and recent interaction history to guide how and when to respond.

Lumi is represented on the desktop by **Mochi*, a small animated companion whose mood, messages, and interactions change based on the agent's decision.

![Lumi](<Lumi/src-tauri/icons/happy.svg>)

## Features
- Reads relavent GCal events
- Uses Google Tasks to understand workload and progress
- Communicates with Gemini through an API to reason over current context and recent interactions
- Maintains short-term local memory across sessions to store the last few mood and message changes
- Selects between calm, happy, concerned, tired, and celebrating moods
- Generates context-aware messages
- Performs autonomous, periodic check-ins
- Validates model outputs before they can interfere with UI outpu
- Includes a debug view for inspecting how the agent behaves
- Runs as a draggable, transparent macOS desktop companion

## How It Works

Google Calendar and Google Tasks prompt an authentication, where today's events and tasks are then sent as context, stored in Lumi's Memory.

This memory is then sent away to be evaluated by Gemini, who outputs a structured decision (meaning a definite mood and message).

This information then gets sent into a few validation and text cleaning steps to ensure proper responses.

The mood and message are then shown on the scream, and this interaction becomes a part of Lumi's memory (memory.json).

Lumi follows an observe -> remember -> reason -> validate -> act -> remember loop. It isn't a traditional chatbot, but periodically (every 60 minutes) evaluates the user's current context and decides whether and how to respond.

## Tech Stack

**Desktop:** Tauri 2  
**Frontend:** React, JavaScript, CSS  
**Backend:** Node.js, Express  
**AI:** Google Gemini / Google GenAI SDK  
**Integrations:** Google Calendar API, Google Tasks API  
**Persistence:** Local JSON memory

## Agent Design

Lumi's agent recieves:
- Relavent calendar events
- Unfinished tasks
- Tasks completed today
- Recent Lumi Interactions (including moods and messages recently shown)

The model produces a structures response containing mood and message fields. The backend also guardrail validates the model's output before it reaches the UI.

Recent interactions are fed back into future decisions so Lumi is more context aware and respond differently as the user's context changes to avoid unnecessary repetition.


## Setup

### Prerequisites
- Node.js
- Rust
- Tauri prerequisites
- Google Cloud project with Calendar and Tasks APIs enabled
- Gemini API Key

### Install
Clone the repository:

    git clone https://github.com/AngelaLiu07/Lumi.git
    cd Lumi/Lumi

Install frontend dependencies: 

    npm install

Install backend dependencies:

    cd server
    npm install

### Environment

Create a `.env` file inside `server/`:

    GEMINI_API_KEY=your_key_here

Create Google OAuth desktop credentials and save them as:
    
    server/credentials.json

### Run

    Start the backend:

        cd server
        node --env-file=.env server.js

    Then, in another terminal, start Lumi:
    
        npm run tauri dev
        
## Privacy

Calendar data, task data, OAuth credentials, and Lumi's local memory are
not committed to the repository. Each installation creates and maintains
its own local memory.

