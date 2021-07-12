# Grafana integration


# Requirements
With the Grafana integration we want to

* Display Grafana graphs on a ROC GUI dahsboard page
* Have access to the Grafana home page on its own also (in a read only way)
* Have full security and multi tenancy, so that no one can see anyone else's graph
  * including through URL hacking
* Reuse the OpenID Connect security mechanism of the ROC GUI
  * so that the user does not have to login twice every time and gets the feeling of "one system"
* Automate the creation of Enterprises (Orgs), Teams (Groups), Folders, Users and Dashboards in Grafana


# iFrame integration
__Display Grafana graphs on a ROC GUI dahsboard page__

Grafana is integrated in to this GUI through the embedding of Grafana **panels** in iFrames

The URL of an iFrame looks like
```html
<iframe src="/grafana/d-solo/vcs_starbucks_newyork_cameras?orgId=3&theme=light&panelId=2" width="{{width}}" height="200" frameborder="0"></iframe>
```

The important components are:

## orgId
Organizations in Grafana are multi-tenant containers completely opaque to each other.
Each ROC GUI **enterprise** will be provisioned as an **organization** in Grafana through
an operator (future).

> Currently, this is done through a Post Install job on Grafana in `aether-roc-umbrella`

The organization ID - 
The ID is a numerical identifier that in Grafana maps to a name.
e.g.

1. "Main Org."
2. "starbucks"
3. "acme"

The GUI application can lookup the Org ID for a user with the API [lookup](https://grafana.com/docs/grafana/latest/http_api/user/#get-single-user-by-usernamelogin-or-email) function: 
```
GET /api/users/lookup?loginOrEmail=user@mygraf.com
```

An alternative is to just [get the list of orgs](https://grafana.com/docs/grafana/latest/http_api/org/#admin-organizations-api) 
```
GET /api/orgs
```

from Grafana and compare the "enterprise" for the current ROC GUI user.
> This uses the Admin API - see security restrictions below

## Dashboard name
This can be predicted from a consistent naming scheme used in Dashboard creation.
e.g. `vcs_starbucks_newyork_cameras`
> Dashboards are currently created using a post-install job

## Panel ID
Panels are a sub-component of a Dashboard, and are identified only by number.
With a consistent method of creating dashboards, it should be possible to have a
predictable scheme of Panel IDs.

> If it's not, then a scheme of only one Panel per Dashboard can be used, and then the Panel ID can always be 0

## Theme
To fit in with the ROC GUI Light Theme, Grafana charts should always use a light theme.

# Authentication

## JWT Authentication
There are several Authentication methods available with Grafana - the one most suitable for 
use with the ROC GUI is the [**JWT Authentication**](https://grafana.com/docs/grafana/latest/auth/jwt/)
scheme (introduced in 8.0).

This allows JWT token created by the ROC GUI to be passed over to Grafana in a
Header (usually `X-JWT-Assertion`) and Grafana can

1. validate it is genuine by comparing it to the Dex server's `keys` and 
2. identify the user from it (as long as the user already exists in the Grafana DB)

There are a number of challenges with this approach at present

1. It requires the Dex server to be accessible over **https** - which is currently not possible 
   with the dex-ldap-umbrella container
2. It does not work with the Admin API (to access Orgs)
3. We currently do not have a way of passing this Header for iFrame usage
4. It requires the user to be created in Grafana and associated with an Org before authentication.

> Until these issues can be addressed in a future release of the ROC GUI, 
> the **Anonymous** method will be used (see below)

## Basic Authentication for Admin API
To access the Admin API only [Basic Auth](https://grafana.com/docs/grafana/latest/http_api/admin/)
is possible. This requires the Admin User and Password must be pulled from the Kubernetes Secret
for the Grafana Deployment.

To do this in the ROC GUI requires that the secret be exposed outside the cluster and Basic Auth
used to call the Grafana API from the browser. This approach can never be considered secure and
so instead a microservice must do this for the ROC GUI (e.g. a sidecar) that calls on this
Grafana API from inside the cluster.

## Generic OAuth authentication
It is possible to add the Dex server as a [Generic OAuth](https://grafana.com/docs/grafana/latest/auth/generic-oauth/)
backend for Grafana.

This would allow the user to login to Grafana with the same Dex login panel with the same
username and password as ROC GUI.

When a user logs in to Grafana like this, the "grafana_session" Cookie is automatically
created which means that iFrame contents from Grafana would be shown without further authentication.

> The disadvantage with this approach is that the user would have to login twice: once
> to ROC GUI and again to Grafana. This gives the feeling of dealing with 2 systems which is
> undesirable

Also when the user logs in using OAuth for the first time, the user will be created in Grafana automatically,
but will be added to the `Main Org.` (1) by default, and not to the enterprise's Org.

> A separate API call would then be necessary to add them with the correct Role in the correct Org.
> and remove them from the `Main Org.`

## LDAP authentication
While [LDAP Authentication](https://grafana.com/docs/grafana/latest/auth/ldap/) is possible
with Grafana it does not provide any advantages over **Generic Oauth** or **JWT 
Authenticaation**, and bypasses Dex - going straight to the LDAP server.

> This will not work with the **Crowd Identity** server, that's currently used 
> with [dex.aetherproject.org](https://dex.aetherproject.org/dex/.well-known/openid-configuration)

## Anonymous Authentication
[Anonymous Authentication](https://grafana.com/docs/grafana/latest/auth/grafana/#anonymous-authentication)
will allow the iFrame content to be embedded in the ROC GUI without any authentication.

> The diadvantage of this approach is that
> 
> a. it is insecure, providing only security by obfusication
> 
> b. it can only work with 1 Organization - usually the "Main Org."

## Auth Proxy Authentication
This uses a Reverse Proxy (like nginx) to do the authentication. It would require adding in the
token or basic auth in to the nginx `server.conf` for the Grafana `/login` page - after that
all pages will work off the `grafana_session` cookie.

> There are a few challenges with this? How do we get Nginx to retrieve the Admin user name and
> password in the case of Basic auth or the API token in the case of JWT Authentication?
> How can we do it for several users at the one time

