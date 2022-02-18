import '@/context'
type Layer = 'models' | 'services'
declare global {
  var tests: {
    layer: Layer
  }
}
switch (global?.tests?.layer) {
  case 'models':
    require('@/models')
    break
  case 'services':
    require('@/models')
    require('@/services')
    break
}
