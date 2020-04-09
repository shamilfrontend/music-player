import { shallowMount } from '@vue/test-utils'

import Component from './index'

describe('SignInPage', () => {
  let instance

  beforeEach(() => {
    instance = shallowMount(Component, {
      stubs: ['nuxt-link']
    })
  })

  test('should match snapshot', () => {
    expect(instance.html()).toMatchSnapshot()
  })
})
