![Archived](https://img.shields.io/badge/Current_Status-archived-blue?style=flat)

# linagora.esn.unifiedinbox.github

Github extension for OpenPaaS ESN inbox module.

## Install

*Note: The following instructions assumes that you have already installed OpenPaaS ESN in the path referenced by $ESN below.*

While waiting for a npm-based dependency injection handler, you have to install this github module in OpenPaaS ESN like this:

**1. Clone linagora.esn.unifiedinbox.github**

Clone the `linagora.esn.unifiedinbox.github` repository.

```
git clone https://ci.open-paas.org/stash/scm/om/linagora.esn.unifiedinbox.github.git
```

Go inside OpenPaaS ESN repository:

```
cd $ESN
npm install
npm link
```

Go inside `linagora.esn.unifiedinbox.github` folder and run:

```
npm link linagora-rse
npm install
```

**2. Add the module in the OpenPaaS ESN configuration file**

You must add "linagora.esn.unifiedinbox.github" in the modules section in `$ESN/config/default.NODE_ENV.json`. NODE_ENV is the environment variable used to define if the node application is running in 'production' or in 'development' (the default environment is 'development').
Copy the 'modules' array from `$ESN/config/default.json` into `$ESN/config/default.NODE_ENV.json` (`$ESN/config/default.development.json` or `$ESN/config/default.production.json`) and add the "linagora.esn.unifiedinbox.github" item:

```
"modules": [
  "linagora.esn.core.webserver",
  "linagora.esn.core.wsserver",
  "linagora.esn.unifiedinbox.github"
],
```

**3. Create symbolic link**

The module must be available in the `$ESN/modules` folder:

```
cd $ESN
ln -s path_to_github_module modules/linagora.esn.unifiedinbox.github
```

## Enable

In order to use this module, it must be activated and user must link his github account:

1. Activate the github events in the linagora.esn.unifiedinbox configuration by setting the feature flip flag `github.received_events` to `true`
2. The user must link his Github account from the accounts page on http://HOST:PORT/#/controlcenter/accounts

## Run

Once installed, you can start OpenPaaS ESN as usual. The Github module is now injecting your Github data in the Inbox module if you have linked your Github account with OP.
