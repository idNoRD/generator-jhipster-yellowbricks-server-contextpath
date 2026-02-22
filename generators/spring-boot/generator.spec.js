import { beforeAll, describe, expect, it } from 'vitest';

import { defaultHelpers as helpers, result } from 'generator-jhipster/testing';

const SUB_GENERATOR = 'spring-boot';
const BLUEPRINT_NAMESPACE = `jhipster:${SUB_GENERATOR}`;
const APPLICATION_YML = 'src/main/resources/config/application.yml';
const sharedOptions = { ignoreNeedlesError: true };

describe('SubGenerator spring-boot of yellowbricks-spring-boot-contextpath JHipster blueprint', () => {
  describe('without contextPath', () => {
    beforeAll(async () => {
      await helpers
        .run(BLUEPRINT_NAMESPACE)
        .withJHipsterConfig()
        .withOptions(sharedOptions)
        .withJHipsterGenerators()
        .withConfiguredBlueprint()
        .withBlueprintConfig();
    });

    it('should succeed', () => {
      expect(result.getStateSnapshot()).toMatchSnapshot();
    });

    it('should not set context-path in application.yml', () => {
      const content = result._readFile(APPLICATION_YML);
      expect(content).not.toContain('context-path:');
    });
  });

  describe('with contextPath configured', () => {
    beforeAll(async () => {
      await helpers
        .run(BLUEPRINT_NAMESPACE)
        .withJHipsterConfig()
        .withOptions(sharedOptions)
        .withJHipsterGenerators()
        .withConfiguredBlueprint()
        .withBlueprintConfig({ contextPath: '/jh/' });
    });

    it('should set context-path in application.yml', () => {
      const content = result._readFile(APPLICATION_YML);
      expect(content).toContain('context-path: /jh/');
    });

    it('should insert context-path before session in application.yml', () => {
      const content = result._readFile(APPLICATION_YML);
      const contextPathIndex = content.indexOf('context-path:');
      const sessionIndex = content.indexOf('session:');
      expect(contextPathIndex).toBeGreaterThan(-1);
      expect(contextPathIndex).toBeLessThan(sessionIndex);
    });
  });
});
