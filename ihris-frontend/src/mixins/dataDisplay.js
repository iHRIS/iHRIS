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
    hideShowField(displayCondition) {
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
            this.hide = true
            for(let path in this.pathes) {
              let selectedVal = this.pathes[path].selectedVal
              for(let pathData of this.pathes[path].data) {
                let expectedVal = pathData.expectedVal
                let operator = pathData.operator
                if((operator === '=' && expectedVal == selectedVal) || (operator === '!=' && expectedVal != selectedVal)) {
                  this.hide = false
                } else if(operator === 'exists' && selectedVal !== "") {
                  this.hide = false
                } else if(
                  (operator === '>' && expectedVal > selectedVal) || 
                  (operator === '<' && expectedVal < selectedVal) ||
                  (operator === '<=' && expectedVal <= selectedVal) ||
                  (operator === '>=' && expectedVal >= selectedVal)
                ) {
                  this.hide = false
                }
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