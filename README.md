<p align="center">
   <img src="./docs/images/logo_edeneos.png" width="300">
</p>

# Eden Members Smart Proxy

**A BP voting portal and Proxy for Eden Members**

![](https://img.shields.io/github/license/eoscostarica/eden-smart-proxy) ![](https://img.shields.io/badge/code%20style-standard-brightgreen.svg) ![](https://img.shields.io/badge/%E2%9C%93-collaborative_etiquette-brightgreen.svg) ![](https://img.shields.io/twitter/follow/eoscostarica.svg?style=social&logo=twitter) ![](https://img.shields.io/github/forks/eoscostarica/eden-smart-proxy?style=social)

The Eden Smart proxy is an app available only for eden on EOS members. The intention behind this project is to leverage the Eden democratic process to produce a list of quality BPs to vote for. Eden members delegate their vote to the eos proxy which ten votes for the top 30 BPs acording to a weighted calculation depending on members' election rank.


## Web Application
We are using [Next.js](https://nextjs.org/) React Framework for building the webapplication.

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

Please read Edenia's [Open Source Contributing Guidelines](https://developers.eoscostarica.io/docs/open-source-guidelines).

Please report bugs big and small by [opening an issue](https://github.com/eoscostarica/eden-smart-proxy/issues/new/choose)

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