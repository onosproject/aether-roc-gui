<!--
SPDX-FileCopyrightText: 2019-present Open Networking Foundation <info@opennetworking.org>

SPDX-License-Identifier: Apache-2.0
-->

# Upgrade to new API models

Currently the aether-roc-gui runs aether-1.0.0, 2.0.0 and 2.1.0 versions of the
aether models.

This gives the example of how a new release the Aether API (e.g. 3.0.0) might be handled.

This assumes that the GUI is required to support only the latest release.

> This requirement will be changed in future

## 2 stage approach
It is easiest to approach the upgade in 2 stages

1) upgrade the models and services and
2) upgrade the GUI references to the model and services

### Stage 1 - upgrade the models and services
Update the Makefile to include the new model

```Makefile
node_modules/.bin/ng-openapi-gen --input ../aether-roc-api/api/aether-3.0.0-openapi3.yaml --output src/openapi3/aether/3.0.0
```

Run the code generation

> you will need to have the development tools node and npm installed for this
> see [./prerequisites](prerequisites.md)

```bash
make openapi-gen
```

This will create a folder `src/openapi3/aether/3.0.0/` which you can add to git.

It will also update `src/openapi3/top/level/models/elements.ts`, but incorrectly.

You should rollback the changes on this file and instead extend the file with the
elements from the newly created model:

1) in imports. e.g.

```typescript
import {AccessProfile as AccessProfile300} from "../../../aether/3.0.0/models/access-profile";
import {ApnProfile as ApnProfile300} from "../../../aether/3.0.0/models/apn-profile";
...
```

2) in the exports
```typescript
'Access-profile-3.0.0'?: AccessProfile300;
'Apn-profile-3.0.0'?: ApnProfile300;
...
```

> Make sure to include/exclude and new top level classes that have been added in the Upgrade

It should be possible to run `make test` at this stage and not get any errors.

### Stage 2 - update the components
In all of the TypeScript `*.ts` files under `app` the imports containing `2.1.0` should be changed to `3.0.0`.

```bash
find src/app -name "*.ts" -exec sed -i "s/aether\/2.0.0/aether\/3.0.0/g" {} \;
```

Again after this everything should pass `make test`

At this stage any of the old models can be deleted from the `src/openapi3` folder, since they will not be needed any more
```bash
rm -rf src/openapi3/aether/2.0.0
```
and will have to be manually *removed* from `src/openapi3/top/level/models/elements.ts`. e.g.
```typeScript
import {AccessProfile} from "../../../aether/2.0.0/models/access-profile";
import {ApnProfile} from "../../../aether/2.0.0/models/apn-profile";
...
```
