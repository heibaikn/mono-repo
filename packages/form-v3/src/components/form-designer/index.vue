<template>
  <el-container class="main-container full-height">
    <el-header class="main-header">
      <div class="float-left main-title">
        <img src="../../assets/vform-logo.png" @click="openHome" />
        <span class="bold">VForm 3</span>
        {{ i18nt('application.productTitle') }}
        <span class="version-span">Version {{ vFormVersion }}</span>
      </div>
      <div class="float-right external-link">
        <el-dropdown
          v-if="showLink('languageMenu')"
          :hide-timeout="2000"
          @command="handleLanguageChanged">
          <span class="el-dropdown-link">
            {{ curLangName }}
            <svg-icon icon-class="el-arrow-down" />
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="zh-CN">{{ i18nt('application.zh-CN') }}</el-dropdown-item>
              <el-dropdown-item command="en-US">{{ i18nt('application.en-US') }}</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <a
          v-if="showLink('externalLink')"
          href="javascript:void(0)"
          @click="(ev) => openUrl(ev, gitUrl)"
          target="_blank">
          <svg-icon icon-class="github" />
          {{ i18nt('application.github') }}
        </a>
      </div>
    </el-header>

    <el-container>
      <el-aside class="side-panel">
        <widget-panel :designer="designer" />
      </el-aside>

      <el-container class="center-layout-container">
        <el-header class="toolbar-header">
          <toolbar-panel :designer="designer" :global-dsv="options.globalDsv" ref="toolbarRef">
            <template v-for="(idx, slotName) in $slots" #[slotName]>
              <slot :name="slotName" />
            </template>
          </toolbar-panel>
        </el-header>
        <el-main class="form-widget-main">
          <el-scrollbar class="container-scroll-bar" :style="{ height: scrollerHeight }">
            <v-form-widget
              :designer="designer"
              :form-config="designer.formConfig"
              :global-dsv="options.globalDsv"
              ref="formRef" />
          </el-scrollbar>
        </el-main>
      </el-container>

      <el-aside>
        <setting-panel
          :designer="designer"
          :selected-widget="designer.selectedWidget"
          :form-config="designer.formConfig"
          :global-dsv="options.globalDsv"
          @edit-event-handler="testEEH" />
      </el-aside>
    </el-container>
  </el-container>
</template>

<script>
import axios from 'axios'
import WidgetPanel from './widget-panel/index'
import ToolbarPanel from './toolbar-panel/index'
import SettingPanel from './setting-panel/index'
import VFormWidget from './form-widget/index'
import { createDesigner } from '@/components/form-designer/designer'
import {
  addWindowResizeHandler,
  deepClone,
  getQueryParam,
  getAllContainerWidgets,
  getAllFieldWidgets,
  traverseAllWidgets
} from '@/utils/util'
import { MOCK_CASE_URL, VARIANT_FORM_VERSION } from '@/utils/config'
import i18n, { changeLocale } from '@/utils/i18n'
import SvgIcon from '@/components/svg-icon/index'

export default {
  name: 'VFormDesigner',
  componentName: 'VFormDesigner',
  mixins: [i18n],
  components: {
    SvgIcon,
    WidgetPanel,
    ToolbarPanel,
    SettingPanel,
    VFormWidget
  },
  props: {
    /* 后端字段列表API */
    fieldListApi: {
      type: Object,
      default: null
    },

    /* 禁止显示的组件名称数组 */
    bannedWidgets: {
      type: Array,
      default: () => []
    },
    modelValue: {
      type: Object,
      default: () => {
        return {
          widgetList: [],
          formConfig: [],
          date: '2022-12-01T12:21:17.447Z'
        }
      }
    },
    options: {
      type: Object,
      default: () => {
        return {
          widgetList: [],
          formConfig: [],
          globalDsv: {},
          date: '2022-12-01T12:21:17.447Z'
        }
      }
    },
    designerConfig: {
      type: Object,
      default: () => {
        return {
          languageMenu: true, //是否显示语言切换菜单
          externalLink: true, //是否显示GitHub、文档等外部链接
          formTemplates: true, //是否显示表单模板
          eventCollapse: true, //是否显示组件事件属性折叠面板
          widgetNameReadonly: false, //禁止修改组件名称

          clearDesignerButton: true, //是否显示清空设计器按钮
          previewFormButton: true, //是否显示预览表单按钮
          importJsonButton: true, //是否显示导入JSON按钮
          exportJsonButton: true, //是否显示导出JSON器按钮
          exportCodeButton: true, //是否显示导出代码按钮
          generateSFCButton: true, //是否显示生成SFC按钮

          toolbarMaxWidth: 450, //设计器工具按钮栏最大宽度（单位像素）
          toolbarMinWidth: 300, //设计器工具按钮栏最小宽度（单位像素）

          presetCssCode: '', //设计器预设CSS样式代码

          resetFormJson: false //是否在设计器初始化时将表单内容重置为空
        }
      }
    }
  },
  emits: ['update:modelValue'],
  data() {
    return {
      vFormVersion: VARIANT_FORM_VERSION,
      curLangName: '',
      curLocale: '',

      vsCodeFlag: false,
      caseName: '',
      gitUrl:
        'https://github.com/heibaikn/mono-repo/blob/main/packages/form-v3/src/components/form-designer/index.vue',
      scrollerHeight: 0,

      designer: {},

      fieldList: []
    }
  },
  provide() {
    return {
      serverFieldList: this.fieldList,
      getDesignerConfig: () => this.designerConfig,
      getBannedWidgets: () => this.bannedWidgets
    }
  },
  created() {
    this.designer = createDesigner(this, {
      widgetList: this.options.widgetList,
      formConfig: this.options.formConfig,
      date: this.options.date
    })
    this.vsCodeFlag = getQueryParam('vscode') == 1
    this.caseName = getQueryParam('case')
  },
  mounted() {
    this.initLocale()
    console.log(this.schema)
    this.scrollerHeight = `${window.innerHeight - 56 - 36}px`
    addWindowResizeHandler(() => {
      this.$nextTick(() => {
        this.scrollerHeight = `${window.innerHeight - 56 - 36}px`
      })
    })

    this.loadCase()
    this.loadFieldListFromServer()
  },
  watch: {
    'designer.widgetList': {
      handler(val) {
        this.$emit('update:modelValue', val)
      },
      deep: true
    },
    'designer.formConfig': {
      handler(val) {
        console.log('formConfig', val)
      },
      deep: true
    }
  },
  methods: {
    testEEH(eventName, eventParams) {
      console.log('test', eventName)
      console.log('test222222', eventParams)
    },

    showLink(configName) {
      if (this.designerConfig[configName] === undefined) {
        return true
      }

      return !!this.designerConfig[configName]
    },

    openHome() {},

    openUrl(event, url) {
      let aDom = event.currentTarget
      aDom.href = url
    },

    loadCase() {
      if (!this.caseName) {
        return
      }

      axios
        .get(`${MOCK_CASE_URL + this.caseName}.txt`)
        .then((res) => {
          if (res.data.code) {
            this.$message.error(this.i18nt('designer.hint.sampleLoadedFail'))
            return
          }

          this.setFormJson(res.data)
          this.$message.success(this.i18nt('designer.hint.sampleLoadedSuccess'))
        })
        .catch((error) => {
          this.$message.error(`${this.i18nt('designer.hint.sampleLoadedFail')}:${error}`)
        })
    },

    initLocale() {
      this.curLocale = localStorage.getItem('v_form_locale')
      this.curLocale = this.curLocale || 'zh-CN'
      this.curLangName = this.i18nt(`application.${this.curLocale}`)
      this.changeLanguage(this.curLocale)
    },

    loadFieldListFromServer() {
      if (!this.fieldListApi) {
        return
      }
    },

    handleLanguageChanged(command) {
      this.changeLanguage(command)
      this.curLangName = this.i18nt(`application.${command}`)
    },

    changeLanguage(langName) {
      changeLocale(langName)
    },

    setFormJson(formJson) {
      let modifiedFlag = false
      if (formJson) {
        if (typeof formJson === 'string') {
          modifiedFlag = this.designer.loadFormJson(JSON.parse(formJson))
        } else if (formJson.constructor === Object) {
          modifiedFlag = this.designer.loadFormJson(formJson)
        }

        if (modifiedFlag) {
          this.designer.emitHistoryChange()
        }
      }
    },

    getFormJson() {
      return {
        widgetList: deepClone(this.designer.widgetList),
        formConfig: deepClone(this.designer.formConfig)
      }
    },

    clearDesigner() {
      this.$refs.toolbarRef.clearFormWidget()
    },

    /**
     * 刷新表单设计器
     */
    refreshDesigner() {
      //this.designer.loadFormJson( this.getFormJson() )  //只有第一次调用生效？？

      let fJson = this.getFormJson()
      this.designer.clearDesigner(true) //不触发历史记录变更
      this.designer.loadFormJson(fJson)
    },

    /**
     * 预览表单
     */
    previewForm() {
      this.$refs.toolbarRef.previewForm()
    },

    /**
     * 导入表单JSON
     */
    importJson() {
      this.$refs.toolbarRef.importJson()
    },

    /**
     * 导出表单JSON
     */
    exportJson() {
      this.$refs.toolbarRef.exportJson()
    },

    /**
     * 导出Vue/HTML代码
     */
    exportCode() {
      this.$refs.toolbarRef.exportCode()
    },

    /**
     * 生成SFC代码
     */
    generateSFC() {
      this.$refs.toolbarRef.generateSFC()
    },

    /**
     * 获取所有字段组件
     * @returns {*[]}
     */
    getFieldWidgets(widgetList = null) {
      return widgetList
        ? getAllFieldWidgets(widgetList)
        : getAllFieldWidgets(this.designer.widgetList)
    },

    /**
     * 获取所有容器组件
     * @returns {*[]}
     */
    getContainerWidgets(widgetList = null) {
      return widgetList
        ? getAllContainerWidgets(widgetList)
        : getAllContainerWidgets(this.designer.widgetList)
    },

    /**
     * 升级表单json，以补充最新的组件属性
     * @param formJson
     */
    upgradeFormJson(formJson) {
      if (!formJson.widgetList || !formJson.formConfig) {
        this.$message.error('Invalid form json!')
        return
      }

      traverseAllWidgets(formJson.widgetList, (w) => {
        this.designer.upgradeWidgetConfig(w)
      })
      this.designer.upgradeFormConfig(formJson.formConfig)

      return formJson
    },

    getWidgetRef(widgetName, showError = false) {
      return this.$refs['formRef'].getWidgetRef(widgetName, showError)
    },

    getSelectedWidgetRef() {
      return this.$refs['formRef'].getSelectedWidgetRef()
    }

    //TODO: 增加更多方法！！
  }
}
</script>

<style lang="scss" scoped>
.el-container.main-container {
  background: #fff;

  :deep(aside) {
    /* 防止aside样式被外部样式覆盖！！ */
    margin: 0;
    padding: 0;
    background: inherit;
  }
}

.el-container.full-height {
  height: 100%;
  overflow-y: hidden;
}

.el-container.center-layout-container {
  min-width: 680px;
  border-left: 2px dotted #ebeef5;
  border-right: 2px dotted #ebeef5;
}

.el-header.main-header {
  border-bottom: 2px dotted #ebeef5;
  height: 48px !important;
  line-height: 48px !important;
  min-width: 800px;
}

div.main-title {
  font-size: 18px;
  color: #242424;
  display: flex;
  align-items: center;
  justify-items: center;

  img {
    cursor: pointer;
    width: 36px;
    height: 36px;
  }

  span.bold {
    font-size: 20px;
    font-weight: bold;
    margin: 0 6px 0 6px;
  }

  span.version-span {
    font-size: 14px;
    color: #101f1c;
    margin-left: 6px;
  }
}

.float-left {
  float: left;
}

.float-right {
  float: right;
}

.el-dropdown-link {
  margin-right: 12px;
  cursor: pointer;
}

div.external-link {
  display: flex;
  align-items: center;

  a {
    font-size: 13px;
    text-decoration: none;
    margin-right: 10px;
    color: #606266;
  }
}

.el-header.toolbar-header {
  font-size: 14px;
  border-bottom: 1px dotted #cccccc;
  height: 42px !important;
  //line-height: 42px !important;
}

.el-aside.side-panel {
  width: 260px !important;
  overflow-y: hidden;
}

.el-main.form-widget-main {
  padding: 0;

  position: relative;
  overflow-x: hidden;
}

.container-scroll-bar {
  :deep(.el-scrollbar__wrap),
  :deep(.el-scrollbar__view) {
    overflow-x: hidden;
  }
}
</style>
