# generator-jhipster-yellowbricks-spring-boot-contextpath

A [JHipster](https://www.jhipster.tech/) blueprint that sets `server.servlet.context-path` in `application.yml` to a configurable context path.

[![NPM version][npm-image]][npm-url]
[![Generator][github-generator-image]][github-generator-url]
![GitHub Maintained](https://img.shields.io/maintenance/yes/2026)

## JHipster source

- Generator: [`generators/spring-boot`](https://github.com/jhipster/generator-jhipster/tree/main/generators/spring-boot)
- Template: [`application.yml.ejs`](https://github.com/jhipster/generator-jhipster/blob/main/generators/spring-boot/templates/src/main/resources/config/application.yml.ejs)

## What it does

Patches `src/main/resources/config/application.yml` during generation to insert `context-path` as the first key in `server.servlet`:

```diff
 server:
   servlet:
+    context-path: /jh/
     session:
       cookie:
         http-only: true
```

The value is configurable — any context path can be used.

## Prerequisites

- Node.js `^22.18.0 || >=24.11.0`
- JHipster 9

## Installation

```bash
npm install -g generator-jhipster-yellowbricks-spring-boot-contextpath
```

## Usage

Create a `.yo-rc.json` in your project directory with the desired context path:

```json
{
  "generator-jhipster-yellowbricks-spring-boot-contextpath": {
    "contextPath": "/jh/"
  }
}
```

Then run JHipster with this blueprint:

```bash
# Standard generator
jhipster --blueprints yellowbricks-spring-boot-contextpath

# With JDL
jhipster import-jdl your-app.jdl --blueprints yellowbricks-spring-boot-contextpath
```

Replace `/jh/` with your actual context path. The trailing slash is required.

[npm-image]: https://img.shields.io/npm/v/generator-jhipster-yellowbricks-spring-boot-contextpath.svg
[npm-url]: https://npmjs.org/package/generator-jhipster-yellowbricks-spring-boot-contextpath
[github-generator-image]: https://github.com/idNoRD/generator-jhipster-yellowbricks-spring-boot-contextpath/actions/workflows/generator.yml/badge.svg
[github-generator-url]: https://github.com/idNoRD/generator-jhipster-yellowbricks-spring-boot-contextpath/actions/workflows/generator.yml
