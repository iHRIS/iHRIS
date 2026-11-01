import {
  eventBus
} from '@/main'

// Fields announce their value on the event bus under their linkId, and fields with a
// display condition listen for the linkId they depend on. Every row of a repeating
// questionnaire group has the same linkIds, so each row gets a scope: a condition
// on a field of the same row listens to that row only.
let scopeCount = 0
export function newDisplayScope(prefix, parent) {
  scopeCount += 1
  return { prefix, parent, id: scopeCount }
}

export const dataDisplay = {
  inject: {
    displayScope: { default: null }
  },
  data() {
    return {
      hide: false,
      pathes: {}
    }
  },
  beforeDestroy() {
    for (const [event, fn] of this.displayListeners || []) {
      eventBus.$off(event, fn)
    }
  },
  methods: {
    displayEventName(path) {
      for (let scope = this.displayScope; scope; scope = scope.parent) {
        if (path && path.startsWith(scope.prefix + '.')) {
          return path + '@' + scope.id
        }
      }
      return path
    },
    // Announce on the row's scoped name and, as before, on the plain linkId,
    // which conditions outside the group and site components listen to.
    emitValue(value) {
      const scoped = this.displayEventName(this.path)
      if (scoped !== this.path) {
        eventBus.$emit(scoped, value)
      }
      eventBus.$emit(this.path, value)
    },
    hideShowField(displayCondition, enableBehavior) {
      if(displayCondition) {
        this.hide = true
        let conditions = displayCondition.split('+=')
        for(let cond of conditions) {
          let condition = cond.split('|')
          let path = condition[0]
          let operator = condition[1]
          let condValue = condition[2]
          if(!this.pathes[path]) {
            this.pathes[path] = {
              data: []
            }
          }
          this.pathes[path].data.push({
            expectedVal: condValue,
            operator
          })
          const listener = (value) => {
            this.pathes[path].selectedVal = value
            this.hide = false
            let hide = {}
            for(let path in this.pathes) {
              let selectedVal = this.pathes[path].selectedVal
              for(let pathData of this.pathes[path].data) {
                let expectedVal = pathData.expectedVal
                let operator = pathData.operator
                if((operator === '=' && expectedVal == selectedVal) || (operator === '!=' && expectedVal != selectedVal)) {
                  hide[path + '#' + expectedVal] = false
                } else if(operator === 'exists' && selectedVal !== "") {
                  hide[path + '#' + expectedVal] = false
                } else if(
                  (operator === '>' && expectedVal > selectedVal) || 
                  (operator === '<' && expectedVal < selectedVal) ||
                  (operator === '<=' && expectedVal <= selectedVal) ||
                  (operator === '>=' && expectedVal >= selectedVal)
                ) {
                  hide[path + '#' + expectedVal] = false
                } else {
                  hide[path + '#' + expectedVal] = true
                  if(!enableBehavior || enableBehavior === 'all') {
                    this.hide = true
                  }
                }
              }
            }
            if(enableBehavior && enableBehavior === 'any') {
              let canShow = false
              for(let hd in hide) {
                if(!hide[hd]) {
                  canShow = true
                }
              }
              if(!canShow) {
                this.hide = true
              }
            }
          }
          const event = this.displayEventName(path)
          eventBus.$on(event, listener)
          if(!this.displayListeners) {
            this.displayListeners = []
          }
          this.displayListeners.push([event, listener])
        }
      } else {
        this.hide = false
      }
    }
  }
}