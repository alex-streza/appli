<a href="https://appli-eight-gilt.vercel.app/">
  <h1 align="center">Appli: Streamline tech job applications</h1>
</a>


 <img width="1440" alt="dashboard_mockup" src="https://github.com/alex-streza/appli/assets/72100849/2c5e207e-d0d4-4758-880d-51c056af4a56">

<p align="center">
  Organize your job applications, track your progress, and get hired faster with Appli.
</p>

<p align="center">
  <!-- <a href="https://twitter.com/placeholder">
    <img src="https://img.shields.io/twitter/follow/appli?style=flat&label=%40appliy&logo=twitter&color=0bf&logoColor=fff" alt="Twitter" />
  </a> -->
  <a href="https://github.com/alex-streza/Badget/blob/main/LICENSE.md">
    <img src="https://img.shields.io/github/license/projectx-codehagen/Badget?label=license&logo=github&color=f80&logoColor=fff" alt="License" />
  </a>
</p>

<p align="center">
  <a href="#introduction"><strong>Introduction</strong></a> ·
  <a href="#installation"><strong>Installation</strong></a> ·
  <a href="#tech-stack--features"><strong>Tech Stack + Features</strong></a> ·
  <a href="#contributing"><strong>Credits</strong></a>
</p>
<br/>

## Introduction

We're trying to build the best interviewee/job searcher tool out there, powered by great design and open-source.

Appli allows users to easily save their job applications to prevent them from getting lost in the shuffle. Users can track their progress, set reminders, and get hired faster.

## What we are using

Lets goooo - Next.js 14, Turborepo, Drizzle ORM, Planetscale, Kinde, Resend, React Email, Shadcn/ui, and Stripe.
<br/>
All seamlessly integrated with the Appli to accelerate the development.

## Directory Structure

Appli is a monorepo managed by [Turborepo](https://turbo.build/repo). The monorepo is split between `apps` and `packages` directories.

    .
    ├── apps                         # Its app workspace which contains
    │    ├── next.js                 # Nextjs app which is deployed in Vercel
    │    └── extension
    ├── packages                     # are the shared packages that are used by the apps (e.g. `@appli/api`)
    ├── tooling                      # are the shared configuration that are used by the apps and packages (e.g. `@appli/eslint-config`)
    ├── LICENSE
    └── README.md

> Use short lowercase names at least for the top-level files and folders except
> `LICENSE`, `README.md`

## Installation

Clone & create this repo locally with the following command:

```bash
git clone https://github.com/alex-streza/appli
```

1. Install dependencies using pnpm:

```sh
pnpm install
```

2. Copy `.env.example` to `.env.local` and update the variables.

```sh
cp .env.example .env.local
```

4. Input everything you need for the env.

   1. Create [Kinde](https://kinde.com) Account
   2. Create [Supabase](https://supabase.com/) Account
   3. Create [Stripe](https://stripe.com) Account and download [Stripe CLI](https://docs.stripe.com/stripe-cli)
   4. Create [Groq](https://console.groq.com) Account 

5. Start the development server from either yarn or turbo:

```sh
# At the root of the mono repo
pnpm run dev:web
```

## Stripe

To set up Stripe locally with environment variables:

1. Create a [Stripe](https://stripe.com/in) account.
2. After signing in, go to the dashboard and switch to Test mode.
3. In the dashboard, switch to the API keys section.
4. Reveal your secret key and paste it into your `.env.local` file.
5. For the webhook key, switch to the Webhooks tab, add an endpoint to reveal the secret key.
6. To get the `PRODUCT_ID` and `PRICE_ID`, head over to [Stripe's API Docs](https://docs.stripe.com/api/prices/object).
7. From the docs, use the API with your `STRIPE_API_KEY` to create a product & price object.
8. The response object from the API contains two keys: `id` and `product`.
9. Use the `id` as your `PRICE_ID` and `product` as your `PRODUCT_ID`.
10. You can use the same keys for the STD and PRO variables.

## Database

This project uses Postgres database on Supabase. To setup a DB for your local dev:

1. Create a free account and a [new Database](https://supabase.com/docs/guides/getting-started)
2. From the dashboard, create a new project.
3. From `Home` select `Drizzle` in `Connect / ORMs` dropdown
4. Copy the entire list of params to `.env.local` file. Make sure to change the params under the section "Database (Postgres - Supabase)"
5. run `pnpm run db:push`

You can also use `docker-compose` to have a Postgres database locally, instead of relying on Supabase:

1. Enter `DATABASE_URL` value in `.env.local`.
2. run `docker-compose --env-file .env.local up` to start the DB.
3. run `pnpm run db:push`.

## Roadmap

- [x] ~Initial setup~
- [ ] Implement UI components according to design
- [ ] trpc-openapi backend endpoints
- [ ] User authentication
- [ ] Chrome extension to save applications
- [ ] Application performance charts
- [ ] AI to predict application success
- [ ] AI to improve resume

## Tech Stack + Features

### Frameworks

- [Next.js](https://nextjs.org/) – React framework for building performant apps with the best developer experience
- [Kinde](https://kinde.com/) – Handle user authentication with ease with providers like Google, Twitter, GitHub, etc.
- [Drizzle ORM](https://orm.drizzle.team/) – TypeScript ORM that feels like SPA with SSR
- [Groq Cloud](https://console.groq.com) - AI 

### Platforms

- [Vercel](https://vercel.com/) – Easily preview & deploy changes with git
- [Supabase](https://supabase.com/) – A cutting-edge database platform for seamless, scalable data management
- [Stripe](https://stripe.com) - Payments

### UI

- [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS framework for rapid UI development
- [Shadcn/ui](https://ui.shadcn.com/) – Re-usable components built using Radix UI and Tailwind CSS
- [Framer Motion](https://framer.com/motion) – Motion library for React to animate components with ease
- [Phosphor](https://phosphoricons.com/) – a flexible icon family for interfaces, diagrams, presentations — whatever, really.
- [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) – Optimize custom fonts and remove external network requests for improved performance
- [`ImageResponse`](https://nextjs.org/docs/app/api-reference/functions/image-response) – Generate dynamic Open Graph images at the edge

## Contributing

We ❤️ our contributors! Here's how you can contribute:

- [Open an issue](https://github.com/alex-streza/appli/issues) if you believe you've encountered a bug.
- Make a [pull request](https://github.com/alex-streza/appli/pull) to add new features/make quality-of-life improvements/fix bugs.

<a href="https://github.com/alex-streza/appli/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=alex-streza/appli" />
</a>
## Repo Activity

![Nextify repo activity – generated by Axiom](https://repobeats.axiom.co/api/embed/f90bd65d98d57ce8fc8bbf36079da64f0c5c8764.svg "Repobeats analytics image")

## Credits

Big thanks to [@codehagen](https://twitter.com/CodeHagen) for starting the open-source/X movement in building awesome software, if you ever need a financial/budgeting platform, check out [Badget](https://badget.io).
