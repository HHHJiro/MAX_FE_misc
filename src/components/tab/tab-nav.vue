<script>
export default {
  name: 'TabNav',
  inject: ['rootTabs'],
  props: {
    panes: Array
  },
  computed: {
  },
  methods: {
    changeActive (val) {
      if (this.$parent.currentName === val ) {
        return false
      }
      this.$parent.setCurrentName(val)
    }
  },
  watch: {
    currentName(value) {
      if (this.$refs.nav) {
        this.$nextTick(_ => {
          // this.$refs.nav.scrollToActiveTab();
          console.log(1)
        });
      }
    }
  },
  render(h) {
    const {isActive, changeActive} = this
    const {panes} = this.rootTabs
    const tabs = this._l(panes, (pane, index) => {
      const tabLabelContent = pane.$slots.label || pane.label;
      let tabName = pane.name || pane.index || index;
      pane.index = `${index}`;
      return (
        <div 
        class={{
          'tabs__item': true,
          'is-active': pane.active
        }} id={`tab-${tabName}`}
        role="tab"
        ref="tabs"
        on-click={(ev) => { changeActive(tabName) }}
        >
          {tabLabelContent}
        </div>
      )
    });
    return (
      <div class={{
        'tabs-nav': true
        }}

      >
      {tabs}
      </div>
    )
  }
}
</script>
