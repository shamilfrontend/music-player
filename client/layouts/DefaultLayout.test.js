import { shallowMount } from '@vue/test-utils'

import Component from './default'

describe('DefaultLayout', () => {
  let instance

  beforeEach(() => {
    instance = shallowMount(Component, {
      stubs: ['nuxt']
    })
  })

  test('should match snapshot', () => {
    expect(instance.html()).toMatchSnapshot()
  })
})
