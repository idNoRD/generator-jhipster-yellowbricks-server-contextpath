# generator-jhipster-yellowbricks-server-contextpath

Assume the context-path is "/jh"

For `src/main/resources/config/application.yml`
```diff
server:
  servlet:
+   context-path: /jh/
    session:
      cookie:
        http-only: true
```
