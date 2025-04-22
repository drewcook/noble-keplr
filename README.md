# Noble Dollar + Keplr Wallet

Demo URL: <https://noble.dco.dev>

## Getting Started

### Prerequisites

Ensure you have the [Keplr Wallet Extension](https://www.keplr.app/get) installed.

### Install deps and run locally

```bash
pnpm i
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) on your browser.

## Resources

This application utilizes the following resources and tech stack:

- [TypeScript](https://www.typescriptlang.org/)
- [NextJS](https://nextjs.org/) (App Router)
- [TailwindCSS](https://tailwindcss.com/)
- [HeroIcons](https://heroicons.dev/)
- [Keplr Wallet](https://docs.keplr.app/api/intro/)
- [Noble API](https://api.noble.xyz/#tag/cctp)
- [Viem](https://viem.sh/)
- [Railway](https://railway.com/) (Hosting + CI/CD)
- ESlint, Prettier, Commitlint, Husky

## Techniques

Some areas of interest in this codebase are:

1. **Separation of concerns** - Having the providers only fetch data and store it with the least amount of tampering (`toUSDN()`), designing presentational components, designing layout-based components, and applying formatting to the most downstream areas when presenting it.
2. **Responsive design** - Ensuring that the custom grid flows effectively and elements look good across both mobile and desktop screens.
3. `<NobleDollarStatsProvider>` - This holds all Noble API requests and stores data related to Noble Dollar (USDN)
4. `<KeplrWalletProvider>` - This holds the Keplr instance and facilitates connecting and disconnecting to the network while storing connected account data.
5. `<GridContainer> + <GridColumn>`- Layout components for organization, flexibility, and readability. Essentially, this idea should be carried forward to help make TailwindCSS more manageable and readable. A matured version would be to build a custom component library and/or design system for this UI and other Noble front end applications.
6. `utils/formatters.ts` - This contains custom formatters to work with big int strings and convert to USDN display values. This can be expanded to support many other formats as needed.

## Areas of Improvement

**NOTE:** (Number 1 has been fixed via a workaround in [this PR](https://github.com/drewcook/noble-keplr/pull/1))

1. I tried querying [this endpoint](https://api.noble.xyz/#tag/bank/GET/cosmos/bank/v1beta1/balances/{address}/by_denom) with the appropriate params, but it returns `0` for my account. There may be another endpoint for the testnet that I'm not aware of, and I couldn't find anything else in the API docs, and I verified my calls by checking [Noble Dollar](https://dollar.noble.xyz/) requests. See this [note](./src/components/NobleDollarStatsProvider.tsx#L56).
2. There's plenty of markup that could be DRY'd up and reduce the eyesore of TailwindCSS classes at the higher levels. To further clean up the codebase, these ares could be abstracted to custom components to make the overall `page.tsx` files more readable and concise. Composability FTW.
3. Adding support for more API requests. The `NobleDollarStatsProvider` could be expanded into a `NobleAPIProvider`, for example. It could contain more data related to other tokens.
4. Dark mode - I did not spend any time supporting this and removed the baked in `prefers-color-scheme: dark` CSS styling.
