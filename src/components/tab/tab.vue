<script>
import TabNav from './tab-nav';
export default {
  name: 'pubg-tab',
  provide() {
    return {
      rootTabs: this
    }
  },
  props: {
    activeName: String,
    value: String
  },
  data() {
    return {
      currentName: this.value || this.activeName,
      panes: []
    }
  },
  watch: {
    activeName(value) {
      this.setCurrentName(value);
    },
    value(value) {
      this.setCurrentName(value);
    }
  },
  mounted () {
  },
  methods: {
    addPanes(item) {
      const index = this.$slots.default.filter(item => {
        return item.elm.nodeType === 1 && /\bpubg-pane\b/.test(item.elm.className);
      }).indexOf(item.$vnode);
      this.panes.splice(index, 0, item);
    },
    setCurrentName(value) {
      this.currentName = value;
    },
  },
  render(h) {
    let {
      panes
    } = this
    const navData = {
      props: {
        panes
      },
      ref: 'nav'
    }
    const panels = (
      <div class="pubg-tabs__content">
        {this.$slots.default}
      </div>
    )
    return (
      <div class="tabs__box">
        <tab-nav { ...navData }></tab-nav>
        {panels}
      </div>
    )
  },
  created() {
    if (!this.currentName) {
      this.setCurrentName('0');
    }
  }
}
</script>
