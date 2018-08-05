export default{
  toJson (body) {
    var cache = []
    var str = JSON.stringify(body, function (key, value) {
      if (typeof value === 'object' && value !== null) {
        if (cache.indexOf(value) !== -1) {
          // Circular reference found, discard key
          return
        }
        // Store value in our collection
        cache.push(value)
      }
      return value
    })
    cache = null
    return str
  }
}
