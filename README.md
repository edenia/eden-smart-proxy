<p align="center">
   <img src="./docs/images/EDEN_Smart_Proxy_Preview.png" width="400">
</p>

# Eden Members Smart Proxy

**A legitimate list of community backed quality BPs to vote for**

![](https://img.shields.io/github/license/edenia/eden-smart-proxy) ![](https://img.shields.io/badge/code%20style-standard-brightgreen.svg) ![](https://img.shields.io/badge/%E2%9C%93-collaborative_etiquette-brightgreen.svg) ![](https://img.shields.io/twitter/follow/edeniaWeb3.svg?style=social&logo=twitter) ![](https://img.shields.io/github/forks/edenia/eden-smart-proxy?style=social)

The Eden Smart proxy is an app available only for eden on EOS members. The intention behind this project is to leverage the Eden democratic process to produce a legitimate list of community backed quality BPs to vote for. Eden members can delegate their vote to the eden smart proxy which then votes for the top 30 BPs according to a weighted calculation depending on members' election rank.

### Election Rank Vote Weight

We apply a weighted calculation based on the number of voters for each election that delegates represent. The following formula is used to assign points for each delegates vote according to their election rank.

`Total Voters / Number of L1 Delegates = L1 Delegate Weight`

`Total Voters / Number of L2 Delegates = L2 Delegate Weight`

### Notes

- The total voters is the number of eden members that participated in the election.

- Sortition Head Delegate will have the same vote weight as other chief delegates.

- Vote weight is rounded to the closest integer.

#### Example Calculations

For the fourth eden election we have the following [election results](https://bloks.io/account/genesis.eden?loadContract=true&tab=Tables&table=memberstats&account=genesis.eden&scope=0&limit=100):

**Number of members that participated: 82**

**Number of L1 delegates Elected: 20**

**Number of L2 delegates Elected: 5**

```
Eden Member ======> 1 Point
Level 1 Delegate => 82 / 20 = 4 points
Level 2 Delegate => 82 / 5 = 16 points
```

### Smart Contract

To compile the Smart Contract, make sure you have `Docker` installed. To install docker, please follow [this guide](https://docs.docker.com/get-docker/).

Run:

1. `cd contracts`
2. `docker_build.sh`

## Web Application

We are using [Next.js](https://nextjs.org/) React Framework for building the web application.

## Smart Contract

An Antelope smart contract that calculates the weighted votes for each eden member and casts a vote as an EOS proxy.

## System Components

This application features the following technology stack :

- **React JS** : A Front End Web Application Framework.
- **EOSIO** : Blockchain protocol with industry-leading transaction speed.
- **Kubernetes** : Docker Container Orchestration.

## File Structure

Within this repository you will find the following directories and files:

```
.
├── docs .......................... Documentation
│   └── images .................... Images and Diagrams
├── contracts ..................... Smart Contract Code
├── kubernetes .................... Kubernetes Manifests
├── src ........................... NextJS Web Application
├── public ........................ Static Website Files
└── utils ......................... Makefiles for project build
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

# Contributing

Please read EOS Costa Rica's [Open Source Contributing Guidelines](https://developers.eoscostarica.io/docs/open-source-guidelines).

Please report bugs big and small by [opening an issue](https://github.com/edenia/eden-smart-proxy/issues/new/choose)

## About Edenia

<div align="center">

<a href="https://edenia.com">
	<img width="300" alt="Edenia Logo" src="https://raw.githubusercontent.com/edenia/.github/master/.github/workflows/images/edenia-logo.png"></img>
</a>

[![Twitter](https://img.shields.io/twitter/follow/EdeniaWeb3?style=for-the-badge)](https://twitter.com/EdeniaWeb3)
[![Discord](https://img.shields.io/discord/946500573677625344?color=black&label=Discord&logo=discord&logoColor=white&style=for-the-badge)](https://discord.gg/YeGcF6QwhP)

</div>

Edenia runs independent blockchain infrastructure and develops web3 solutions. Our team of technology-agnostic builders has been operating since 1987, leveraging the newest technologies to make the internet safer, more efficient, and more transparent.

[edenia.com](https://edenia.com/)
