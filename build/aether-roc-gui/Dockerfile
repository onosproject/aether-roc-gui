# Copyright 2021-present Open Networking Foundation
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# This stage builds the js code
FROM node:14.15-stretch as builder

ENV CODE_DEST /var/www
COPY . ${CODE_DEST}

WORKDIR ${CODE_DEST}
RUN npm install
RUN npm run build:prod

# This stage moves the generated and minified code into the final image

FROM nginx:1.21.4-alpine

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
