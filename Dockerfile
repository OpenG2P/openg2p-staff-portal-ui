FROM node:20-alpine AS base
WORKDIR /app

FROM base AS builder

RUN apk add --no-cache git
ARG REPO_URL=https://github.com/OpenG2P/openg2p-staff-portal-ui
ARG GIT_BRANCH=develop
RUN git clone --branch ${GIT_BRANCH} --depth 1 ${REPO_URL} .

RUN npm ci
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM base AS runner

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

RUN npm install sharp

RUN chown -R nextjs:nodejs /app
USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]