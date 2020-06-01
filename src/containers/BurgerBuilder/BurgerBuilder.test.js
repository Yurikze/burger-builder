import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import { BurgerBuilder } from './BurgerBuilder'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

configure({adapter: new Adapter()})

describe('<BurderBuilder/>',() => {
    let wrapper
    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}} />)
    })

    it('should find Build controls if receive ingredients', () => {
        wrapper.setProps({ingredients: {salad: 0}})
        expect(wrapper.find(BuildControls)).toHaveLength(1)
    })
})       