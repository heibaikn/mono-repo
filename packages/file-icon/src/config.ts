import camelcase from 'camelcase'
import { IconPack } from '../typing/index'
import type { FileIcons } from '../typing/index'

/**
 * Defines file icons
 */
const fileIcons: FileIcons = [
  { name: 'html', fileExtensions: ['htm', 'xhtml', 'html_vm', 'asp'] },
  {
    name: 'pug',
    fileExtensions: ['jade', 'pug'],
    fileNames: ['.pug-lintrc', '.pug-lintrc.js', '.pug-lintrc.json']
  },
  {
    name: 'markdown',
    fileExtensions: ['md', 'markdown', 'rst']
  },
  { name: 'blink', fileExtensions: ['blink'], light: true },
  { name: 'css', fileExtensions: ['css'] },
  { name: 'sass', fileExtensions: ['scss', 'sass'] },
  { name: 'less', fileExtensions: ['less'] },
  {
    name: 'json',
    fileExtensions: ['json', 'jsonc', 'tsbuildinfo', 'json5', 'jsonl', 'ndjson'],
    fileNames: [
      '.jscsrc',
      '.jshintrc',
      'composer.lock',
      '.jsbeautifyrc',
      '.esformatter',
      'cdp.pid',
      '.lintstagedrc'
    ]
  },
  {
    name: 'jinja',
    fileExtensions: ['jinja', 'jinja2', 'j2', 'jinja-html'],
    light: true
  },
  { name: 'proto', fileExtensions: ['proto'] },
  {
    name: 'playwright',
    fileNames: [
      'playwright.config.js',
      'playwright.config.mjs',
      'playwright.config.ts',
      'playwright-ct.config.js',
      'playwright-ct.config.mjs',
      'playwright-ct.config.ts'
    ]
  },
  {
    name: 'sublime',
    fileExtensions: ['sublime-project', 'sublime-workspace']
  },
  { name: 'twine', fileExtensions: ['tw', 'twee'] },
  {
    name: 'yaml',
    fileExtensions: ['yml', 'yaml', 'yml.dist', 'yaml.dist', 'YAML-tmLanguage']
  },
  {
    name: 'xml',
    fileExtensions: [
      'xml',
      'plist',
      'xsd',
      'dtd',
      'xsl',
      'xslt',
      'resx',
      'iml',
      'xquery',
      'tmLanguage',
      'manifest',
      'project',
      'xml.dist',
      'xml.dist.sample',
      'dmn'
    ],
    fileNames: ['.htaccess']
  },
  {
    name: 'image',
    fileExtensions: [
      'png',
      'jpeg',
      'jpg',
      'gif',
      'ico',
      'tif',
      'tiff',
      'psd',
      'psb',
      'ami',
      'apx',
      'avif',
      'bmp',
      'bpg',
      'brk',
      'cur',
      'dds',
      'dng',
      'exr',
      'fpx',
      'gbr',
      'img',
      'jbig2',
      'jb2',
      'jng',
      'jxr',
      'pgf',
      'pic',
      'raw',
      'webp',
      'eps',
      'afphoto',
      'ase',
      'aseprite',
      'clip',
      'cpt',
      'heif',
      'heic',
      'kra',
      'mdp',
      'ora',
      'pdn',
      'reb',
      'sai',
      'tga',
      'xcf',
      'jfif',
      'ppm',
      'pbm',
      'pgm',
      'pnm'
    ]
  },
  { name: 'javascript', fileExtensions: ['esx', 'mjs'] },
  { name: 'react', fileExtensions: ['jsx'] },
  { name: 'react_ts', fileExtensions: ['tsx'] },
  {
    name: 'routing',
    fileExtensions: [
      'routing.ts',
      'routing.tsx',
      'routing.js',
      'routing.jsx',
      'routes.ts',
      'routes.tsx',
      'routes.js',
      'routes.jsx'
    ],
    fileNames: [
      'router.js',
      'router.jsx',
      'router.ts',
      'router.tsx',
      'routes.js',
      'routes.jsx',
      'routes.ts',
      'routes.tsx'
    ],
    enabledFor: [
      IconPack.Angular,
      IconPack.Ngrx,
      IconPack.React,
      IconPack.Redux,
      IconPack.Vue,
      IconPack.Vuex
    ]
  },
  {
    name: 'redux-action',
    fileExtensions: ['action.js', 'actions.js', 'action.ts', 'actions.ts'],
    fileNames: ['action.js', 'actions.js', 'action.ts', 'actions.ts'],
    enabledFor: [IconPack.Redux]
  },
  {
    name: 'redux-reducer',
    fileExtensions: ['reducer.js', 'reducers.js', 'reducer.ts', 'reducers.ts'],
    fileNames: ['reducer.js', 'reducers.js', 'reducer.ts', 'reducers.ts'],
    enabledFor: [IconPack.Redux]
  },
  {
    name: 'redux-selector',
    fileExtensions: ['selector.js', 'selectors.js', 'selector.ts', 'selectors.ts'],
    fileNames: ['selector.js', 'selectors.js', 'selector.ts', 'selectors.ts'],
    enabledFor: [IconPack.Redux]
  },
  {
    name: 'redux-store',
    fileExtensions: ['store.js', 'store.ts'],
    fileNames: ['store.js', 'store.ts'],
    enabledFor: [IconPack.Redux]
  },
  {
    name: 'settings',
    fileExtensions: [
      'ini',
      'dlc',
      'dll',
      'config',
      'conf',
      'properties',
      'prop',
      'settings',
      'option',
      'props',
      'toml',
      'prefs',
      'sln.dotsettings',
      'sln.dotsettings.user',
      'cfg'
    ],
    fileNames: [
      '.jshintignore',
      '.buildignore',
      '.mrconfig',
      '.yardopts',
      'manifest.mf',
      '.clang-format',
      '.clang-tidy'
    ]
  },
  {
    name: 'typescript-def',
    fileExtensions: ['d.ts', 'd.cts', 'd.mts']
  },
  { name: 'markojs', fileExtensions: ['marko'] },
  {
    name: 'astro',
    fileExtensions: ['astro'],
    fileNames: [
      'astro.config.js',
      'astro.config.mjs',
      'astro.config.cjs',
      'astro.config.ts',
      'astro.config.cts',
      'astro.config.mts'
    ]
  },
  { name: 'pdf', fileExtensions: ['pdf'] },
  {
    name: 'table',
    fileExtensions: ['xlsx', 'xlsm', 'xls', 'csv', 'tsv', 'psv', 'ods']
  },
  {
    name: 'vscode',
    fileExtensions: ['vscodeignore', 'vsixmanifest', 'vsix', 'code-workplace'],
    fileNames: ['.vsconfig']
  },
  {
    name: 'visualstudio',
    fileExtensions: [
      'csproj',
      'ruleset',
      'sln',
      'suo',
      'vb',
      'vbs',
      'vcxitems',
      'vcxitems.filters',
      'vcxproj',
      'vcxproj.filters'
    ]
  },
  {
    name: 'database',
    fileExtensions: [
      'pdb',
      'sql',
      'pks',
      'pkb',
      'accdb',
      'mdb',
      'sqlite',
      'sqlite3',
      'pgsql',
      'postgres',
      'psql',
      'db',
      'db3'
    ]
  },
  { name: 'kusto', fileExtensions: ['kql'] },
  { name: 'csharp', fileExtensions: ['cs', 'csx'] },
  { name: 'qsharp', fileExtensions: ['qs'] },
  {
    name: 'zip',
    fileExtensions: [
      'zip',
      'tar',
      'gz',
      'xz',
      'lzma',
      'lz4',
      'br',
      'bz2',
      'bzip2',
      'gzip',
      'brotli',
      '7z',
      'rar',
      'tz',
      'txz',
      'tgz'
    ]
  },
  { name: 'vala', fileExtensions: ['vala'] },
  { name: 'zig', fileExtensions: ['zig'] },
  { name: 'exe', fileExtensions: ['exe', 'msi'] },
  { name: 'hex', fileExtensions: ['dat', 'bin', 'hex'] },
  { name: 'java', fileExtensions: ['java', 'jsp'] },
  { name: 'jar', fileExtensions: ['jar'] },
  { name: 'javaclass', fileExtensions: ['class'] },
  { name: 'c', fileExtensions: ['c', 'i', 'mi'] },
  { name: 'h', fileExtensions: ['h'] },
  {
    name: 'cpp',
    fileExtensions: ['cc', 'cpp', 'cxx', 'c++', 'cp', 'mm', 'mii', 'ii']
  },
  {
    name: 'hpp',
    fileExtensions: ['hh', 'hpp', 'hxx', 'h++', 'hp', 'tcc', 'inl']
  },
  { name: 'go', fileExtensions: ['go'] },
  {
    name: 'go-mod',
    fileNames: ['go.mod', 'go.sum', 'go.work', 'go.work.sum']
  },
  { name: 'python', fileExtensions: ['py'] },
  {
    name: 'python-misc',
    fileExtensions: ['pyc', 'whl'],
    fileNames: [
      'requirements.txt',
      'pipfile',
      '.python-version',
      'manifest.in',
      'pylintrc',
      '.pylintrc',
      'pyproject.toml'
    ]
  },
  { name: 'url', fileExtensions: ['url'] },
  {
    name: 'console',
    fileExtensions: ['sh', 'ksh', 'csh', 'tcsh', 'zsh', 'bash', 'bat', 'cmd', 'awk', 'fish', 'exp'],
    fileNames: ['commit-msg', 'pre-commit', 'pre-push', 'post-merge']
  },
  {
    name: 'powershell',
    fileExtensions: ['ps1', 'psm1', 'psd1', 'ps1xml', 'psc1', 'pssc']
  },
  {
    name: 'gradle',
    fileExtensions: ['gradle'],
    fileNames: ['gradle.properties', 'gradlew', 'gradle-wrapper.properties']
  },
  { name: 'word', fileExtensions: ['doc', 'docx', 'rtf', 'odt'] },
  {
    name: 'certificate',
    fileExtensions: ['cer', 'cert', 'crt'],
    fileNames: [
      'copying',
      'copying.md',
      'copying.rst',
      'copying.txt',
      'copyright',
      'copyright.md',
      'copyright.rst',
      'copyright.txt',
      'license',
      'license-agpl',
      'license-apache',
      'license-bsd',
      'license-mit',
      'license-gpl',
      'license-lgpl',
      'license.md',
      'license.rst',
      'license.txt',
      'licence',
      'licence-agpl',
      'licence-apache',
      'licence-bsd',
      'licence-mit',
      'licence-gpl',
      'licence-lgpl',
      'licence.md',
      'licence.rst',
      'licence.txt'
    ]
  },
  {
    name: 'key',
    fileExtensions: ['pub', 'key', 'pem', 'asc', 'gpg', 'passwd'],
    fileNames: ['.htpasswd']
  },
  {
    name: 'font',
    fileExtensions: [
      'woff',
      'woff2',
      'ttf',
      'eot',
      'suit',
      'otf',
      'bmap',
      'fnt',
      'odttf',
      'ttc',
      'font',
      'fonts',
      'sui',
      'ntf',
      'mrf'
    ]
  },
  { name: 'lib', fileExtensions: ['lib', 'bib'] },
  { name: 'ruby', fileExtensions: ['rb', 'erb'] },
  { name: 'gemfile', fileNames: ['gemfile'] },
  {
    name: 'rubocop',
    fileNames: ['.rubocop.yml', '.rubocop-todo.yml', '.rubocop_todo.yml'],
    light: true
  },
  { name: 'fsharp', fileExtensions: ['fs', 'fsx', 'fsi', 'fsproj'] },
  { name: 'swift', fileExtensions: ['swift'] },
  { name: 'arduino', fileExtensions: ['ino'] },
  {
    name: 'docker',
    fileExtensions: ['dockerignore', 'dockerfile'],
    fileNames: [
      'dockerfile',
      'dockerfile.prod',
      'dockerfile.production',
      'dockerfile.alpha',
      'dockerfile.beta',
      'dockerfile.stage',
      'dockerfile.staging',
      'dockerfile.dev',
      'dockerfile.development',
      'dockerfile.local',
      'dockerfile.test',
      'dockerfile.testing',
      'dockerfile.ci',
      'dockerfile.web',
      'dockerfile.worker',

      'docker-compose.yml',
      'docker-compose.override.yml',
      'docker-compose.prod.yml',
      'docker-compose.production.yml',
      'docker-compose.alpha.yml',
      'docker-compose.beta.yml',
      'docker-compose.stage.yml',
      'docker-compose.staging.yml',
      'docker-compose.dev.yml',
      'docker-compose.development.yml',
      'docker-compose.local.yml',
      'docker-compose.test.yml',
      'docker-compose.testing.yml',
      'docker-compose.ci.yml',
      'docker-compose.web.yml',
      'docker-compose.worker.yml',

      'docker-compose.yaml',
      'docker-compose.override.yaml',
      'docker-compose.prod.yaml',
      'docker-compose.production.yaml',
      'docker-compose.alpha.yaml',
      'docker-compose.beta.yaml',
      'docker-compose.stage.yaml',
      'docker-compose.staging.yaml',
      'docker-compose.dev.yaml',
      'docker-compose.development.yaml',
      'docker-compose.local.yaml',
      'docker-compose.test.yaml',
      'docker-compose.testing.yaml',
      'docker-compose.ci.yaml',
      'docker-compose.web.yaml',
      'docker-compose.worker.yaml',

      'compose.yaml',
      'compose.yml'
    ]
  },
  { name: 'tex', fileExtensions: ['tex', 'sty', 'dtx', 'ltx'] },
  {
    name: 'powerpoint',
    fileExtensions: [
      'pptx',
      'ppt',
      'pptm',
      'potx',
      'potm',
      'ppsx',
      'ppsm',
      'pps',
      'ppam',
      'ppa',
      'odp'
    ]
  },
  {
    name: 'video',
    fileExtensions: [
      'webm',
      'mkv',
      'flv',
      'vob',
      'ogv',
      'ogg',
      'gifv',
      'avi',
      'mov',
      'qt',
      'wmv',
      'yuv',
      'rm',
      'rmvb',
      'mp4',
      'm4v',
      'mpg',
      'mp2',
      'mpeg',
      'mpe',
      'mpv',
      'm2v'
    ]
  },
  { name: 'virtual', fileExtensions: ['vdi', 'vbox', 'vbox-prev'] },
  { name: 'email', fileExtensions: ['ics'], fileNames: ['.mailmap'] },
  {
    name: 'audio',
    fileExtensions: ['mp3', 'flac', 'm4a', 'wma', 'aiff', 'wav']
  },
  { name: 'coffee', fileExtensions: ['coffee', 'cson', 'iced'] },
  { name: 'document', fileExtensions: ['txt'] },
  {
    name: 'graphql',
    fileExtensions: ['graphql', 'gql'],
    fileNames: [
      '.graphqlconfig',
      '.graphqlrc',
      '.graphqlrc.json',
      '.graphqlrc.js',
      '.graphqlrc.cjs',
      '.graphqlrc.ts',
      '.graphqlrc.toml',
      '.graphqlrc.yaml',
      '.graphqlrc.yml',
      'graphql.config.json',
      'graphql.config.js',
      'graphql.config.ts',
      'graphql.config.toml',
      'graphql.config.yaml',
      'graphql.config.yml'
    ]
  },
  { name: 'rust', fileExtensions: ['rs', 'ron'] },
  { name: 'raml', fileExtensions: ['raml'] },
  { name: 'xaml', fileExtensions: ['xaml'] },
  { name: 'haskell', fileExtensions: ['hs'] },
  { name: 'kotlin', fileExtensions: ['kt', 'kts'] },
  { name: 'otne', fileExtensions: ['otne'] },
  {
    name: 'git',
    fileExtensions: ['patch'],
    fileNames: [
      '.gitignore',
      '.gitignore-global',
      '.gitignore_global',
      '.gitconfig',
      '.gitattributes',
      '.gitmodules',
      '.gitkeep',
      '.gitinclude',
      'git-history'
    ]
  },
  { name: 'lua', fileExtensions: ['lua'], fileNames: ['.luacheckrc'] },
  { name: 'clojure', fileExtensions: ['clj', 'cljs', 'cljc'] },
  { name: 'groovy', fileExtensions: ['groovy'] },
  { name: 'r', fileExtensions: ['r', 'rmd'], fileNames: ['.Rhistory'] },
  { name: 'dart', fileExtensions: ['dart'], fileNames: ['.pubignore'] },
  { name: 'dart_generated', fileExtensions: ['freezed.dart', 'g.dart'] },
  { name: 'actionscript', fileExtensions: ['as'] },
  { name: 'mxml', fileExtensions: ['mxml'] },
  { name: 'autohotkey', fileExtensions: ['ahk'] },
  { name: 'flash', fileExtensions: ['swf'] },
  { name: 'swc', fileExtensions: ['swc'] },
  {
    name: 'cmake',
    fileExtensions: ['cmake'],
    fileNames: ['cmakelists.txt', 'cmakecache.txt']
  },
  {
    name: 'assembly',
    fileExtensions: [
      'asm',
      'a51',
      'inc',
      'nasm',
      's',
      'ms',
      'agc',
      'ags',
      'aea',
      'argus',
      'mitigus',
      'binsource'
    ]
  },
  { name: 'vue', fileExtensions: ['vue'] },
  {
    name: 'vue-config',
    fileNames: ['vue.config.js', 'vue.config.ts', 'vetur.config.js', 'vetur.config.ts']
  },
  {
    name: 'vuex-store',
    fileExtensions: ['store.js', 'store.ts'],
    fileNames: ['store.js', 'store.ts'],
    enabledFor: [IconPack.Vuex]
  },
  {
    name: 'nuxt',
    fileNames: ['nuxt.config.js', 'nuxt.config.ts', '.nuxtignore']
  },
  { name: 'ocaml', fileExtensions: ['ml', 'mli', 'cmx'] },
  { name: 'odin', fileExtensions: ['odin'] },
  {
    name: 'javascript-map',
    fileExtensions: ['js.map', 'mjs.map', 'cjs.map']
  },
  { name: 'css-map', fileExtensions: ['css.map'] },
  {
    name: 'lock',
    fileExtensions: ['lock'],
    fileNames: ['security.md', 'security.txt', 'security']
  },
  { name: 'handlebars', fileExtensions: ['hbs', 'mustache'] },
  { name: 'perl', fileExtensions: ['pm', 'raku'] },
  { name: 'haxe', fileExtensions: ['hx'] },
  {
    name: 'test-ts',
    fileExtensions: [
      'spec.ts',
      'spec.cts',
      'spec.mts',
      'cy.ts',
      'e2e-spec.ts',
      'e2e-spec.cts',
      'e2e-spec.mts',
      'test.ts',
      'test.cts',
      'test.mts',
      'ts.snap'
    ]
  },
  {
    name: 'test-jsx',
    fileExtensions: [
      'spec.tsx',
      'test.tsx',
      'tsx.snap',
      'spec.jsx',
      'test.jsx',
      'jsx.snap',
      'cy.jsx',
      'cy.tsx'
    ]
  },
  {
    name: 'test-js',
    fileExtensions: [
      'spec.js',
      'spec.cjs',
      'spec.mjs',
      'e2e-spec.js',
      'e2e-spec.cjs',
      'e2e-spec.mjs',
      'test.js',
      'test.cjs',
      'test.mjs',
      'js.snap',
      'cy.js'
    ]
  },
  {
    name: 'angular',
    fileExtensions: ['module.ts', 'module.js', 'ng-template'],
    fileNames: ['angular-cli.json', '.angular-cli.json', 'angular.json'],
    enabledFor: [IconPack.Angular, IconPack.Ngrx]
  },
  {
    name: 'angular-component',
    fileExtensions: ['component.ts', 'component.js'],
    enabledFor: [IconPack.Angular, IconPack.Ngrx]
  },
  {
    name: 'angular-guard',
    fileExtensions: ['guard.ts', 'guard.js'],
    enabledFor: [IconPack.Angular, IconPack.Ngrx]
  },
  {
    name: 'angular-service',
    fileExtensions: ['service.ts', 'service.js'],
    enabledFor: [IconPack.Angular, IconPack.Ngrx]
  },
  {
    name: 'angular-pipe',
    fileExtensions: ['pipe.ts', 'pipe.js', 'filter.js'],
    enabledFor: [IconPack.Angular, IconPack.Ngrx]
  },
  {
    name: 'angular-directive',
    fileExtensions: ['directive.ts', 'directive.js'],
    enabledFor: [IconPack.Angular, IconPack.Ngrx]
  },
  {
    name: 'angular-resolver',
    fileExtensions: ['resolver.ts', 'resolver.js'],
    enabledFor: [IconPack.Angular, IconPack.Ngrx]
  },
  { name: 'puppet', fileExtensions: ['pp'] },
  { name: 'elixir', fileExtensions: ['ex', 'exs', 'eex', 'leex', 'heex'] },
  { name: 'livescript', fileExtensions: ['ls'] },
  { name: 'erlang', fileExtensions: ['erl'] },
  { name: 'twig', fileExtensions: ['twig'] },
  { name: 'julia', fileExtensions: ['jl'] },
  { name: 'elm', fileExtensions: ['elm'] },
  { name: 'purescript', fileExtensions: ['pure', 'purs'] },
  { name: 'smarty', fileExtensions: ['tpl'] },
  { name: 'stylus', fileExtensions: ['styl'] },
  { name: 'reason', fileExtensions: ['re', 'rei'] },
  { name: 'bucklescript', fileExtensions: ['cmj'] },
  { name: 'merlin', fileExtensions: ['merlin'] },
  { name: 'verilog', fileExtensions: ['vhd', 'sv', 'svh'] },
  { name: 'mathematica', fileExtensions: ['nb'] },
  { name: 'wolframlanguage', fileExtensions: ['wl', 'wls'] },
  { name: 'nunjucks', fileExtensions: ['njk', 'nunjucks'] },
  { name: 'robot', fileExtensions: ['robot'] },
  { name: 'solidity', fileExtensions: ['sol'] },
  { name: 'autoit', fileExtensions: ['au3'] },
  { name: 'haml', fileExtensions: ['haml'] },
  { name: 'yang', fileExtensions: ['yang'] },
  {
    name: 'mjml',
    fileExtensions: ['mjml'],
    fileNames: ['.mjmlconfig']
  },
  {
    name: 'vercel',
    fileNames: ['vercel.json', '.vercelignore', 'now.json', '.nowignore'],
    light: true
  },
  {
    name: 'verdaccio',
    fileNames: ['verdaccio.yml']
  },
  {
    name: 'next',
    fileNames: ['next.config.js', 'next.config.mjs', 'next.config.ts', 'next.config.mts'],
    light: true
  },
  {
    name: 'remix',
    fileNames: ['remix.config.js', 'remix.config.ts'],
    light: true
  },
  {
    name: 'terraform',
    fileExtensions: ['tf', 'tf.json', 'tfvars', 'tfstate']
  },
  {
    name: 'laravel',
    fileExtensions: ['blade.php', 'inky.php'],
    fileNames: ['artisan']
  },
  { name: 'applescript', fileExtensions: ['applescript', 'ipa'] },
  { name: 'cake', fileExtensions: ['cake'] },
  { name: 'cucumber', fileExtensions: ['feature', 'features'] },
  { name: 'nim', fileExtensions: ['nim', 'nimble'] },
  { name: 'apiblueprint', fileExtensions: ['apib', 'apiblueprint'] },
  { name: 'riot', fileExtensions: ['riot', 'tag'] },
  { name: 'vfl', fileExtensions: ['vfl'], fileNames: ['.vfl'] },
  { name: 'kl', fileExtensions: ['kl'], fileNames: ['.kl'] },
  {
    name: 'postcss',
    fileExtensions: ['pcss', 'sss'],
    fileNames: [
      'postcss.config.js',
      'postcss.config.cjs',
      'postcss.config.ts',
      'postcss.config.cts',
      '.postcssrc.js',
      '.postcssrc.cjs',
      '.postcssrc.ts',
      '.postcssrc.cts',
      '.postcssrc',
      '.postcssrc.json',
      '.postcssrc.yaml',
      '.postcssrc.yml'
    ]
  },
  {
    name: 'posthtml',
    fileNames: [
      'posthtml.config.js',
      '.posthtmlrc.js',
      '.posthtmlrc',
      '.posthtmlrc.json',
      '.posthtmlrc.yml'
    ]
  },
  { name: 'todo', fileExtensions: ['todo'] },
  { name: 'coldfusion', fileExtensions: ['cfml', 'cfc', 'lucee', 'cfm'] },
  {
    name: 'cabal',
    fileExtensions: ['cabal'],
    fileNames: ['cabal.project', 'cabal.project.freeze', 'cabal.project.local']
  },
  { name: 'nix', fileExtensions: ['nix'] },
  { name: 'slim', fileExtensions: ['slim'] },
  { name: 'http', fileExtensions: ['http', 'rest'], fileNames: ['CNAME'] },
  { name: 'restql', fileExtensions: ['rql', 'restql'] },
  { name: 'kivy', fileExtensions: ['kv'] },
  {
    name: 'graphcool',
    fileExtensions: ['graphcool'],
    fileNames: ['project.graphcool']
  },
  { name: 'sbt', fileExtensions: ['sbt'] },
  {
    name: 'webpack',
    fileNames: [
      'webpack.js',
      'webpack.cjs',
      'webpack.mjs',
      'webpack.ts',
      'webpack.cts',
      'webpack.mts',
      'webpack.base.js',
      'webpack.base.cjs',
      'webpack.base.mjs',
      'webpack.base.ts',
      'webpack.base.cts',
      'webpack.base.mts',
      'webpack.config.js',
      'webpack.config.cjs',
      'webpack.config.mjs',
      'webpack.config.ts',
      'webpack.config.cts',
      'webpack.config.mts',
      'webpack.common.js',
      'webpack.common.cjs',
      'webpack.common.mjs',
      'webpack.common.ts',
      'webpack.common.cts',
      'webpack.common.mts',
      'webpack.config.common.js',
      'webpack.config.common.cjs',
      'webpack.config.common.mjs',
      'webpack.config.common.ts',
      'webpack.config.common.cts',
      'webpack.config.common.mts',
      'webpack.config.common.babel.js',
      'webpack.config.common.babel.ts',
      'webpack.dev.js',
      'webpack.dev.cjs',
      'webpack.dev.mjs',
      'webpack.dev.ts',
      'webpack.dev.cts',
      'webpack.dev.mts',
      'webpack.development.js',
      'webpack.development.cjs',
      'webpack.development.mjs',
      'webpack.development.ts',
      'webpack.development.cts',
      'webpack.development.mts',
      'webpack.config.dev.js',
      'webpack.config.dev.cjs',
      'webpack.config.dev.mjs',
      'webpack.config.dev.ts',
      'webpack.config.dev.cts',
      'webpack.config.dev.mts',
      'webpack.config.dev.babel.js',
      'webpack.config.dev.babel.ts',
      'webpack.mix.js',
      'webpack.mix.cjs',
      'webpack.mix.mjs',
      'webpack.mix.ts',
      'webpack.mix.cts',
      'webpack.mix.mts',
      'webpack.prod.js',
      'webpack.prod.cjs',
      'webpack.prod.mjs',
      'webpack.prod.ts',
      'webpack.prod.cts',
      'webpack.prod.mts',
      'webpack.prod.config.js',
      'webpack.prod.config.cjs',
      'webpack.prod.config.mjs',
      'webpack.prod.config.ts',
      'webpack.prod.config.cts',
      'webpack.prod.config.mts',
      'webpack.production.js',
      'webpack.production.cjs',
      'webpack.production.mjs',
      'webpack.production.ts',
      'webpack.production.cts',
      'webpack.production.mts',
      'webpack.server.js',
      'webpack.server.cjs',
      'webpack.server.mjs',
      'webpack.server.ts',
      'webpack.server.cts',
      'webpack.server.mts',
      'webpack.client.js',
      'webpack.client.cjs',
      'webpack.client.mjs',
      'webpack.client.ts',
      'webpack.client.cts',
      'webpack.client.mts',
      'webpack.config.server.js',
      'webpack.config.server.cjs',
      'webpack.config.server.mjs',
      'webpack.config.server.ts',
      'webpack.config.server.cts',
      'webpack.config.server.mts',
      'webpack.config.client.js',
      'webpack.config.client.cjs',
      'webpack.config.client.mjs',
      'webpack.config.client.ts',
      'webpack.config.client.cts',
      'webpack.config.client.mts',
      'webpack.config.production.babel.js',
      'webpack.config.production.babel.ts',
      'webpack.config.prod.babel.js',
      'webpack.config.prod.babel.cjs',
      'webpack.config.prod.babel.mjs',
      'webpack.config.prod.babel.ts',
      'webpack.config.prod.babel.cts',
      'webpack.config.prod.babel.mts',
      'webpack.config.prod.js',
      'webpack.config.prod.cjs',
      'webpack.config.prod.mjs',
      'webpack.config.prod.ts',
      'webpack.config.prod.cts',
      'webpack.config.prod.mts',
      'webpack.config.production.js',
      'webpack.config.production.cjs',
      'webpack.config.production.mjs',
      'webpack.config.production.ts',
      'webpack.config.production.cts',
      'webpack.config.production.mts',
      'webpack.config.staging.js',
      'webpack.config.staging.cjs',
      'webpack.config.staging.mjs',
      'webpack.config.staging.ts',
      'webpack.config.staging.cts',
      'webpack.config.staging.mts',
      'webpack.config.babel.js',
      'webpack.config.babel.ts',
      'webpack.config.base.babel.js',
      'webpack.config.base.babel.ts',
      'webpack.config.base.js',
      'webpack.config.base.cjs',
      'webpack.config.base.mjs',
      'webpack.config.base.ts',
      'webpack.config.base.cts',
      'webpack.config.base.mts',
      'webpack.config.staging.babel.js',
      'webpack.config.staging.babel.ts',
      'webpack.config.coffee',
      'webpack.config.test.js',
      'webpack.config.test.cjs',
      'webpack.config.test.mjs',
      'webpack.config.test.ts',
      'webpack.config.test.cts',
      'webpack.config.test.mts',
      'webpack.config.vendor.js',
      'webpack.config.vendor.cjs',
      'webpack.config.vendor.mjs',
      'webpack.config.vendor.ts',
      'webpack.config.vendor.cts',
      'webpack.config.vendor.mts',
      'webpack.config.vendor.production.js',
      'webpack.config.vendor.production.cjs',
      'webpack.config.vendor.production.mjs',
      'webpack.config.vendor.production.ts',
      'webpack.config.vendor.production.cts',
      'webpack.config.vendor.production.mts',
      'webpack.test.js',
      'webpack.test.cjs',
      'webpack.test.mjs',
      'webpack.test.ts',
      'webpack.test.cts',
      'webpack.test.mts',
      'webpack.dist.js',
      'webpack.dist.cjs',
      'webpack.dist.mjs',
      'webpack.dist.ts',
      'webpack.dist.cts',
      'webpack.dist.mts',
      'webpackfile.js',
      'webpackfile.cjs',
      'webpackfile.mjs',
      'webpackfile.ts',
      'webpackfile.cts',
      'webpackfile.mts'
    ]
  },
  { name: 'ionic', fileNames: ['ionic.config.json', '.io-config.json'] },
  {
    name: 'gulp',
    fileNames: [
      'gulpfile.js',
      'gulpfile.mjs',
      'gulpfile.ts',
      'gulpfile.cts',
      'gulpfile.mts',
      'gulpfile.babel.js'
    ]
  },
  {
    name: 'nodejs',
    fileNames: ['package.json', 'package-lock.json', '.nvmrc', '.esmrc', '.node-version']
  },
  { name: 'npm', fileNames: ['.npmignore', '.npmrc'] },
  {
    name: 'yarn',
    fileNames: [
      '.yarnrc',
      'yarn.lock',
      '.yarnclean',
      '.yarn-integrity',
      'yarn-error.log',
      '.yarnrc.yml',
      '.yarnrc.yaml'
    ]
  },
  {
    name: 'android',
    fileNames: ['androidmanifest.xml'],
    fileExtensions: ['apk', 'smali', 'dex']
  },
  {
    name: 'tune',
    fileExtensions: ['env'],
    fileNames: [
      '.env.defaults',
      '.env.example',
      '.env.sample',
      '.env.template',
      '.env.schema',
      '.env.local',
      '.env.dev',
      '.env.development',
      '.env.alpha',
      '.env.e2e',
      '.env.qa',
      '.env.dist',
      '.env.prod',
      '.env.production',
      '.env.stage',
      '.env.staging',
      '.env.preview',
      '.env.test',
      '.env.testing',
      '.env.development.local',
      '.env.qa.local',
      '.env.production.local',
      '.env.staging.local',
      '.env.test.local'
    ]
  },
  {
    name: 'turborepo',
    light: true,
    fileNames: ['turbo.json']
  },
  {
    name: 'babel',
    fileNames: [
      '.babelrc',
      '.babelrc.cjs',
      '.babelrc.js',
      '.babelrc.mjs',
      '.babelrc.json',
      'babel.config.cjs',
      'babel.config.js',
      'babel.config.mjs',
      'babel.config.json',
      'babel-transform.js',
      '.babel-plugin-macrosrc',
      '.babel-plugin-macrosrc.json',
      '.babel-plugin-macrosrc.yaml',
      '.babel-plugin-macrosrc.yml',
      '.babel-plugin-macrosrc.js',
      'babel-plugin-macros.config.js'
    ]
  },
  {
    name: 'blitz',
    fileNames: ['blitz.config.js', 'blitz.config.ts', '.blitz.config.compiled.js']
  },
  {
    name: 'contributing',
    fileNames: ['contributing.md', 'contributing.rst', 'contributing.txt', 'contributing']
  },
  {
    name: 'readme',
    fileNames: ['readme.md', 'readme.rst', 'readme.txt', 'readme']
  },
  {
    name: 'changelog',
    fileNames: [
      'changelog',
      'changelog.md',
      'changelog.rst',
      'changelog.txt',
      'changes',
      'changes.md',
      'changes.rst',
      'changes.txt'
    ]
  },
  {
    name: 'architecture',
    fileNames: ['architecture.md', 'architecture.rst', 'architecture.txt', 'architecture']
  },
  {
    name: 'credits',
    fileNames: ['credits.md', 'credits.rst', 'credits.txt', 'credits']
  },
  {
    name: 'authors',
    fileNames: [
      'authors.md',
      'authors.rst',
      'authors.txt',
      'authors',
      'contributors.md',
      'contributors.rst',
      'contributors.txt',
      'contributors'
    ]
  },
  { name: 'flow', fileNames: ['.flowconfig'] },
  { name: 'favicon', fileNames: ['favicon.ico'] },
  {
    name: 'karma',
    fileNames: [
      'karma.conf.js',
      'karma.conf.ts',
      'karma.conf.coffee',
      'karma.config.js',
      'karma.config.ts',
      'karma-main.js',
      'karma-main.ts'
    ]
  },
  { name: 'bithound', fileNames: ['.bithoundrc'] },
  { name: 'svgo', fileNames: ['svgo.config.js'] },
  { name: 'appveyor', fileNames: ['.appveyor.yml', 'appveyor.yml'] },
  { name: 'travis', fileNames: ['.travis.yml'] },
  { name: 'codecov', fileNames: ['.codecov.yml', 'codecov.yml'] },
  {
    name: 'protractor',
    fileNames: [
      'protractor.conf.js',
      'protractor.conf.ts',
      'protractor.conf.coffee',
      'protractor.config.js',
      'protractor.config.ts'
    ]
  },
  { name: 'fusebox', fileNames: ['fuse.js'] },
  { name: 'heroku', fileNames: ['procfile', 'procfile.windows'] },
  { name: 'editorconfig', fileNames: ['.editorconfig'] },
  { name: 'gitlab', fileExtensions: ['gitlab-ci.yml'] },
  { name: 'bower', fileNames: ['.bowerrc', 'bower.json'] },
  {
    name: 'eslint',
    fileNames: [
      '.eslintrc.js',
      '.eslintrc.cjs',
      '.eslintrc.yaml',
      '.eslintrc.yml',
      '.eslintrc.json',
      '.eslintrc-md.js',
      '.eslintrc-jsdoc.js',
      '.eslintrc',
      '.eslintignore',
      '.eslintcache',
      'eslint.config.js'
    ]
  },
  {
    name: 'conduct',
    fileNames: ['code_of_conduct.md', 'code_of_conduct.txt']
  },
  { name: 'watchman', fileNames: ['.watchmanconfig'] },
  { name: 'aurelia', fileNames: ['aurelia.json'] },
  {
    name: 'auto',
    fileNames: [
      '.autorc',
      'auto.config.js',
      'auto.config.ts',
      'auto-config.json',
      'auto-config.yaml',
      'auto-config.yml',
      'auto-config.ts',
      'auto-config.js'
    ],
    light: true
  },
  {
    name: 'mocha',
    fileNames: [
      'mocha.opts',
      '.mocharc.yml',
      '.mocharc.yaml',
      '.mocharc.js',
      '.mocharc.json',
      '.mocharc.jsonc'
    ]
  },
  {
    name: 'jenkins',
    fileNames: ['jenkinsfile'],
    fileExtensions: ['jenkinsfile', 'jenkins']
  },
  {
    name: 'firebase',
    fileNames: ['firebase.json', '.firebaserc', 'firestore.rules', 'firestore.indexes.json']
  },
  {
    name: 'figma',
    fileExtensions: ['fig']
  },
  {
    name: 'rollup',
    fileNames: [
      'rollup.config.js',
      'rollup.config.ts',
      'rollup-config.js',
      'rollup-config.ts',
      'rollup.config.common.js',
      'rollup.config.common.ts',
      'rollup.config.base.js',
      'rollup.config.base.ts',
      'rollup.config.prod.js',
      'rollup.config.prod.ts',
      'rollup.config.dev.js',
      'rollup.config.dev.ts',
      'rollup.config.prod.vendor.js',
      'rollup.config.prod.vendor.ts'
    ]
  },
  { name: 'hack', fileNames: ['.hhconfig'] },
  { name: 'hardhat', fileNames: ['hardhat.config.js', 'hardhat.config.ts'] },
  {
    name: 'stylelint',
    fileNames: [
      '.stylelintrc',
      'stylelint.config.js',
      'stylelint.config.cjs',
      '.stylelintrc.json',
      '.stylelintrc.yaml',
      '.stylelintrc.yml',
      '.stylelintrc.js',
      '.stylelintrc.cjs',
      '.stylelintignore',
      '.stylelintcache'
    ],
    light: true
  },
  { name: 'code-climate', fileNames: ['.codeclimate.yml'], light: true },
  {
    name: 'prettier',
    fileNames: [
      '.prettierrc',
      'prettier.config.js',
      'prettier.config.cjs',
      '.prettierrc.js',
      '.prettierrc.cjs',
      '.prettierrc.json',
      '.prettierrc.json5',
      '.prettierrc.yaml',
      '.prettierrc.yml',
      '.prettierignore',
      '.prettierrc.toml'
    ]
  },
  {
    name: 'renovate',
    fileNames: [
      '.renovaterc',
      '.renovaterc.json',
      'renovate-config.json',
      'renovate.json',
      'renovate.json5'
    ]
  },
  { name: 'apollo', fileNames: ['apollo.config.js'] },
  { name: 'nodemon', fileNames: ['nodemon.json', 'nodemon-debug.json'] },
  {
    name: 'ngrx-reducer',
    fileExtensions: ['reducer.ts', 'rootReducer.ts'],
    enabledFor: [IconPack.Ngrx]
  },
  {
    name: 'ngrx-state',
    fileExtensions: ['state.ts'],
    enabledFor: [IconPack.Ngrx]
  },
  {
    name: 'ngrx-actions',
    fileExtensions: ['actions.ts'],
    enabledFor: [IconPack.Ngrx]
  },
  {
    name: 'ngrx-effects',
    fileExtensions: ['effects.ts'],
    enabledFor: [IconPack.Ngrx]
  },
  {
    name: 'ngrx-entity',
    fileNames: ['.entity'],
    enabledFor: [IconPack.Ngrx]
  },
  {
    name: 'ngrx-selectors',
    fileExtensions: ['selectors.ts'],
    enabledFor: [IconPack.Ngrx]
  },
  { name: 'webhint', fileNames: ['.hintrc'] },
  {
    name: 'browserlist',
    fileNames: ['browserslist', '.browserslistrc'],
    light: true
  },
  { name: 'crystal', fileExtensions: ['cr', 'ecr'], light: true },
  { name: 'snyk', fileNames: ['.snyk'] },
  {
    name: 'drone',
    fileExtensions: ['drone.yml'],
    fileNames: ['.drone.yml'],
    light: true
  },
  { name: 'cuda', fileExtensions: ['cu', 'cuh'] },
  { name: 'log', fileExtensions: ['log'] },
  { name: 'dotjs', fileExtensions: ['def', 'dot', 'jst'] },
  { name: 'ejs', fileExtensions: ['ejs'] },
  { name: 'sequelize', fileNames: ['.sequelizerc'] },
  {
    name: 'gatsby',
    fileNames: [
      'gatsby-config.ts',
      'gatsby-config.js',
      'gatsby-node.js',
      'gatsby-browser.js',
      'gatsby-ssr.js'
    ]
  },
  {
    name: 'wakatime',
    fileNames: ['.wakatime-project'],
    fileExtensions: ['wakatime-project'],
    light: true
  },
  { name: 'circleci', fileNames: ['circle.yml'], light: true },
  { name: 'cloudfoundry', fileNames: ['.cfignore'] },
  {
    name: 'grunt',
    fileNames: [
      'gruntfile.js',
      'gruntfile.ts',
      'gruntfile.coffee',
      'gruntfile.babel.js',
      'gruntfile.babel.ts',
      'gruntfile.babel.coffee'
    ]
  },
  {
    name: 'jest',
    fileNames: [
      'jest.config.js',
      'jest.config.cjs',
      'jest.config.mjs',
      'jest.config.ts',
      'jest.config.cts',
      'jest.config.mts',
      'jest.config.json',
      'jest.e2e.config.js',
      'jest.e2e.config.cjs',
      'jest.e2e.config.mjs',
      'jest.e2e.config.ts',
      'jest.e2e.config.cts',
      'jest.e2e.config.mts',
      'jest.e2e.config.json',
      'jest.e2e.json',
      'jest-unit.config.js',
      'jest-e2e.config.js',
      'jest-e2e.config.cjs',
      'jest-e2e.config.mjs',
      'jest-e2e.config.ts',
      'jest-e2e.config.cts',
      'jest-e2e.config.mts',
      'jest-e2e.config.json',
      'jest-e2e.json',
      'jest-github-actions-reporter.js',
      'jest.setup.js',
      'jest.setup.ts',
      'jest.json',
      '.jestrc',
      '.jestrc.js',
      '.jestrc.json',
      'jest.teardown.js'
    ]
  },
  { name: 'processing', fileExtensions: ['pde'] },
  {
    name: 'storybook',
    fileExtensions: [
      'stories.js',
      'stories.jsx',
      'stories.mdx',
      'story.js',
      'story.jsx',
      'stories.ts',
      'stories.tsx',
      'story.ts',
      'story.tsx',
      'stories.svelte',
      'story.mdx'
    ]
  },
  { name: 'wepy', fileExtensions: ['wpy'] },
  { name: 'fastlane', fileNames: ['fastfile', 'appfile'] },
  { name: 'hcl', fileExtensions: ['hcl'], light: true },
  { name: 'helm', fileNames: ['.helmignore'] },
  { name: 'san', fileExtensions: ['san'] },
  { name: 'wallaby', fileNames: ['wallaby.js', 'wallaby.conf.js'] },
  { name: 'django', fileExtensions: ['djt'] },
  { name: 'stencil', fileNames: ['stencil.config.js', 'stencil.config.ts'] },
  { name: 'red', fileExtensions: ['red'] },
  {
    name: 'makefile',
    fileExtensions: ['mk'],
    fileNames: ['makefile', 'gnumakefile', 'kbuild']
  },
  { name: 'foxpro', fileExtensions: ['fxp', 'prg'] },
  { name: 'i18n', fileExtensions: ['pot', 'po', 'mo', 'lang'] },
  { name: 'webassembly', fileExtensions: ['wat', 'wasm'] },
  {
    name: 'semantic-release',
    light: true,
    fileNames: [
      '.releaserc',
      '.releaserc.yaml',
      '.releaserc.yml',
      '.releaserc.json',
      '.releaserc.js',
      'release.config.js'
    ]
  },
  {
    name: 'bitbucket',
    fileNames: ['bitbucket-pipelines.yaml', 'bitbucket-pipelines.yml']
  },
  { name: 'jupyter', fileExtensions: ['ipynb'] },
  { name: 'd', fileExtensions: ['d'] },
  { name: 'mdx', fileExtensions: ['mdx'] },
  { name: 'mdsvex', fileExtensions: ['svx'] },
  { name: 'ballerina', fileExtensions: ['bal', 'balx'] },
  { name: 'racket', fileExtensions: ['rkt'] },
  {
    name: 'bazel',
    fileExtensions: ['bzl', 'bazel'],
    fileNames: ['.bazelignore', '.bazelrc', '.bazelversion']
  },
  { name: 'mint', fileExtensions: ['mint'] },
  { name: 'velocity', fileExtensions: ['vm', 'fhtml', 'vtl'] },
  { name: 'godot', fileExtensions: ['gd'] },
  { name: 'godot-assets', fileExtensions: ['godot', 'tres', 'tscn'] },
  {
    name: 'azure-pipelines',
    fileNames: ['azure-pipelines.yml', 'azure-pipelines.yaml'],
    fileExtensions: ['azure-pipelines.yml', 'azure-pipelines.yaml']
  },
  { name: 'azure', fileExtensions: ['azcli'] },
  {
    name: 'vagrant',
    fileNames: ['vagrantfile'],
    fileExtensions: ['vagrantfile']
  },
  { name: 'prisma', fileNames: ['prisma.yml'], fileExtensions: ['prisma'] },
  { name: 'razor', fileExtensions: ['cshtml', 'vbhtml'] },
  { name: 'abc', fileExtensions: ['abc'] },
  { name: 'asciidoc', fileExtensions: ['ad', 'adoc', 'asciidoc'] },
  { name: 'istanbul', fileNames: ['.nycrc', '.nycrc.json'] },
  { name: 'edge', fileExtensions: ['edge'] },
  { name: 'scheme', fileExtensions: ['ss', 'scm'] },
  { name: 'lisp', fileExtensions: ['lisp', 'lsp', 'cl', 'fast'] },
  {
    name: 'tailwindcss',
    fileNames: [
      'tailwind.js',
      'tailwind.ts',
      'tailwind.config.js',
      'tailwind.config.cjs',
      'tailwind.config.ts',
      'tailwind.config.cts'
    ]
  },
  {
    name: 'three-d',
    fileExtensions: [
      'stl',
      'stp',
      'obj',
      'ac',
      'blend',
      'fbx',
      'mesh',
      'mqo',
      'pmd',
      'pmx',
      'skp',
      'vac',
      'vdp',
      'vox'
    ]
  },
  { name: 'buildkite', fileNames: ['buildkite.yml', 'buildkite.yaml'] },
  {
    name: 'netlify',
    fileNames: ['netlify.json', 'netlify.yml', 'netlify.yaml', 'netlify.toml']
  },
  { name: 'svg', fileExtensions: ['svg'] },
  {
    name: 'svelte',
    fileExtensions: ['svelte'],
    fileNames: ['svelte.config.js', 'svelte.config.cjs']
  },
  {
    name: 'vim',
    fileExtensions: ['vimrc', 'gvimrc', 'exrc', 'vim', 'viminfo']
  },
  {
    name: 'nest',
    fileNames: ['nest-cli.json', '.nest-cli.json', 'nestconfig.json', '.nestconfig.json']
  },
  {
    name: 'nest-controller',
    fileExtensions: ['controller.ts', 'controller.js'],
    enabledFor: [IconPack.Nest]
  },
  {
    name: 'nest-middleware',
    fileExtensions: ['middleware.ts', 'middleware.js'],
    enabledFor: [IconPack.Nest]
  },
  {
    name: 'nest-module',
    fileExtensions: ['module.ts', 'module.js'],
    enabledFor: [IconPack.Nest]
  },
  {
    name: 'nest-service',
    fileExtensions: ['service.ts', 'service.js'],
    enabledFor: [IconPack.Nest]
  },
  {
    name: 'nest-decorator',
    fileExtensions: ['decorator.ts', 'decorator.js'],
    enabledFor: [IconPack.Nest]
  },
  {
    name: 'nest-pipe',
    fileExtensions: ['pipe.ts', 'pipe.js'],
    enabledFor: [IconPack.Nest]
  },
  {
    name: 'nest-filter',
    fileExtensions: ['filter.ts', 'filter.js'],
    enabledFor: [IconPack.Nest]
  },
  {
    name: 'nest-gateway',
    fileExtensions: ['gateway.ts', 'gateway.js'],
    enabledFor: [IconPack.Nest]
  },
  {
    name: 'nest-guard',
    fileExtensions: ['guard.ts', 'guard.js'],
    enabledFor: [IconPack.Nest]
  },
  {
    name: 'nest-resolver',
    fileExtensions: ['resolver.ts', 'resolver.js'],
    enabledFor: [IconPack.Nest]
  },
  { name: 'moonscript', fileExtensions: ['moon'] },
  { name: 'percy', fileNames: ['.percy.yml'] },
  { name: 'gitpod', fileNames: ['.gitpod.yml'] },
  { name: 'advpl_prw', fileExtensions: ['prw', 'prx'] },
  { name: 'advpl_ptm', fileExtensions: ['ptm'] },
  { name: 'advpl_tlpp', fileExtensions: ['tlpp'] },
  { name: 'advpl_include', fileExtensions: ['ch'] },
  { name: 'codeowners', fileNames: ['codeowners'] },
  { name: 'gcp', fileNames: ['.gcloudignore'] },
  { name: 'disc', fileExtensions: ['iso'] },
  {
    name: 'fortran',
    fileExtensions: ['f', 'f77', 'f90', 'f95', 'f03', 'f08']
  },
  { name: 'tcl', fileExtensions: ['tcl'] },
  { name: 'liquid', fileExtensions: ['liquid'] },
  { name: 'prolog', fileExtensions: ['p', 'pro', 'pl'] },
  {
    name: 'husky',
    fileNames: [
      '.huskyrc',
      'husky.config.js',
      '.huskyrc.json',
      '.huskyrc.js',
      '.huskyrc.yaml',
      '.huskyrc.yml'
    ]
  },
  { name: 'coconut', fileExtensions: ['coco'] },
  { name: 'tilt', fileNames: ['tiltfile'] },
  {
    name: 'capacitor',
    fileNames: ['capacitor.config.json', 'capacitor.config.ts']
  },
  { name: 'sketch', fileExtensions: ['sketch'] },
  { name: 'pawn', fileExtensions: ['pwn', 'amx'] },
  { name: 'adonis', fileNames: ['.adonisrc.json', 'ace'] },
  { name: 'forth', fileExtensions: ['4th', 'fth', 'frt'] },
  {
    name: 'uml',
    fileExtensions: ['iuml', 'pu', 'puml', 'plantuml', 'wsd'],
    light: true
  },
  {
    name: 'meson',
    fileNames: ['meson.build', 'meson_options.txt'],
    fileExtensions: ['wrap']
  },
  {
    name: 'commitlint',
    fileNames: [
      '.commitlintrc',
      '.commitlintrc.js',
      '.commitlintrc.cjs',
      '.commitlintrc.ts',
      '.commitlintrc.cts',
      '.commitlintrc.json',
      '.commitlintrc.yaml',
      '.commitlintrc.yml',
      '.commitlint.yaml',
      '.commitlint.yml',
      'commitlint.config.js',
      'commitlint.config.cjs',
      'commitlint.config.ts',
      'commitlint.config.cts'
    ]
  },
  { name: 'buck', fileNames: ['.buckconfig'] },
  { name: 'dhall', fileExtensions: ['dhall', 'dhallb'] },
  {
    name: 'sml',
    fileExtensions: ['sml', 'mlton', 'mlb', 'sig', 'fun', 'cm', 'lex', 'use', 'grm']
  },
  { name: 'nrwl', fileNames: ['nx.json', '.nxignore'] },
  { name: 'opam', fileExtensions: ['opam'] },
  {
    name: 'dune',
    fileNames: ['dune', 'dune-project', 'dune-workspace', 'dune-workspace.dev']
  },
  { name: 'imba', fileExtensions: ['imba'] },
  { name: 'drawio', fileExtensions: ['drawio', 'dio'] },
  { name: 'pascal', fileExtensions: ['pas'] },
  { name: 'shaderlab', fileExtensions: ['unity'] },
  {
    name: 'roadmap',
    fileNames: [
      'roadmap.md',
      'roadmap.txt',
      'timeline.md',
      'timeline.txt',
      'milestones.md',
      'milestones.txt'
    ]
  },
  {
    name: 'sas',
    fileExtensions: ['sas', 'sas7bdat', 'sashdat', 'astore', 'ast', 'sast']
  },
  {
    name: 'nuget',
    fileNames: ['nuget.config', '.nuspec', 'nuget.exe'],
    fileExtensions: ['nupkg']
  },
  { name: 'command', fileExtensions: ['command'] },
  { name: 'stryker', fileNames: ['stryker.conf.js', 'stryker.conf.json'] },
  { name: 'denizenscript', fileExtensions: ['dsc'] },
  {
    name: 'modernizr',
    fileNames: ['.modernizrrc', '.modernizrrc.js', '.modernizrrc.json']
  },
  { name: 'slug', fileNames: ['.slugignore'] },
  { name: 'search', fileExtensions: ['code-search'] },
  {
    name: 'stitches',
    fileNames: ['stitches.config.js', 'stitches.config.ts'],
    light: true
  },
  {
    name: 'nginx',
    fileNames: ['nginx.conf'],
    fileExtensions: ['nginx', 'nginxconfig']
  },
  {
    name: 'minecraft',
    fileExtensions: [
      'mcfunction',
      'mcmeta',
      'mcr',
      'mca',
      'mcgame',
      'mclevel',
      'mcworld',
      'mine',
      'mus',
      'mcstructure'
    ],
    fileNames: ['.mcattributes', '.mcdefinitions', '.mcignore']
  },
  { name: 'replit', fileNames: ['.replit'] },
  { name: 'rescript', fileExtensions: ['res'] },
  { name: 'rescript-interface', fileExtensions: ['resi'] },
  {
    name: 'snowpack',
    fileNames: [
      'snowpack.config.js',
      'snowpack.config.cjs',
      'snowpack.config.mjs',
      'snowpack.config.ts',
      'snowpack.config.cts',
      'snowpack.config.mts',
      'snowpack.deps.json',
      'snowpack.config.json'
    ],
    light: true
  },
  { name: 'brainfuck', fileExtensions: ['b', 'bf'] },
  { name: 'bicep', fileExtensions: ['bicep'] },
  { name: 'cobol', fileExtensions: ['cob', 'cbl'] },
  { name: 'grain', fileExtensions: ['gr'] },
  { name: 'lolcode', fileExtensions: ['lol'] },
  { name: 'idris', fileExtensions: ['idr', 'ibc'] },
  { name: 'quasar', fileNames: ['quasar.conf.js', 'quasar.config.js'] },
  { name: 'dependabot', fileNames: ['dependabot.yml'] },
  { name: 'pipeline', fileExtensions: ['pipeline'] },
  {
    name: 'vite',
    fileNames: [
      'vite.config.js',
      'vite.config.mjs',
      'vite.config.cjs',
      'vite.config.ts',
      'vite.config.cts',
      'vite.config.mts'
    ]
  },
  { name: 'opa', fileExtensions: ['rego'] },
  { name: 'lerna', fileNames: ['lerna.json'] },
  {
    name: 'windicss',
    fileNames: [
      'windi.config.js',
      'windi.config.cjs',
      'windi.config.ts',
      'windi.config.cts',
      'windi.config.json'
    ],
    fileExtensions: ['windi']
  },
  {
    name: 'textlint',
    fileNames: ['.textlintrc']
  },
  { name: 'scala', fileExtensions: ['scala', 'sc'] },
  { name: 'lilypond', fileExtensions: ['ly'] },
  { name: 'vlang', fileExtensions: ['v'], fileNames: ['vpkg.json', 'v.mod'] },
  { name: 'chess', fileExtensions: ['pgn', 'fen'], light: true },
  { name: 'gemini', fileExtensions: ['gmi', 'gemini'] },
  { name: 'sentry', fileNames: ['.sentryclirc'] },
  {
    name: 'phpunit',
    fileNames: [
      '.phpunit.result.cache',
      '.phpunit-watcher.yml',
      'phpunit.xml',
      'phpunit.xml.dist',
      'phpunit-watcher.yml',
      'phpunit-watcher.yml.dist'
    ]
  },
  {
    name: 'php-cs-fixer',
    fileNames: [
      '.php_cs',
      '.php_cs.dist',
      '.php_cs.php',
      '.php_cs.dist.php',
      '.php-cs-fixer.php',
      '.php-cs-fixer.dist.php'
    ]
  },
  { name: 'robots', fileNames: ['robots.txt'] },
  {
    name: 'tsconfig',
    fileNames: [
      'tsconfig.json',
      'tsconfig.app.json',
      'tsconfig.editor.json',
      'tsconfig.spec.json',
      'tsconfig.base.json',
      'tsconfig.build.json',
      'tsconfig.eslint.json',
      'tsconfig.lib.json',
      'tsconfig.node.json',
      'tsconfig.test.json',
      'tsconfig.e2e.json',
      'tsconfig.web.json',
      'tsconfig.webworker.json'
    ],
    fileExtensions: ['tsconfig.json']
  },
  {
    name: 'tauri',
    fileNames: [
      'tauri.conf.json',
      'tauri.config.json',
      'tauri.linux.conf.json',
      'tauri.windows.conf.json',
      'tauri.macos.conf.json'
    ],
    fileExtensions: ['tauri']
  },
  {
    name: 'jsconfig',
    fileNames: ['jsconfig.json'],
    fileExtensions: ['jsconfig.json']
  },
  {
    name: 'maven',
    fileNames: ['maven.config', 'jvm.config', 'pom.xml']
  },
  { name: 'ada', fileExtensions: ['ada', 'adb', 'ads', 'ali'] },
  { name: 'serverless', fileNames: ['serverless.yml'] },
  {
    name: 'ember',
    fileNames: ['.ember-cli', '.ember-cli.js', 'ember-cli-builds.js']
  },
  {
    name: 'horusec',
    fileNames: ['horusec-config.json'],
    fileExtensions: ['horusec-config.json']
  },
  { name: 'poetry', fileNames: ['poetry.lock'] },
  { name: 'coala', fileExtensions: ['coarc', 'coafile'] },
  { name: 'parcel', fileNames: ['.parcelrc'] },
  {
    name: 'dinophp',
    fileExtensions: ['bubble', 'html.bubble', 'php.bubble']
  },
  { name: 'teal', fileExtensions: ['tl'] },
  { name: 'template', fileExtensions: ['template'] },
  { name: 'astyle', fileNames: ['.astylerc'] },
  {
    name: 'shader',
    fileExtensions: [
      'glsl',
      'vert',
      'tesc',
      'tese',
      'geom',
      'frag',
      'comp',
      'vert.glsl',
      'tesc.glsl',
      'tese.glsl',
      'geom.glsl',
      'frag.glsl',
      'comp.glsl',
      'vertex.glsl',
      'geometry.glsl',
      'fragment.glsl',
      'compute.glsl',
      'ts.glsl',
      'gs.glsl',
      'vs.glsl',
      'fs.glsl',
      'shader',
      'vertexshader',
      'fragmentshader',
      'geometryshader',
      'computeshader',
      'hlsl',
      'pixel.hlsl',
      'geometry.hlsl',
      'compute.hlsl',
      'tessellation.hlsl',
      'px.hlsl',
      'geom.hlsl',
      'comp.hlsl',
      'tess.hlsl',
      'wgsl'
    ]
  },
  {
    name: 'lighthouse',
    fileNames: [
      '.lighthouserc.js',
      'lighthouserc.js',
      '.lighthouserc.json',
      'lighthouserc.json',
      '.lighthouserc.yml',
      'lighthouserc.yml',
      '.lighthouserc.yaml',
      'lighthouserc.yaml'
    ]
  },
  {
    name: 'svgr',
    fileNames: [
      '.svgrrc',
      'svgr.config.js',
      '.svgrrc.js',
      '.svgrrc.yaml',
      '.svgrrc.yml',
      '.svgrrc.json'
    ]
  },
  { name: 'rome', fileNames: ['rome.json'] },
  {
    name: 'cypress',
    fileNames: [
      'cypress.json',
      'cypress.env.json',
      'cypress.config.ts',
      'cypress.config.js',
      'cypress.config.cjs',
      'cypress.config.mjs'
    ]
  },
  { name: 'siyuan', fileExtensions: ['sy'] },
  { name: 'ndst', fileExtensions: ['ndst.yml', 'ndst.yaml', 'ndst.json'] },
  { name: 'plop', fileNames: ['plopfile.js', 'plopfile.ts'] },
  { name: 'tobi', fileExtensions: ['tobi'] },
  { name: 'tobimake', fileNames: ['.tobimake'] },
  { name: 'gleam', fileNames: ['gleam.toml'], fileExtensions: ['gleam'] },
  {
    name: 'pnpm',
    light: true,
    fileNames: ['pnpm-lock.yaml', 'pnpm-workspace.yaml', '.pnpmfile.cjs']
  },
  {
    name: 'gridsome',
    fileNames: ['gridsome.config.js', 'gridsome.server.js']
  },
  {
    name: 'steadybit',
    fileExtensions: ['steadybit.yml', 'steadybit.yaml'],
    fileNames: ['.steadybit.yml', 'steadybit.yml', '.steadybit.yaml', 'steadybit.yaml']
  },
  { name: 'tree', fileExtensions: ['tree'] },
  { name: 'caddy', fileNames: ['Caddyfile'] }
]
// console.log();
const fileExtensions = fileIcons
  .map((item) => {
    return item.fileExtensions?.map((val) => [val, camelcase(item.name, { pascalCase: true })])
  })
  .filter((item) => item)
  .flat() as [string, string][]
const fileNames = fileIcons
  .map((item) => {
    return item.fileNames?.map((val) => [val, camelcase(item.name, { pascalCase: true })])
  })
  .filter((item) => item)
  .flat() as [string, string][]

export default Object.fromEntries([...fileNames, ...fileExtensions])
