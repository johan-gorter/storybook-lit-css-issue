import { PluginOption, UserConfig } from 'vite';
import * as fs from 'node:fs';
import { dirname, resolve } from 'path';

let config: UserConfig = {
  plugins: [litCss()]
};

export default config;

function litCss(): PluginOption {
  return {
    name: 'vite-plugin-lit-css',
    resolveId(id, importer) {
      if (id.endsWith('?lit-css')) {
        return resolve(dirname(importer!), id);
      }
    },
    load: {
      order: 'pre',
      async handler(id) {
        if (id.endsWith('?lit-css')) {
          try {
            let fileName = id.replace('?lit-css', '');
            this.addWatchFile(fileName);
            let code = await fs.promises.readFile(fileName, 'utf-8');
            // try {
            //   code = (await postCssProcessor.process(code, { from: fileName })).css;
            // } catch (e) {
            //   this.warn(<Error>e);
            // }
            code = `import { css } from 'lit'; export default css\`${code}\``;
            //code = `const { css } = require('lit'); module.exports = css\`${code}\``;
            return { code, map: { mappings: '' }, meta: {} };
          } catch (e) {
            this.error(<Error>e);
          }
        }
      }
    }
  };
}
