import { shallowMount } from '@vue/test-utils'

import Component from './index'

describe('SignInPage', () => {
  let instance

  beforeEach(() => {
    instance = shallowMount(Component)
  })

  test('should match snapshot', () => {
    expect(instance.html()).toMatchSnapshot()
  })
})
