import BaseApplicationGenerator from 'generator-jhipster/generators/base-application';

export default class extends BaseApplicationGenerator {
  constructor(args, opts, features) {
    super(args, opts, {
      ...features,

      sbsBlueprint: true,
    });
  }

  get [BaseApplicationGenerator.INITIALIZING]() {
    return this.asInitializingTaskGroup({
      async initializingTemplateTask() {},
    });
  }

  get [BaseApplicationGenerator.PROMPTING]() {
    return this.asPromptingTaskGroup({
      async promptingTemplateTask() {},
    });
  }

  get [BaseApplicationGenerator.CONFIGURING]() {
    return this.asConfiguringTaskGroup({
      async configuringTemplateTask() {},
    });
  }

  get [BaseApplicationGenerator.COMPOSING]() {
    return this.asComposingTaskGroup({
      async composingTemplateTask() {},
    });
  }

  get [BaseApplicationGenerator.COMPOSING_COMPONENT]() {
    return this.asComposingComponentTaskGroup({
      async composingComponentTemplateTask() {},
    });
  }

  get [BaseApplicationGenerator.LOADING]() {
    return this.asLoadingTaskGroup({
      async loadingTemplateTask() {},
    });
  }

  get [BaseApplicationGenerator.PREPARING]() {
    return this.asPreparingTaskGroup({
      async preparingTemplateTask() {},
    });
  }

  get [BaseApplicationGenerator.POST_PREPARING]() {
    return this.asPostPreparingTaskGroup({
      async postPreparingTemplateTask() {},
    });
  }

  get [BaseApplicationGenerator.DEFAULT]() {
    return this.asDefaultTaskGroup({
      async defaultTemplateTask() {},
    });
  }

  get [BaseApplicationGenerator.WRITING]() {
    return this.asWritingTaskGroup({
      async writingTemplateTask({ application }) {
        await this.writeFiles({
          sections: {
            files: [{ templates: ['template-file-spring-boot'] }],
          },
          context: application,
        });
      },
    });
  }

  get [BaseApplicationGenerator.MULTISTEP_TRANSFORM]() {
    return this.asMultistepTransformTaskGroup({
      async multistepTransformTemplateTask() {},
    });
  }

  get [BaseApplicationGenerator.POST_WRITING]() {
    return this.asPostWritingTaskGroup({
      async addContextPath() {
        const contextPath = this.blueprintConfig.contextPath;
        if (!contextPath) {
          this.log.warn(
            '[context-path blueprint] contextPath not configured — add {"generator-jhipster-yellowbricks-spring-boot-contextpath":{"contextPath":"/jh/"}} to .yo-rc.json',
          );
          return;
        }

        this.editFile('src/main/resources/config/application.yml', { ignoreNonExisting: true }, content => {
          // Drift detection: verify expected surrounding structure
          if (!/^server:$/m.test(content)) {
            this.log.warn('[context-path blueprint] application.yml: server section not found — manual intervention needed');
            return content;
          }
          if (!/ {2}servlet:/.test(content)) {
            this.log.warn('[context-path blueprint] application.yml: server.servlet section not found — manual intervention needed');
            return content;
          }
          if (!/^\s+session:$/m.test(content)) {
            this.log.warn(
              '[context-path blueprint] application.yml: server.servlet.session section not found — manual intervention needed',
            );
            return content;
          }
          // End drift detection

          // Capture existing context-path value if present
          const previousMatch = content.match(/^ {4}context-path: (.+)$/m);
          const previousContextPath = previousMatch ? previousMatch[1].trim() : null;

          // Remove existing context-path line, then insert as first key under servlet:
          let updated = content.replace(/^ {4}context-path: .+\n/m, '');
          updated = updated.replace(/^( {2}servlet:\n)/m, `$1    context-path: ${contextPath}\n`);

          if (previousContextPath && previousContextPath !== contextPath) {
            this.log.info(
              `[context-path blueprint] application.yml: context-path renamed from "${previousContextPath}" to "${contextPath}"`,
            );
          } else {
            this.log.info(`[context-path blueprint] application.yml: context-path "${contextPath}" added successfully`);
          }

          return updated;
        });
      },
    });
  }

  get [BaseApplicationGenerator.TRANSFORM]() {
    return this.asTransformTaskGroup({
      async transformTemplateTask() {},
    });
  }

  get [BaseApplicationGenerator.INSTALL]() {
    return this.asInstallTaskGroup({
      async installTemplateTask() {},
    });
  }

  get [BaseApplicationGenerator.POST_INSTALL]() {
    return this.asPostInstallTaskGroup({
      async postInstallTemplateTask() {},
    });
  }

  get [BaseApplicationGenerator.END]() {
    return this.asEndTaskGroup({
      async endTemplateTask() {},
    });
  }
}
