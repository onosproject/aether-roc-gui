# SPDX-FileCopyrightText: 2019-present Open Networking Foundation <info@opennetworking.org>
#
# SPDX-License-Identifier: Apache-2.0

# This stage builds the js code
FROM node:16.14 as builder

ENV CODE_DEST /var/www
COPY . ${CODE_DEST}

WORKDIR ${CODE_DEST}

ARG http_proxy=""
ARG https_proxy=""
ARG no_proxy=""

RUN npm install
RUN npm run build:prod

# This stage moves the generated and minified code into the final image

FROM nginx:1.23.1-alpine

ENV KUBECTL_VERSION="v1.17.0"
ENV CODE /var/www

RUN apk add --update ca-certificates curl bash \
    && curl -L https://storage.googleapis.com/kubernetes-release/release/${KUBECTL_VERSION}/bin/linux/amd64/kubectl -o /usr/local/bin/kubectl \
    && chmod +x /usr/local/bin/kubectl \
    && rm /var/cache/apk/*

COPY --from=builder ${CODE}/dist/aether-roc-gui /usr/share/nginx/html
COPY --from=builder ${CODE}/build/aether-roc-gui/startup.sh /usr/local/bin
COPY --from=builder ${CODE}/build/aether-roc-gui/docker-entrypoint.sh /usr/local/bin
ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["/usr/local/bin/startup.sh"]
EXPOSE 80
