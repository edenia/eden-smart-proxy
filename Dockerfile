FROM node:alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:alpine AS builder

ARG next_public_ual_app_name
ARG next_public_ual_api_protocol
ARG next_public_ual_api_host
ARG next_public_ual_api_port
ARG next_public_ual_chain_id
ARG next_public_aa_api_host
ARG next_public_genesiseden_contract
ARG next_public_edensmartproxy_contract
ARG next_public_myvoteeosdao_contract
ARG next_public_eden_api_host
ARG next_public_eden_member_url
ARG next_public_eden_block_explorer_url
ARG next_public_producers_info_api_url
ARG eosrate_get_stats_url
ARG eosrate_get_stats_user
ARG eosrate_get_stats_password

ENV NEXT_PUBLIC_UAL_APP_NAME $next_public_ual_app_name
ENV NEXT_PUBLIC_UAL_API_PROTOCOL $next_public_ual_api_protocol
ENV NEXT_PUBLIC_UAL_API_HOST $next_public_ual_api_host
ENV NEXT_PUBLIC_UAL_API_PORT $next_public_ual_api_port
ENV NEXT_PUBLIC_UAL_CHAIN_ID $next_public_ual_chain_id
ENV NEXT_PUBLIC_AA_API_HOST $next_public_aa_api_host
ENV NEXT_PUBLIC_GENESISEDEN_CONTRACT $next_public_genesiseden_contract
ENV NEXT_PUBLIC_EDENSMARTPROXY_CONTRACT $next_public_edensmartproxy_contract
ENV NEXT_PUBLIC_MYVOTEEOSDAO_CONTRACT $next_public_myvoteeosdao_contract
ENV NEXT_PUBLIC_EDEN_API_HOST $next_public_eden_api_host
ENV NEXT_PUBLIC_EDEN_MEMBER_URL $next_public_eden_member_url
ENV NEXT_PUBLIC_EDEN_BLOCK_EXPLORER_URL $next_public_eden_block_explorer_url
ENV NEXT_PUBLIC_PRODUCERS_INFO_API_URL $next_public_producers_info_api_url
ENV EOSRATE_GET_STATS_URL $eosrate_get_stats_url
ENV EOSRATE_GET_STATS_USER $eosrate_get_stats_user
ENV EOSRATE_GET_STATS_PASSWORD $eosrate_get_stats_password

WORKDIR /app

ENV NODE_OPTIONS --openssl-legacy-provider
ENV APP_NAME edenproxy

COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN yarn build && yarn install --production --ignore-scripts --prefer-offline

FROM node:alpine AS runner
WORKDIR /app

ENV APP_NAME edenproxy

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/google-credentials.json ./

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node_modules/.bin/next", "start"]