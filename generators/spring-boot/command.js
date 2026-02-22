import { asCommand } from 'generator-jhipster';

export default asCommand({
  configs: {
    contextPath: {
      description: 'Context path to set as server.servlet.context-path in application.yml (e.g. /jh/)',
      cli: {
        type: String,
      },
      scope: 'blueprint',
    },
  },
});
