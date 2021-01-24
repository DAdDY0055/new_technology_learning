const Vuex = require('vuex')
const index = require('../../app/store/index')
const { createLocalVue } = require('@vue/test-utils')
const cloneDeep = require('lodash.clonedeep')

const localVue = createLocalVue()
localVue.use(Vuex)

describe('store/index.js', () => {
  let store
  beforeEach(() => {
    store = new Vuex.Store(cloneDeep(index))
  })
  
  describe('mutations', () => {
    test('increment ミューテーションがコミットされると、constステートの値が+1される', () => {
      expect(store.getters['const']).toBe(0)
      store.commit('increment')
      expect(store.getters['count']).toBe(1)
    })
  })

  describe('actions', () => {
    test('increment アクションを dispatch するたびに、increment ミューテーションがコミットされる', () => {
      expect(store.getters['count']).toBe(0)
      store.dispach('increment')
      expect(store.getters['count']).toBe(1)
    })
  })
})
