export default {

    collection: {},
    Init(params) {
        var json
        if (typeof (params) === 'object') {
            if (Object.prototype.toString.call(params).toLowerCase() !== '[object object]' && params.length) {
                return []
            }
            json = params
        } else if (typeof (params) === 'string') {
            json = JSON.parse(params)
            if (!json) return []
        }
        this.collection = json.collection
    },
     toObjectArr(params) {
        this.Init(params)
        return null
    }
}

 function init(params) {
    let json
    if (typeof (params) === 'object') {
        if (Object.prototype.toString.call(params).toLowerCase() !== '[object object]' && params.length) {
            return []
        }
        json = params
    } else if (typeof (params) === 'string') {
        json = JSON.parse(params)
        if (!json) return []
    }
    return json.collection
}

  function toObjectArr(params) {
     let collection = init(params)
     let returnArray = []
     collection.items.forEach((item) => {
        let o = {}
        item.data.forEach((dic) => {
            o[dic.name] = dic.value
        })
         returnArray.push(o)
     })
    return returnArray
}
  function toCollectionJson(_object) {
      let json = {
          'collection': {
              'templates': [{
                  'data': []
              }]
          }
      }
      for(var item in _object)
      {
          for(var i=0;i<_object.length;i++){
              json.collection.templates[i]={};
              json.collection.templates[i].data=[];
              for(var item in _object[i]){
                  json.collection.templates[i].data.push({"name":item,"value":_object[i][item]});
              }
          }
          return json;
//			json.collection.templates[0].data.push({"name":item,"value":_object[item]});
      }
  }
export { toObjectArr, toCollectionJson }
