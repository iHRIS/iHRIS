import {
  eventBus
} from '@/main'
export const dataDisplay = {
  data() {
    return {
      hide: false,
      pathes: {}
    }
  },
  methods: {
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
          eventBus.$on(path, (value) => {
            this.pathes[path].selectedVal = value
            this.hide = false
            let hide = {}
            for(let path in this.pathes) {
              hide[path] = true
              let selectedVal = this.pathes[path].selectedVal
              for(let pathData of this.pathes[path].data) {
                let expectedVal = pathData.expectedVal
                let operator = pathData.operator
                if((operator === '=' && expectedVal == selectedVal) || (operator === '!=' && expectedVal != selectedVal)) {
                  hide[path] = false
                } else if(operator === 'exists' && selectedVal !== "") {
                  hide[path] = false
                } else if(
                  (operator === '>' && expectedVal > selectedVal) || 
                  (operator === '<' && expectedVal < selectedVal) ||
                  (operator === '<=' && expectedVal <= selectedVal) ||
                  (operator === '>=' && expectedVal >= selectedVal)
                ) {
                  hide[path] = false
                } else {
                  hide[path] = true
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
          })
        }
      } else {
        this.hide = false
      }
    }
  }
}