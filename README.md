# Callbell Tech Test - Alternative Solution

This project was done for my technical interview at Callbell. I couldn't manage to run their Ruby Fullstack test in which I had to focus on the Frontend. Instead of sending a minimal effort, I also spent some time to create a full React app from scratch (`yarn init`).

This would let me showcase more of my frontend skills as well as some devops skills.

## Features/Flow

- Connect to Trello (thanks to [react-trello-client](https://github.com/Irandoust/react-trello-client/))
- Pick a board from your account
- Create new Cards (achieved through the Trello REST API)
- Delete Cards (achieved through the Trello REST API)
- Move Cards around (achieved through the Trello REST API) with drag and drop (thanks to [react-dnd](https://github.com/react-dnd/react-dnd/))

## Installation

```bash
git clone git@github.com:elroyK/callbell-alt.git
cd callbell-alt
yarn
```

## Running the dev server

Clone `.env.sample` 
```bash
cp .env.sample .env
```

Update `.env` with your Trello app key and token created [here](https://trello.com/app-key), then run
```bash
yarn start
```