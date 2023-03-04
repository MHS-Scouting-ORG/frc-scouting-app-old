
jest.mock('../api')

import Form from './Form'
import { render }  from '@testing-library/react'



describe('form test', () => {
    it('create test', _ => {
        render(<Form regional="foobar"/>)
    })

    it('test with object', _ => {
        render(<Form matchData={{}} regional="foobar" />)
    })
})