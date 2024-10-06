import axios from "axios";
export const kibana = {
  data() {
    return {
      dashboards: [],
      ignoreDashboards: ["testing", "test", "Testing", "Test"],
      tags: []
    }
  },
  methods: {
    getTags(page) {
      return new Promise((resolve, reject) => {
        let url = "/dashboards/api/saved_objects/_find?type=tag&per_page=10000"
        if(page) {
          url += "&page=" + page
        }
        fetch(url).then((response) => {
          response.json().then((response) => {
            let totalPages = Math.ceil(response.total/response.per_page)
            if(response.saved_objects) {
              this.tags = this.tags.concat(response.saved_objects)
            }
            if(response.page < totalPages) {
              this.getTags(response.page + 1).then(() => {
                resolve()
              }).catch(() => {
                reject()
              })
            } else {
              resolve()
            }
          }).catch(() => {
          reject()
        })
        }).catch(() => {
          reject()
        })
      })
    },
    getDashboards() {
      return new Promise((resolve, reject) => {
        let body = {
          type: "dashboard",
          excludeExportDetails: true,
          includeReferencesDeep: false
        }
        let options = {
          method: "POST",
          headers: {
            "kbn-xsrf": true,
            "Content-Type": "application/json",
          },
          redirect: "manual",
          data: body
        }
        axios("/dashboards/api/saved_objects/_export", options).then((response) => {
          if(typeof response.data === 'string') {
            let lines = response.data && response.data.split('\n');
            let accept = true
            for (let i = 0; i < lines.length - 1; i++) {
              if (lines[i].trim()) {
                try {
                  const dashboard = JSON.parse(lines[i]);
                  for(let reference of dashboard.references) {
                    if(reference.type !== 'tag') {
                      continue
                    }
                    let tag = this.tags.find((tag) => {
                      return tag.id === reference.id
                    })
                    if(this.ignoreDashboards.includes(tag.attributes.name)) {
                      accept = false
                      break
                    }
                  }
                  if(accept) {
                    this.dashboards.push({
                      id: dashboard.id,
                      title: dashboard.attributes.title
                    })
                  }
                } catch (error) {
                  console.error('Error parsing JSON:', error);
                }
              }
            }
            let buffer = lines[lines.length - 1];
            if (buffer.trim()) {
              try {
                const dashboard = JSON.parse(buffer);
                for(let reference of dashboard.references) {
                  if(reference.type !== 'tag') {
                    continue
                  }
                  let tag = this.tags.find((tag) => {
                    return tag.id === reference.id
                  })
                  if(this.ignoreDashboards.includes(tag.attributes.name)) {
                    accept = false
                    break
                  }
                }
                if(accept) {
                  this.dashboards.push({
                    id: dashboard.id,
                    title: dashboard.attributes.title
                  })
                }
              } catch (error) {
                console.error('Error parsing final JSON object:', error);
              }
            }
          } else if(typeof response.data === 'object') {
            let accept = true
            for(let reference of response.data.references) {
              if(reference.type !== 'tag') {
                continue
              }
              let tag = this.tags.find((tag) => {
                return tag.id === reference.id
              })
              if(this.ignoreDashboards.includes(tag.attributes.name)) {
                accept = false
                break
              }
            }
            if(accept) {
              this.dashboards.push({
                id: response.data.id,
                title: response.data.attributes.title
              })
            }
          }
          resolve()
        }).catch((err) => {
          console.log(err);
          reject()
        })
      })
    }
  },
  created() {
    this.loading = true
    this.getTags().then(() => {
      this.getDashboards().then(() => {
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    }).catch(() => {
      this.loading = false
    })
  }
}